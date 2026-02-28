import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: '1.5rem',
        md: '2.5rem',
        lg: '4rem'
    };

    const spinnerStyle = {
        width: sizes[size],
        height: sizes[size],
        border: '3px solid var(--border)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        display: 'inline-block',
    };

    return (
        <div className={`flex-center ${className}`}>
            <div className="spinner-animation" style={spinnerStyle} />
            <style>{`
        .spinner-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoadingSpinner;
