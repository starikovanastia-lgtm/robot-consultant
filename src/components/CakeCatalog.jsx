import React, { useState } from 'react';
import { cakes, categories } from '../data/cakes';
import './CakeCatalog.css';

const CakeCatalog = ({ recommendations, userPreferences, onBackToChat }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCake, setSelectedCake] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCakes = recommendations.length > 0 
    ? recommendations 
    : cakes.filter(cake => {
        const matchesCategory = selectedCategory === 'all' || cake.category === selectedCategory;
        const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cake.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });

  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
  };

  const closeModal = () => {
    setSelectedCake(null);
  };

  return (
    <div className="catalog">
      <div className="catalog-header">
        <button className="back-btn" onClick={onBackToChat}>
          ← Назад к консультанту
        </button>
        <h2>Каталог тортов</h2>
        {recommendations.length > 0 && (
          <div className="recommendations-badge">
            🎯 Рекомендации для вас
          </div>
        )}
      </div>

      <div className="catalog-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск тортов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {userPreferences && Object.keys(userPreferences).length > 0 && (
        <div className="user-preferences">
          <h3>Ваши предпочтения:</h3>
          <div className="preferences-tags">
            {Object.entries(userPreferences).map(([key, value]) => (
              <span key={key} className="preference-tag">
                {key === 'occasion' ? 'Случай' : key === 'sweetness' ? 'Сладость' : 
                 key === 'size' ? 'Размер' : key === 'budget' ? 'Бюджет' : 'Аллергии'}: {value}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="cakes-grid">
        {filteredCakes.map(cake => (
          <div key={cake.id} className="cake-card" onClick={() => handleCakeClick(cake)}>
            <div className="cake-image">
              <span className="cake-emoji">🍰</span>
              {recommendations.some(rec => rec.id === cake.id) && (
                <div className="recommendation-badge">🎯</div>
              )}
            </div>
            <div className="cake-info">
              <h3>{cake.name}</h3>
              <p>{cake.description}</p>
              <div className="cake-details">
                <span className="cake-weight">{cake.weight}</span>
                <span className="cake-price">{cake.price}</span>
              </div>
              <div className="cake-tags">
                <span className="cake-category">{cake.category}</span>
                <span className="cake-popularity">⭐ {cake.popularity}/5</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCakes.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🍰</div>
          <h3>Торты не найдены</h3>
          <p>Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      )}

      {selectedCake && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="cake-modal">
              <div className="cake-modal-image">
                <span className="cake-emoji-large">🍰</span>
              </div>
              
              <div className="cake-modal-info">
                <h2>{selectedCake.name}</h2>
                <p className="cake-description">{selectedCake.description}</p>
                
                <div className="cake-modal-details">
                  <div className="detail-item">
                    <span className="detail-label">Вес:</span>
                    <span className="detail-value">{selectedCake.weight}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Цена:</span>
                    <span className="detail-value price">{selectedCake.price}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Популярность:</span>
                    <span className="detail-value">{"⭐".repeat(selectedCake.popularity)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Сладость:</span>
                    <span className="detail-value">{"🍯".repeat(selectedCake.sweetness)}</span>
                  </div>
                </div>

                <div className="cake-ingredients">
                  <h4>Состав:</h4>
                  <div className="ingredients-list">
                    {selectedCake.ingredients.map((ingredient, index) => (
                      <span key={index} className="ingredient-tag">{ingredient}</span>
                    ))}
                  </div>
                </div>

                <div className="cake-allergens">
                  <h4>Аллергены:</h4>
                  <div className="allergens-list">
                    {selectedCake.allergens.map((allergen, index) => (
                      <span key={index} className="allergen-tag">{allergen}</span>
                    ))}
                  </div>
                </div>

                <div className="cake-occasions">
                  <h4>Подходит для:</h4>
                  <div className="occasions-list">
                    {selectedCake.suitableFor.map((occasion, index) => (
                      <span key={index} className="occasion-tag">{occasion}</span>
                    ))}
                  </div>
                </div>

                <div className="cake-actions">
                  <button className="btn btn-primary">Заказать торт</button>
                  <button className="btn btn-secondary">Добавить в избранное</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakeCatalog;
