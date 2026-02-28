import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={onClose}
        >
            <div
                className="modal-content glass"
                style={{
                    width: '90%',
                    maxWidth: '500px',
                    padding: '2rem',
                    borderRadius: 'var(--radius-xl)',
                    animation: 'slideUp 0.3s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="modal-header"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1.5rem'
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{title}</h2>
                    <button
                        onClick={onClose}
                        className="btn-ghost"
                        style={{ padding: '0.25rem' }}
                    >
                        ✕
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
            <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Modal;
