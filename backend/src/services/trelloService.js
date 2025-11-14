import axios from 'axios';
import { config } from '../config/index.js';

class TrelloService {
  constructor() {
    this.baseUrl = config.trello.baseUrl;
    this.apiKey = config.trello.apiKey;
    this.token = config.trello.token;
  }

  getAuthParams() {
    return {
      key: this.apiKey,
      token: this.token
    };
  }

  async getBoards() {
    try {
      const response = await axios.get(`${this.baseUrl}/members/me/boards`, {
        params: this.getAuthParams()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch boards: ${error.message}`);
    }
  }

  async getCards(boardId) {
    try {
      const response = await axios.get(`${this.baseUrl}/boards/${boardId}/cards`, {
        params: this.getAuthParams()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cards: ${error.message}`);
    }
  }

  async createCard(listId, name, description = '') {
    try {
      const response = await axios.post(`${this.baseUrl}/cards`, null, {
        params: {
          ...this.getAuthParams(),
          idList: listId,
          name,
          desc: description
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create card: ${error.message}`);
    }
  }

  async updateCard(cardId, updates) {
    try {
      const response = await axios.put(`${this.baseUrl}/cards/${cardId}`, null, {
        params: {
          ...this.getAuthParams(),
          ...updates
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update card: ${error.message}`);
    }
  }

  async registerWebhook(modelId, description = 'Trello Board Webhook') {
    try {
      const response = await axios.post(`${this.baseUrl}/webhooks`, null, {
        params: {
          ...this.getAuthParams(),
          callbackURL: config.webhook.callbackUrl,
          idModel: modelId,
          description
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to register webhook: ${error.message}`);
    }
  }

  async deleteWebhook(webhookId) {
    try {
      await axios.delete(`${this.baseUrl}/webhooks/${webhookId}`, {
        params: this.getAuthParams()
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete webhook: ${error.message}`);
    }
  }

  async getWebhooks() {
    try {
      const response = await axios.get(`${this.baseUrl}/tokens/${this.token}/webhooks`, {
        params: { key: this.apiKey }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch webhooks: ${error.message}`);
    }
  }

  async getBoardLists(boardId) {
    try {
      const response = await axios.get(`${this.baseUrl}/boards/${boardId}/lists`, {
        params: this.getAuthParams()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch board lists: ${error.message}`);
    }
  }
}

export default new TrelloService();
