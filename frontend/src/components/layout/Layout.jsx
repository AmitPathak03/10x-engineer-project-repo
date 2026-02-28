import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, onSearch, currentCollectionId, onSelectCollection, collections, onAddCollection, onDeleteCollection }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout" style={{ minHeight: '100vh', display: 'flex', position: 'relative' }}>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            <Sidebar
                currentCollectionId={currentCollectionId}
                onSelectCollection={(id) => {
                    onSelectCollection(id);
                    setSidebarOpen(false); // Close sidebar on select for mobile
                }}
                collections={collections}
                onAddCollection={onAddCollection}
                onDeleteCollection={onDeleteCollection}
                isOpen={sidebarOpen}
            />

            <div className="main-content" style={{ flex: 1, paddingLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column', transition: 'padding var(--transition-normal)' }}>
                <Header onSearch={onSearch} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
                <main className="container" style={{ flex: 1, padding: '2rem 3rem', maxWidth: 'var(--container-max-width)', margin: '0 auto', width: '100%' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
