<cftry>
	<!---	<cfset URL.CountyID = 2>	--->
	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>
	<CFSilent>
		<CFParam type="String" name="URL.CountyID" default="-1">
		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetParentOrgsByCountyID"
			    result		= "db">
				<CFProcResult name="AllCompetitors" resultSet="1">
				<CFProcparam cfsqltype="int" variable="CountyID" value="#URL.CountyID#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="RetVar">
			<cfoutput>
			{	"UserInput":"#URL.CountyID#","ParentOrgs":
				[<cfloop query="AllCompetitors">
					{"ParentOrgID":"#ParentOrgID#", "EnrollCount":#EnrollCount#}<cfif AllCompetitors.currentRow lt AllCompetitors.recordcount>,</cfif>
				</cfloop>
				]
			}
			</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<cfoutput>#retvar#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#AllCompetitors#">
	</cfif>
	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>
