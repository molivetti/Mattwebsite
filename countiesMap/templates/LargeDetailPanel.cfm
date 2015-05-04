<script id="LargeInfoPanel-template" type="text/x-handlebars-template" >  <!--- -- ID: {{LargeCountyID}} --->
<div class="round radius callout panel left unselectable" id="largeCountyFrame" >
	<span id="closeLargeCountyPanel" class="button small alert" onclick="slideCountyFromLeft(this,false)">x</span>
	<div class="left round radius unselectable" style="border:3px outset; padding:0 8px 8px 7px; background:#1F7791">
		<div style="color:darkblue;overflow:hidden;" class="unselectable">
			<h5 id="LargeCountyName" style="white-space:no-wrap; margin:9px 0 -25px 0;">
				<table class="" style="width:100%;background:#A5A5A5;">
					<tr><th colspan="2"><h6 style="color:white">Parent Organizations Summary View</h6></th></tr>
					<tr><td style="width:10em;text-align:right;">County:</td>
						<td>{{LargeCountyName}}</td>
					</tr>
					<tr><td style="color:white;width:10em;text-align:right;">State:</td>
						<td style="color:white;">{{LargeStateName}}</div></td>
					</tr>
				</table>
			</h5>
			<div id="countyCompetitionList" class="panel tiny unselectable" style="float:left;margin-bottom:0;">
			  	<div class="panel unselectable">
					<div class="unselectable" style="float:right;padding-left:20px;">
						<input  class="search-fuzzy fltright" style="width:100px;font-size:0.625em;" size="14" placeholder="Filter parent companies..." />
					</div>
					<em style="float:left;color:gray;" class="unselectable">Market Share Comparison</em>
					<ul class="sort-by unselectable" id="selectable" style="">
						<li><button class="sort round tiny button unselectable" onclick="setListOptions(listOptions.parentSort);">Parent Organization</button></li>
						<li><button class="sort round tiny button unselectable" onclick="setListOptions(listOptions.marketSort);">Market Share</button></li>
						<li><button class="sort round tiny button unselectable" onclick="setListOptions(listOptions.filterButton);">More than 10% mkt shr</button></li>
					</ul>
			  		<ul class="list" />
			  	</div>
		</div>
		</div>
	</div>
</div>
</script>

