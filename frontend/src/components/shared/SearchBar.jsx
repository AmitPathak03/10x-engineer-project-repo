import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search prompts...', className = '' }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        // Debounce or search on change if desired
    };

    return (
        <form className={`search-bar glass ${className}`} onSubmit={handleSubmit}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                maxWidth: '400px',
                width: '100%'
            }}
        >
            <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>🔍</span>
            <input
                type="text"
                placeholder={placeholder}
                className="input-ghost"
                value={value}
                onChange={handleChange}
                style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text)',
                    flex: 1,
                    padding: '0.5rem',
                    outline: 'none',
                    fontSize: '1rem'
                }}
            />
            <button
                type="submit"
                className="btn-ghost"
                style={{ padding: '0.25rem' }}
            >
                GO
            </button>
        </form>
    );
};

export default SearchBar;
