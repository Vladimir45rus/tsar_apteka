import React, { useState, useEffect } from 'react';

const TG_TOKEN = import.meta.env.VITE_TG_TOKEN;
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;
const STORAGE_KEY = 'votedForAI';

const AIAssistant = ({ theme }) => {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVoted = localStorage.getItem(STORAGE_KEY) === 'true';
    setVoted(hasVoted);
  }, []);

  const sendVote = async (vote) => {
    setLoading(true);
    const message = `👑 Опрос ИИ: Пользователь ответил "${vote === 'yes' ? 'Да' : 'Нет'}"`;
    try {
      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_CHAT_ID}&text=${encodeURIComponent(message)}`);
      localStorage.setItem(STORAGE_KEY, 'true');
      setVoted(true);
    } catch (e) {
      alert('Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  const textColor = theme === 'dark' ? '#fff' : '#000';
  const bgColor = theme === 'dark' ? '#0a0a0a' : '#f5f5f5';

  return (
    <div style={{ padding: '20px', color: textColor, background: bgColor, minHeight: '100vh' }}>
      <h2 style={{ color: '#FFD700' }}>🤖 ИИ-советник</h2>
      {!voted ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>Хотите настоящий ИИ с поиском скидок и умными советами?</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={() => sendVote('yes')} disabled={loading} style={{ padding: '15px 40px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}>Да</button>
            <button onClick={() => sendVote('no')} disabled={loading} style={{ padding: '15px 40px', background: '#444', color: '#fff', border: 'none', borderRadius: '30px' }}>Нет</button>
          </div>
          {loading && <p>Отправка...</p>}
        </div>
      ) : (
        <div><p>Спасибо за ответ!</p></div>
      )}
    </div>
  );
};

export default AIAssistant;