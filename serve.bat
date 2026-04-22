@echo off
setlocal
cd /d "%~dp0"

start "" "http://localhost:8000/index.html"

where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 8000
  exit /b %errorlevel%
)

where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 8000
  exit /b %errorlevel%
)

echo Python was not found. Install Python or run a local web server manually.
pause
