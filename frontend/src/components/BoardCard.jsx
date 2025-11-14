import React from 'react';

const BoardCard = ({ board, onSelect }) => {
  return (
    <div className="board-card" onClick={() => onSelect(board)}>
      <div className="board-card-header" style={{ backgroundColor: board.prefs?.backgroundColor || '#0079bf' }}>
        <h3>{board.name}</h3>
      </div>
      {board.desc && (
        <div className="board-card-body">
          <p>{board.desc}</p>
        </div>
      )}
    </div>
  );
};

export default BoardCard;
