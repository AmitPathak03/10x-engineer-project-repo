import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';
import { promptsApi } from '../../api/prompts';
import LoadingSpinner from '../shared/LoadingSpinner';

const PromptDetail = ({ promptId, onClose }) => {
    const [data, setData] = useState(null);
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [promptResult, versionsResult] = await Promise.all([
                    promptsApi.get(promptId),
                    promptsApi.getVersions(promptId).catch(() => []) // Optional
                ]);
                setData(promptResult);
                setVersions(versionsResult);
            } catch (err) {
                setError('Failed to load prompt details.');
            } finally {
                setLoading(false);
            }
        };

        if (promptId) fetchData();
    }, [promptId]);

    if (loading) return <LoadingSpinner size="lg" />;
    if (error) return <div className="error">{error}</div>;
    if (!data) return null;

    return (
        <div
            className="prompt-detail"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                padding: '1.5rem',
                animation: 'fadeIn 0.4s ease'
            }}
        >
            <div className="detail-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>{data.title}</h2>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <span>ID: {data.id}</span>
                    <span>•</span>
                    <span>Created: {new Date(data.created_at).toLocaleDateString()}</span>
                    {data.collection_id && (
                        <>
                            <span>•</span>
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>In {data.collection_id}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="detail-section">
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--text-muted)' }}>Description</h3>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{data.description || 'No description provided.'}</p>
            </div>

            <div
                className="detail-section glass"
                style={{
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'rgba(0,0,0,0.2)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)' }}>Prompt Content</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(data.content)}>Copy</Button>
                </div>
                <pre
                    style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: 'var(--text)'
                    }}
                >
                    {data.content}
                </pre>
            </div>

            {versions.length > 0 && (
                <div className="version-history">
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--text-muted)' }}>Version History</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {versions.map(v => (
                            <div key={v.version_id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                                <span>Version {v.version_id.split('-')[0]}</span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(v.timestamp).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="detail-actions" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onClose}>Close View</Button>
            </div>
        </div>
    );
};

export default PromptDetail;
