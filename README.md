# Trello Real-time WebSocket + API Frontend Assignment

A production-ready full-stack application that integrates with Trello's API and provides real-time synchronization across multiple clients using WebSocket technology. Built with Node.js, Express, Socket.IO, React, and Vite.

## 🎯 Assignment Overview

This project demonstrates:
- **4 Core REST APIs**: Get Boards, Get Cards, Create Card, Update Card
- **Real-time Bidirectional Sync**: WebSocket-based instant updates across all connected clients
- **Trello Webhook Integration**: Automatic notifications when Trello data changes
- **Modern React Frontend**: Responsive UI with real-time updates and toast notifications
- **Production-Level Architecture**: Clean code, error handling, security, and scalability

## ✨ Features

- **Real-time Synchronization**: WebSocket-based live updates across multiple browser windows without page refresh
- **Trello API Integration**: Full integration with Trello REST API v1
- **Webhook Support**: Automatic webhook registration and callback handling for Trello board events
- **Modern UI**: Clean, responsive interface built with React 18 and Vite
- **Production Ready**: Comprehensive error handling, rate limiting, CORS, and security headers
- **Docker Support**: Complete containerization with Docker Compose for easy deployment

## Tech Stack

### Backend
- Node.js + Express
- Socket.IO for WebSocket communication
- Axios for HTTP requests
- Helmet for security
- Rate limiting middleware

### Frontend
- React 18
- Vite for build tooling
- Socket.IO client
- React Toastify for notifications
- Lucide React for icons

## Project Structure

```
TrelloAssignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.js
│   │   ├── controllers/
│   │   │   ├── trelloController.js
│   │   │   └── webhookController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── trelloRoutes.js
│   │   │   └── webhookRoutes.js
│   │   ├── services/
│   │   │   ├── socketService.js
│   │   │   └── trelloService.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BoardCard.jsx
│   │   │   ├── CardList.jsx
│   │   │   ├── CreateCardModal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── WebhookManager.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── postman/
│   └── Trello-Realtime-API.postman_collection.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Trello account with API credentials
- ngrok (for webhook testing in local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bashSunny101/TrelloAssignment.git
   cd TrelloAssignment
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your Trello API credentials
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API Health: http://localhost:5000/api/health

## 📋 API Documentation

### Core APIs (Assignment Requirements)

#### 1. Get All Boards
```http
GET /api/trello/boards
```
Fetches all boards accessible by the authenticated Trello user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "board_id",
      "name": "Board Name",
      "desc": "Board description"
    }
  ]
}
```

#### 2. Get Cards from Board
```http
GET /api/trello/boards/:boardId/cards
```
Fetches all cards from a specific board.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "card_id",
      "name": "Card Name",
      "desc": "Card description",
      "idList": "list_id"
    }
  ]
}
```

#### 3. Create Card
```http
POST /api/trello/cards
Content-Type: application/json

{
  "listId": "list_id",
  "name": "Card Name",
  "description": "Card description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_card_id",
    "name": "Card Name",
    "desc": "Card description"
  }
}
```

#### 4. Update Card
```http
PUT /api/trello/cards/:cardId
Content-Type: application/json

{
  "name": "Updated Name",
  "desc": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "card_id",
    "name": "Updated Name"
  }
}
```

### Additional APIs

#### Get Board Lists
```http
GET /api/trello/boards/:boardId/lists
```

#### Register Webhook
```http
POST /api/webhooks/register
Content-Type: application/json

{
  "boardId": "board_id",
  "description": "Webhook description"
}
```

#### Get All Webhooks
```http
GET /api/webhooks
```

#### Delete Webhook
```http
DELETE /api/webhooks/:webhookId
```

## 🔌 WebSocket Events

### Client Events
- `join-board`: Join a board room to receive real-time updates
- `leave-board`: Leave a board room

### Server Events
- `card:created`: Emitted when a new card is created
- `card:updated`: Emitted when a card is updated
- `card:deleted`: Emitted when a card is deleted
- `card:moved`: Emitted when a card is moved to another list

## 📦 Postman Collection

A complete Postman collection is included for testing all API endpoints.

**Location:** `postman/Trello-Realtime-API.postman_collection.json`

### Using the Collection

1. Open Postman
2. Click **Import** → **Upload Files**
3. Select `postman/Trello-Realtime-API.postman_collection.json`
4. The collection includes all endpoints pre-configured
5. Update base URL to `http://localhost:5000` if needed

### Included Requests

- ✅ Health Check
- ✅ Get All Boards
- ✅ Get Board Lists
- ✅ Get Cards from Board
- ✅ Create Card
- ✅ Update Card
- ✅ Register Webhook
- ✅ Get All Webhooks
- ✅ Delete Webhook

## 🎥 Demo Video

A comprehensive demo video showcasing:
- All 4 required REST APIs working in Postman
- Real-time WebSocket synchronization across multiple browser windows
- Trello webhook integration with live updates
- Code architecture walkthrough

**Duration:** 3-5 minutes  
**Recording Date:** November 15, 2025

## 🧪 Testing

### Manual Testing

Start both servers and test the APIs:

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev

# Terminal 3 - API Tests
curl http://localhost:5000/api/health
curl http://localhost:5000/api/trello/boards
```

### Real-time Sync Testing

1. Open http://localhost:3000 in two browser windows
2. Select the same board in both windows
3. Create a card in one window
4. Verify it appears instantly in the other window

### Webhook Testing

1. Start ngrok: `ngrok http 5000`
2. Update `backend/.env` with ngrok URL
3. Restart backend server
4. Register webhook via Postman or frontend
5. Create/update cards in Trello.com
6. Verify app windows update automatically

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express 4.18.2
- **WebSocket:** Socket.IO 4.7.2
- **HTTP Client:** Axios 1.6.2
- **Security:** Helmet, CORS, express-rate-limit
- **Development:** Nodemon 3.1.11

### Frontend
- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **WebSocket Client:** Socket.IO Client 4.7.2
- **Notifications:** React Toastify 9.1.3
- **Icons:** Lucide React 0.294.0
- **Styling:** Custom CSS with responsive design

### DevOps
- **Containerization:** Docker, Docker Compose
- **Process Manager:** PM2 (for production)
- **Tunneling:** ngrok (for local webhook testing)
- **Version Control:** Git, GitHub

## 📁 Project Structure

## 🔐 Environment Configuration

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

TRELLO_API_KEY=your_trello_api_key
TRELLO_TOKEN=your_trello_token

WEBHOOK_CALLBACK_URL=https://your-ngrok-url.ngrok-free.dev/api/webhooks/callback

FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=http://localhost:5000
```

### Getting Trello Credentials

1. **Get API Key:**
   - Go to https://trello.com/power-ups/admin
   - Create a new Power-Up
   - Copy the API Key shown

2. **Get Token:**
   - On the same page, click "Token" link
   - Click "Allow" to authorize
   - Copy the 64-character token

3. **Setup ngrok (for webhooks):**
   ```bash
   # Download from https://ngrok.com
   ngrok http 5000
   # Copy the HTTPS URL and update backend/.env
   ```

## 🚀 Deployment

### Using Docker Compose

```bash
docker-compose up -d
```

### Manual Deployment

**Backend (Heroku example):**
```bash
cd backend
heroku create your-app-name
heroku config:set TRELLO_API_KEY=your_key
heroku config:set TRELLO_TOKEN=your_token
heroku config:set WEBHOOK_CALLBACK_URL=https://your-app.herokuapp.com/api/webhooks/callback
git push heroku main
```

**Frontend (Vercel/Netlify):**
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel or Netlify
```

## ⚡ Performance & Security

### Implemented Features

- ✅ **Rate Limiting:** 100 requests per 15 minutes on API endpoints
- ✅ **CORS Protection:** Configured for frontend origin
- ✅ **Security Headers:** Helmet.js for HTTP security
- ✅ **Input Validation:** Request body validation
- ✅ **Error Handling:** Centralized error handling middleware
- ✅ **Environment Variables:** Sensitive data protection
- ✅ **WebSocket Rooms:** Isolated board-specific communication
- ✅ **Connection Pooling:** Efficient WebSocket connection management

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill the process if needed
kill -9 <PID>
```

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in `backend/src/server.js`
- Ensure `VITE_API_URL` in frontend/.env is correct

### Webhooks not working
- Ensure ngrok is running and URL is updated in backend/.env
- Verify webhook is registered (check `/api/webhooks`)
- Check backend logs for webhook callback errors
- Ensure callback URL is publicly accessible

### Cards not syncing in real-time
- Check WebSocket connection in browser console (F12)
- Verify you've selected a board (joined the room)
- Check that both windows are on the same board
- Restart backend server to reset WebSocket connections

## 📊 Demo Scenarios

### Scenario 1: API Testing
1. Import Postman collection
2. Test GET Boards → Success
3. Test GET Cards → Success
4. Test POST Create Card → New card created
5. Test PUT Update Card → Card updated

### Scenario 2: Real-time Sync
1. Open app in 2 windows
2. Select same board in both
3. Create card in Window 1
4. Card appears in Window 2 instantly ✅

### Scenario 3: Trello Integration
1. Register webhook for a board
2. Go to Trello.com
3. Create/move/update a card
4. App windows update automatically ✅

## 📝 Assignment Requirements

### ✅ Completed Requirements

- [x] **4 REST APIs implemented and working**
  - GET Boards
  - GET Cards  
  - POST Create Card
  - PUT Update Card

- [x] **Frontend with real-time synchronization**
  - React application with modern UI
  - WebSocket integration
  - Multiple window sync

- [x] **Webhook integration**
  - Registration endpoint
  - Callback handler
  - Real-time Trello updates

- [x] **Documentation**
  - Complete README with setup instructions
  - API documentation
  - Postman collection

- [x] **Production-level code**
  - Clean architecture (MVC pattern)
  - Error handling
  - Security best practices
  - No inline comments (self-documenting code)

## 📞 Contact & Support

**GitHub Repository:** https://github.com/bashSunny101/TrelloAssignment

**Assignment:** Trello Real-time WebSocket + API Frontend  
**Company:** Inscripts  
**Platform:** Internshala  
**Submission Date:** November 2025

For questions or issues, please open an issue in the GitHub repository.

## 📄 License

MIT License - Feel free to use this project for learning and development purposes.

---

**Built with ❤️ for Inscripts Frontend Internship Assignment**