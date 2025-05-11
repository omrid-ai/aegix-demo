@echo off
echo Starting AEGIX Backend and Frontend...

REM Open backend in new terminal
start cmd /k "cd /d C:\Users\User\my_project\aegix_project && python api_server.py"

REM Open frontend in new terminal
start cmd /k "cd /d C:\Users\User\my_project\frontend && npm run dev"

echo AEGIX system is launching...