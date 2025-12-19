import { popularMovies } from '@/services/tmdb';
import MovieGrid from '../MovieGrid/MovieGrid';
import styles from './MovieList.module.css';

export default async function MovieList() {
  try {
    const moviesData = await popularMovies(1);
    return <MovieGrid movies={moviesData.results} />;
  } catch (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Movies</h2>
        <p className={styles.errorMessage}>
          {error instanceof Error ? error.message : 'Failed to load movies. Please try again later.'}
        </p>
      </div>
    );
  }
}
