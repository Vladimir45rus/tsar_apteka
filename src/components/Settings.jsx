import React from 'react';

const Settings = ({ theme, toggleTheme, notificationDays, setNotificationDays, exportData, importData, startTour }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) importData(file);
  };

  const telegramBotLink = 'https://t.me/royal_software_bot';
  const donateLink = 'https://tbank.ru/cf/3TLJMeGjBSC';

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>⚙️ Настройки</h2>
      
      {/* Тема */}
      <div style={{ marginBottom: '20px', background: '#16162a', padding: '15px', borderRadius: '10px' }}>
        <h3 style={{ color: '#FFD700' }}>Тема</h3>
        <button onClick={toggleTheme} style={{ padding: '10px 20px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          Переключить на {theme === 'dark' ? 'светлую' : 'тёмную'}
        </button>
      </div>

      {/* Уведомления */}
      <div style={{ marginBottom: '20px', background: '#16162a', padding: '15px', borderRadius: '10px' }}>
        <h3 style={{ color: '#FFD700' }}>Уведомления</h3>
        <label style={{ color: '#fff' }}>Напоминать за</label>
        <select value={notificationDays} onChange={(e) => setNotificationDays(Number(e.target.value))} style={{ marginLeft: '10px', padding: '5px', background: '#222', color: '#fff', border: '1px solid #FFD700', borderRadius: '5px' }}>
          <option value={1}>1 день</option>
          <option value={2}>2 дня</option>
          <option value={3}>3 дня</option>
          <option value={5}>5 дней</option>
          <option value={7}>7 дней</option>
        </select>
      </div>

      {/* Резервное копирование */}
      <div style={{ marginBottom: '20px', background: '#16162a', padding: '15px', borderRadius: '10px' }}>
        <h3 style={{ color: '#FFD700' }}>Резервное копирование</h3>
        <button onClick={exportData} style={{ padding: '10px 20px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' }}>
          Экспорт
        </button>
        <input type="file" accept=".json" onChange={handleFileUpload} style={{ color: '#fff' }} />
      </div>

      {/* Обратная связь */}
      <div style={{ marginBottom: '20px', background: '#16162a', padding: '15px', borderRadius: '10px' }}>
        <h3 style={{ color: '#FFD700' }}>Обратная связь</h3>
        <p style={{ color: '#fff', marginBottom: '15px' }}>
          Хотите предложить идею или сообщить о проблеме? Напишите нам в Telegram!
        </p>
        <a href={telegramBotLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', background: '#0088cc', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', width: '100%' }}>
            ✉️ Написать разработчику
          </button>
        </a>
        <a href={donateLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
            💖 Поддержать разработку
          </button>
        </a>
        <button 
          onClick={startTour} 
          style={{ marginTop: '15px', padding: '10px 20px', background: '#333', color: '#FFD700', border: '1px solid #FFD700', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
        >
          📚 Показать обучение
        </button>
      </div>
    </div>
  );
};

export default Settings;