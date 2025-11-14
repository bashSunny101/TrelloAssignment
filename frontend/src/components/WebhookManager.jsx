import React, { useState, useEffect } from 'react';
import { webhookApi } from '../services/api';
import { toast } from 'react-toastify';
import { Webhook, Trash2 } from 'lucide-react';

const WebhookManager = ({ boards }) => {
  const [showModal, setShowModal] = useState(false);
  const [webhooks, setWebhooks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal) {
      loadWebhooks();
    }
  }, [showModal]);

  const loadWebhooks = async () => {
    try {
      setLoading(true);
      const response = await webhookApi.getAll();
      if (response.success) {
        setWebhooks(response.data);
      }
    } catch (error) {
      toast.error('Failed to load webhooks');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWebhook = async () => {
    if (!selectedBoard) {
      toast.warning('Please select a board');
      return;
    }

    try {
      setLoading(true);
      const response = await webhookApi.register(selectedBoard);
      if (response.success) {
        toast.success('Webhook registered successfully!');
        loadWebhooks();
        setSelectedBoard('');
      }
    } catch (error) {
      toast.error('Failed to register webhook');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebhook = async (webhookId) => {
    try {
      setLoading(true);
      const response = await webhookApi.delete(webhookId);
      if (response.success) {
        toast.success('Webhook deleted successfully!');
        loadWebhooks();
      }
    } catch (error) {
      toast.error('Failed to delete webhook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn-secondary">
        <Webhook size={16} /> Manage Webhooks
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content webhook-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Webhook Manager</h2>
              <button onClick={() => setShowModal(false)} className="btn-icon">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="webhook-register">
                <h3>Register New Webhook</h3>
                <div className="form-group">
                  <select
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Select a board</option>
                    {boards.map((board) => (
                      <option key={board.id} value={board.id}>
                        {board.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleRegisterWebhook}
                    disabled={loading || !selectedBoard}
                    className="btn-primary"
                  >
                    Register
                  </button>
                </div>
              </div>

              <div className="webhook-list">
                <h3>Active Webhooks</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : webhooks.length === 0 ? (
                  <p className="empty-state">No webhooks registered</p>
                ) : (
                  <div className="webhooks">
                    {webhooks.map((webhook) => (
                      <div key={webhook.id} className="webhook-item">
                        <div className="webhook-info">
                          <strong>{webhook.description}</strong>
                          <span className="webhook-url">{webhook.callbackURL}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteWebhook(webhook.id)}
                          className="btn-icon btn-danger"
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebhookManager;
