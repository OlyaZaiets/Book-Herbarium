import styles from './page.module.css';
import { getDictionary, Locale } from '@/app/dictionaries/getDictionary';
import { LoginButtons } from './LoginButtons';


type Props = {
  params: Promise<{locale : Locale}>;
}

export default async function LoginPage( { params } : Props ) {
  const { locale } = await params; 
  const dict = await getDictionary(locale);

  const l = dict.login;
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{l.title}</h1>
      <LoginButtons 
        googleLabel={l.subtitleGoogle} 
        emailLabel={l.subtitleEmail}
        or={l.or}
        locale={locale}
        />
      <p className={styles.note}>{l.textNoAccount}</p>

    </div>
  )
}