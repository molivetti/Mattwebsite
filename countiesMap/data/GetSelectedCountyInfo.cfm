<cftry>
	<!--- 	TURN THIS OFF WHEN NOT TESTING--->
	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>
	<CFSilent>
		<CFParam type="String" name="URL.CL_ID" default="[Not Provided]">
		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetTotalEnrollmentByCLid"
			    result		= "db">
				<CFProcResult name="TotalEnrollment">
				<CFProcparam cfsqltype="int" variable="CL_id" value="#URL.CL_ID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetUninsuredByCLid"
			    result		= "db">
				<CFProcResult name="TotalUninsured">
				<CFProcparam cfsqltype="int" variable="CL_id" value="#URL.CL_ID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="Info">
			<cfoutput>{"UserInput":"#URL.CL_ID#","TotalUninsured":"<cfloop query="TotalUninsured">#Uninsured#</cfloop>","TotalEnrollment":"[<cfloop query="TotalEnrollment">#TotalEnrollment#<cfif TotalEnrollment.currentRow lt TotalEnrollment.recordcount>,</cfif></cfloop>]"}</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<!--- Outputs {"UserInput":"5648","TotalUninsured":"24812","TotalEnrollment":"[28123,29381,29460,29641,29683,29786]"}  --->

	<cfoutput>#Info#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#TotalEnrollment#">
	</cfif>

	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>