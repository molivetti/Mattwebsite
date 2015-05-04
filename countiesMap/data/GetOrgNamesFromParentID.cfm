<cftry>

	<!--- 	TURN THIS OFF WHEN NOT TESTING--->
	<!---
		<cfset URL.POL_ID = 61>  CDPHP
	--->

	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>

	<CFSilent>

		<CFParam type="String" name="URL.POL_ID" default="-1">

		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetOrgsByParent"
			    result		= "db">
				<CFProcResult name="OrgsByParentID">
				<CFProcparam cfsqltype="int" variable="ParentOrgName" value="#URL.POL_ID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="RetID">
			<cfoutput>
			{
				"UserInput":"#URL.POL_ID#",
				"OrgNames":
				[	<cfloop query="OrgsByParentID">
						{"OL_id":"#pk#"}<cfif OrgsByParentID.currentRow lt OrgsByParentID.recordcount>,</cfif>
					</cfloop>
				]
			}
			</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<cfoutput>#RetID#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#url#">
		<CFDump var="#OrgsByParentID#">
	</cfif>

	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>