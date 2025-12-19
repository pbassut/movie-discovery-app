# Movie Discovery App

A web application for discovering popular movies using [The Movie Database (TMDB) API](https://www.themoviedb.org/). Built with Next.js 16

## Screenshots

![Movie Discovery App - Popular Movies Grid](./ss.png)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A TMDB API key (instructions below)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

3. **Add your API key to `.env.local`**

   Open `.env.local` and replace `your_api_key_here` with your actual API key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)


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

## License

ISC
