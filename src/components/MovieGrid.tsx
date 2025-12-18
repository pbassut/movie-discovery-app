import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
