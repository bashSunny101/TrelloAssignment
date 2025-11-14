import trelloService from '../services/trelloService.js';
import socketService from '../services/socketService.js';
import crypto from 'crypto';
import { config } from '../config/index.js';

export const registerWebhook = async (req, res) => {
  try {
    const { boardId, description } = req.body;

    if (!boardId) {
      return res.status(400).json({
        success: false,
        error: 'boardId is required'
      });
    }

    const webhook = await trelloService.registerWebhook(boardId, description);
    res.status(201).json({
      success: true,
      data: webhook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const webhookCallback = async (req, res) => {
  try {
    const action = req.body.action;
    const model = req.body.model;

    if (!action) {
      return res.status(200).send('OK');
    }

    const boardId = action.data.board?.id || model?.id;

    if (action.type === 'createCard') {
      const card = action.data.card;
      socketService.emitCardCreated(boardId, card);
    } else if (action.type === 'updateCard') {
      const card = action.data.card;
      
      if (action.data.listBefore && action.data.listAfter) {
        socketService.emitCardMoved(boardId, card);
      } else {
        socketService.emitCardUpdated(boardId, card);
      }
    } else if (action.type === 'deleteCard') {
      const cardId = action.data.card.id;
      socketService.emitCardDeleted(boardId, cardId);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook callback error:', error);
    res.status(200).send('OK');
  }
};

export const getWebhooks = async (req, res) => {
  try {
    const webhooks = await trelloService.getWebhooks();
    res.json({
      success: true,
      data: webhooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteWebhook = async (req, res) => {
  try {
    const { webhookId } = req.params;
    await trelloService.deleteWebhook(webhookId);
    res.json({
      success: true,
      message: 'Webhook deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const webhookHead = (req, res) => {
  res.status(200).send();
};
