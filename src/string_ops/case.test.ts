import {
  ToLowerCaseOp,
  ToUpperCaseOp,
  ToTitleCaseOp,
  ToSentenceCaseOp,
} from '@/string_ops/case';

describe('case ops', () => {
  describe('ToLowerCaseOp', () => {
    test('should lower case the name only when includeExtension is false', () => {
      const op = new ToLowerCaseOp();
      const result = op.apply('MyFile.TXT');
      expect(result).toBe('myfile.TXT');
    });

    test('should lower case the extension when includeExtension is true', () => {
      const op = new ToLowerCaseOp({ includeExtension: true });
      const result = op.apply('MyFile.TXT');
      expect(result).toBe('myfile.txt');
    });

    test('should preserve numbers and symbols with includeExtension false', () => {
      const op = new ToLowerCaseOp();
      const result = op.apply('File-2024_V2.TXT');
      expect(result).toBe('file-2024_v2.TXT');
    });

    test('should preserve numbers and symbols with includeExtension true', () => {
      const op = new ToLowerCaseOp({ includeExtension: true });
      const result = op.apply('File-2024_V2.TXT');
      expect(result).toBe('file-2024_v2.txt');
    });

    test('should handle an empty filename', () => {
      const op = new ToLowerCaseOp();
      const result = op.apply('');
      expect(result).toBe('');
    });
  });

  describe('ToUpperCaseOp', () => {
    test('should upper case the name only when includeExtension is false', () => {
      const op = new ToUpperCaseOp();
      const result = op.apply('MyFile.txt');
      expect(result).toBe('MYFILE.txt');
    });

    test('should upper case the extension when includeExtension is true', () => {
      const op = new ToUpperCaseOp({ includeExtension: true });
      const result = op.apply('MyFile.txt');
      expect(result).toBe('MYFILE.TXT');
    });

    test('should preserve numbers and symbols with includeExtension false', () => {
      const op = new ToUpperCaseOp();
      const result = op.apply('file-2024_v2.txt');
      expect(result).toBe('FILE-2024_V2.txt');
    });

    test('should preserve numbers and symbols with includeExtension true', () => {
      const op = new ToUpperCaseOp({ includeExtension: true });
      const result = op.apply('file-2024_v2.txt');
      expect(result).toBe('FILE-2024_V2.TXT');
    });

    test('should handle an empty filename', () => {
      const op = new ToUpperCaseOp();
      const result = op.apply('');
      expect(result).toBe('');
    });
  });

  describe('ToTitleCaseOp', () => {
    test('should title case each word', () => {
      const op = new ToTitleCaseOp();
      const result = op.apply('my sample file');
      expect(result).toBe('My Sample File');
    });

    test('should lower case the rest of each word', () => {
      const op = new ToTitleCaseOp();
      const result = op.apply('mIXeD cAsE tItLe');
      expect(result).toBe('Mixed Case Title');
    });

    test('should preserve multiple spaces between words', () => {
      const op = new ToTitleCaseOp();
      const result = op.apply('two  spaces   here');
      expect(result).toBe('Two  Spaces   Here');
    });

    test('should handle leading and trailing spaces', () => {
      const op = new ToTitleCaseOp();
      const result = op.apply('  padded text  ');
      expect(result).toBe('  Padded Text  ');
    });

    test('should handle an empty filename', () => {
      const op = new ToTitleCaseOp();
      const result = op.apply('');
      expect(result).toBe('');
    });
  });

  describe('ToSentenceCaseOp', () => {
    test('should upper case first character and lower case the rest', () => {
      const op = new ToSentenceCaseOp();
      const result = op.apply('my SAMPLE file');
      expect(result).toBe('My sample file');
    });

    test('should keep a single character uppercase', () => {
      const op = new ToSentenceCaseOp();
      const result = op.apply('x');
      expect(result).toBe('X');
    });

    test('should handle an empty filename', () => {
      const op = new ToSentenceCaseOp();
      const result = op.apply('');
      expect(result).toBe('');
    });

    test('should lower case the rest even if already sentence case', () => {
      const op = new ToSentenceCaseOp();
      const result = op.apply('Already Sentence');
      expect(result).toBe('Already sentence');
    });
  });
});
