import React from 'react';
import SearchBar from '../shared/SearchBar';
import logo from '../../assets/logo.png';

const Header = ({ onSearch, toggleSidebar, isSidebarOpen }) => {
    return (
        <header
            className="glass"
            style={{
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                borderBottom: '1px solid var(--border)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', width: '40px' }}>
                <button
                    className="header-mobile-toggle btn-ghost"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                    style={{ width: '40px', height: '40px' }}
                >
                    {isSidebarOpen ? '❮' : '❯'}
                </button>
            </div>

            <SearchBar onSearch={onSearch} />
            <div style={{ width: '40px' }} className="header-spacer" />
        </header>
    );
};

export default Header;
