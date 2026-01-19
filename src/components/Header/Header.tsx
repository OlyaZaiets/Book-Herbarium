import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { Dictionary, Locale } from '@/app/dictionaries/getDictionary';
import { LanguageSwitch } from './LanguageSwitch';
import { AuthStatus } from './AuthStatus';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.brand}>
          <div className={styles.verticalWord}>
            <span>B</span>
            <span>o</span>
            <span>o</span>
            <span>k</span>
          </div>
          <Image
            src="/logo.png"
            alt="logo"
            width={110}
            height={100}
            className={styles.logo}
            priority
          />
          {/* <h2 className={styles.vertical}>Herbarium</h2> */}
          <div className={styles.verticalWord}>
            <span>H</span>
            <span>e</span>
            <span>r</span>
            <span>b</span>
            <span>a</span>
            <span>r</span>
            <span>i</span>
            <span>u</span>
            <span>m</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link href={`/${locale}/books`}>{dict.nav.garden}</Link>
          <AuthStatus 
            locale={locale}
            login={dict.nav.login}
            accountLabel={dict.accountMenu.account}
            logoutLabel={dict.accountMenu.logout}
            />

          <LanguageSwitch 
            locale={locale}
          />
        </nav>
      </div>
    </header>
  );
}
