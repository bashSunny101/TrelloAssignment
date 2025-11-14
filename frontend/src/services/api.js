import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const trelloApi = {
  getBoards: async () => {
    const response = await api.get('/trello/boards');
    return response.data;
  },

  getBoardLists: async (boardId) => {
    const response = await api.get(`/trello/boards/${boardId}/lists`);
    return response.data;
  },

  getCards: async (boardId) => {
    const response = await api.get(`/trello/boards/${boardId}/cards`);
    return response.data;
  },

  createCard: async (listId, name, description = '') => {
    const response = await api.post('/trello/cards', {
      listId,
      name,
      description
    });
    return response.data;
  },

  updateCard: async (cardId, updates) => {
    const response = await api.put(`/trello/cards/${cardId}`, updates);
    return response.data;
  }
};

export const webhookApi = {
  register: async (boardId, description = 'Trello Board Webhook') => {
    const response = await api.post('/webhooks/register', {
      boardId,
      description
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/webhooks');
    return response.data;
  },

  delete: async (webhookId) => {
    const response = await api.delete(`/webhooks/${webhookId}`);
    return response.data;
  }
};

export default api;
