import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(WS_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinBoard(boardId) {
    if (this.socket?.connected) {
      this.socket.emit('join-board', boardId);
    }
  }

  leaveBoard(boardId) {
    if (this.socket?.connected) {
      this.socket.emit('leave-board', boardId);
    }
  }

  onCardCreated(callback) {
    this.socket?.on('card:created', callback);
    this.listeners.set('card:created', callback);
  }

  onCardUpdated(callback) {
    this.socket?.on('card:updated', callback);
    this.listeners.set('card:updated', callback);
  }

  onCardDeleted(callback) {
    this.socket?.on('card:deleted', callback);
    this.listeners.set('card:deleted', callback);
  }

  onCardMoved(callback) {
    this.socket?.on('card:moved', callback);
    this.listeners.set('card:moved', callback);
  }

  removeAllListeners() {
    this.listeners.forEach((callback, event) => {
      this.socket?.off(event, callback);
    });
    this.listeners.clear();
  }
}

export default new SocketService();
