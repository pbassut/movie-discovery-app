'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { imageUrl, voteAverage as formatVoteAverage } from '@/services/tmdb';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = imageUrl(movie.poster_path, 'w342');
  const voteAverage = formatVoteAverage(movie.vote_average);

  return (
    <Link href={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.posterContainer}>
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={styles.poster}
            priority={false}
          />
        ) : (
          <div className={styles.posterPlaceholder}>
            <span>No Image</span>
          </div>
        )}
        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          <span className={styles.ratingValue}>{voteAverage}</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.releaseDate}>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
      </div>
    </Link>
  );
}
