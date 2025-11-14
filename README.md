# Trello Real-time WebSocket + API Frontend Assignment

A full-stack application that demonstrates real-time synchronization between Trello boards and a web interface using WebSockets. The application allows users to view boards, create cards, and receive instant updates when changes occur in Trello.

## Features

- **Real-time Synchronization**: WebSocket-based live updates across multiple browser windows
- **Trello Integration**: Full integration with Trello API v1
- **Webhook Support**: Automatic webhook registration and management
- **Modern UI**: Clean, responsive interface built with React
- **Production Ready**: Error handling, rate limiting, and security best practices

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

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Trello account
- ngrok or similar service for webhook callback URL

### 1. Obtain Trello API Credentials

1. Go to [https://trello.com/power-ups/admin](https://trello.com/power-ups/admin)
2. Click "New" to create a new Power-Up
3. Fill in the required details and create the Power-Up
4. Copy your **API Key**
5. Click on the "Token" link to generate a **Token** (you'll need to authorize access)
6. Save both the API Key and Token

### 2. Setup ngrok (for webhook callback)

1. Download and install ngrok from [https://ngrok.com/](https://ngrok.com/)
2. Start ngrok to expose your local backend:
   ```bash
   ngrok http 5000
   ```
3. Copy the HTTPS forwarding URL (e.g., `https://abcd1234.ngrok.io`)

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development

TRELLO_API_KEY=your_trello_api_key_here
TRELLO_TOKEN=your_trello_token_here

WEBHOOK_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/webhooks/callback

FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Using the Application

### 1. View Boards

- Open the application in your browser
- Your Trello boards will be displayed on the dashboard
- Click on any board to view its cards

### 2. Register Webhook

- Click the "Manage Webhooks" button
- Select a board from the dropdown
- Click "Register" to enable real-time updates for that board

### 3. Create Cards

- Select a board to view its lists and cards
- Click "+ Create Card"
- Fill in the card details (list, name, description)
- Submit to create the card

### 4. Test Real-time Sync

1. Open the application in two browser windows side by side
2. Select the same board in both windows
3. Create, update, or move a card in Trello
4. Watch both windows update automatically in real-time

## API Endpoints

### Trello APIs

#### 1. Get Boards
```http
GET /api/trello/boards
```
Returns all boards accessible by the authenticated user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "board_id",
      "name": "Board Name",
      "desc": "Board description",
      "prefs": {...}
    }
  ]
}
```

#### 2. Get Cards
```http
GET /api/trello/boards/:boardId/cards
```
Returns all cards in a specific board.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "card_id",
      "name": "Card Name",
      "desc": "Card description",
      "idList": "list_id",
      "idShort": 1
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
    "desc": "Card description",
    "idList": "list_id"
  }
}
```

#### 4. Update Card
```http
PUT /api/trello/cards/:cardId
Content-Type: application/json

{
  "name": "Updated Name",
  "desc": "Updated description",
  "idList": "new_list_id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "card_id",
    "name": "Updated Name",
    "desc": "Updated description"
  }
}
```

### Webhook APIs

#### Register Webhook
```http
POST /api/webhooks/register
Content-Type: application/json

{
  "boardId": "board_id",
  "description": "My Board Webhook"
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

## WebSocket Events

### Client → Server
- `join-board`: Join a board room for real-time updates
- `leave-board`: Leave a board room

### Server → Client
- `card:created`: Emitted when a new card is created
- `card:updated`: Emitted when a card is updated
- `card:deleted`: Emitted when a card is deleted
- `card:moved`: Emitted when a card is moved to another list

## Postman Collection

Import the Postman collection from `postman/Trello-Realtime-API.postman_collection.json` to test all API endpoints.

### Using the Collection

1. Open Postman
2. Click Import → Upload Files
3. Select the collection JSON file
4. Update the environment variables:
   - `base_url`: Your backend URL (default: `http://localhost:5000`)
   - `trello_api_key`: Your Trello API key
   - `trello_token`: Your Trello token

## Deployment

### Backend Deployment (Heroku Example)

```bash
cd backend
heroku create your-app-name
heroku config:set TRELLO_API_KEY=your_key
heroku config:set TRELLO_TOKEN=your_token
heroku config:set WEBHOOK_CALLBACK_URL=https://your-app.herokuapp.com/api/webhooks/callback
heroku config:set FRONTEND_URL=https://your-frontend-url.com
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

Update `.env` with production URLs:
```env
VITE_API_URL=https://your-backend-url.com
VITE_WS_URL=https://your-backend-url.com
```

Build and deploy:
```bash
npm run build
```

## Demo Video Guidelines

Record a 3-5 minute video showing:

1. **Setup Overview** (30 seconds)
   - Show the project structure
   - Explain the tech stack

2. **API Testing** (1 minute)
   - Use Postman to test the 4 main APIs
   - Show successful responses

3. **Real-time Sync Demo** (2-3 minutes)
   - Open two browser windows side by side
   - Register a webhook for a board
   - Create a card in one window, show it appearing in the other
   - Update a card in Trello, show both windows updating
   - Move a card between lists, show real-time synchronization

4. **Code Walkthrough** (1 minute)
   - Briefly explain key components
   - Show WebSocket integration
   - Explain webhook callback handling

## Troubleshooting

### Webhooks Not Working

1. Ensure ngrok is running and the URL is up-to-date in `.env`
2. Check that the webhook is registered for the correct board
3. Verify the webhook callback URL is publicly accessible
4. Check backend logs for webhook callback errors

### Cards Not Updating in Real-time

1. Check WebSocket connection in browser console
2. Ensure you've joined the board room (select a board)
3. Verify the webhook is active for that board
4. Check for CORS errors in browser console

### API Errors

1. Verify Trello API credentials are correct
2. Check that the token has not expired
3. Ensure rate limits are not exceeded
4. Check backend logs for detailed error messages

## Security Best Practices Implemented

- Environment variables for sensitive data
- Helmet.js for HTTP security headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation
- Error handling without exposing internal details

## Performance Optimizations

- Connection pooling for WebSocket connections
- Efficient state management in React
- Debounced API calls
- Optimized re-renders with React hooks
- Build optimization with Vite

## License

MIT

## Author

Created for Inscripts Frontend Internship Assignment

## Submission Checklist

- ✅ GitHub repository with frontend and backend in separate folders
- ✅ Detailed README with setup instructions
- ✅ Four required APIs implemented (get boards, get cards, create card, update card)
- ✅ Webhook registration and real-time synchronization
- ✅ Postman collection included
- ✅ Production-level code without comments
- ✅ Environment configuration templates
- ✅ Instructions for obtaining Trello API credentials
- ✅ Instructions for webhook setup with ngrok

## Contact

For questions or issues, please open an issue in the GitHub repository.