import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateCardModal = ({ lists, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    listId: lists[0]?.id || '',
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.listId) {
      onCreate(formData.listId, formData.name, formData.description);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Card</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>List</label>
            <select
              value={formData.listId}
              onChange={(e) => setFormData({ ...formData, listId: e.target.value })}
              required
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Card Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter card name"
              required
            />
          </div>
          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter card description"
              rows="4"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardModal;
