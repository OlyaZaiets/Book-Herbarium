'use client';
import { useState } from 'react';
import styles from './StatusSelector.module.css';

type StatusItem = {
  label: string;
  desc: string;
};

type Props = {
  infoButton: string;
  modalTitle: string;
  close: string;
  items: Record<string, StatusItem>;
}

export default function StatusSelector({ infoButton, modalTitle, close, items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('perennials');

  // Перетворюємо об'єкт статусів у масив для ітерації
  const statusEntries = Object.entries(items);

  return (
    <div className={styles.statusContainer}>
      <div className={styles.selectWrapper}>
        <select 
          className={styles.status_select}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {statusEntries.map(([key, value]) => (
            <option key={key} value={key}>
              {value.label}
            </option>
          ))}
        </select>
        
        <button 
          className={styles.infoBtn} 
          onClick={() => setIsOpen(true)}
          type="button"
        >
          {infoButton}
        </button>
      </div>

      {/* Модальне вікно */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3>{modalTitle}</h3>
            <ul className={styles.statusList}>
              {statusEntries.map(([key, value]: [string, any]) => (
                <li key={key} className={key === selected ? styles.activeStatus : ''}>
                  <strong>{value.label}</strong> — {value.desc}
                </li>
              ))}
            </ul>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              {close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}