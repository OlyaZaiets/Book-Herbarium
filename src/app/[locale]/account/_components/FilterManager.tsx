'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import { Dictionary, Locale } from '@/app/dictionaries/getDictionary';
import MyGarden from './MyGarden';
import FilterDropdown from './FilterDropdown';

interface FilterManagerProps {
  dict: Dictionary;
  locale: Locale;
  initialBooks: any[];
  flowerCatalog: any[];
}

export default function FilterManager({
  dict,
  locale,
  initialBooks,
  flowerCatalog,
}: FilterManagerProps) {
  const [activePhases, setActivePhases] = useState<string[]>([]);
  const [activeSeasons, setActiveSeasons] = useState<string[]>([]);

  const showAll = () => {
    setActivePhases([]);
    setActiveSeasons([]);
  };

  const phaseItems = Object.entries(dict.phaseOfLive.items).map(
    ([key, value]) => ({
      id: key, // наприклад, "supportive"
      label: value, // наприклад, "Підтримуючі книги"
    })
  );

  const seasonItems = Object.entries(dict.seasons.items).map(
    ([key, value]) => ({
      id: key, // наприклад, "supportive"
      label: value, // наприклад, "Підтримуючі книги"
    })
  );

  return (
    <>
      <div className={styles.buttons_Container}>
        <button className={styles.button_style} onClick={showAll}>
          {dict.myGarden.title}
        </button>

        <FilterDropdown
          title={dict.seasons.title}
          items={seasonItems}
          selectedIds={activeSeasons}
          onChange={setActiveSeasons}
        />

        <FilterDropdown
          title={dict.phaseOfLive.title}
          items={phaseItems}
          selectedIds={activePhases}
          onChange={setActivePhases}
        />

        <button className={styles.button_style}>{dict.myGarden.archive}</button>
      </div>
      <MyGarden
        locale={locale}
        dict={dict}
        books={initialBooks}
        flowerCatalog={flowerCatalog}
        activePhases={activePhases}
        activeSeasons={activeSeasons}
      />
    </>
  );
}
