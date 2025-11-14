import express from 'express';
import trelloRoutes from './trelloRoutes.js';
import webhookRoutes from './webhookRoutes.js';

const router = express.Router();

router.use('/trello', trelloRoutes);
router.use('/webhooks', webhookRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
