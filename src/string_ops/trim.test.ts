import { describe, expect, it } from 'vitest';
import { TrimStartOp, TrimEndOp, TrimBetweenOp } from './trim';

describe('trim', () => {
  describe('TrimStartOp', () => {
    it('should trim from the start of the name by default', () => {
      const result = new TrimStartOp({ trimLength: 3 }).apply('document.txt');
      expect(result).toBe('ument.txt');
    });

    it('should trim from the start when includeExtension=true', () => {
      const result = new TrimStartOp({
        trimLength: 3,
        includeExtension: true,
      }).apply('document.txt');
      expect(result).toBe('ument.txt');
    });

    it('should handle file with no extension', () => {
      const result = new TrimStartOp({ trimLength: 4 }).apply('document');
      expect(result).toBe('ment');
    });

    it('should handle file with only extension', () => {
      const result = new TrimStartOp({ trimLength: 2 }).apply('.txt');
      expect(result).toBe('.txt');
    });

    it('should handle file with a dot at the end', () => {
      const result = new TrimStartOp({ trimLength: 2 }).apply('file.');
      expect(result).toBe('le.');
    });

    it('should only consider the last dot as extension', () => {
      const result = new TrimStartOp({ trimLength: 8 }).apply('archive.tar.gz');
      expect(result).toBe('tar.gz');
    });

    it('should return original when trim length is negative', () => {
      const result = new TrimStartOp({ trimLength: -1 }).apply('document.txt');
      expect(result).toBe('document.txt');
    });

    it('should trim all characters when trim length exceeds name length', () => {
      const result = new TrimStartOp({
        trimLength: 10,
        includeExtension: true,
      }).apply('doc.txt');
      expect(result).toBe('');
    });

    it('should trim all characters but the extension when trim length exceeds total length', () => {
      const result = new TrimStartOp({
        trimLength: 20,
        includeExtension: false,
      }).apply('doc.txt');
      expect(result).toBe('.txt');
    });

    it('should handle empty string', () => {
      const result = new TrimStartOp({ trimLength: 3 }).apply('');
      expect(result).toBe('');
    });
  });

  describe('TrimEndOp', () => {
    it('should trim from the end of the name by default', () => {
      const result = new TrimEndOp({ trimLength: 3 }).apply('document.txt');
      expect(result).toBe('docum.txt');
    });

    it('should trim from the end when includeExtension=true', () => {
      const result = new TrimEndOp({
        trimLength: 3,
        includeExtension: true,
      }).apply('document.txt');
      expect(result).toBe('document.');
    });

    it('should handle file with no extension', () => {
      const result = new TrimEndOp({ trimLength: 4 }).apply('document');
      expect(result).toBe('docu');
    });

    it('should handle file with only extension', () => {
      const result = new TrimEndOp({ trimLength: 2 }).apply('.txt');
      expect(result).toBe('.txt');
    });

    it('should handle file with a dot at the end', () => {
      const result = new TrimEndOp({ trimLength: 2 }).apply('file.');
      expect(result).toBe('fi.');
    });

    it('should only consider the last dot as extension', () => {
      const result = new TrimEndOp({ trimLength: 4 }).apply('archive.tar.gz');
      expect(result).toBe('archive.gz');
    });

    it('should return original when trim length is negative', () => {
      const result = new TrimEndOp({ trimLength: -1 }).apply('document.txt');
      expect(result).toBe('document.txt');
    });

    it('should trim all characters when trim length exceeds name length', () => {
      const result = new TrimEndOp({ trimLength: 10 }).apply('doc.txt');
      expect(result).toBe('.txt');
    });

    it('should trim all characters when includeExtension=true and trim length exceeds length', () => {
      const result = new TrimEndOp({
        trimLength: 20,
        includeExtension: true,
      }).apply('doc.txt');
      expect(result).toBe('');
    });

    it('should handle empty string', () => {
      const result = new TrimEndOp({ trimLength: 3 }).apply('');
      expect(result).toBe('');
    });
  });

  describe('TrimBetweenOp', () => {
    test('should trim between specified indices by default', () => {
      const op = new TrimBetweenOp({ startIndex: 2, endIndex: 5 });
      const result = op.apply('document.txt');
      expect(result).toBe('doent.txt');
    });

    test('should trim from the start if startIndex is 0', () => {
      const op = new TrimBetweenOp({ startIndex: 0, endIndex: 3 });
      const result = op.apply('document.txt');
      expect(result).toBe('ument.txt');
    });

    test('should trim to the end if endIndex is greater than name length', () => {
      const op = new TrimBetweenOp({ startIndex: 3, endIndex: 100 });
      const result = op.apply('document.txt');
      expect(result).toBe('doc.txt');
    });

    test('should trim the extension if includeExtension=true and endIndex exceeds name length', () => {
      const op = new TrimBetweenOp({
        startIndex: 3,
        endIndex: 100,
        includeExtension: true,
      });
      const result = op.apply('document.txt');
      expect(result).toBe('doc');
    });

    test('should return original when startIndex is negative', () => {
      const op = new TrimBetweenOp({ startIndex: -1, endIndex: 5 });
      const result = op.apply('document.txt');
      expect(result).toBe('document.txt');
    });

    test('should return original when endIndex is negative', () => {
      const op = new TrimBetweenOp({ startIndex: 2, endIndex: -1 });
      const result = op.apply('document.txt');
      expect(result).toBe('document.txt');
    });

    test('should return original when startIndex is greater than endIndex', () => {
      const op = new TrimBetweenOp({ startIndex: 5, endIndex: 2 });
      const result = op.apply('document.txt');
      expect(result).toBe('document.txt');
    });

    test('should handle file with no extension', () => {
      const op = new TrimBetweenOp({ startIndex: 2, endIndex: 5 });
      const result = op.apply('document');
      expect(result).toBe('doent');
    });

    test('should handle file with only extension', () => {
      const op = new TrimBetweenOp({ startIndex: 0, endIndex: 2 });
      const result = op.apply('.txt');
      expect(result).toBe('.txt');
    });

    test('should handle file with a dot at the end', () => {
      const op = new TrimBetweenOp({ startIndex: 1, endIndex: 3 });
      const result = op.apply('file.');
      expect(result).toBe('fe.');
    });

    test('should only consider the last dot as extension', () => {
      const op = new TrimBetweenOp({ startIndex: 7, endIndex: 100 });
      const result = op.apply('archive.tar.gz');
      expect(result).toBe('archive.gz');
    });

    test('should handle empty string', () => {
      const op = new TrimBetweenOp({ startIndex: 0, endIndex: 5 });
      const result = op.apply('');
      expect(result).toBe('');
    });
  });
});
