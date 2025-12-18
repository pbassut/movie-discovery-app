import { Movie, MoviesResponse, MovieDetails } from '@/types/movie';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

/**
 * Fetches data from the TMDB API
 * @param endpoint - API endpoint path
 * @param params - Optional query parameters
 * @returns Promise with the API response
 */
async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error(
      'TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file.'
    );
  }

  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
}

/**
 * Fetches popular movies
 * @param page - Page number for pagination
 * @returns Promise with popular movies response
 */
export async function getPopularMovies(page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB<MoviesResponse>('/movie/popular', {
    page: page.toString(),
  });
}

/**
 * Fetches top rated movies
 * @param page - Page number for pagination
 * @returns Promise with top rated movies response
 */
export async function getTopRatedMovies(page: number = 1): Promise<MoviesResponse> {
  return fetchFromTMDB<MoviesResponse>('/movie/top_rated', {
    page: page.toString(),
  });
}

/**
 * Fetches movie details by ID
 * @param movieId - The movie ID
 * @returns Promise with movie details
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchFromTMDB<MovieDetails>(`/movie/${movieId}`);
}

/**
 * Constructs the full image URL from a poster path
 * @param path - Relative image path from TMDB API
 * @param size - Image size (w92, w154, w185, w342, w500, w780, original)
 * @returns Full image URL or null if path is not provided
 */
export function getImageUrl(path: string | null, size: string = 'w185'): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Formats a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "January 1, 2024")
 */
export function formatReleaseDate(dateString: string): string {
  if (!dateString) return 'Unknown';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats vote average to one decimal place
 * @param voteAverage - Raw vote average from API
 * @returns Formatted vote average (e.g., "8.5")
 */
export function formatVoteAverage(voteAverage: number): string {
  return voteAverage.toFixed(1);
}
