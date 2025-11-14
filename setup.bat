@echo off
echo Starting Trello Realtime Application Setup
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js v18 or higher.
    exit /b 1
)

echo Node.js found
node --version
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Backend installation failed
    exit /b 1
)
echo Backend dependencies installed
echo.

echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Frontend installation failed
    exit /b 1
)
echo Frontend dependencies installed
echo.

cd ..

if not exist "backend\.env" (
    echo Creating backend .env file from template...
    copy backend\.env.example backend\.env
    echo Please update backend\.env with your Trello credentials
)

if not exist "frontend\.env" (
    echo Creating frontend .env file from template...
    copy frontend\.env.example frontend\.env
)

echo.
echo Setup completed successfully!
echo.
echo Next steps:
echo 1. Update backend\.env with your Trello API credentials
echo 2. Start ngrok: ngrok http 5000
echo 3. Update WEBHOOK_CALLBACK_URL in backend\.env with ngrok URL
echo 4. Start backend: cd backend ^&^& npm run dev
echo 5. Start frontend: cd frontend ^&^& npm run dev
echo.
echo For detailed instructions, see README.md
