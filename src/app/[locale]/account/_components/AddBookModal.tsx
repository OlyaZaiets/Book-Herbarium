'use client';

import { useState } from 'react';
import styles from './AddBookModal.module.css';
import Image from 'next/image';

export default function AddBookModal({ flowerCatalog, dict, locale }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);

  // Функція для закриття модалки при натисканні на фон
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  const data = {
    title: formData.get('title'),
    author: formData.get('author'),
    category: formData.get('category'),
    phase: formData.get('phase'),
    thoughts: formData.get('thoughts'),
    flower_slug: formData.get('flower_slug'), // Переконайтеся, що radio button має name="flower_slug"
    locale: locale,
  };

  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    setIsOpen(false);
    window.location.reload(); // Оновлюємо сторінку, щоб побачити нову квітку
  }
};

  return (
    <>
      {/* Ваша оригінальна кнопка тепер має функцію відкриття */}
      <button className={styles.addButton} onClick={() => setIsOpen(true)}>
        +
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
            
            <h2 className={styles.modalTitle}>{dict.addNewPlant}</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input type="text" name="title" placeholder="Book Title" required />
                <input type="text" name="author" placeholder="Author" required />
              </div>

              <div className={styles.selectGroup}>
                <select name="category" required>
                  <option value="">Category (Anchor, Turning Point...)</option>
                  <option value="Anchor">Anchor</option>
                  <option value="Turning Point">Turning Point</option>
                  <option value="Awakening">Awakening</option>
                </select>

                <select name="phase" required>
                  <option value="">Life Phase (Seed, Bloom...)</option>
                  <option value="Seed">Seed</option>
                  <option value="Sprout">Sprout</option>
                  <option value="Bloom">Bloom</option>
                </select>
              </div>

              <div className={styles.flowerSelectionArea}>
                <p className={styles.selectionLabel}>Select a flower for your herbarium:</p>
                <div className={styles.flowerGrid}>
                  {flowerCatalog.map((flower: any) => (
                    <label key={flower.slug} className={styles.flowerLabel}>
                      <input 
                        type="radio" 
                        name="flower_slug" 
                        value={flower.slug} 
                        onChange={() => setSelectedFlower(flower.slug)}
                        required
                        className={styles.hiddenRadio}
                      />
                      <div className={`${styles.flowerCard} ${selectedFlower === flower.slug ? styles.selectedFlower : ''}`}>
                        <Image 
                          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${flower.slug}.png`}
                          alt={flower.name_en}
                          width={60}
                          height={60}
                          unoptimized
                        />
                        <span>{locale === 'uk' ? flower.name_uk : flower.name_en}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <textarea name="thoughts" placeholder="Your initial thoughts..."></textarea>
              
              <button type="submit" className={styles.submitBtn}>
                Plant into my Garden
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}