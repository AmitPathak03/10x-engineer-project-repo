import React, { useState } from 'react';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import logo from '../../assets/logo.png';

const Sidebar = ({ collections = [], currentCollectionId, onSelectCollection, onAddCollection, onDeleteCollection, className, isOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        if (newCollectionName) {
            onAddCollection({ name: newCollectionName });
            setNewCollectionName('');
            setIsModalOpen(false);
        }
    };

    return (
        <aside
            className={`sidebar glass ${isOpen ? 'open' : ''}`}
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: '1px solid var(--border)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 50
            }}
        >
            <div
                className="brand"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2.5rem'
                }}
            >
                <img src={logo} alt="PromptLab" style={{ height: '32px', width: 'auto' }} />
                <h2 style={{ fontSize: '1.5rem', letterSpacing: '-0.025em' }}>PromptLab</h2>
            </div>

            <div className="nav-section" style={{ flex: 1, overflowY: 'auto' }}>
                <h3
                    style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem',
                        padding: '0 0.5rem'
                    }}
                >
                    Collections
                </h3>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button
                        className={`btn-ghost ${!currentCollectionId ? 'active' : ''}`}
                        onClick={() => onSelectCollection(null)}
                        style={{
                            textAlign: 'left',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: !currentCollectionId ? 'var(--primary-light)' : 'transparent',
                            color: !currentCollectionId ? 'var(--primary)' : 'var(--text-muted)',
                            fontSize: '0.925rem',
                            fontWeight: 500
                        }}
                    >
                        All Prompts
                    </button>

                    {collections.map(col => (
                        <div key={col.id} className={`collection-item ${currentCollectionId === col.id ? 'active' : ''}`}>
                            <button
                                onClick={() => onSelectCollection(col.id)}
                                style={{
                                    textAlign: 'left',
                                    flex: 1,
                                    padding: '0.75rem 1rem',
                                    fontWeight: 500,
                                    color: currentCollectionId === col.id ? 'var(--primary)' : 'var(--text-muted)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {col.name}
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteCollection(col.id); }}
                                className="btn-ghost"
                                style={{
                                    padding: '0.5rem',
                                    opacity: 0.5,
                                    fontSize: '0.75rem',
                                    marginRight: '0.5rem'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="sidebar-footer" style={{ marginTop: '2.5rem' }}>
                <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(true)}
                    style={{ width: '100%', border: '1px dashed var(--border)' }}
                >
                    + New Collection
                </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Collection">
                <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Name</label>
                        <input
                            type="text"
                            className="input"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            placeholder="e.g. Work Prompts"
                            required
                        />
                    </div>
                    <Button type="submit">Create Collection</Button>
                </form>
            </Modal>
        </aside>
    );
};

export default Sidebar;
