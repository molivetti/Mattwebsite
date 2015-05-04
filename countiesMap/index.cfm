<cfsetting showdebugoutput="false">
<!DOCTYPE html>
<html>
	<head>
		<CFInclude template="./SiteConfiguration.cfm" />
	</head>
	<body style="bottom:0;top:0;position:absolute;left:0;right:0;" class="unselectable">
		<div id="countyNameContainer">

			<ul style="float:right;top:0;right:32%;position:absolute;">
					<cfif variables.ZoomPan eq "ButtonDriven">
						<li id="mapL" class="tiny radius round button unselectable"> &larr; </li>
						<li id="mapU" class="tiny radius round button unselectable">&uarr;</li>
						<li id="mapD" class="tiny radius round button unselectable">&darr;</li>
						<li id="mapR" class="tiny radius round button unselectable"> &rarr; </li>
					<CFElse>
						<li class="tiny radius button" onclick="$('#legendContainer').toggle();">Legend</li>
						<li class="tiny radius button" onclick="$('#mapOfCounties').panzoom('reset');">Reset</li>
					</cfif>
				</ul>

			<div id="countyNameDiv" ></div>
		</div>
		<div class="panel unselectable" id="RightNav">
			<div id="legendContainer" style="color:black;float:right;display:none;position:absolute;right:0;margin:0;background-color:#fff;padding:9px 0 0 9px;z-index:10;border:2px solid black;">
				<span id="closeLegendContainer" class="button tiny alert right" style="margin-right:4px;" onclick="$('#legendContainer').toggle()"> X </span>
				<ul style="list-style-type:none;width:300px;">
					<li><span style="height:1em;width:1em;background-color:yellow;border:2px solid black;">&nbsp;&nbsp;&nbsp;</span> User Selected County</li>
					<li><span style="height:1em;width:1em;background-color:lightgreen;border:2px solid #777;">&nbsp;&nbsp;&nbsp;</span>  Chosen Organization Counties</li>
					<li><span style="height:1em;width:1em;background-color:darkgreen;border:2px solid #777;">&nbsp;&nbsp;&nbsp;</span> Chosen Parent Organiztion Counties</li>
				</ul>
			</div>

			<ul style="float:left">
				<cfif variables.ZoomPan eq "ButtonDriven">
					<li class="tiny radius button" onclick="zoom('in', 0, 0)">Zoom In</li>
					<li class="tiny radius button" onclick="zoom('out', 0, 0)">Zoom Out</li>
					<li class="tiny radius button" onclick="zoom('reset', 0, 0)">Reset</li>
				</cfif>

			</ul>
			<div id="parentSelect" class="unselectable">
				<select id="selectParent" name="parentCompanies">
					<option value="-1" id="defaultSelect" selected> Choose a Parent Company </option>
					<cfoutput query="x.ParentOrgs" ><option value="#pk#">#ParentOrganization#</option></cfoutput>
				</select>
				<button onclick="$('#selectParent').val(-1).change()" class="tiny alert button">X</button>
			</div>
			<div id="orgSelect" style="display:none;">
				<select id="selectOrg" name="orgCompanies"></select>
				<button onclick="$('#selectOrg').val(-1).change()" class="tiny alert button">X</button>
			</div>
			<div id="countySearchDiv">
				<label for="countySearch">Search for a county: <input id="countySearch" /></label>
			</div>
			<div id="SearchResults" class="radius"></div>
			<div id="RightNavCounties" style="max-height:600px;overflow:scroll;"></div>
		</div>
		<div id="MapContainer" class="">
			<div id="LoadingCounties">Loading, please wait&hellip;</div>
			<div id="mapOfCounties" style="display:none;"></div>
		</div>
		<div class="footer">
			<img src="images/HealthPlanCRM.png" alt="HealthPlanCRM, llc" />
		</div>
	</body>
</html>
