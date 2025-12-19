import { getPopularMovies } from '@/services/tmdb';
import MovieGrid from './MovieGrid';
import styles from './MovieList.module.css';

export default async function MovieList() {
  try {
    const moviesData = await getPopularMovies(1);
    return <MovieGrid movies={moviesData.results} />;
  } catch (error) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Movies</h2>
        <p>
          {error instanceof Error ? error.message : 'Failed to load movies. Please try again later.'}
        </p>
        {error instanceof Error && error.message.includes('API key') && (
          <div className={styles.apiKeyHelp}>
            <p>To fix this:</p>
            <ol>
              <li>Copy <code>.env.example</code> to <code>.env.local</code></li>
              <li>Get your API key from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">TheMovieDB</a></li>
              <li>Add your API key to <code>.env.local</code></li>
              <li>Restart the development server</li>
            </ol>
          </div>
        )}
      </div>
    );
  }
}
