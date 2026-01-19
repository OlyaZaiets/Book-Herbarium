"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import styles from "./AuthStatus.module.css";

type Props = {
  locale: string;
  login: string;
  accountLabel: string;
  logoutLabel: string;
}; 

export function AuthStatus({ locale, login, accountLabel, logoutLabel }: Props) {
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  if (status === "loading") return <span style={{ opacity: 0.7 }}>…</span>;

  if (!data?.user) {
    return (
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
      >
        {login}
      </button>
    );
  }

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {data.user.image && (
          <Image
            src={data.user.image}
            alt=""
            width={30}
            height={30}
            className={styles.avatar}
          />
        )}
        <span className={styles.name}>
          {data.user.name ?? data.user.email}
        </span>
      </button>

      {open && (
        <div role="menu" className={styles.menu}>
          <Link href={`/${locale}/account`} className={styles.menuItem}>
            {accountLabel}
          </Link>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            className={styles.menuItem}
          >
            {logoutLabel}
          </button>
        </div>
      )}
    </div>
  );
}
