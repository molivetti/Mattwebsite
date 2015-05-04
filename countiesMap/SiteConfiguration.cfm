<Cfprocessingdirective suppressWhitespace="true" >

	<CFSet variables.ZoomPan = "MouseDriven" /> <!--- -[ ButtonDriven, MouseDriven ] --->

	<CFSet variables.SiteConfig="SiteConfig2" />

	<CFInclude template="/countiesMap/scripts/JavascriptLibraries.cfm" />

	<CFInclude template="/countiesMap/templates/selectedCountiesPanel.cfm" />

	<CFInclude template="/countiesMap/templates/LargeDetailPanel.cfm" />

	<CFInclude template="/countiesMap/css/CSSDefinitions.cfm" />

		<CFObject component="data.BuildJSLookups" name="Lookups" />
		<CFSet x = Lookups.InitializeNameLookups() >

		<cfoutput>#x.script#</cfoutput>

</Cfprocessingdirective>