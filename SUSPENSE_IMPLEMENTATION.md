# Suspense Implementation Guide

This document explains the loading states and Suspense implementation in the Movie Discovery App.

## Overview

The app uses React Suspense and Next.js loading states to provide a smooth user experience during data fetching. We implement loading states at multiple levels:

1. **Route-level loading**: Using `loading.tsx` files
2. **Component-level loading**: Using Suspense boundaries
3. **Visual feedback**: Spinner and skeleton components

## Components

### Spinner Component
**Location**: `src/components/Spinner.tsx`

A reusable animated spinner with three sizes:
- Small (40px)
- Medium (64px) - default
- Large (80px)

**Usage**:
```tsx
<Spinner size="large" message="Loading movies..." />
```

**Features**:
- Smooth CSS animation with 4 rotating rings
- Optional message prop
- Responsive sizing
- Red (#e50914) themed to match app branding

### MovieGridSkeleton Component
**Location**: `src/components/MovieGridSkeleton.tsx`

A skeleton screen that mimics the movie grid layout while data loads.

**Features**:
- Displays 20 placeholder cards
- Shimmer animation effect
- Responsive grid (2/3/4/5 columns based on screen size)
- Matches MovieGrid layout exactly

### MovieList Component
**Location**: `src/components/MovieList.tsx`

A server component that fetches and displays the movie grid.

**Features**:
- Async data fetching with `getPopularMovies()`
- Built-in error handling
- Can be wrapped in Suspense for loading states

## Loading States

### Home Page (`/`)

**Loading file**: `src/app/loading.tsx`

Shows when navigating to the home page:
- Displays page header (title and subtitle)
- Shows large spinner with "Loading movies..." message

**Suspense boundary**: In `src/app/page.tsx`

More granular loading within the page:
```tsx
<Suspense fallback={<MovieGridSkeleton />}>
  <MovieList />
</Suspense>
```

This keeps the header visible while only the movie grid shows a skeleton loader.

### Movie Detail Page (`/movie/[id]`)

**Loading file**: `src/app/movie/[id]/loading.tsx`

Shows when navigating to a movie detail page:
- Displays back button (functional)
- Shows large spinner with "Loading movie details..." message

## How It Works

### Next.js Route-Level Loading

Next.js automatically wraps route components in Suspense when a `loading.tsx` file exists:

```
page.tsx (suspends during data fetch)
  ↓
loading.tsx (shows while waiting)
  ↓
page.tsx (renders when ready)
```

### Component-Level Suspense

For more control, we use manual Suspense boundaries:

```tsx
// Header renders immediately
<header>
  <h1>Popular Movies</h1>
</header>

// Only the movie grid shows skeleton
<Suspense fallback={<MovieGridSkeleton />}>
  <MovieList /> {/* async component */}
</Suspense>
```

**Benefits**:
- Header appears instantly
- Better perceived performance
- Progressive rendering

## CSS Animations

### Spinner Animation
- 4 rings rotating at different speeds
- Staggered animation delays (-0.45s, -0.3s, -0.15s)
- 1.2s rotation duration with cubic-bezier easing

### Skeleton Shimmer
- Gradient background moves from left to right
- 2s animation duration
- Pulse opacity effect for subtle movement

## Best Practices

1. **Use route-level loading for full page transitions**
   - Simple and automatic
   - Good for navigation loading states

2. **Use Suspense boundaries for granular control**
   - Keep static content visible
   - Load dynamic content progressively
   - Better user experience

3. **Match skeleton to actual content**
   - Reduces layout shift
   - Improves perceived performance
   - Maintains visual consistency

4. **Keep loading messages clear and helpful**
   - "Loading movies..." not just "Loading..."
   - Helps users understand what's happening

## Testing Loading States

To see loading states in development:

1. **Slow down your network** in browser DevTools
   - Open DevTools → Network tab
   - Throttle to "Slow 3G"

2. **Add artificial delay** (for testing):
   ```tsx
   // In getMovieDetails or getPopularMovies
   await new Promise(resolve => setTimeout(resolve, 2000));
   ```

3. **Navigate between pages** to trigger loading states

## Performance Impact

- **No runtime overhead**: Loading states only show during actual loading
- **Better perceived performance**: Users see progress instead of blank screens
- **Progressive enhancement**: Static content renders first, dynamic content streams in
- **Reduced layout shift**: Skeleton matches final content dimensions

## Future Enhancements

Potential improvements:

- Add loading progress indicators
- Implement optimistic UI updates
- Add smooth transitions between states
- Cache loading states for faster subsequent loads
