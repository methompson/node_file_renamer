export abstract class FileOp {
  abstract apply(filename: string, index: number): string;
}
