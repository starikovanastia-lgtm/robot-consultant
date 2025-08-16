import React, { useState } from 'react';
import './App.css';
import logoImage from '/images/logo_exact.png';
import robotImage from '/images/robot_exact.png';

function App() {
  const [currentView, setCurrentView] = useState('consultant');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      id: 'occasion',
      text: 'Для какого случая вам нужен торт?',
      options: ['🎉 День рождения', '🎊 Юбилей', '💕 Романтический ужин', '👔 Корпоратив', '👨‍👩‍👧‍👦 Семейный праздник', '☕ Чаепитие']
    },
    {
      id: 'sweetness',
      text: 'Какой уровень сладости вы предпочитаете?',
      options: ['Не очень сладкий', 'Умеренно сладкий', 'Очень сладкий']
    },
    {
      id: 'size',
      text: 'Какой размер торта вам нужен?',
      options: ['Маленький (до 1 кг)', 'Средний (1-1.5 кг)', 'Большой (от 1.5 кг)']
    },
    {
      id: 'budget',
      text: 'Какой у вас бюджет?',
      options: ['До 1000 ₽', 'От 1000 ₽']
    },
    {
      id: 'preference',
      text: 'Какие ингредиенты вы предпочитаете?',
      options: ['Шоколад', 'Мед', 'Крем', 'Мусс', 'Не важно']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все торты', icon: '🍰' },
    { id: 'chocolate', name: 'Шоколадные', icon: '🍫' },
    { id: 'cheesecake', name: 'Чизкейки', icon: '🧀' },
    { id: 'honey', name: 'Медовые', icon: '🍯' },
    { id: 'classic', name: 'Классические', icon: '🎂' },
    { id: 'fruit', name: 'Фруктовые', icon: '🍓' },
    { id: 'mousse', name: 'Муссовые', icon: '☁️' }
  ];

  const cakes = [
    {
      id: 1,
      name: 'Торт "НАСЛАЖДЕНИЕ"',
      description: 'Квадратный темный шоколадный торт с глянцевой глазурью',
      price: '629.00 ₽',
      oldPrice: '750.00 ₽',
      weight: '1.0 кг',
      category: 'chocolate',
      url: 'https://fabrikatortov.com/o/bf7836/',
      image: '🍫',
      popular: true,
      discount: 16
    },
    {
      id: 2,
      name: 'Торт "КОКОСОВЫЙ"',
      description: 'Круглый торт, покрытый белой кокосовой стружкой',
      price: '879.00 ₽',
      weight: '1.2 кг',
      category: 'classic',
      url: 'https://fabrikatortov.com/o/6961a0/',
      image: '🥥'
    },
    {
      id: 3,
      name: 'Торт "ЧИЗКЕЙК НЬЮ-ЙОРК"',
      description: 'Многослойный чизкейк с красным желе',
      price: '999.00 ₽',
      weight: '1.3 кг',
      category: 'cheesecake',
      url: 'https://fabrikatortov.com/o/696185/',
      image: '🧀',
      popular: true
    },
    {
      id: 4,
      name: 'Торт "ШОКОЛАДНЫЙ МУСС"',
      description: 'Три шоколада с панда-рисунком',
      price: '1059.00 ₽',
      weight: '1.4 кг',
      category: 'mousse',
      url: 'https://fabrikatortov.com/o/5f19c8/',
      image: '🐼'
    },
    {
      id: 5,
      name: 'Торт "МЕДОВЫЙ"',
      description: 'Классический медовый торт с медовыми сотами',
      price: '519.00 ₽',
      weight: '1.0 кг',
      category: 'honey',
      url: 'https://fabrikatortov.com/o/5c4a77/',
      image: '🍯'
    },
    {
      id: 6,
      name: 'Торт "НАПОЛЕОН"',
      description: 'Традиционный слоеный торт с заварным кремом',
      price: '479.00 ₽',
      weight: '1.1 кг',
      category: 'classic',
      url: 'https://fabrikatortov.com/o/5c9690/',
      image: '🎂'
    },
    {
      id: 7,
      name: 'Торт "БАНАНОВЫЙ"',
      description: 'С бананами и соленой карамелью',
      price: '999.00 ₽',
      weight: '1.2 кг',
      category: 'fruit',
      url: 'https://fabrikatortov.com/o/55de16/',
      image: '🍌'
    },
    {
      id: 8,
      name: 'Торт "ЗЛАКОВЫЙ МУСС"',
      description: 'Нежный злаковый муссовый торт',
      price: '879.00 ₽',
      weight: '1.1 кг',
      category: 'mousse',
      url: 'https://fabrikatortov.com/o/5c4a20/',
      image: '🌾'
    },
    {
      id: 9,
      name: 'Торт "КЛУБНИЧНЫЙ МУСС"',
      description: 'Яркий клубничный мусс с розой',
      price: '879.00 ₽',
      weight: '1.1 кг',
      category: 'mousse',
      url: 'https://fabrikatortov.com/o/5c4a20/',
      image: '🍓'
    },
    {
      id: 10,
      name: 'Торт "ДЕНЬ И НОЧЬ"',
      description: 'Шоколадный торт с контрастным дизайном',
      price: '799.00 ₽',
      weight: '1.0 кг',
      category: 'chocolate',
      url: 'https://fabrikatortov.com/o/5c4a68/',
      image: '🌙'
    },
    {
      id: 11,
      name: 'Торт "БРАУНШВЕЙГСКИЙ"',
      description: 'Классический немецкий торт с орехами',
      price: '899.00 ₽',
      weight: '1.2 кг',
      category: 'classic',
      url: 'https://fabrikatortov.com/o/5c4a74/',
      image: '🥜'
    },
    {
      id: 12,
      name: 'Торт "ТВОРОЖНЫЙ"',
      description: 'Нежный творожный торт с ягодами',
      price: '699.00 ₽',
      weight: '1.0 кг',
      category: 'classic',
      url: 'https://fabrikatortov.com/o/5c4a4a/',
      image: '🧀'
    },
    {
      id: 13,
      name: 'Торт "ДЕНЬ И НОЧЬ БОЛЬШОЙ"',
      description: 'Большой шоколадный торт для компании',
      price: '1299.00 ₽',
      weight: '1.8 кг',
      category: 'chocolate',
      url: 'https://fabrikatortov.com/o/99184e/',
      image: '🌙'
    },
    {
      id: 14,
      name: 'Торт "ЭКСПЕРИМЕНТ"',
      description: 'Уникальный торт с необычными вкусами',
      price: '1199.00 ₽',
      weight: '1.3 кг',
      category: 'classic',
      url: 'https://fabrikatortov.com/o/55de16/',
      image: '🧪'
    },
    {
      id: 15,
      name: 'Торт "ПЛОМБИР"',
      description: 'Мороженое в виде торта',
      price: '799.00 ₽',
      weight: '1.0 кг',
      category: 'classic',
      url: 'https://fabrikatortov.com/o/5c4a20/',
      image: '🍦'
    }
  ];

  const filteredCakes = selectedCategory === 'all' 
    ? cakes 
    : cakes.filter(cake => cake.category === selectedCategory);

  const handleCakeClick = (url) => {
    window.open(url, '_blank');
  };

  const startConsultation = () => {
    setChatActive(true);
    setMessages([
      {
        type: 'bot',
        text: 'Привет! 👋 Я робот-консультант Фабрики тортов. Помогу вам выбрать идеальный торт для вашего праздника!'
      },
      {
        type: 'bot',
        text: questions[0].text,
        options: questions[0].options
      }
    ]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleOptionClick = (option) => {
    // Если уже выбран вариант, блокируем повторные нажатия
    if (selectedOption !== null) {
      return;
    }

    // Устанавливаем выбранный вариант
    setSelectedOption(option);

    const currentQuestion = questions[currentQuestionIndex];
    
    // Сохраняем ответ пользователя
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { type: 'user', text: option }]);

    // Проверяем, есть ли еще вопросы
    if (currentQuestionIndex < questions.length - 1) {
      // Переходим к следующему вопросу
      setTimeout(() => {
        const nextQuestion = questions[currentQuestionIndex + 1];
        const botResponse = {
          type: 'bot',
          text: nextQuestion.text,
          options: nextQuestion.options
        };
        setMessages(prev => [...prev, botResponse]);
        setCurrentQuestionIndex(prev => prev + 1);
        // Сбрасываем выбранный вариант для следующего вопроса
        setSelectedOption(null);
      }, 1000);
    } else {
      // Показываем рекомендации
      setTimeout(() => {
        const recommendations = generateRecommendations();
        const botResponse = {
          type: 'bot',
          text: `Спасибо за ответы! 🎯 Я подобрал для вас идеальные торты на основе ваших предпочтений:`,
          recommendations: recommendations
        };
        setMessages(prev => [...prev, botResponse]);
        // Сбрасываем выбранный вариант
        setSelectedOption(null);
      }, 1000);
    }
  };

  const generateRecommendations = () => {
    let filteredCakes = [...cakes];

    // Фильтрация по бюджету
    if (userAnswers.budget) {
      const budgetMap = {
        'До 1000 ₽': price => parseInt(price.match(/\d+/)[0]) <= 1000,
        'От 1000 ₽': price => parseInt(price.match(/\d+/)[0]) > 1000
      };
      const budgetFilter = budgetMap[userAnswers.budget];
      if (budgetFilter) {
        filteredCakes = filteredCakes.filter(cake => budgetFilter(cake.price));
      }
    }

    // Фильтрация по размеру (если указан)
    if (userAnswers.size) {
      const sizeMap = {
        'Маленький (до 1 кг)': weight => parseFloat(weight.match(/\d+\.?\d*/)[0]) <= 1.0,
        'Средний (1-1.5 кг)': weight => {
          const w = parseFloat(weight.match(/\d+\.?\d*/)[0]);
          return w >= 1.0 && w <= 1.5;
        },
        'Большой (от 1.5 кг)': weight => parseFloat(weight.match(/\d+\.?\d*/)[0]) >= 1.5
      };
      const sizeFilter = sizeMap[userAnswers.size];
      if (sizeFilter) {
        const sizeCakes = filteredCakes.filter(cake => sizeFilter(cake.weight));
        // Если есть торты подходящего размера, используем их
        if (sizeCakes.length > 0) {
          filteredCakes = sizeCakes;
        }
        // Если нет, оставляем все подходящие по бюджету
      }
    }

    // Фильтрация по случаю (если указан)
    if (userAnswers.occasion) {
      const occasionMap = {
        '🎉 День рождения': cake => cake.category === 'chocolate' || cake.category === 'mousse', // Яркие и праздничные
        '🎊 Юбилей': cake => cake.category === 'classic' || cake.category === 'chocolate', // Солидные и красивые
        '💕 Романтический ужин': cake => cake.category === 'fruit' || cake.category === 'mousse', // Нежные и романтичные
        '👔 Корпоратив': cake => cake.category === 'classic' || cake.category === 'cheesecake', // Универсальные
        '👨‍👩‍👧‍👦 Семейный праздник': cake => cake.category === 'classic' || cake.category === 'fruit', // Для всех
        '☕ Чаепитие': cake => cake.category === 'honey' || cake.category === 'classic' // Традиционные
      };
      const occasionFilter = occasionMap[userAnswers.occasion];
      if (occasionFilter) {
        const occasionCakes = filteredCakes.filter(occasionFilter);
        // Если есть торты подходящие для случая, используем их
        if (occasionCakes.length > 0) {
          filteredCakes = occasionCakes;
        }
        // Если нет, оставляем предыдущие фильтры
      }
    }

    // Фильтрация по уровню сладости (если указан)
    if (userAnswers.sweetness) {
      const sweetnessMap = {
        'Не очень сладкий': cake => cake.category === 'cheesecake' || cake.category === 'mousse', // Менее сладкие
        'Умеренно сладкий': cake => cake.category === 'fruit' || cake.category === 'classic', // Средняя сладость
        'Очень сладкий': cake => cake.category === 'chocolate' || cake.category === 'honey' // Очень сладкие
      };
      const sweetnessFilter = sweetnessMap[userAnswers.sweetness];
      if (sweetnessFilter) {
        const sweetnessCakes = filteredCakes.filter(sweetnessFilter);
        // Если есть торты подходящей сладости, используем их
        if (sweetnessCakes.length > 0) {
          filteredCakes = sweetnessCakes;
        }
        // Если нет, оставляем предыдущие фильтры
      }
    }

    // Фильтрация по предпочтениям
    if (userAnswers.preference) {
      const preferenceMap = {
        'Шоколад': cake => cake.category === 'chocolate',
        'Мед': cake => cake.category === 'honey',
        'Крем': cake => cake.category === 'classic' || cake.category === 'fruit', // Добавляем фруктовые к крему
        'Мусс': cake => cake.category === 'mousse'
      };
      const preferenceFilter = preferenceMap[userAnswers.preference];
      if (preferenceFilter) {
        const preferenceCakes = filteredCakes.filter(preferenceFilter);
        // Если есть торты по предпочтениям, используем их
        if (preferenceCakes.length > 0) {
          filteredCakes = preferenceCakes;
        }
        // Если нет тортов по предпочтениям, оставляем все подходящие по бюджету
      }
    }

    // Если после фильтрации тортов мало, добавляем популярные в рамках бюджета
    if (filteredCakes.length < 3) {
      const budgetFilter = userAnswers.budget ? {
        'До 1000 ₽': price => parseInt(price.match(/\d+/)[0]) <= 1000,
        'От 1000 ₽': price => parseInt(price.match(/\d+/)[0]) > 1000
      }[userAnswers.budget] : () => true;

      const popularCakes = cakes.filter(cake => 
        cake.popular && 
        !filteredCakes.find(fc => fc.id === cake.id) &&
        budgetFilter(cake.price)
      );
      
      // Добавляем только нужное количество тортов до 3
      const neededCount = 3 - filteredCakes.length;
      filteredCakes = [...filteredCakes, ...popularCakes.slice(0, neededCount)];
    }

    // Если все еще мало тортов, добавляем любые подходящие по бюджету
    if (filteredCakes.length < 3) {
      const budgetFilter = userAnswers.budget ? {
        'До 1000 ₽': price => parseInt(price.match(/\d+/)[0]) <= 1000,
        'От 1000 ₽': price => parseInt(price.match(/\d+/)[0]) > 1000
      }[userAnswers.budget] : () => true;

      const remainingCakes = cakes.filter(cake => 
        !filteredCakes.find(fc => fc.id === cake.id) &&
        budgetFilter(cake.price)
      );
      
      // Добавляем только нужное количество тортов до 3
      const neededCount = 3 - filteredCakes.length;
      filteredCakes = [...filteredCakes, ...remainingCakes.slice(0, neededCount)];
    }

    // Сортируем: сначала по предпочтениям, потом по популярности, потом по цене
    filteredCakes.sort((a, b) => {
      // Приоритет популярным тортам
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      
      // Приоритет тортам с скидкой
      if (a.discount && !b.discount) return -1;
      if (!a.discount && b.discount) return 1;
      
      // Приоритет более дешевым тортам
      const priceA = parseInt(a.price.match(/\d+/)[0]);
      const priceB = parseInt(b.price.match(/\d+/)[0]);
      return priceA - priceB;
    });

    return filteredCakes.slice(0, 3);
  };

  const resetChat = () => {
    setChatActive(false);
    setMessages([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedOption(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileFooterOpen(false);
  };

  const closeMobilePanels = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="App">
      {/* Mobile Menu Toggle Button */}
      {!chatActive && (
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
      )}



      {/* Mobile Overlay */}
      {!chatActive && (
        <div 
          className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobilePanels}
        />
      )}

      {/* Header - показываем только если чат не активен */}
      {!chatActive && (
        <header className={`header ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <img src={logoImage} alt="Логотип Фабрики тортов" />
              </div>
              <div className="logo-text">
                <h1>Фабрика тортов от Елены Стариковой</h1>
                  <p>Свежие торты на заказ</p>
                </div>
              </div>
              
              <nav className="nav">
                <button 
                  className={`nav-btn ${currentView === 'consultant' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentView('consultant');
                    closeMobilePanels();
                  }}
                >
                  <img src={robotImage} alt="Робот" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  Консультант
                </button>
                <a href="https://fabrikatortov.com" target="_blank" rel="noopener noreferrer" className="nav-btn">
                  🌐 Сайт
                </a>
              </nav>
          </div>
        </div>
      </header>
      )}
      
      {/* Если чат активен, показываем только интерфейс консультанта */}
      {chatActive ? (
        <div className="chat-fullscreen">
        <div className="chat-container">
          <div className="chat-interface">
            <div className="chat-header">
              <div className="bot-avatar">
                <img src={robotImage} alt="Робот-консультант" />
              </div>
              <div className="bot-info">
                  <h3>Робот-консультант</h3>
                  <p>Помогу выбрать идеальный торт</p>
                </div>
                <button className="close-chat-btn" onClick={resetChat}>
                  ✕
                </button>
              </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                  <div className="message-avatar">
                      {message.type === 'bot' ? (
                        <img src={robotImage} alt="Робот" />
                      ) : '👤'}
                  </div>
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    {message.options && (
                      <div className="quick-replies">
                          {message.options.map((option, optionIndex) => (
                          <button
                              key={optionIndex}
                              className={`quick-reply-btn ${selectedOption === option ? 'selected' : ''} ${selectedOption !== null && selectedOption !== option ? 'disabled' : ''}`}
                            onClick={() => handleOptionClick(option)}
                              disabled={selectedOption !== null}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    {message.recommendations && (
                        <div className="recommendations">
                        <div className="recommendations-header">
                            <h4>Рекомендуемые торты:</h4>
                          </div>
                          <div className="recommendations-grid">
                            {message.recommendations.map((cake) => (
                              <div key={cake.id} className="recommendation-card">
                                <div className="recommendation-image">
                                  <span className="cake-emoji">{cake.image}</span>
                                </div>
                                <div className="recommendation-content">
                                  <h5 className="recommendation-name">{cake.name}</h5>
                                  <p className="recommendation-description">{cake.description}</p>
                                  <div className="recommendation-details">
                                    <span className="recommendation-weight">{cake.weight}</span>
                                    <span className="recommendation-price">{cake.price}</span>
                                  </div>
                                  <a 
                                    href={cake.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="recommendation-link"
                                  >
                                    🛒 Заказать на сайте
                                  </a>
                        </div>
                              </div>
                            ))}
                            </div>
                        <div className="recommendations-footer">
                            <p>Нажмите на ссылку, чтобы перейти на сайт и заказать торт</p>
                            <button className="btn btn-primary btn-small" onClick={resetChat}>
                              🍰 Начать заново
                            </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          {currentView === 'home' && (
            <section className="hero">
              <div className="container">
                <div className="hero-content">
                  <h1>Добро пожаловать в Фабрику тортов!</h1>
                  <p>Создаем вкусные торты для ваших особенных моментов</p>
                  <div className="hero-buttons">
                    <button className="btn btn-primary" onClick={() => setCurrentView('consultant')}>
                      🤖 Получить консультацию
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Catalog */}
          {currentView === 'catalog' && (
            <section className="catalog">
              <div className="container">
                <div className="catalog-header">
                  <h2>Наши торты</h2>
                  <p>Выберите идеальный торт для вашего праздника</p>
                </div>
                
                <div className="categories">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </button>
                  ))}
                </div>

                <div className="cakes-grid">
                  {filteredCakes.map((cake) => (
                    <div key={cake.id} className="cake-card" onClick={() => handleCakeClick(cake.url)}>
                      {cake.popular && <div className="popular-badge">Популярный</div>}
                      {cake.discount && <div className="discount-badge">-{cake.discount}%</div>}
                      <div className="cake-image">
                        <div className="cake-emoji">{cake.image}</div>
                      </div>
                      <div className="cake-content">
                        <h3 className="cake-name">{cake.name}</h3>
                        <p className="cake-description">{cake.description}</p>
                        <div className="cake-details">
                          <span className="cake-weight">{cake.weight}</span>
                          <div className="cake-price-container">
                            {cake.oldPrice && <span className="cake-old-price">{cake.oldPrice}</span>}
                            <span className="cake-price">{cake.price}</span>
                          </div>
                        </div>
                        <div className="cake-category">
                          {categories.find(cat => cat.id === cake.category)?.name}
                        </div>
                      </div>
                      <div className="cake-actions">
                        <button className="btn btn-primary btn-small">
                          Заказать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Consultant */}
          {currentView === 'consultant' && (
            <div className="consultant-fullscreen">
              <div className="consultant-container">
                <div className="consultant-interface">
                  <div className="consultant-content">
                    <div className="consultant-card">
                      <div className="consultant-avatar-large">
                        <img src={robotImage} alt="Робот-консультант" />
                      </div>
                      <div className="consultant-info-large">
                        <h3>Умный помощник</h3>
                        <p>Задайте несколько вопросов, и я подберу для вас идеальный торт</p>
                      </div>
                      <button className="btn btn-primary" onClick={startConsultation}>
                        🚀 Начать консультацию
                      </button>
                    </div>

                    <div className="consultant-features">
                      <div className="feature">
                        <span className="feature-icon">🎯</span>
                        <h4>Точный подбор</h4>
                        <p>Учитываем все ваши предпочтения и бюджет</p>
                      </div>
                      <div className="feature">
                        <span className="feature-icon">⚡</span>
                        <h4>Быстро</h4>
                        <p>Получите рекомендации за 2-3 минуты</p>
                      </div>
                      <div className="feature">
                        <span className="feature-icon">💡</span>
                        <h4>Умные советы</h4>
                        <p>Поможем с выбором размера и оформления</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


        </>
      )}
    </div>
  );
}

export default App;
