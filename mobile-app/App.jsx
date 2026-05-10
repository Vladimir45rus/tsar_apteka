import React, { useState, useEffect } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { LocalNotifications } from '@capacitor/local-notifications';
import { FiHome, FiBarChart2, FiCpu, FiSettings, FiSearch, FiShoppingCart, FiHeart, FiMic } from 'react-icons/fi';
import AIAssistant from './components/AIAssistant';
import Settings from './components/Settings';

registerLocale('ru', ru);

// Токены (потом спрячем в .env)
const TG_TOKEN = import.meta.env.VITE_TG_TOKEN;
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

function App() {
  const [currentTab, setCurrentTab] = useState('main');
  const [theme, setTheme] = useState('dark');
  const [notificationDays, setNotificationDays] = useState(3);

  // Состояния для поиска лекарств
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSaved, setTotalSaved] = useState(0); // для статистики экономии

  // Загрузка настроек из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('tsar-theme');
    if (savedTheme) setTheme(savedTheme);
    const savedNotifyDays = localStorage.getItem('tsar-notify-days');
    if (savedNotifyDays) setNotificationDays(parseInt(savedNotifyDays));
    LocalNotifications.requestPermissions();
  }, []);

  useEffect(() => {
    localStorage.setItem('tsar-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tsar-notify-days', notificationDays.toString());
  }, [notificationDays]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Голосовой ввод
  const startVoiceInput = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      alert('Голосовой ввод не поддерживается в этом браузере');
      return;
    }
    const rec = new Recognition();
    rec.lang = 'ru-RU';
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setSearchQuery(text);
      handleSearch(text); // сразу запускаем поиск с распознанным текстом
    };
    rec.start();
  };

  // Цветовая схема с градиентом
  const gradientBackground = theme === 'dark'
    ? 'linear-gradient(145deg, #0a1f0a 0%, #0a0a0a 100%)'
    : 'linear-gradient(145deg, #e8f5e8 0%, #f5f5f5 100%)';

  const themeStyles = theme === 'dark' ? {
    cardBg: 'rgba(22,22,42,0.8)',
    text: '#fff',
    secondaryText: '#888',
    accent: '#2c7a4d',
    accent2: '#FFD700',
    border: 'rgba(44,122,77,0.3)',
    glassBg: 'rgba(22,22,42,0.6)',
  } : {
    cardBg: 'rgba(255,255,255,0.8)',
    text: '#000',
    secondaryText: '#555',
    accent: '#2c7a4d',
    accent2: '#FFD700',
    border: '#ddd',
    glassBg: 'rgba(255,255,255,0.6)',
  };

  // Заглушка поиска (позже заменим на реальный API)
  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSearchResults([
        { 
          name: 'Парацетамол', 
          analogs: ['Панадол', 'Эффералган'], 
          price: 120, 
          minPrice: 45, 
          savings: 75,
          link: 'https://yandex.ru/search/?text=купить+парацетамол'
        },
        { 
          name: 'Нурофен', 
          analogs: ['Ибупрофен', 'Миг'], 
          price: 250, 
          minPrice: 80, 
          savings: 170,
          link: 'https://yandex.ru/search/?text=купить+нурофен'
        },
        { 
          name: 'Цитрамон', 
          analogs: ['Аскофен', 'Кофицил'], 
          price: 90, 
          minPrice: 35, 
          savings: 55,
          link: 'https://yandex.ru/search/?text=купить+цитрамон'
        },
      ]);
      setLoading(false);
    }, 500);
  };

  // Добавление экономии в статистику (вызывается при клике на кнопку "Купить")
  const handleBuy = (savings) => {
    setTotalSaved(prev => prev + savings);
    alert('Товар добавлен в корзину (демо). Экономия учтена в статистике.');
  };

  return (
    <div style={{ 
      background: gradientBackground,
      color: themeStyles.text, 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: 'sans-serif',
      position: 'relative'
    }}>
      {/* Основной контент (скроллится) */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', paddingBottom: '30px' }}>
        {currentTab === 'main' && (
          <div>
            {/* Приветствие */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ color: themeStyles.accent2, margin: 0, fontSize: '24px' }}>Царь-аптечка</h2>
              <p style={{ color: themeStyles.secondaryText, margin: '5px 0 0' }}>Находите дешёвые аналоги и экономьте</p>
            </div>

            {/* Поиск с микрофоном */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <FiSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: themeStyles.accent2 }} />
                <input
                  type="text"
                  placeholder="Введите название лекарства..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 45px',
                    borderRadius: '30px',
                    background: theme === 'dark' ? '#222' : '#fff',
                    color: themeStyles.text,
                    border: `2px solid ${themeStyles.accent}`,
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
              <button
                onClick={startVoiceInput}
                style={{
                  background: themeStyles.accent,
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '20px'
                }}
              >
                <FiMic />
              </button>
            </div>

            {/* Кнопка поиска */}
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              style={{
                width: '100%',
                marginBottom: '20px',
                padding: '15px',
                background: themeStyles.accent,
                color: '#fff',
                border: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <FiSearch /> {loading ? 'Поиск...' : 'Найти аналоги'}
            </button>

            {/* Результаты поиска */}
            {searchResults.length > 0 && (
              <div>
                <h3 style={{ color: themeStyles.accent2, marginBottom: '15px' }}>Результаты</h3>
                {searchResults.map((item, idx) => (
                  <div key={idx} style={{
                    background: themeStyles.cardBg,
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '16px',
                    marginBottom: '15px',
                    boxShadow: theme === 'dark' ? '0 8px 20px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.1)',
                    border: `1px solid ${themeStyles.border}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: themeStyles.accent, borderRadius: '12px', padding: '10px' }}>
                        <FiShoppingCart size={24} color="#fff" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{item.name}</h3>
                        <p style={{ margin: '4px 0', color: themeStyles.secondaryText, fontSize: '14px' }}>
                          Аналоги: {item.analogs.join(', ')}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <div>
                            <span style={{ color: themeStyles.accent2, fontWeight: 'bold', fontSize: '18px' }}>
                              {item.minPrice} ₽
                            </span>
                            <span style={{ color: themeStyles.secondaryText, textDecoration: 'line-through', marginLeft: '10px' }}>
                              {item.price} ₽
                            </span>
                          </div>
                          <div style={{ color: themeStyles.accent, fontWeight: 'bold' }}>
                            -{item.savings} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ flex: 1, textDecoration: 'none' }}
                      >
                        <button style={{
                          width: '100%',
                          background: 'transparent',
                          border: `2px solid ${themeStyles.accent}`,
                          color: themeStyles.accent,
                          borderRadius: '20px',
                          padding: '10px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = themeStyles.accent; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = themeStyles.accent; }}
                        onClick={() => handleBuy(item.savings)}
                        >
                          <FiShoppingCart /> Купить
                        </button>
                      </a>
                      <button style={{
                        background: themeStyles.accent2,
                        color: '#000',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <FiHeart /> В избранное
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Если результатов нет */}
            {searchResults.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.5 }}>
                <div style={{ fontSize: '60px' }}>💊</div>
                <div style={{ color: themeStyles.secondaryText }}>Введите название лекарства, чтобы найти более дешёвые аналоги</div>
              </div>
            )}
          </div>
        )}

        {currentTab === 'stats' && (
          <div style={{ padding: '20px' }}>
            <h2 style={{ color: themeStyles.accent2 }}>📊 Ваша экономия</h2>
            <p style={{ color: themeStyles.secondaryText }}>
              Когда вы покупаете дешёвый аналог вместо дорогого, разница добавляется сюда.
            </p>
            <div style={{ 
              background: themeStyles.cardBg,
              backdropFilter: 'blur(10px)',
              borderRadius: '20px', 
              padding: '20px', 
              marginTop: '20px', 
              textAlign: 'center',
              border: `1px solid ${themeStyles.border}`
            }}>
              <div style={{ fontSize: '14px', color: themeStyles.secondaryText }}>Всего сэкономлено</div>
              <div style={{ fontSize: '48px', color: themeStyles.accent2, fontWeight: 'bold' }}>{totalSaved} ₽</div>
              <p style={{ color: themeStyles.secondaryText, fontSize: '12px', marginTop: '10px' }}>
                начните поиск и нажимайте «Купить» на самых дешёвых аналогах
              </p>
            </div>
          </div>
        )}

        {currentTab === 'ai' && (
          <div style={{ height: '100%' }}>
            <AIAssistant subscriptions={[]} theme={theme} />
          </div>
        )}

        {currentTab === 'settings' && (
          <div>
            <Settings
              theme={theme}
              toggleTheme={toggleTheme}
              notificationDays={notificationDays}
              setNotificationDays={setNotificationDays}
              exportData={() => {}}
              importData={() => {}}
              startTour={() => {}}
            />
          </div>
        )}
      </div>

      {/* Стеклянная нижняя навигация (уже и кнопки ближе) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        alignItems: 'center',
        background: themeStyles.glassBg,
        backdropFilter: 'blur(15px)',
        margin: '0 auto 15px auto',
        padding: '12px 30px',
        borderRadius: '40px',
        border: `1px solid ${themeStyles.border}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        width: 'fit-content',
        flexShrink: 0
      }}>
        <button onClick={() => setCurrentTab('main')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentTab === 'main' ? themeStyles.accent2 : themeStyles.secondaryText }}>
          <FiHome size={24} />
        </button>
        <button onClick={() => setCurrentTab('stats')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentTab === 'stats' ? themeStyles.accent2 : themeStyles.secondaryText }}>
          <FiBarChart2 size={24} />
        </button>
        <button onClick={() => setCurrentTab('ai')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentTab === 'ai' ? themeStyles.accent2 : themeStyles.secondaryText }}>
          <FiCpu size={24} />
        </button>
        <button onClick={() => setCurrentTab('settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentTab === 'settings' ? themeStyles.accent2 : themeStyles.secondaryText }}>
          <FiSettings size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
