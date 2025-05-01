#!/bin/bash

echo "🚀 Starting AEGIX installation..."

# Step 1: Backend setup
echo "📦 Installing Python requirements..."
pip install -r requirements.txt

# Step 2: Create default .env file if missing
if [ ! -f .env ]; then
  echo "🔐 Creating default .env file..."
  cat <<EOT >> .env
DEBUG=True
API_KEY=your_api_key
TELEGRAM_BOT_TOKEN=your_bot_token
DB_USER=postgres
DB_PASSWORD=your_password
EOT
else
  echo "⚠️ .env already exists – skipping creation"
fi

# Step 3: Run backend
echo "▶️ Running backend server..."
python main.py &

# Step 4: Frontend setup
echo "💻 Setting up frontend..."
cd frontend
npm install
npm run dev

echo "✅ AEGIX is now running at http://localhost:3000"
