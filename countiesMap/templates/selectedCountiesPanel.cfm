<script id="entry-template" type="text/x-handlebars-template" >

	<h3 class="countyNameDisplay{{selIdx}}">
		<div style="float:right;clear:right;height:1em;">
			<span style="padding:2px 4px;" apple="{{selIdx}}" onclick="slideCountyFromLeft(this,true)" class="tiny button">More Info</span>
			<span style="padding:2px 4px;" apple="{{selIdx}}" onclick="clearFrame({{selIdx}},{{CountyID}})" class="alert tiny button">X</span>
		</div>
		<span style="">{{CountyName}}, {{StateName}}</span>
	</h3>

	<div class="RightNavItem emptyFrame" id="countyFrame{{selIdx}}" style="clear:both;">
		<div style="float:right;">
			<input type="hidden" id="HiddenCountyName{{selIdx}}" value="{{CountyName}}" />
			<input type="hidden" id="HiddenCountyID{{selIdx}}" value="{{CountyID}}" />
			<input type="hidden" id="HiddenStateName{{selIdx}}" value="{{StateName}}" />
		</div>
		<div style="float:left;" id="infoBox{{selIdx}}">
		Total Uninsured: {{Uninsured}} </br>
		Members (6 months): <span class="monthEnrollSpark{{selIdx}}"></span>
		</div>
	</div>

</script>

<!--- <div class="countyTotalEnrollment{{selIdx}}"> Total Enrollment: <span> </span> </div>
	<div> Past Six Months: <span class="testsparkline{{selIdx}}"> Loading... </span> </div>
	<div class="countyDelta{{selIdx}}"> Delta: <span> </span> </div> --->