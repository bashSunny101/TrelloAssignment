#!/bin/bash

echo "🚀 Starting Trello Realtime Application Setup"
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

cd ..

if [ ! -f "backend/.env" ]; then
    echo "⚠️  Creating backend .env file from template..."
    cp backend/.env.example backend/.env
    echo "📝 Please update backend/.env with your Trello credentials"
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Creating frontend .env file from template..."
    cp frontend/.env.example frontend/.env
fi

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your Trello API credentials"
echo "2. Start ngrok: ngrok http 5000"
echo "3. Update WEBHOOK_CALLBACK_URL in backend/.env with ngrok URL"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"
echo ""
echo "📚 For detailed instructions, see README.md"
