import { CounterOp } from '@/string_ops/counter';

describe('counter ops', () => {
  describe('CounterOp', () => {
    test('should insert counter at the start when position is 0', () => {
      const op = new CounterOp({ counterStart: 1, position: 0 });
      const result = op.apply('file.txt', 0);
      expect(result).toBe('1file.txt');
    });

    test('should insert counter at the specified position', () => {
      const op = new CounterOp({ counterStart: 1, position: 4 });
      const result = op.apply('document.txt', 0);
      expect(result).toBe('docu1ment.txt');
    });

    test('should use index to increment counter', () => {
      const op = new CounterOp({ counterStart: 3, position: 0 });
      const result = op.apply('file.txt', 2);
      expect(result).toBe('5file.txt');
    });

    test('should append when position is greater than filename length', () => {
      const op = new CounterOp({ counterStart: 1, position: 200 });
      const result = op.apply('file.txt', 0);
      expect(result).toBe('file.txt1');
    });

    test('should handle an empty filename', () => {
      const op = new CounterOp({ counterStart: 7, position: 0 });
      const result = op.apply('', 0);
      expect(result).toBe('7');
    });

    test('should add the counter to the end of the filename prior to the extension when fromStart is set to false', () => {
      const op = new CounterOp({ fromStart: false });
      const result = op.apply('file.txt', 0);
      expect(result).toBe('file1.txt');
    });

    test('should add the counter to the end of the filename after the extension when fromStart is set to false and includeExtension is true', () => {
      const op = new CounterOp({ fromStart: false, includeExtension: true });
      const result = op.apply('file.txt', 0);
      expect(result).toBe('file.txt1');
    });

    test('should pad the counter value with the specified length', () => {
      const op = new CounterOp({
        counterStart: 1,
        paddedLength: 3,
      });
      const result = op.apply('file.txt', 0);
      expect(result).toBe('001file.txt');
    });

    test('should pad the counter value with the specified character', () => {
      const op = new CounterOp({
        counterStart: 1,
        paddedLength: 3,
        paddingChar: 'a',
      });
      const result = op.apply('file.txt', 0);
      expect(result).toBe('aa1file.txt');
    });
  });
});
