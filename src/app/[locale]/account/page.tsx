import { getDictionary, Locale } from '@/app/dictionaries/getDictionary';
import StatusSelector from './_components/StatusSelector';
import styles from './page.module.css';
import MyGarden from './_components/MyGarden';

type Props = {
  params: Promise<{locale : Locale}>;
}


export default async function Account( {params }: Props) {
    const { locale } = await params; 
    const dict = await getDictionary(locale);

    const s = dict.statuses;

  return (
    <div className={styles.grid_title}>
      <p className={styles.status}>{s.title}</p>
      <div className={styles.statusSelector}>
        <StatusSelector
          infoButton={s.infoButton}
          modalTitle={s.modalTitle}
          close={s.close}
          items={s.items}/>
      </div>
      <div className={styles.buttons_Container}>
        <button className={styles.button_style}>{dict.myGarden.title}</button>
        <button className={styles.button_style}>{dict.myGarden.phase}</button>
        <button className={styles.button_style}>{dict.myGarden.seasons}</button>
        <button className={styles.button_style}>{dict.myGarden.archive}</button>
      </div>

      <MyGarden locale={locale} dict={dict.myGarden}/>

    </div>
  )
}