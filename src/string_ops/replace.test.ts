import { describe, expect, it } from 'vitest';
import { ReplaceOp } from './replace';

describe('ReplaceOp', () => {
  it('should replace the first occurrence of a string', () => {
    const op = new ReplaceOp({ searchValue: 'foo', replaceValue: 'baz' });
    const result = op.apply('foo bar foo');
    expect(result).toBe('baz bar baz');
  });

  it('should replace all occurrences with a global regex', () => {
    const op = new ReplaceOp({ searchValue: /foo/g, replaceValue: 'baz' });
    const result = op.apply('foo bar foo');
    expect(result).toBe('baz bar baz');
  });

  it('should handle regex groups in the replacement', () => {
    const op = new ReplaceOp({
      searchValue: /(file)_v(\d+)/g,
      replaceValue: '$1_v$2_backup',
    });
    const result = op.apply('file_v1.txt');
    expect(result).toBe('file_v1_backup.txt');
  });

  it('should return the original string when no match is found', () => {
    const op = new ReplaceOp({ searchValue: 'missing', replaceValue: 'x' });
    const result = op.apply('hello world');
    expect(result).toBe('hello world');
  });

  it('should allow empty replacement', () => {
    const op = new ReplaceOp({ searchValue: '-', replaceValue: '' });
    const result = op.apply('remove-me');
    expect(result).toBe('removeme');
  });

  it('should work with special characters', () => {
    const op = new ReplaceOp({ searchValue: '+', replaceValue: '-' });
    const result = op.apply('a+b+c');
    expect(result).toBe('a-b-c');
  });

  test('should replace the extension if includeExtension is true', () => {
    const op = new ReplaceOp({
      searchValue: 'txt',
      replaceValue: 'md',
      includeExtension: true,
    });

    const result = op.apply('file.txt');
    expect(result).toBe('file.md');
  });

  test('should not replace the extension if includeExtension is false', () => {
    const op = new ReplaceOp({
      searchValue: 'txt',
      replaceValue: 'md',
      includeExtension: false,
    });

    const result = op.apply('file.txt');
    expect(result).toBe('file.txt');
  });

  test('should handle an empty search value by returning the original string', () => {
    const op = new ReplaceOp({ searchValue: '', replaceValue: 'x' });
    const result = op.apply('hello world');
    expect(result).toBe('hello world');
  });
});
