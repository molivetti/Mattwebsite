<cftry>
	<!---	<cfset URL.CompanyName = "Blue Cross Blue Shield of Michigan">	--->
	<cfsetting showdebugoutput="false">
	<CFSet variables.isDebug = 0>
	<CFSilent>
		<CFParam type="String" name="URL.CompanyName" default="[Not Provided]">
		<CFTry>
			<CFStoredproc datasource="#request.datasource#" debug="no" returnCode="no"
				procedure	= "CMS.GetCountyNames"
			    result		= "db">
				<CFProcResult name="AllCountyNames" resultSet="1">
				<CFProcparam cfsqltype="Varchar(max)" variable="ParentOrgName" value="#URL.CompanyName#">
			</CFStoredproc>
			<CFCatch type="any"><cfdump var="#cfcatch#"></CFCatch>
		</CFTry>
		<CFSaveContent variable="RetVar">
			<cfoutput>
			{	"UserInput":"#URL.CompanyName#","Counties":
				[<cfloop query="AllCountyNames">
					{"CountyName":"#county#","StateAbbr":"#State#"}<cfif AllCountyNames.currentRow lt AllCountyNames.recordcount>,</cfif>
				</cfloop>
				]
			}
			</cfoutput>
		</CFSaveContent>
	</CFSilent>

	<cfoutput>#retvar#</cfoutput>

	<cfif variables.isdebug eq 1>
		<CFDump var="#AllCountyNames#">
	</cfif>
	<CFCatch type="any">
		<cfif variables.isDebug eq 1>
			<CFDump var="#cfcatch#">
		</cfif>
	</CFCatch>

</cftry>
