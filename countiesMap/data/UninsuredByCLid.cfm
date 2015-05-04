<cftry>
	<!--- 	TURN THIS OFF WHEN NOT TESTING--->
	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>
	<CFSilent>
		<CFParam type="String" name="URL.CL_ID" default="[Not Provided]">
		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetUninsuredByCLid"
			    result		= "db">
				<CFProcResult name="TotalUninsured">
				<CFProcparam cfsqltype="int" variable="CL_id" value="#URL.CL_ID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="TotUnin">
			<cfoutput>{"UserInput":"#URL.CL_ID#","TotalUninsured":"<cfloop query="TotalUninsured">#Uninsured#</cfloop>"}</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<cfoutput>#TotUnin#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#TotalUninsured#">
	</cfif>

	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>