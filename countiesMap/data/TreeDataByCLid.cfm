<cftry>
	<!--- 	TURN THIS OFF WHEN NOT TESTING--->
	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>
	<CFSilent>
		<CFParam type="String" name="URL.CL_ID" default="[Not Provided]">
		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetTreeDataByCLid"
			    result		= "db">
				<CFProcResult name="GetTreeData">
				<CFProcparam cfsqltype="int" variable="CL_id" value="#URL.CL_ID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="TreeData">
			<cfoutput>
				{<cfloop query="GetTreeData">"UserInput":"#URL.CL_ID#","TotalEnrollment":"#TotalEnrollment#"</cfloop>}</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<cfoutput>#TreeData#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#GetTreeData#">
	</cfif>

	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>