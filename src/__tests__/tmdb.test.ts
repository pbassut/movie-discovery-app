import { imageUrl, releaseDate, voteAverage } from '@/services/tmdb';

describe('TMDB Service Utilities', () => {
  describe('imageUrl', () => {
    it('should return correct image URL with default size', () => {
      const path = '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg';
      const result = imageUrl(path);
      expect(result).toBe('https://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg');
    });

    it('should return correct image URL with custom size', () => {
      const path = '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg';
      const result = imageUrl(path, 'w500');
      expect(result).toBe('https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg');
    });

    it('should return null for null path', () => {
      const result = imageUrl(null);
      expect(result).toBeNull();
    });

    it('should handle original size', () => {
      const path = '/test.jpg';
      const result = imageUrl(path, 'original');
      expect(result).toBe('https://image.tmdb.org/t/p/original/test.jpg');
    });
  });

  describe('releaseDate', () => {
    it('should format date correctly', () => {
      const date = '2024-01-15';
      const result = releaseDate(date);
      expect(result).toBe('January 15, 2024');
    });

    it('should return "Unknown" for empty string', () => {
      const result = releaseDate('');
      expect(result).toBe('Unknown');
    });

    it('should handle different date formats', () => {
      const date = '2023-12-25';
      const result = releaseDate(date);
      expect(result).toBe('December 25, 2023');
    });
  });

  describe('voteAverage', () => {
    it('should format vote average to one decimal place', () => {
      expect(voteAverage(8.567)).toBe('8.6');
      expect(voteAverage(7.123)).toBe('7.1');
      expect(voteAverage(10)).toBe('10.0');
    });

    it('should handle zero rating', () => {
      expect(voteAverage(0)).toBe('0.0');
    });

    it('should round correctly', () => {
      expect(voteAverage(8.95)).toBe('9.0');
      expect(voteAverage(8.94)).toBe('8.9');
    });
  });
});
