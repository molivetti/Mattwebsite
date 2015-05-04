	var SelectedParentIDs = Array();
	var NowWeAreReady=false;
	var selectedParentName = '';
	var selectedParentID = -1;
	var parentCountiesObject;
	var POL_id;
	var xSelIdx = 0;
	var featureList;

	var featureSort = { parentOrg:true, markeyShare:false, filter: 0 };
	
	var listOptions = {
			parentSort 		: 1,
			marketSort 		: 2,
			filterButton 	: 3
		}

	//  listjs variables for testing
	var searchOptions = {
		item: '<li>' 
			+ 	'<div class="parentOrg" onclick="ParentOrgDetails(parentOrgID)">' 
			+ 		'<input type="hidden" class="parentOrgId"/>' 
			+ 	'</div>'
			+ 	'<div class="EnrollCount"></div>'
			+ 	'<div class="marketShare"></div>' 
			+ ' %' 
			+ '</li>',
		valueNames: ['parentOrgId','parentOrg', 'marketShare','EnrollCount'],
		plugins: [ ['fuzzySearch'] ]
	};
	
	function ParentOrgDetails() {
		
	}
		
	// prepare the HTML Templating system
	var source   = $('#entry-template').html();
	var template = Handlebars.compile(source);
	
	source   = $('#LargeInfoPanel-template').html();
	var template2 = Handlebars.compile(source);
	
	
	$(document).ready(function() { 
		PreloadMapData();
	});
	
	function setListOptions (whichOperation) {
		switch  ( whichOperation ) {

			case listOptions.parentSort:
				featureSort.parentOrg=!featureSort.parentOrg;
				featureList.sort( 'parentOrg', {asc:featureSort.parentOrg} );
			break;

			case listOptions.marketSort:
				featureSort.marketShare=!featureSort.marketShare;
				featureList.sort( 'marketShare', {asc:featureSort.marketShare} );
			break;

			case listOptions.filterButton:
				featureSort.filter= featureSort.filter == 0 ? 10 : 0;
				featureList.filter( function (i) { return ( i.values().marketShare > featureSort.filter ) } );
			break;

		}
		return false;
	}

	
	$('#selectParent').change(parentDropdownChange);
	
	function parentDropdownChange(){
		
		$('#orgSelect').hide();
		$("#LoadingCounties").fadeToggle({'duration':'1000'});
	    $("#mapOfCounties").fadeToggle({'duration':'1000'});
	    
		var jsonUrl='data/CountyIDsByParentCompany.cfm';
		
		for ( x in SelectedParentIDs ) { $(SelectedParentIDs[x])[0].elem[0].class=''; }; SelectedParentIDs = [];
		
		selectedParentName = 'POL_ID=' + $(this).find('option:selected').attr('value');
		selectedParentID = $(this).find('option:selected').attr('value');
		POL_id = selectedParentName;
		if ( selectedParentName == '' ) { $( '#selectParent' ).focus(); }
		else{ $.getJSON( jsonUrl, selectedParentName, getCountyData ); }
		
		var jsonUrl='data/GetOrgNamesFromParentID.cfm';
		$.getJSON( jsonUrl, { POL_ID: selectedParentID } , populateOrgs );
		
		
		
		return false;
	}
	
	$('#selectOrg').change(function(){
		
		$.each(SelectedParentIDs, function(i, county){
			setColor(county.elem.selector.slice(2), 'parentSelected', $(county.elem.selector)[0] );
		});
		
		var jsonUrl='data/CountyIDsByOL.cfm';
		$.getJSON(jsonUrl,  { OL_id: $(this).find('option:selected').attr('value') } , highlightCountiesFromOrg)
				
		
		
		return false;
		//GetOrgsByParent
		
	});
	
	function PreloadMapData(){
		$.ajax(
				{
				type	:	'GET',
				url		:	'data/GetMapData.cfm', 
				success	: 	function(data) { 
								constructMap(data); 
							}
				}
		);
	}
	
	function populateOrgs (j) {
		var options = '<option value="-1" selected>Select an Organization From The Parent Company</option>';
		
		if ( $('#selectParent').val() != '-1' ){ 
			for (var i=0; i < j.OrgNames.length; i++) {
				options+='<option value="' + j.OrgNames[i].OL_id + '">' + AllOLNames[j.OrgNames[i].OL_id] + '</option>';
			}
			$("select#selectOrg").html(options);
			$('#orgSelect').show();
		} else {
			$('#orgSelect').hide();
		}
		$("#LoadingCounties").fadeToggle({'duration':'1000'});
		$("#mapOfCounties").fadeToggle({'duration':'1000'});
	}
	
	function highlightCountiesFromOrg(json){
		$.each(json.Counties, function(i, county){
			setColor(county.CountyID, 'orgSelected', $('#i' + county.CountyID)[0] );
		})
	};
	
	function getCountyData(json){
		
		setColor( null, 'setDefaults', null );
		$.each(json.Counties, function(i, county){
			if ( $('#i'+county.CountyID).length ){
				var p = $('#i'+ county.CountyID)[0].class ? $('#i'+ county.CountyID)[0].class :'';
				SelectedParentIDs.push( 
						{  // this works but theres something screwey about the SelectedParentIDs being ID's AND being elements
							elem: $('#i'+ county.CountyID),
							classes: p
						} 
				);
				
				setColor(county.CountyID, 'parentSelected', $('#i' + county.CountyID)[0] );
			}
		});
	};
	
	function slideCountyFromLeft(el,ShowAfterClose) {
		
		ShowAfterClose = typeof ShowAfterClose !== 'undefined' ? ShowAfterClose : false;
		
		var context = {
			'LargeCountyName': 	$('#HiddenCountyName'+$(el).attr('apple')).val(),
			'LargeCountyID': 	$('#HiddenCountyID'+$(el).attr('apple')).val(),
			'LargeStateName': 	$('#HiddenStateName'+$(el).attr('apple')).val()
		}
		
		if ( $('#largeCountyFrame').is(':visible') == true ) {
			 $('#largeCountyFrame').remove();
			 if ( ShowAfterClose ) SkipIt = true;
		}
		
		if ( ShowAfterClose ) {
			if ( $('#countyFrame1').hasClass('emptyFrame') == false ) {
				var html    = template2(context);
				$(document.body).append( html );
				$('#largeCountyFrame').show({top:'-900px', width:'80%'}).animate('slide', { duration: 800, direction: 'up', width:'80%', textAlign:'center'  });
		    }
			var items = loadCompetitors(context.LargeCountyID);
			
		}
	}
	
	function loadCompetitors (xCountyID) {
		// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
		//  this is used for testing until we have data... then it can be removed
		var jsonUrl='data/GetAllParentOrgsByCountyID.cfm';
		var CountyCompetitorData;
		
		$.ajax( 
			{	url		:	jsonUrl.toString(), 
				data	:	{ CountyID: xCountyID } 
			}).done ( processResultSet )
		
		return false;
	}
	
	function processResultSet (data,status,xhr) {
		var items = [];
		var d = JSON.parse(data);
		var totalCount=0.0;
		
		$.each( 
				d.ParentOrgs, 
				function(key,val) { 
					return totalCount+=val.EnrollCount; 
				} 
		);
		
		$.each( 
				d.ParentOrgs, 
				function(key,val) { 
					items.push ( 
							{
								parentOrgId :	val.ParentOrgID, 
								parentOrg	:	AllParentOrgNames[val.ParentOrgID], 
								marketShare	:	((val.EnrollCount / totalCount) * 100).toFixed(1),
								EnrollCount	:	val.EnrollCount.toLocaleString()
							}
					); 
				} 
		);
		featureList = new List('countyCompetitionList', searchOptions, items);
		featureList.sort( 'marketShare', {asc:false} );
		$('.search-fuzzy').keyup(function(){ featureList.fuzzySearch($(this).val()); });
		featureList.filter( function (i) { return ( i.values().marketShare > 0 ) } )
		return true
	}
	
	function clearFrame(idx, countyId) {
		
	    var r = $( '#c' + countyId );
	    $( '#b' + countyId ).remove();
	    $( '#countyFrame' + idx ).remove();
	    r.remove();
	    $('.countyNameDisplay'+idx).remove();
	}
	
	function isMappable( countyId ){
		return ( document.getElementById('i'+countyId) !==  null)		
	}
	
	var doneOnce = false;
	
	function getSelectedCountyInfo( idx, countyName, stateAbbr, countyId ){
		$.ajax({
			type: 'GET',
			url: 'data/GetSelectedCountyInfo.cfm',
			datatype: 'json',
			data: { 'CL_id':countyId },
			async: true,
			success: function(json){
				eval('var ttt =' +json);
				createCountyPanel( idx, countyName, stateAbbr, countyId, eval(ttt.TotalEnrollment), ttt.TotalUninsured );
				return false;
			}
		});
	}
	
	function createCountyPanel( idx, countyName, stateAbbr, countyId, monthly, uninsured ){
		var context = { 'selIdx'			:idx, 
						'CountyID'			:countyId, 
						'CountyName'		:countyName, 
						'StateName'			:stateAbbr,
						'Uninsured' 		:uninsured,
						'Enrollment'		:monthly[5]
						}
		var html    = template(context);
		$('#RightNavCounties').append( html );
		
		$('#clearButton'+idx+',#moreInfoButton'+idx).button();
		
		$( '.monthEnrollSpark'+idx ).sparkline(monthly, { width:120, height:20 });	
		if (!doneOnce) {
			doneOnce = true; 
			$( "#RightNavCounties" ).accordion({collapsible: true}); 
		}
		$( "#RightNavCounties" ).accordion("refresh"); 
		
		$( '#countyFrame' + idx ).removeClass( 'emptyFrame' );
	}
	
	function selectCounty( idx, countyName, stateAbbr, countyId ){
	
		// set up a copy of the template code
		var useIt = isMappable(countyId);
		
		getSelectedCountyInfo( idx, countyName, stateAbbr, countyId );
		
		if (useIt){
			createClone( countyName, stateAbbr, countyId );
		}
	}
	
	function createClone( countyName, stateAbbr, countyId ){
		var clonedPath = $('#i'+countyId).clone();
		var copyId = 'c'+countyId;
		clonedPath.attr( {fill: 'yellow' , stroke:'#000000', 'stroke-width':0.2 } );
		clonedPath[0].id = copyId;
		$('svg')[0].appendChild( clonedPath[0] );
		
		$('#'+copyId).mouseover(function (e) { // Mouse Over hover Function for cloned path
            var raph = $(e.target);
            	
            raph.attr({'stroke-width': '1.5', stroke: '#FF0000', 'cursor':'hand' } );

            $('#countyNameDiv').text( countyName + ', ' + stateAbbr + ' *ID: ' + countyId);

        });
		$('#'+copyId).mouseout(function (e){ //Mouse Out function for clone
            var raph = $(e.target);
            
            raph.attr({stroke:'#000000', 'stroke-width':0.2});
            
		});
	}
	
	function setState(id, state){
		if( state !== 'hover' && $('#i'+id).length > 0){
			$('#i'+id)[0].class = state;
			
		}
	}
	
	var viewState = new Array();
	
	function setColor(id, state, ElementsArray){
		var i = 0;
		
		switch(state)
		{
			case 'setDefaults'		: $('path[id^="i"]').attr({ fill: '#7B7B7B', 	'stroke-width': '.2', stroke: '#000000' });
				$('path').each(function (i,o){o.class = ''}); 										 
				break;
			case 'parentSelected'	: $('#i'+id).attr({ fill: 'darkgreen'	,'stroke-width': '.2', 	stroke: '#000000'	});  break;
			case 'orgSelected'		: $('#i'+id).attr({ fill: '#80ee80'		,'stroke-width': '.2', 	stroke: '#000000'	});  break;
			case 'hover'			: $('#i'+id).attr({ 					 'stroke-width': '1.5', stroke: '#FF0000'	});  break;
			default					: $('#i'+id).attr({ fill: '#7B7B7B'		,'stroke-width': '.2', 	stroke: '#000000'	});  break;
		}
		
		setState(id,state);
		
		while ( ElementsArray && ElementsArray.length > 0 ) { 
			if (viewState[id] || '' !== '' && state == '') {
				ElementsArray[i++].class = viewState[id]
				debugger
			} 
			else {
				ElementsArray[i++].class = state
			}
		}
		viewState[id] = state;
	}
	
	
	$('#countySearch').keyup( countySearchAC );
	
	var matchedCounties = new Array();
	
	
	function countySearchAC( el ){
		if ( el.target.value.length >= 3)  {
			matchedCounties = [];
			$('#SearchResults').html('');
			
			var arr = $.grep( AllCountiesArr, function (county, idx) {
				if ( county && county.slice ) {
					var t =  county[0].slice( 0, el.target.value.length) 
					if ( t && t.toLowerCase() ==  el.target.value.toLowerCase() ) {
						matchedCounties.push(idx);
						return t;
					}
				}
			} );
			
			if ( arr.length > 0 ) {
				for ( c in arr){
					$('#SearchResults').append ( 
						"<span id='b"+matchedCounties[c]+"' onclick='highlightSearch(this,"+matchedCounties[c]+")' class='tiny button'>"+AllCountiesArr[matchedCounties[c]][0]+", "+AllCountiesArr[matchedCounties[c]][1]+"</span>" 
					);
				}
			}
		}
		else {
			$('#SearchResults').text('');
		}
		return false;
	}
	
	function highlightSearch(xthis,idx){
		var raph = $('#i'+idx);
		if ($('#c'+idx).length == 0 ){
			var CountyName = AllCountiesArr[idx][0]; 
			var StateName = AllCountiesArr[idx][1];
			selectCounty( ++xSelIdx, CountyName, StateName, idx );
			$(xthis).hide()
		}
		return false;
	}
	
	// ****************************************************************************************************************** 
	// Accordian Testing
	// ****************************************************************************************************************** 
	

		$.event.special.hoverintent = {
		    setup: function() {
		      $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
		    },
		    teardown: function() {
		      $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
		    },
		    handler: function( event ) {
		      var currentX, currentY, timeout,
		        args = arguments,
		        target = $( event.target ),
		        previousX = event.pageX,
		        previousY = event.pageY;
		 
		      function track( event ) {
		        currentX = event.pageX;
		        currentY = event.pageY;
		      };
		 
		      function clear() {
		        target
		          .unbind( "mousemove", track )
		          .unbind( "mouseout", clear );
		        clearTimeout( timeout );
		      }
		 
		      function handler() {
		        var prop,
		          orig = event;
		 
		        if ( ( Math.abs( previousX - currentX ) +
		            Math.abs( previousY - currentY ) ) < 7 ) {
		          clear();
		 
		          event = $.Event( "hoverintent" );
		          for ( prop in orig ) {
		            if ( !( prop in event ) ) {
		              event[ prop ] = orig[ prop ];
		            }
		          }
		          // Prevent accessing the original event since the new event
		          // is fired asynchronously and the old event is no longer
		          // usable (#6028)
		          delete event.originalEvent;
		 
		          target.trigger( event );
		        } else {
		          previousX = currentX;
		          previousY = currentY;
		          timeout = setTimeout( handler, 0 );
		        }
		      }
		 
		      timeout = setTimeout( handler, 0 );
		      target.bind({
		        mousemove: track,
		        mouseout: clear
		      });
		    }
		  };
	
		
	function resizeMapWindow() {
		var NowWeAreReady = $("#svgMap").length > 0;
		if (NowWeAreReady == true)
		{
	    	var svg = document.getElementsByTagName('svg')[0]
		    var winW = $("#MapContainer").width();
		    var scaledW =  winW / 1003;
		    svg.style.zoom = scaledW;
		    $("#LoadingCounties").fadeToggle({'duration':'1000'});
		    $("#mapOfCounties").fadeToggle({'duration':'1000'});
		} else {
			setTimeout('resizeMapWindow()',100)
		}
    }
    
	
	// ****************************************************************************************************************** 
	// ****************************************************************************************************************** 
	// This function controls the major behaviors regarding selection of map elements.
	// ****************************************************************************************************************** 
	// ****************************************************************************************************************** 
		
	var heldToPan = false;
	
	function constructMap(data) {
	    
		eval(data);
	    data = xyz;
	    
		var mapWidth = 1000;
		var mapHeight = 675;
	    
	    var map = new Raphael( document.getElementById( 'mapOfCounties' ), mapWidth, mapHeight );
	    document.getElementsByTagName('svg')[0].id = 'svgMap';
	    
	    scaledW = 1+ ( 1 -( 1000 / 1429))
	    
	    $(window).resize( resizeMapWindow )
	    
	    for ( i in data ) {
	        
	    	var thisPath = map.path( data[i][3] );
	    	thisPath.node.id = 'i'+i; //<!--- Path ID --->
	    	
	    	setColor( i, '', null);
		        
	    	
	        thisPath.mouseover(function (e) { // Mouse Over Function
	            var 	raph 		= $(e.target)[0]
	            	,	countyId	= raph.id.slice(1)
	            	, 	countyName	= data[countyId][1]
	            	, 	stateName	= data[countyId][2];
	
	            setColor( countyId, 'hover', null );
	            raph.style.cursor='hand';
	
	            $('#countyNameDiv').text( countyName + ', ' + stateName + ' *ID: ' + countyId);
	
	        });
	        
	        // Mouse Out Function
	        thisPath.mouseout( function (e) {
	        	var 	raph 		= $(e.target)[0]
            	,	countyId	= raph.id.slice(1)
            	, 	countyName	= data[countyId][1]
            	, 	stateName	= data[countyId][2];
	
	            if (raph.class == 'parentSelected') 	{ setColor(countyId, 'parentSelected', 	raph) 	}
	            else if (raph.class == 'orgSelected') 	{ setColor(countyId, 'orgSelected', 	raph)	}
	            else									{ setColor(countyId, '', 				null) 	}
	        });
	        
	        // Mouse Click
	        thisPath.mousedown( function (e) {
	        	heldToPan = false;
	        	setTimeout(function(){heldToPan = true},200);
	        });
	        
	        thisPath.mouseup( function (e) {
	        	
	        	var 	raph 		= $(e.target)[0]
	            	,	countyId	= raph.id.slice(1)
	            	, 	countyName	= data[countyId][1]
	            	, 	stateName	= data[countyId][2];
	        	if (heldToPan == false){
	        		selectCounty( ++xSelIdx, countyName, stateName, countyId );
	        	}	
	        });
	    }
	    map.path( stateLines ).attr({'stroke':'#ccc','stroke-width':1.5}); 
	    enablePanZoom();
	    
	}
	
	var zoomLevel = 1;

	function zoom(op, x, y){
		var el = document.getElementsByTagName('svg')[0];
		switch(op){
		case 'in': 
			zoomLevel +=.0625;
			break;
		case 'out': 
			zoomLevel -=.0625;
			break;
		case 'reset':
			zoomLevel = 1;
			break;
		}
		zoomLevel = zoomLevel<.0625 ? .0625 : zoomLevel;
		
		el.style.zoom= zoomLevel;
		
		
	}
	
	function IsNumeric(val) {
		return !isNaN(parseFloat(val)) && isFinite(val)
	}
	
	var mouseIsDown = false;
	
	$('#mapL').mousedown( function(){mouseIsDown = true; MoveMapViewport( 'left',	'width',	-1 ) })
	$('#mapU').mousedown( function(){mouseIsDown = true; MoveMapViewport( 'top',	'height',	-1 ) })
	$('#mapD').mousedown( function(){mouseIsDown = true; MoveMapViewport( 'top',	'height',	+1 ) })
	$('#mapR').mousedown( function(){mouseIsDown = true; MoveMapViewport( 'left',	'width',	+1 ) })
	
	$('#mapL,#mapU,#mapD,#mapR').mouseup(function(){ mouseIsDown = false; });
	
	function MoveMapViewport( property, parentProp, direction ) {
		var oldVal = parseInt($('#mapOfCounties').css( property ));
		if (!IsNumeric(oldVal)) { oldVal=00; };
		$('#mapOfCounties').css ( property, oldVal + ( direction * 50) );
		if(mouseIsDown){
			 setTimeout("MoveMapViewport('" + property + "','" + parentProp + "'," + direction + ")", 100);
		 }
	} 
	
	var panzoomlevel = 1;
	
	function enablePanZoom(){
		
		$('#mapOfCounties').panzoom({
			easing: 'ease-in-out',
			cursor: 'move'
		});
		
		$('#mapOfCounties').mousewheel(function(objEvent, intDelta){
			x = objEvent.pageX;
			y = objEvent.pageY;
		    if (intDelta > 0){
		    	panzoomlevel += .0625;
		    	$('#mapOfCounties').panzoom('zoom', panzoomlevel);
			   //zoom('in', x, y);
			}
		    else if (intDelta < 0){
		    	panzoomlevel -= .0625;
		    	$('#mapOfCounties').panzoom('zoom', panzoomlevel);
		    	//zoom('out', x, y);
			}
		});
		
		
	};
	
	$(document).ready(function() { 
		resizeMapWindow()
	});
	
	
	


	
	
