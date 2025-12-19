import { render, screen } from '@testing-library/react';
import MovieCard from '@/components/MovieCard/MovieCard';
import { Movie } from '@/types/movie';

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

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    original_title: 'Test Movie Original',
    overview: 'This is a test movie',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    vote_average: 8.5,
    vote_count: 1000,
    release_date: '2024-01-15',
    popularity: 100,
    adult: false,
    genre_ids: [28, 12],
    original_language: 'en',
    video: false,
  };

  it('should render movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('should render release year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('should render vote average', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('should link to movie detail page', () => {
    render(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/1');
  });

  it('should render star icon', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('should render "N/A" when release date is missing', () => {
    const movieWithoutDate = { ...mockMovie, release_date: '' };
    render(<MovieCard movie={movieWithoutDate} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should render "No Image" when poster is missing', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);
    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('should render movie poster image with correct alt text', () => {
    render(<MovieCard movie={mockMovie} />);
    const image = screen.getByAltText('Test Movie');
    expect(image).toBeInTheDocument();
  });
});
