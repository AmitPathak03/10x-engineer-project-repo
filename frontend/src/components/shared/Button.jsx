import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled = false,
    ...props
}) => {
    const baseClasses = 'btn';
    const variantClasses = `btn-${variant}`;
    const sizeClasses = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
    const loadingClasses = loading ? 'btn-loading' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${loadingClasses} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? 'Processing...' : children}
        </button>
    );
};

export default Button;
