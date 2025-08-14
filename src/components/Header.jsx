import React from 'react';
import './Header.css';

const Header = ({ onViewChange, currentView }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🍰</div>
            <div className="logo-text">
              <h1>Фабрика тортов</h1>
              <p>Робот-консультант</p>
            </div>
          </div>
          
          <nav className="nav">
            <button 
              className={`nav-btn ${currentView === 'chat' ? 'active' : ''}`}
              onClick={() => onViewChange('chat')}
            >
              💬 Чат с консультантом
            </button>
            <button 
              className={`nav-btn ${currentView === 'catalog' ? 'active' : ''}`}
              onClick={() => onViewChange('catalog')}
            >
              🍰 Каталог тортов
            </button>
            <button 
              className={`nav-btn ${currentView === 'recommendations' ? 'active' : ''}`}
              onClick={() => onViewChange('recommendations')}
            >
              🎯 Рекомендации
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
