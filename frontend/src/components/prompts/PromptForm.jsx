import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';

const PromptForm = ({ prompt = {}, collections = [], onSave, onCancel, loading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        collection_id: ''
    });

    useEffect(() => {
        if (prompt && prompt.id) {
            setFormData({
                title: prompt.title || '',
                description: prompt.description || '',
                content: prompt.content || '',
                collection_id: prompt.collection_id || ''
            });
        }
    }, [prompt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem' }}
        >
            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title *</label>
                <input
                    name="title"
                    type="text"
                    className="input"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="New prompt title"
                    required
                    style={{ width: '100%' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</label>
                <textarea
                    name="description"
                    className="input"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What is this prompt for?"
                    rows={2}
                    style={{ width: '100%', resize: 'none' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Content *</label>
                <textarea
                    name="content"
                    className="input"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="The prompt itself..."
                    required
                    rows={5}
                    style={{ width: '100%', fontStyle: 'italic' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Collection</label>
                <select
                    name="collection_id"
                    className="input"
                    value={formData.collection_id}
                    onChange={handleChange}
                    style={{ width: '100%', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                >
                    <option value="">Uncategorized</option>
                    {collections.map(col => (
                        <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                </select>
            </div>

            <div
                className="form-actions"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border)'
                }}
            >
                <Button variant="ghost" type="button" onClick={onCancel}>Cancel</Button>
                <Button type="submit" loading={loading}>{prompt?.id ? 'Update Prompt' : 'Save Prompt'}</Button>
            </div>
        </form>
    );
};

export default PromptForm;
