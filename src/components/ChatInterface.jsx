import React, { useState, useRef, useEffect } from 'react';
import { cakes, occasions, preferences } from '../data/cakes';
import './ChatInterface.css';

const ChatInterface = ({ onRecommendations }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Начальное приветствие
    setTimeout(() => {
      addBotMessage("Привет! 👋 Я робот-консультант Фабрики тортов. Помогу вам выбрать идеальный торт для вашего праздника!");
    }, 500);

    setTimeout(() => {
      addBotMessage("Давайте начнем! Для какого случая вам нужен торт?");
      showQuickReplies(occasions);
    }, 1500);
  }, []);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { type: 'bot', text, timestamp: new Date() }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  const showQuickReplies = (options) => {
    setMessages(prev => [...prev, { type: 'quick-replies', options }]);
  };

  const handleQuickReply = (answer) => {
    addUserMessage(answer);
    setUserAnswers(prev => ({ ...prev, occasion: answer }));
    
    // Удаляем quick replies
    setMessages(prev => prev.filter(msg => msg.type !== 'quick-replies'));
    
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    const questions = [
      {
        question: "Какой уровень сладости вы предпочитаете?",
        options: preferences.find(p => p.id === 'sweetness').options,
        key: 'sweetness'
      },
      {
        question: "Какой размер торта вам нужен?",
        options: preferences.find(p => p.id === 'size').options,
        key: 'size'
      },
      {
        question: "Какой у вас бюджет?",
        options: preferences.find(p => p.id === 'budget').options,
        key: 'budget'
      },
      {
        question: "Есть ли у вас аллергии или ограничения в питании?",
        options: preferences.find(p => p.id === 'allergies').options,
        key: 'allergies'
      }
    ];

    if (currentStep < questions.length) {
      const question = questions[currentStep];
      addBotMessage(question.question);
      showQuickReplies(question.options);
      setCurrentStep(prev => prev + 1);
    } else {
      // Завершаем опрос и даем рекомендации
      setTimeout(() => {
        addBotMessage("Отлично! Теперь я подберу для вас идеальные торты на основе ваших предпочтений...");
        setTimeout(() => {
          generateRecommendations();
        }, 2000);
      }, 1000);
    }
  };

  const generateRecommendations = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const recommendations = filterCakesByPreferences();
      addBotMessage(`Я нашел ${recommendations.length} идеальных тортов для вас! 🎉`);
      
      setTimeout(() => {
        addBotMessage("Вот мои рекомендации:");
        setMessages(prev => [...prev, { type: 'recommendations', cakes: recommendations }]);
        setIsTyping(false);
        
        setTimeout(() => {
          addBotMessage("Хотите посмотреть подробную информацию о каждом торте?");
          showQuickReplies([
            { text: "Да, показать каталог", action: "show-catalog" },
            { text: "Расскажи подробнее", action: "more-info" }
          ]);
        }, 2000);
      }, 1000);
    }, 2000);
  };

  const filterCakesByPreferences = () => {
    let filtered = [...cakes];

    // Фильтрация по случаю
    if (userAnswers.occasion) {
      filtered = filtered.filter(cake => 
        cake.suitableFor.some(occasion => 
          userAnswers.occasion.includes(occasion) || 
          (userAnswers.occasion.includes('День рождения') && occasion.includes('Дни рождения'))
        )
      );
    }

    // Фильтрация по сладости
    if (userAnswers.sweetness) {
      const sweetnessMap = {
        'Не очень сладкий': 2,
        'Умеренно сладкий': 3,
        'Очень сладкий': 5
      };
      const targetSweetness = sweetnessMap[userAnswers.sweetness];
      filtered = filtered.filter(cake => Math.abs(cake.sweetness - targetSweetness) <= 1);
    }

    // Фильтрация по размеру
    if (userAnswers.size) {
      const sizeMap = {
        'Маленький (до 1 кг)': weight => parseFloat(weight) <= 1.0,
        'Средний (1-1.5 кг)': weight => parseFloat(weight) >= 1.0 && parseFloat(weight) <= 1.5,
        'Большой (от 1.5 кг)': weight => parseFloat(weight) >= 1.5
      };
      const sizeFilter = sizeMap[userAnswers.size];
      if (sizeFilter) {
        filtered = filtered.filter(cake => sizeFilter(parseFloat(cake.weight)));
      }
    }

    // Фильтрация по бюджету
    if (userAnswers.budget) {
      const budgetMap = {
        'До 2000 ₽': price => parseInt(price) <= 2000,
        '2000-3000 ₽': price => parseInt(price) >= 2000 && parseInt(price) <= 3000,
        'От 3000 ₽': price => parseInt(price) >= 3000
      };
      const budgetFilter = budgetMap[userAnswers.budget];
      if (budgetFilter) {
        filtered = filtered.filter(cake => {
          const price = parseInt(cake.price.match(/\d+/)[0]);
          return budgetFilter(price);
        });
      }
    }

    // Фильтрация по аллергиям
    if (userAnswers.allergies && userAnswers.allergies !== 'Нет') {
      filtered = filtered.filter(cake => 
        !cake.allergens.some(allergen => 
          userAnswers.allergies.includes(allergen)
        )
      );
    }

    // Если фильтры слишком строгие, возвращаем топ-3 по популярности
    if (filtered.length === 0) {
      filtered = cakes.sort((a, b) => b.popularity - a.popularity).slice(0, 3);
    }

    return filtered.slice(0, 5); // Максимум 5 рекомендаций
  };

  const handleAction = (action) => {
    if (action === 'show-catalog') {
      const recommendations = filterCakesByPreferences();
      onRecommendations(recommendations, userAnswers);
    } else if (action === 'more-info') {
      addBotMessage("Конечно! Я расскажу подробнее о каждом торте. Переходите в каталог, чтобы увидеть полную информацию о составе, аллергенах и ценах.");
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="bot-avatar">🤖</div>
        <div className="bot-info">
          <h3>Робот-консультант Фабрики тортов</h3>
          <p>Онлайн</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === 'bot' && (
              <div className="message-content">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            )}

            {message.type === 'user' && (
              <div className="message-content user">
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <div className="message-avatar">👤</div>
              </div>
            )}

            {message.type === 'quick-replies' && (
              <div className="quick-replies">
                {message.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    className="quick-reply-btn"
                    onClick={() => {
                      if (option.action) {
                        handleAction(option.action);
                      } else {
                        handleQuickReply(option.text || option);
                      }
                    }}
                  >
                    {option.text || option}
                  </button>
                ))}
              </div>
            )}

            {message.type === 'recommendations' && (
              <div className="recommendations-preview">
                {message.cakes.map((cake, cakeIndex) => (
                  <div key={cakeIndex} className="cake-preview">
                    <div className="cake-preview-image">
                      {cake.image ? '🍰' : '🎂'}
                    </div>
                    <div className="cake-preview-info">
                      <h4>{cake.name}</h4>
                      <p>{cake.description}</p>
                      <span className="cake-price">{cake.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-content">
              <div className="message-avatar">🤖</div>
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
