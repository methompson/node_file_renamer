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

    test('should apply prefix and suffix around the counter', () => {
      const op = new CounterOp({
        counterStart: 10,
        position: 2,
        prefix: '_',
        suffix: '-v',
      });
      const result = op.apply('file.txt', 1);
      expect(result).toBe('fi_11-vle.txt');
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
  });
});
