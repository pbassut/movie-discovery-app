import { getPopularMovies } from '@/services/tmdb';
import MovieGrid from '@/components/MovieGrid';
import styles from './page.module.css';

export const metadata = {
  title: 'Movie Discovery - Popular Movies',
  description: 'Discover the most popular movies',
};

export default async function HomePage() {
  try {
    const moviesData = await getPopularMovies(1);

    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Popular Movies</h1>
            <p className={styles.subtitle}>Discover the most popular movies playing now</p>
          </header>
          <MovieGrid movies={moviesData.results} />
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
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
        </div>
      </main>
    );
  }
}
