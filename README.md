# Movie Discovery App

A modern, responsive web application for discovering popular movies using [The Movie Database (TMDB) API](https://www.themoviedb.org/). Built with Next.js 16, TypeScript, and custom CSS.

## Features

- **Movie Grid Discovery**: Browse popular movies in a responsive grid layout
- **Movie Details**: View detailed information including:
  - Original title
  - Movie poster and backdrop images
  - Plot synopsis (overview)
  - User ratings and vote counts
  - Release date
  - Genres and runtime
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test coverage with Jest and React Testing Library
- **Performance**: Optimized with Next.js App Router, Server Components, and image optimization

## Screenshots

![Home Page - Movie Grid](./screenshots/home.png)
![Movie Detail Page](./screenshots/detail.png)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (no CSS libraries - pure custom CSS)
- **Testing**: Jest + React Testing Library
- **API**: The Movie Database (TMDB) API
- **Deployment**: Vercel-ready

## Architecture & Design Patterns

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (movie grid)
│   ├── globals.css        # Global styles
│   └── movie/
│       └── [id]/          # Dynamic movie detail route
├── components/            # React components
│   ├── MovieCard.tsx
│   ├── MovieCard.module.css
│   ├── MovieGrid.tsx
│   └── MovieGrid.module.css
├── services/              # API service layer
│   └── tmdb.ts
├── types/                 # TypeScript type definitions
│   └── movie.ts
└── __tests__/            # Test files
    ├── tmdb.test.ts
    ├── MovieCard.test.tsx
    └── MovieGrid.test.tsx
```

### Design Patterns

- **Service Layer Pattern**: API logic abstracted into dedicated service (`services/tmdb.ts`)
- **Component Composition**: Reusable, focused components (MovieCard, MovieGrid)
- **Type-First Development**: Comprehensive TypeScript types for all data structures
- **CSS Modules**: Scoped styling to prevent style conflicts
- **Server Components**: Leverage Next.js server components for improved performance
- **Error Boundaries**: Graceful error handling with user-friendly messages

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A TMDB API key (instructions below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd movie-discovery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

4. **Get your TMDB API key**

   - Create an account at [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
   - Go to Settings → API: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Request an API Key (select "Educational" or "Personal" use)
   - Copy your API key

5. **Add your API key to `.env.local`**

   Open `.env.local` and replace `your_api_key_here` with your actual API key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode for development:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

### Test Coverage

The project includes tests for:
- API service utility functions (image URLs, date formatting, vote formatting)
- Component rendering and props handling
- Edge cases (missing data, null values)
- User interactions and navigation

## API Integration

This app uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie data.

### Endpoints Used
- `/movie/popular` - Get popular movies
- `/movie/top_rated` - Get top-rated movies
- `/movie/{id}` - Get detailed movie information

### Image URLs
Images are constructed using the TMDB image base URL:
```
https://image.tmdb.org/t/p/{size}/{poster_path}
```

Supported sizes: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Server-side rendering with Next.js App Router
- Automatic image optimization with Next.js Image component
- CSS Modules for optimal bundle splitting
- Data caching with Next.js fetch cache (1-hour revalidation)
- Mobile-first responsive design

## Future Enhancements

Potential features for future iterations:
- Pagination for movie lists
- Search functionality
- Filter by genre
- Sort by rating/popularity/date
- User favorites/watchlist
- Movie trailers
- Similar movie recommendations

## Design Decisions

### Why Next.js?
- Server-side rendering for improved SEO and initial load performance
- Built-in image optimization
- File-based routing
- Great developer experience with Fast Refresh

### Why CSS Modules over Tailwind?
- Demonstrates CSS expertise without library dependency
- Full control over styling
- Better for pixel-perfect designs
- Scoped styles prevent conflicts

### Why TypeScript?
- Type safety reduces runtime errors
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring

## License

ISC

## Author

Built as a technical assessment for Red Thread Innovations

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Design inspiration from modern streaming platforms
