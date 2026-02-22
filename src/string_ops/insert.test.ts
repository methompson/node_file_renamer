import { InsertStartOp, InsertEndOp } from '@/string_ops/insert';

describe('insert ops', () => {
  describe('InsertStartOp', () => {
    test('should insert at the start of the filename with position is 0', () => {
      const op = new InsertStartOp({ insertStr: 'test-', position: 0 });
      const result = op.apply('file.txt');
      expect(result).toBe('test-file.txt');
    });

    test('should insert at the specified position', () => {
      const op = new InsertStartOp({ insertStr: '_v2', position: 4 });
      const result = op.apply('document.txt');
      expect(result).toBe('docu_v2ment.txt');
    });

    test('should insert at the end of the filename when position is greater than filename length', () => {
      const op = new InsertStartOp({ insertStr: '_end', position: 200 });
      const result = op.apply('file.txt');
      expect(result).toBe('file_end.txt');
    });

    test('should include the extension when includeExtension is true', () => {
      const op = new InsertStartOp({
        insertStr: '_postfix',
        position: 200,
        includeExtension: true,
      });
      const result = op.apply('file.txt');
      expect(result).toBe('file.txt_postfix');
    });

    test('should handle an empty file name', () => {
      const op = new InsertStartOp({ insertStr: 'test', position: 0 });
      const result = op.apply('');
      expect(result).toBe('test');
    });

    test('should handle an empty insert string', () => {
      const op = new InsertStartOp({ insertStr: '', position: 2 });
      const result = op.apply('file.txt');
      expect(result).toBe('file.txt');
    });

    test('should handle a period at the end of the filename', () => {
      const op = new InsertStartOp({ insertStr: 'x', position: 0 });
      const result = op.apply('file.');
      expect(result).toBe('xfile.');
    });

    test('should keep the period at the end when includeExtension is false', () => {
      const op = new InsertStartOp({ insertStr: 'x', position: 200 });
      const result = op.apply('file.');
      expect(result).toBe('filex.');
    });

    test('should handle a period at the start of the filename', () => {
      const op = new InsertStartOp({ insertStr: 'dir/', position: 0 });
      const result = op.apply('.txt');
      expect(result).toBe('dir/.txt');
    });

    test('should keep the extension at the end with a period at the start of the filename', () => {
      const op = new InsertStartOp({ insertStr: 'file', position: 10 });
      const result = op.apply('.txt');
      expect(result).toBe('file.txt');
    });

    test('should handle a filename with multiple periods', () => {
      const op = new InsertStartOp({ insertStr: '_backup', position: 20 });
      const result = op.apply('archive.tar.gz');
      expect(result).toBe('archive.tar_backup.gz');
    });
  });

  describe('InsertEndOp', () => {
    test('should insert at the end of the filename with position is 0', () => {
      const op = new InsertEndOp({ insertStr: '-test', position: 0 });
      const result = op.apply('file.txt');
      expect(result).toBe('file-test.txt');
    });

    test('should insert at the specified position', () => {
      const op = new InsertEndOp({ insertStr: '_v2', position: 4 });
      const result = op.apply('document.txt');
      expect(result).toBe('docu_v2ment.txt');
    });

    test('should ignore the extension when includeExtension is false', () => {
      const op = new InsertEndOp({ insertStr: '_suffix', position: 0 });
      const result = op.apply('file.txt');
      expect(result).toBe('file_suffix.txt');
    });

    test('should include the extension when includeExtension is true', () => {
      const op = new InsertEndOp({
        insertStr: '_postfix',
        position: 0,
        includeExtension: true,
      });
      const result = op.apply('file.txt');
      expect(result).toBe('file.txt_postfix');
    });

    test('should insert at the end of the filename when position is greater than filename length', () => {
      const op = new InsertEndOp({ insertStr: 'start_', position: 200 });
      const result = op.apply('file.txt');
      expect(result).toBe('start_file.txt');
    });

    test('should handle an empty file name', () => {
      const op = new InsertEndOp({ insertStr: 'test', position: 0 });
      const result = op.apply('');
      expect(result).toBe('test');
    });

    test('should handle an empty insert string', () => {
      const op = new InsertEndOp({ insertStr: '', position: 2 });
      const result = op.apply('file.txt');
      expect(result).toBe('file.txt');
    });

    test('should handle a period at the end of the filename', () => {
      const op = new InsertEndOp({ insertStr: 'x', position: 0 });
      const result = op.apply('file.');
      expect(result).toBe('filex.');
    });

    test('should handle a period at the start of the filename', () => {
      const op = new InsertEndOp({ insertStr: '/dir', position: 0 });
      const result = op.apply('.txt');
      expect(result).toBe('/dir.txt');
    });

    test('should handle a filename with multiple periods', () => {
      const op = new InsertEndOp({ insertStr: '_backup', position: 3 });
      const result = op.apply('archive.tar.gz');
      expect(result).toBe('archive._backuptar.gz');
    });
  });
});
