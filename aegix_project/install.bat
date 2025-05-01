@echo off
echo 🚀 Starting AEGIX installation...

:: Step 1: Install Python requirements
echo 📦 Installing Python dependencies...
pip install -r requirements.txt

:: Step 2: Create .env if it doesn't exist
IF NOT EXIST .env (
    echo 🔐 Creating default .env file...
    echo DEBUG=True>>.env
    echo API_KEY=your_api_key>>.env
    echo TELEGRAM_BOT_TOKEN=your_bot_token>>.env
    echo DB_USER=postgres>>.env
    echo DB_PASSWORD=your_password>>.env
) ELSE (
    echo ⚠️ .env already exists – skipping creation
)

:: Step 3: Start backend
echo ▶️ Starting backend (Python main.py)...
start cmd /k "python main.py"

:: Step 4: Frontend setup
cd frontend
echo 💻 Installing Node modules...
npm install

echo ▶️ Starting frontend (npm run dev)...
start cmd /k "npm run dev"

echo ✅ AEGIX is now running – open http://localhost:3000 in your browser.
pause
