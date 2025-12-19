import Link from 'next/link';
import Spinner from '@/components/Spinner';
import styles from './page.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Movies
        </Link>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner size="large" message="Loading movie details..." />
        </div>
      </div>
    </main>
  );
}
