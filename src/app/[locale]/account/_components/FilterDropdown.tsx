'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FilterDropdown.module.css';

interface FilterItem {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  title: string;
  items: FilterItem[];
  selectedIds: string[];
  onChange: (selected: string[]) => void;
}

export default function FilterDropdown({
  title,
  items,
  selectedIds,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleItem = (itemId: string) => {
    const updated = selectedIds.includes(itemId)
      ? selectedIds.filter((i) => i !== itemId)
      : [...selectedIds, itemId];

    onChange(updated);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.title}>{title}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className={styles.list}>
          {items.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={styles.item}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`${styles.checkbox} ${isChecked ? styles.checkboxActive : ''}`}
                >
                  {isChecked && <div className={styles.innerSquare} />}
                </div>
                <span
                  className={`${styles.label} ${isChecked ? styles.labelActive : ''}`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
