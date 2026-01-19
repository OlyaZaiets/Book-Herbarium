
'use client'; 

import Image from 'next/image';
import styles from './page.module.css';
import { Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';

type Props = {
  googleLabel: string;
  emailLabel: string;
  or: string;
  locale: string;
}

export function LoginButtons( {googleLabel, emailLabel, or, locale }: Props) {
  return(
    <>
      <button 
        className={styles.button} 
        type='button'
        onClick={() => signIn('google', {callbackUrl: `/${locale}`})}
      >
        <span className={styles.iconWrap} aria-hidden='true'>
          <Image
            src='/google-icon-logo.svg'
            alt=''
            width={18}
            height={18}
            className={styles.google_logo}
          />
        </span>
        {googleLabel}
      </button>

      <div className={styles.divider} role='separator' aria-label='or'>
        <span>{or}</span>
      </div>

      <button className={styles.button} type='button' disabled>
        <span className={styles.iconWrap} aria-hidden='true'>
          <Mail size={18} strokeWidth={1.5}/>
        </span>
        {emailLabel}
      </button>
    </>
  )
}