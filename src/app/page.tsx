import { Suspense } from 'react';
import MovieList from '@/components/MovieList';
import MovieGridSkeleton from '@/components/MovieGridSkeleton';
import styles from './page.module.css';

export const metadata = {
  title: 'Movie Discovery - Popular Movies',
  description: 'Discover the most popular movies',
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Popular Movies</h1>
          <p className={styles.subtitle}>Discover the most popular movies playing now</p>
        </header>
        <Suspense fallback={<MovieGridSkeleton />}>
          <MovieList />
        </Suspense>
      </div>
    </main>
  );
}
