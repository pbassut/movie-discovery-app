import { render, screen } from '@testing-library/react';
import MovieGrid from '@/components/MovieGrid';
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

describe('MovieGrid', () => {
  const mockMovies: Movie[] = [
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
  ];

  it('should render all movies', () => {
    render(<MovieGrid movies={mockMovies} />);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('should render section title when provided', () => {
    render(<MovieGrid movies={mockMovies} title="Popular Movies" />);
    expect(screen.getByText('Popular Movies')).toBeInTheDocument();
  });

  it('should not render section title when not provided', () => {
    render(<MovieGrid movies={mockMovies} />);
    const heading = screen.queryByRole('heading', { level: 2 });
    expect(heading).not.toBeInTheDocument();
  });

  it('should render empty state when no movies', () => {
    render(<MovieGrid movies={[]} />);
    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });

  it('should render correct number of movie cards', () => {
    render(<MovieGrid movies={mockMovies} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockMovies.length);
  });
});
