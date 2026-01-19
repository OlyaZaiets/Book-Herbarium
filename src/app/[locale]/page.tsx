import { getDictionary, Locale } from '../dictionaries/getDictionary';
import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const h = dict.homepage;
  return (
    <div className={styles.page}>
      <h1>Book Herbarium</h1>
      <h2>{h.mainCredo}</h2>
      <p>{h.firstIntroduction}</p>

      <div className={styles.credo}>
        <p className={styles.credo_text}>{h.credo}</p>
      </div>

      <div className={styles.divider}></div>
      <h2>{h.ourPhilosophyTitle}</h2>
      <p>{h.ourPhilosophyDescription}</p>

      <div className={styles.divider}></div>
      <h2>{h.whyHerbariumTitle}</h2>
      <p>{h.whyHerbariumDescription}</p>
      <h3>{h.whyHerbariumFirstSubtitle}</h3>
      <p>{h.whyHerbariumFirstDescription} </p>
      <h3>{h.whyHerbariumSecondSubtitle}</h3>
      <p>{h.whyHerbariumSecondDescription}</p>
      <h3>{h.whyHerbariumThirdSubtitle}</h3>
      <p>{h.whyHerbariumThirdDescription}</p>

      <div className={styles.divider}></div>

      <h2>{h.personalLandscapeTitle}</h2>
      <p>{h.personalLandscapeDescription}</p>
      <h3>{h.personalLandscapeFirstSubtitle}</h3>
      <p>{h.personalLandscapeFirstDescription}</p>
      <h3>{h.personalLandscapeSecondSubtitle}</h3>
      <p>{h.personalLandscapeSecondDescription}</p>
      <h3>{h.personalLandscapeThirdSubtitle}</h3>
      <p>{h.personalLandscapeThirdDescription}</p>
      <div className={styles.divider}></div>
      <p>{h.summary}</p>
      {/* <Image  
        src='/yellow-flower.png' 
        alt='yellow flower' 
        width={100}
        height={150}
        priority/> */}
    </div>
  );
}
