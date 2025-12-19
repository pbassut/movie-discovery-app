import Spinner from '@/components/Spinner/Spinner';
import styles from './page.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Popular Movies</h1>
          <p className={styles.subtitle}>Discover the most popular movies playing now</p>
        </header>
        <Spinner size="large" message="Loading movies..." />
      </div>
    </main>
  );
}
