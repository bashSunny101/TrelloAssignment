import express from 'express';
import {
  getBoards,
  getCards,
  createCard,
  updateCard,
  getBoardLists
} from '../controllers/trelloController.js';

const router = express.Router();

router.get('/boards', getBoards);
router.get('/boards/:boardId/lists', getBoardLists);
router.get('/boards/:boardId/cards', getCards);
router.post('/cards', createCard);
router.put('/cards/:cardId', updateCard);

export default router;
