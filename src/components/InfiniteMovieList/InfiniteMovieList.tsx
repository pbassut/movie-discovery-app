'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Movie } from '@/types/movie';
import { popularMovies } from '@/services/tmdb';
import MovieGrid from '../MovieGrid/MovieGrid';
import Skeleton from '../MovieGrid/Skeleton/Skeleton';
import Spinner from '../Spinner/Spinner';
import styles from './InfiniteMovieList.module.css';

export default function InfiniteMovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      const moviesData = await popularMovies(page);

      setMovies(prev => [...prev, ...moviesData.results]);
      setPage(prev => prev + 1);

      // Check if we've reached the last page
      if (page >= moviesData.total_pages) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    // Load initial movies
    loadMoreMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreMovies();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMoreMovies]);

  if (error && movies.length === 0) {
    return (
      <div className={styles.error}>
        <h2>Error Loading Movies</h2>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  // Show skeleton on initial load
  if (loading && movies.length === 0) {
    return <Skeleton />;
  }

  return (
    <div>
      <MovieGrid movies={movies} />

      {hasMore && (
        <div ref={observerTarget} className={styles.loadingContainer}>
          {loading && <Spinner size="medium" message="Loading more movies..." />}
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className={styles.endMessage}>
          <p>You've reached the end! No more movies to load.</p>
        </div>
      )}
    </div>
  );
}
