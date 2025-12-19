import { MoviesResponse, MovieDetails } from '@/types/movie';

/**
 * TMDBApiClient - Singleton class for TMDB API communication
 * Handles all API requests with centralized error handling and caching
 */
class TMDBApiClient {
  private static instance: TMDBApiClient | null = null;
  private readonly apiKey: string;
  private readonly baseUrl: string;

  /**
   * Private constructor ensures singleton pattern
   * Validates API key on instantiation
   */
  private constructor() {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) {
      throw new Error(
        'TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file.'
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
  }

  /**
   * Gets the singleton instance, creating it if necessary
   */
  public static getInstance(): TMDBApiClient {
    if (!TMDBApiClient.instance) {
      TMDBApiClient.instance = new TMDBApiClient();
    }
    return TMDBApiClient.instance;
  }

  /**
   * Resets the singleton instance (primarily for testing)
   */
  public static resetInstance(): void {
    TMDBApiClient.instance = null;
  }

  /**
   * Generic fetch method for all TMDB API requests
   * @param endpoint - API endpoint path
   * @param params - Query parameters
   * @param options - Fetch options (allowNotFound for 404 handling)
   * @returns Promise with typed response or null if not found
   */
  private async fetch<T>(
    endpoint: string,
    params: Record<string, string> = {},
    options: { allowNotFound?: boolean } = {}
  ): Promise<T | null> {
    const queryParams = new URLSearchParams({
      api_key: this.apiKey,
      ...params,
    });

    const url = `${this.baseUrl}${endpoint}?${queryParams}`;

    try {
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        if (response.status === 404 && options.allowNotFound) {
          return null;
        }
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching from TMDB (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Fetches popular movies
   * @param page - Page number for pagination
   * @returns Promise with popular movies response
   */
  public async popularMovies(page: number = 1): Promise<MoviesResponse> {
    return this.fetch<MoviesResponse>(
      '/movie/popular',
      { page: page.toString() }
    ) as Promise<MoviesResponse>;
  }

  /**
   * Fetches movie details by ID
   * @param movieId - The movie ID
   * @returns Promise with movie details or null if not found
   */
  public async movieDetails(movieId: number): Promise<MovieDetails | null> {
    return this.fetch<MovieDetails>(
      `/movie/${movieId}`,
      {},
      { allowNotFound: true }
    );
  }
}

/**
 * TMDBFormatter - Static utility class for formatting TMDB data
 * Contains pure functions for formatting dates, ratings, and image URLs
 */
class TMDBFormatter {
  private static readonly IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

  /**
   * Constructs the full image URL from a poster path
   * @param path - Relative image path from TMDB API
   * @param size - Image size (w92, w154, w185, w342, w500, w780, original)
   * @returns Full image URL or null if path is not provided
   */
  public static imageUrl(path: string | null, size: string = 'w185'): string | null {
    if (!path) return null;
    return `${TMDBFormatter.IMAGE_BASE_URL}/${size}${path}`;
  }

  /**
   * Formats a date string to a more readable format
   * @param dateString - ISO date string (YYYY-MM-DD)
   * @returns Formatted date string (e.g., "January 1, 2024")
   */
  public static releaseDate(dateString: string): string {
    if (!dateString) return 'Unknown';

    // Parse the date string explicitly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Formats vote average to one decimal place with proper rounding
   * @param voteAvg - Raw vote average from API
   * @returns Formatted vote average (e.g., "8.5")
   */
  public static voteAverage(voteAvg: number): string {
    return (Math.round(voteAvg * 10) / 10).toFixed(1);
  }

  /**
   * Gets the IMAGE_BASE_URL constant
   * @returns The image base URL
   */
  public static imageBaseUrl(): string {
    return TMDBFormatter.IMAGE_BASE_URL;
  }
}

// Export singleton instance methods as functions (lazy instantiation)
export const popularMovies = (page?: number) => TMDBApiClient.getInstance().popularMovies(page);
export const movieDetails = (movieId: number) => TMDBApiClient.getInstance().movieDetails(movieId);

// Export static formatter methods
export const imageUrl = TMDBFormatter.imageUrl;
export const releaseDate = TMDBFormatter.releaseDate;
export const voteAverage = TMDBFormatter.voteAverage;
export const IMAGE_BASE_URL = TMDBFormatter.imageBaseUrl();

// Export classes for direct usage
export { TMDBApiClient, TMDBFormatter };
