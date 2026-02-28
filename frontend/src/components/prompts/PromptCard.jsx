import React from 'react';
import Button from '../shared/Button';

const PromptCard = ({ prompt, onEdit, onDelete, onExpand }) => {
    const collectionName = prompt.collection_id || 'Uncategorized';

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div
            className="card glass"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: '220px',
                animation: 'fadeIn 0.3s ease-out'
            }}
        >
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span
                        className="badge"
                        title={collectionName}
                        style={{
                            fontSize: '0.625rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            padding: '0.35rem 0.65rem',
                            backgroundColor: 'var(--primary-light)',
                            color: 'var(--primary)',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 700,
                            maxWidth: '120px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {collectionName}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(prompt); }}
                            className="btn-ghost"
                            style={{
                                padding: '0.5rem',
                                color: 'var(--primary)',
                                lineContent: 0
                            }}
                            title="Edit"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(prompt.id); }}
                            className="btn-ghost"
                            style={{
                                padding: '0.5rem',
                                color: 'var(--danger)',
                                opacity: 0.8
                            }}
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
                <h3
                    style={{
                        fontSize: '1.25rem',
                        marginBottom: '0.5rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: 'var(--text)'
                    }}
                >
                    {prompt.title}
                </h3>
                <p
                    style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6
                    }}
                >
                    {prompt.description || 'No description provided.'}
                </p>
            </div>

            <div className="card-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated {formatDate(prompt.updated_at)}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onExpand(prompt)}
                    style={{ padding: '0.5rem 0.75rem' }}
                >
                    View Full →
                </Button>
            </div>
        </div>
    );
};

export default PromptCard;
