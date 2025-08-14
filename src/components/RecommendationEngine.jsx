import React, { useState } from 'react';
import { cakes, occasions, preferences } from '../data/cakes';
import './RecommendationEngine.css';

const RecommendationEngine = ({ onBackToChat }) => {
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleOccasionToggle = (occasion) => {
    setSelectedOccasions(prev => 
      prev.includes(occasion)
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    );
  };

  const handlePreferenceChange = (key, value) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const calculateRecommendations = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let filtered = [...cakes];
      let scores = {};

      // Базовые фильтры
      if (selectedOccasions.length > 0) {
        filtered = filtered.filter(cake => 
          cake.suitableFor.some(occasion => 
            selectedOccasions.some(selected => 
              occasion.includes(selected) || selected.includes(occasion)
            )
          )
        );
      }

      // Расчет баллов для каждого торта
      filtered.forEach(cake => {
        let score = 0;

        // Баллы за популярность
        score += cake.popularity * 10;

        // Баллы за соответствие случаям
        if (selectedOccasions.length > 0) {
          const matchingOccasions = cake.suitableFor.filter(occasion => 
            selectedOccasions.some(selected => 
              occasion.includes(selected) || selected.includes(occasion)
            )
          );
          score += (matchingOccasions.length / selectedOccasions.length) * 50;
        }

        // Баллы за соответствие предпочтениям
        Object.entries(selectedPreferences).forEach(([key, value]) => {
          if (key === 'sweetness') {
            const sweetnessMap = {
              'Не очень сладкий': 2,
              'Умеренно сладкий': 3,
              'Очень сладкий': 5
            };
            const targetSweetness = sweetnessMap[value];
            if (targetSweetness) {
              score += (5 - Math.abs(cake.sweetness - targetSweetness)) * 10;
            }
          } else if (key === 'budget') {
            const price = parseInt(cake.price.match(/\d+/)[0]);
            const budgetMap = {
              'До 2000 ₽': price <= 2000 ? 20 : -10,
              '2000-3000 ₽': price >= 2000 && price <= 3000 ? 20 : -10,
              'От 3000 ₽': price >= 3000 ? 20 : -10
            };
            score += budgetMap[value] || 0;
          }
        });

        scores[cake.id] = score;
      });

      // Сортировка по баллам
      const sortedRecommendations = filtered
        .sort((a, b) => scores[b.id] - scores[a.id])
        .slice(0, 6)
        .map(cake => ({
          ...cake,
          score: scores[cake.id]
        }));

      setRecommendations(sortedRecommendations);
      setIsCalculating(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Отлично подходит';
    if (score >= 60) return 'Хорошо подходит';
    return 'Подходит';
  };

  return (
    <div className="recommendation-engine">
      <div className="engine-header">
        <button className="back-btn" onClick={onBackToChat}>
          ← Назад к консультанту
        </button>
        <h2>Умная система рекомендаций</h2>
        <p>Выберите ваши предпочтения для получения персонализированных рекомендаций</p>
      </div>

      <div className="engine-content">
        <div className="preferences-section">
          <div className="preference-group">
            <h3>🎉 Для какого случая нужен торт?</h3>
            <div className="occasions-grid">
              {occasions.map(occasion => (
                <button
                  key={occasion.id}
                  className={`occasion-btn ${selectedOccasions.includes(occasion.name) ? 'active' : ''}`}
                  onClick={() => handleOccasionToggle(occasion.name)}
                >
                  <span className="occasion-icon">{occasion.icon}</span>
                  {occasion.name}
                </button>
              ))}
            </div>
          </div>

          <div className="preference-group">
            <h3>⚙️ Дополнительные предпочтения</h3>
            <div className="preferences-grid">
              {preferences.map(pref => (
                <div key={pref.id} className="preference-item">
                  <label className="preference-label">{pref.name}</label>
                  <select
                    className="preference-select"
                    onChange={(e) => handlePreferenceChange(pref.id, e.target.value)}
                    value={selectedPreferences[pref.id] || ''}
                  >
                    <option value="">Выберите...</option>
                    {pref.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <button
            className="calculate-btn"
            onClick={calculateRecommendations}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <span className="loading"></span>
                Рассчитываем рекомендации...
              </>
            ) : (
              '🎯 Получить рекомендации'
            )}
          </button>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h3>🎉 Ваши персональные рекомендации</h3>
            <div className="recommendations-grid">
              {recommendations.map((cake, index) => (
                <div key={cake.id} className="recommendation-card">
                  <div className="recommendation-header">
                    <div className="recommendation-rank">#{index + 1}</div>
                    <div 
                      className="recommendation-score"
                      style={{ backgroundColor: getScoreColor(cake.score) }}
                    >
                      {cake.score}%
                    </div>
                  </div>
                  
                  <div className="recommendation-image">
                    <span className="cake-emoji">🍰</span>
                  </div>
                  
                  <div className="recommendation-info">
                    <h4>{cake.name}</h4>
                    <p>{cake.description}</p>
                    
                    <div className="recommendation-details">
                      <span className="detail-item">
                        <strong>Вес:</strong> {cake.weight}
                      </span>
                      <span className="detail-item">
                        <strong>Цена:</strong> {cake.price}
                      </span>
                    </div>
                    
                    <div className="recommendation-match">
                      <span className="match-text" style={{ color: getScoreColor(cake.score) }}>
                        {getScoreText(cake.score)}
                      </span>
                    </div>
                    
                    <div className="recommendation-tags">
                      <span className="tag category">{cake.category}</span>
                      <span className="tag popularity">⭐ {cake.popularity}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationEngine;
