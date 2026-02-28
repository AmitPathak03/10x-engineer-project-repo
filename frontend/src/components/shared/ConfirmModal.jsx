import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', variant = 'danger' }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    {message}
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} style={{ backgroundColor: variant === 'danger' ? 'var(--danger)' : 'var(--primary)' }}>
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
