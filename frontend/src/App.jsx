import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/layout/Layout';
import PromptList from './components/prompts/PromptList';
import PromptForm from './components/prompts/PromptForm';
import PromptDetail from './components/prompts/PromptDetail';
import Modal from './components/shared/Modal';
import ConfirmModal from './components/shared/ConfirmModal';
import ErrorMessage from './components/shared/ErrorMessage';
import { promptsApi } from './api/prompts';
import { collectionsApi } from './api/collections';

function App() {
  const [prompts, setPrompts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI State
  const [currentCollectionId, setCurrentCollectionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [viewingPromptId, setViewingPromptId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null); // { title, message, onConfirm }

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (currentCollectionId) params.collection_id = currentCollectionId;
      if (searchQuery) params.search = searchQuery;

      const response = await promptsApi.list(params);
      setPrompts(response.prompts);
    } catch (err) {
      setError('Could not load prompts. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [currentCollectionId, searchQuery]);

  const fetchCollections = useCallback(async () => {
    try {
      const response = await collectionsApi.list();
      setCollections(response.collections);
    } catch (err) {
      console.error('Failed to load collections', err);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  // Handlers
  const handleAddPrompt = () => {
    setEditingPrompt(null);
    setIsFormOpen(true);
  };

  const handleEditPrompt = (prompt) => {
    setEditingPrompt(prompt);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (id) => {
    setConfirmConfig({
      title: 'Delete Prompt',
      message: 'Are you sure you want to delete this prompt? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await promptsApi.delete(id);
          fetchPrompts();
          setConfirmConfig(null);
        } catch (err) {
          setError('Failed to delete prompt.');
        }
      }
    });
  };

  const handleSavePrompt = async (data) => {
    try {
      setLoading(true);
      if (editingPrompt) {
        await promptsApi.update(editingPrompt.id, data);
      } else {
        await promptsApi.create(data);
      }
      setIsFormOpen(false);
      fetchPrompts();
    } catch (err) {
      setError('Failed to save prompt.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollection = async (data) => {
    try {
      await collectionsApi.create(data);
      fetchCollections();
    } catch (err) {
      setError('Failed to create collection.');
    }
  };

  const handleDeleteCollection = (id) => {
    setConfirmConfig({
      title: 'Delete Collection',
      message: 'Delete this collection? All prompts within it will be moved to "Uncategorized".',
      onConfirm: async () => {
        try {
          await collectionsApi.delete(id);
          fetchCollections();
          fetchPrompts();
          if (currentCollectionId === id) setCurrentCollectionId(null);
          setConfirmConfig(null);
        } catch (err) {
          setError('Failed to delete collection.');
        }
      }
    });
  };

  return (
    <Layout
      onSearch={setSearchQuery}
      currentCollectionId={currentCollectionId}
      onSelectCollection={setCurrentCollectionId}
      collections={collections}
      onAddCollection={handleAddCollection}
      onDeleteCollection={handleDeleteCollection}
    >
      <div className="dashboard">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {currentCollectionId
                ? collections.find(c => c.id === currentCollectionId)?.name
                : 'All Prompts'
              }
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>{prompts.length} prompts in this view</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddPrompt}
            style={{ padding: '0.75rem 1.5rem', boxShadow: '0 4px 14px 0 rgba(162, 87, 79, 0.4)' }}
          >
            + Create Prompt
          </button>
        </div>

        <ErrorMessage message={error} />

        <PromptList
          prompts={prompts}
          loading={loading}
          onEdit={handleEditPrompt}
          onDelete={handleDeletePrompt}
          onExpand={(p) => setViewingPromptId(p.id)}
          onAdd={handleAddPrompt}
        />

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title={editingPrompt ? 'Edit Prompt' : 'Create New Prompt'}
        >
          <PromptForm
            prompt={editingPrompt}
            collections={collections}
            onSave={handleSavePrompt}
            onCancel={() => setIsFormOpen(false)}
            loading={loading}
          />
        </Modal>

        <Modal
          isOpen={!!viewingPromptId}
          onClose={() => setViewingPromptId(null)}
          title="Prompt Details"
        >
          <PromptDetail
            promptId={viewingPromptId}
            onClose={() => setViewingPromptId(null)}
          />
        </Modal>

        <ConfirmModal
          isOpen={!!confirmConfig}
          onClose={() => setConfirmConfig(null)}
          title={confirmConfig?.title}
          message={confirmConfig?.message}
          onConfirm={confirmConfig?.onConfirm}
        />
      </div>
    </Layout>
  );
}

export default App;
