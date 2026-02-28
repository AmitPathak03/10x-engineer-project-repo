import React from 'react';
import PromptCard from './PromptCard';
import LoadingSpinner from '../shared/LoadingSpinner';

const PromptList = ({
    prompts = [],
    loading = false,
    onEdit,
    onDelete,
    onExpand,
    onAdd
}) => {
    if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

    if (prompts.length === 0) {
        return (
            <div
                className="empty-state glass flex-center"
                style={{
                    height: '300px',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-xl)',
                    textAlign: 'center',
                    animation: 'fadeIn 0.5s ease'
                }}
            >
                <span style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✨</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No prompts found</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '300px' }}>Start by creating your first prompt to populate this list.</p>
                <button
                    className="btn btn-primary"
                    onClick={onAdd}
                    style={{ padding: '0.75rem 1.5rem' }}
                >
                    Create New Prompt
                </button>
            </div>
        );
    }

    return (
        <div
            className="prompt-grid"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2.5rem',
                width: '100%'
            }}
        >
            {prompts.map(prompt => (
                <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onExpand={onExpand}
                />
            ))}
        </div>
    );
};

export default PromptList;
