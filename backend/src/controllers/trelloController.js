import trelloService from '../services/trelloService.js';

export const getBoards = async (req, res) => {
  try {
    const boards = await trelloService.getBoards();
    res.json({
      success: true,
      data: boards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getCards = async (req, res) => {
  try {
    const { boardId } = req.params;
    const cards = await trelloService.getCards(boardId);
    res.json({
      success: true,
      data: cards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const createCard = async (req, res) => {
  try {
    const { listId, name, description } = req.body;
    
    if (!listId || !name) {
      return res.status(400).json({
        success: false,
        error: 'listId and name are required'
      });
    }

    const card = await trelloService.createCard(listId, name, description);
    res.status(201).json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const updates = req.body;

    const card = await trelloService.updateCard(cardId, updates);
    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getBoardLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await trelloService.getBoardLists(boardId);
    res.json({
      success: true,
      data: lists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
