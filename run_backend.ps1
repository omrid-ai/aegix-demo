# run_backend.ps1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\User\my_project'; venv\Scripts\activate; python main.py api"
