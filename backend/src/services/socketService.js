class SocketService {
  constructor() {
    this.io = null;
  }

  initialize(io) {
    this.io = io;
    
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('join-board', (boardId) => {
        socket.join(`board-${boardId}`);
        console.log(`Client ${socket.id} joined board: ${boardId}`);
      });

      socket.on('leave-board', (boardId) => {
        socket.leave(`board-${boardId}`);
        console.log(`Client ${socket.id} left board: ${boardId}`);
      });

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  emitBoardUpdate(boardId, event, data) {
    if (this.io) {
      this.io.to(`board-${boardId}`).emit(event, data);
    }
  }

  emitCardCreated(boardId, card) {
    this.emitBoardUpdate(boardId, 'card:created', card);
  }

  emitCardUpdated(boardId, card) {
    this.emitBoardUpdate(boardId, 'card:updated', card);
  }

  emitCardDeleted(boardId, cardId) {
    this.emitBoardUpdate(boardId, 'card:deleted', { id: cardId });
  }

  emitCardMoved(boardId, card) {
    this.emitBoardUpdate(boardId, 'card:moved', card);
  }
}

export default new SocketService();
