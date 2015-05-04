<cftry>

	<!--- 	TURN THIS OFF WHEN NOT TESTING--->
	<!---
		<cfset URL.POL_ID = "Blue Cross Blue Shield of Michigan">
	--->

	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>

	<CFSilent>

		<CFParam type="String" name="URL.OL_ID" default="[Not Provided]">

		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetCountyIDsByOL"
			    result		= "db">
				<CFProcResult name="AllCountyIDs">
				<CFProcparam cfsqltype="int" variable="OL_id" value="#URL.OL_ID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="RetID">
			<cfoutput>
			{
				"UserInput":"#URL.OL_ID#","Counties":
				[	<cfloop query="AllCountyIDs">
						{"CountyID":"#CL_id#"}<cfif AllCountyIDs.currentRow lt AllCountyIDs.recordcount>,</cfif>
					</cfloop>
				]
			}
			</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<cfoutput>#RetID#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#AllCountyIDs#">
	</cfif>

	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>