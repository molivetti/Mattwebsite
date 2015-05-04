@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\topojson\bin\geojson" %*
) ELSE (
  node  "%~dp0\node_modules\topojson\bin\geojson" %*
)