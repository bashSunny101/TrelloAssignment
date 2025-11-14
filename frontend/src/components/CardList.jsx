import React from 'react';

const CardList = ({ cards, lists }) => {
  const getListName = (listId) => {
    const list = lists.find((l) => l.id === listId);
    return list?.name || 'Unknown List';
  };

  const groupedCards = lists.reduce((acc, list) => {
    acc[list.id] = cards.filter((card) => card.idList === list.id);
    return acc;
  }, {});

  return (
    <div className="card-list-container">
      {lists.map((list) => (
        <div key={list.id} className="list-column">
          <div className="list-header">
            <h3>{list.name}</h3>
            <span className="card-count">{groupedCards[list.id]?.length || 0}</span>
          </div>
          <div className="cards">
            {groupedCards[list.id]?.map((card) => (
              <div key={card.id} className="card-item">
                <h4>{card.name}</h4>
                {card.desc && <p className="card-desc">{card.desc}</p>}
                <div className="card-meta">
                  <span className="card-id">{card.idShort}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
