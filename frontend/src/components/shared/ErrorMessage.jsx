import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div
            className="error-message glass"
            style={{
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: 'var(--radius-md)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}
        >
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <p style={{ fontWeight: 500 }}>{message}</p>
        </div>
    );
};

export default ErrorMessage;
