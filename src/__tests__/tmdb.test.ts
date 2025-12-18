import { getImageUrl, formatReleaseDate, formatVoteAverage } from '@/services/tmdb';

describe('TMDB Service Utilities', () => {
  describe('getImageUrl', () => {
    it('should return correct image URL with default size', () => {
      const path = '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg';
      const result = getImageUrl(path);
      expect(result).toBe('https://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg');
    });

    it('should return correct image URL with custom size', () => {
      const path = '/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg';
      const result = getImageUrl(path, 'w500');
      expect(result).toBe('https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg');
    });

    it('should return null for null path', () => {
      const result = getImageUrl(null);
      expect(result).toBeNull();
    });

    it('should handle original size', () => {
      const path = '/test.jpg';
      const result = getImageUrl(path, 'original');
      expect(result).toBe('https://image.tmdb.org/t/p/original/test.jpg');
    });
  });

  describe('formatReleaseDate', () => {
    it('should format date correctly', () => {
      const date = '2024-01-15';
      const result = formatReleaseDate(date);
      expect(result).toBe('January 15, 2024');
    });

    it('should return "Unknown" for empty string', () => {
      const result = formatReleaseDate('');
      expect(result).toBe('Unknown');
    });

    it('should handle different date formats', () => {
      const date = '2023-12-25';
      const result = formatReleaseDate(date);
      expect(result).toBe('December 25, 2023');
    });
  });

  describe('formatVoteAverage', () => {
    it('should format vote average to one decimal place', () => {
      expect(formatVoteAverage(8.567)).toBe('8.6');
      expect(formatVoteAverage(7.123)).toBe('7.1');
      expect(formatVoteAverage(10)).toBe('10.0');
    });

    it('should handle zero rating', () => {
      expect(formatVoteAverage(0)).toBe('0.0');
    });

    it('should round correctly', () => {
      expect(formatVoteAverage(8.95)).toBe('9.0');
      expect(formatVoteAverage(8.94)).toBe('8.9');
    });
  });
});
