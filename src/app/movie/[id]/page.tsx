import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetails, getImageUrl, formatReleaseDate, formatVoteAverage } from '@/services/tmdb';
import styles from './page.module.css';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(parseInt(id));
    return {
      title: `${movie.title} - Movie Discovery`,
      description: movie.overview,
    };
  } catch {
    return {
      title: 'Movie Not Found',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(parseInt(id));
    const posterUrl = getImageUrl(movie.poster_path, 'w500');
    const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
    const voteAverage = formatVoteAverage(movie.vote_average);
    const releaseDate = formatReleaseDate(movie.release_date);

    return (
      <main className={styles.main}>
        {backdropUrl && (
          <div className={styles.backdrop}>
            <Image
              src={backdropUrl}
              alt=""
              fill
              className={styles.backdropImage}
              priority
            />
            <div className={styles.backdropOverlay} />
          </div>
        )}

        <div className={styles.container}>
          <Link href="/" className={styles.backButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Movies
          </Link>

          <div className={styles.content}>
            <div className={styles.posterSection}>
              {posterUrl ? (
                <div className={styles.posterContainer}>
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className={styles.poster}
                    priority
                  />
                </div>
              ) : (
                <div className={styles.posterPlaceholder}>
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            <div className={styles.infoSection}>
              <h1 className={styles.title}>{movie.title}</h1>

              {movie.original_title !== movie.title && (
                <p className={styles.originalTitle}>Original Title: {movie.original_title}</p>
              )}

              {movie.tagline && (
                <p className={styles.tagline}>{movie.tagline}</p>
              )}

              <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.label}>Rating</span>
                  <div className={styles.rating}>
                    <span className={styles.star}>★</span>
                    <span className={styles.ratingValue}>{voteAverage}</span>
                    <span className={styles.ratingCount}>({movie.vote_count} votes)</span>
                  </div>
                </div>

                <div className={styles.metadataItem}>
                  <span className={styles.label}>Release Date</span>
                  <span className={styles.value}>{releaseDate}</span>
                </div>

                {movie.runtime && (
                  <div className={styles.metadataItem}>
                    <span className={styles.label}>Runtime</span>
                    <span className={styles.value}>{movie.runtime} minutes</span>
                  </div>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.overview}>
                <h2 className={styles.overviewTitle}>Overview</h2>
                <p className={styles.overviewText}>{movie.overview || 'No overview available.'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading movie:', error);
    notFound();
  }
}
