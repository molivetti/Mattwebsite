<!---cfparam name="protocol" default="http" --->
<!---cfparam name="port" default="9997" --->

	<CFParam name="application.debugData" default="true">

	<CFApplication name="CMSDataUtility"  >

	<Cfif isDefined("url.debugdata")>
		<CFLock scope="Application" timeout="10" throwontimeout="false">
			<cfif url.debugdata eq 1>
				<cfoutput>TURN ON</cfoutput>
				<CFSet application.debugData = true>
				<cfsetting showDebugOutput="true">
			<CFElseif url.debugdata eq 0>
				<cfoutput>TURN OFF</cfoutput>
				<CFSet application.debugData = false>
				<cfsetting showDebugOutput="false">
			</cfif>
		</cflock>
	<CFElse>
		<cfif application.debugData eq true>
			<cfsetting showDebugOutput="true">
		<CFElse>
			<cfsetting showDebugOutput="false">
		</cfif>
	</Cfif>
<CFSet request.p = 1>
	<cfset request.datasource = 'countiesMapDatasource'>
	<cfset request.username = ''>
	<cfset request.password = ''>







