export abstract class FileOp {
  abstract apply(filename: string, index: number): string;

  static applyAllToFile(
    filename: string,
    operations: FileOp[],
    index: number,
  ): string {
    const transformed = operations.reduce(
      (name, op) => op.apply(name, index),
      filename,
    );
    return transformed;
  }

  static applyAllToFiles(files: string[], operations: FileOp[]): string[] {
    return files.map((file, index) =>
      FileOp.applyAllToFile(file, operations, index),
    );
  }
}
