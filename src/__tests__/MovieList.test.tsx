import { render } from '@testing-library/react';
import MovieList from '@/components/MovieList/MovieList';
import { popularMovies } from '@/services/tmdb';
import { MoviesResponse } from '@/types/movie';

// Mock the TMDB service
jest.mock('@/services/tmdb', () => ({
  popularMovies: jest.fn(),
  imageUrl: jest.fn((path: string | null, size: string = 'w185') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null
  ),
  voteAverage: jest.fn((vote: number) => vote.toFixed(1)),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('MovieList', () => {
  const mockMoviesResponse: MoviesResponse = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Movie 1',
        original_title: 'Movie 1',
        overview: 'Overview 1',
        poster_path: '/poster1.jpg',
        backdrop_path: '/backdrop1.jpg',
        vote_average: 8.5,
        vote_count: 1000,
        release_date: '2024-01-15',
        popularity: 100,
        adult: false,
        genre_ids: [28],
        original_language: 'en',
        video: false,
      },
      {
        id: 2,
        title: 'Movie 2',
        original_title: 'Movie 2',
        overview: 'Overview 2',
        poster_path: '/poster2.jpg',
        backdrop_path: '/backdrop2.jpg',
        vote_average: 7.5,
        vote_count: 500,
        release_date: '2024-02-20',
        popularity: 80,
        adult: false,
        genre_ids: [12],
        original_language: 'en',
        video: false,
      },
    ],
    total_pages: 500,
    total_results: 10000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Snapshot Tests', () => {
    it('should match snapshot with movie data', async () => {
      (popularMovies as jest.Mock).mockResolvedValueOnce(mockMoviesResponse);

      const { container } = await render(await MovieList());
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with error state', async () => {
      (popularMovies as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to load movies. Please try again later.')
      );

      const { container } = await render(await MovieList());
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with API key error', async () => {
      (popularMovies as jest.Mock).mockRejectedValueOnce(
        new Error(
          'TMDB API key is not configured.\n\n' +
          'To fix this:\n' +
          '1. Copy .env.example to .env.local\n' +
          '2. Get your API key from https://www.themoviedb.org/settings/api\n' +
          '3. Add your API key to .env.local as NEXT_PUBLIC_TMDB_API_KEY=your_key_here\n' +
          '4. Restart the development server'
        )
      );

      const { container } = await render(await MovieList());
      expect(container).toMatchSnapshot();
    });
  });
});
