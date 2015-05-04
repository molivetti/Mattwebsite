@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\topojson\bin\topojson" %*
) ELSE (
  node  "%~dp0\node_modules\topojson\bin\topojson" %*
)