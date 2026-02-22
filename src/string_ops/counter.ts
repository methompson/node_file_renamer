import { FileOp } from '@/string_ops/file_op';

export class CounterOp extends FileOp {
  protected _counterStart: number;
  protected _position: number;
  protected _prefix: string;
  protected _suffix: string;

  constructor(opt: {
    counterStart?: number;
    position?: number;
    prefix?: string;
    suffix?: string;
  }) {
    super();

    this._counterStart = opt.counterStart ?? 1;
    this._position = opt.position ?? 0;
    this._prefix = opt.prefix ?? '';
    this._suffix = opt.suffix ?? '';
  }

  apply(filename: string, index: number): string {
    const num = this._counterStart + index;

    const firstPart = filename.slice(0, this._position);
    const secondPart = filename.slice(this._position);

    return `${firstPart}${this._prefix}${num}${this._suffix}${secondPart}`;
  }
}
