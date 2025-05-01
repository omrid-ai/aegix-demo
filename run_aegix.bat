@echo off
start "AEGIX Backend" cmd /k "cd /d C:\Users\User\my_project && venv\Scripts\activate && python main.py api"
timeout /t 2 >nul
start "AEGIX Frontend" cmd /k "cd /d C:\Users\User\my_project\frontend && npm run dev"
