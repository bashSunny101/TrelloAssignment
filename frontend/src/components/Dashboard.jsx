import React, { useState, useEffect } from 'react';
import { trelloApi } from '../services/api';
import socketService from '../services/socket';
import { toast } from 'react-toastify';
import BoardCard from './BoardCard';
import CardList from './CardList';
import CreateCardModal from './CreateCardModal';
import WebhookManager from './WebhookManager';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardLists, setBoardLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadBoards();
    socketService.connect();

    return () => {
      socketService.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      loadBoardData(selectedBoard.id);
      socketService.joinBoard(selectedBoard.id);
      setupSocketListeners();
    }

    return () => {
      if (selectedBoard) {
        socketService.leaveBoard(selectedBoard.id);
      }
    };
  }, [selectedBoard]);

  const setupSocketListeners = () => {
    socketService.onCardCreated((card) => {
      setCards((prev) => [...prev, card]);
      toast.success('New card created!');
    });

    socketService.onCardUpdated((card) => {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, ...card } : c))
      );
      toast.info('Card updated!');
    });

    socketService.onCardDeleted(({ id }) => {
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast.warning('Card deleted!');
    });

    socketService.onCardMoved((card) => {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, ...card } : c))
      );
      toast.info('Card moved!');
    });
  };

  const loadBoards = async () => {
    try {
      setLoading(true);
      const response = await trelloApi.getBoards();
      if (response.success) {
        setBoards(response.data);
      }
    } catch (error) {
      toast.error('Failed to load boards');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadBoardData = async (boardId) => {
    try {
      setLoading(true);
      const [listsResponse, cardsResponse] = await Promise.all([
        trelloApi.getBoardLists(boardId),
        trelloApi.getCards(boardId)
      ]);

      if (listsResponse.success) {
        setBoardLists(listsResponse.data);
      }
      if (cardsResponse.success) {
        setCards(cardsResponse.data);
      }
    } catch (error) {
      toast.error('Failed to load board data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
    setCards([]);
    setBoardLists([]);
  };

  const handleCreateCard = async (listId, name, description) => {
    try {
      const response = await trelloApi.createCard(listId, name, description);
      if (response.success) {
        toast.success('Card created successfully!');
        setShowCreateModal(false);
      }
    } catch (error) {
      toast.error('Failed to create card');
      console.error(error);
    }
  };

  const handleRefresh = () => {
    if (selectedBoard) {
      loadBoardData(selectedBoard.id);
    } else {
      loadBoards();
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Trello Real-time Sync</h1>
        <div className="header-actions">
          <button onClick={handleRefresh} className="btn-icon" disabled={loading}>
            <RefreshCw className={loading ? 'spinning' : ''} size={20} />
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {!selectedBoard ? (
          <div className="boards-section">
            <div className="section-header">
              <h2>Your Boards</h2>
              <WebhookManager boards={boards} />
            </div>
            <div className="boards-grid">
              {boards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onSelect={handleBoardSelect}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="board-view">
            <div className="board-header">
              <button onClick={() => setSelectedBoard(null)} className="btn-back">
                ← Back to Boards
              </button>
              <h2>{selectedBoard.name}</h2>
              <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                + Create Card
              </button>
            </div>

            <CardList cards={cards} lists={boardLists} />
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateCardModal
          lists={boardLists}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCard}
        />
      )}
    </div>
  );
};

export default Dashboard;
