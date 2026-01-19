import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <a
          href="https://www.linkedin.com/in/olga-zaiets-009a261ab/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/OlyaZaiets"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>
    </footer>
  );
}
