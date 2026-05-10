import React, { useState } from 'react';
import { Logo } from '../logos';

// Добавляем перевод категорий (как в Statistics)
const categoryNames = {
  video: 'Кино',
  music: 'Музыка',
  mobile: 'Связь',
  internet: 'Интернет',
  bank: 'Банки',
  auto: 'Авто',
  fitness: 'Фитнес',
  education: 'Обучение',
  delivery: 'Доставка',
  security: 'Охрана',
  games: 'Игры',
  other: 'Прочее'
};

const SubscriptionDetail = ({ subscription, onClose, onEdit, onDelete, onMarkPaid }) => {
  const [showHistory, setShowHistory] = useState(false);

  if (!subscription) return null;

  const handleMarkPaid = () => {
  console.log('Кнопка нажата!'); // ← добавь эту строку
  const today = new Date().toISOString().split('T')[0];
  onMarkPaid(subscription.id, today);
};

  // Форматируем дату в русский формат (день-месяц-год)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU'); // вернёт 15.03.2026 (с точками, но можно заменить на дефисы)
  };

  // Перевод категории
  const categoryName = categoryNames[subscription.category] || subscription.category || 'Прочее';

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>

        <div style={styles.header}>
          <Logo id={subscription.name} domain={subscription.domain} size={80} />
          <h2 style={styles.title}>{subscription.name}</h2>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.label}>Цена</span>
            <span style={styles.value}>{subscription.price} ₽ / {subscription.period === 'month' ? 'мес' : 'год'}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>День списания</span>
            <span style={styles.value}>{subscription.billingDay}-е число</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Начало</span>
            <span style={styles.value}>{formatDate(subscription.startDate)}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.label}>Категория</span>
            <span style={styles.value}>{categoryName}</span>
          </div>
        </div>

        <div style={styles.historySection}>
          <button onClick={() => setShowHistory(!showHistory)} style={styles.historyToggle}>
            {showHistory ? 'Скрыть историю' : 'Показать историю платежей'}
          </button>
          {showHistory && (
            <div style={styles.historyList}>
              {subscription.payments && subscription.payments.length > 0 ? (
                subscription.payments.map((date, idx) => (
                  <div key={idx} style={styles.historyItem}>✅ {date}</div>
                ))
              ) : (
                <div style={styles.historyItem}>Пока нет записей об оплатах</div>
              )}
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button onClick={handleMarkPaid} style={styles.paidButton}>💰 Отметить оплаченным</button>
          <button onClick={() => onEdit(subscription)} style={styles.editButton}>✏️ Редактировать</button>
          <button onClick={() => onDelete(subscription.id)} style={styles.deleteButton}>🗑️ Удалить</button>
        </div>

        <div style={styles.aiSection}>
          <button style={styles.aiButton} onClick={() => alert('Скоро здесь будет ИИ-помощник!')}>
            🤖 Спросить ИИ про эту подписку
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#16162a',
    borderRadius: '30px',
    padding: '25px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    border: '2px solid #FFD700',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#FFD700',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '25px',
  },
  title: {
    color: '#FFD700',
    fontSize: '24px',
    margin: '10px 0 0 0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '20px',
  },
  infoItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '12px',
    borderRadius: '15px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px',
  },
  value: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#FFD700',
  },
  historySection: {
    marginBottom: '20px',
  },
  historyToggle: {
    background: 'none',
    border: '1px solid #FFD700',
    color: '#FFD700',
    padding: '10px',
    borderRadius: '10px',
    width: '100%',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  historyList: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    padding: '10px',
    maxHeight: '150px',
    overflowY: 'auto',
  },
  historyItem: {
    padding: '8px',
    borderBottom: '1px solid #333',
    color: '#fff',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  paidButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  aiSection: {
    marginTop: '10px',
  },
  aiButton: {
    width: '100%',
    backgroundColor: '#FFD700',
    color: '#000',
    border: 'none',
    padding: '15px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SubscriptionDetail;