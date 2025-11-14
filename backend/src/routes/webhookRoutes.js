import express from 'express';
import {
  registerWebhook,
  webhookCallback,
  getWebhooks,
  deleteWebhook,
  webhookHead
} from '../controllers/webhookController.js';

const router = express.Router();

router.head('/callback', webhookHead);
router.post('/callback', webhookCallback);
router.post('/register', registerWebhook);
router.get('/', getWebhooks);
router.delete('/:webhookId', deleteWebhook);

export default router;
