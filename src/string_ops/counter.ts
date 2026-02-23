import { FileOp } from '@/string_ops/file_op';
import { extractFileNameAndExtension } from '@/utils/extract_name';

export class CounterOp extends FileOp {
  protected _includeExtension: boolean;
  protected _counterStart: number;
  protected _position: number;
  protected _paddedLength: number;
  protected _paddingChar: string;
  protected _fromStart: boolean;

  constructor(opt: {
    counterStart?: number;
    position?: number;
    paddedLength?: number;
    paddingChar?: string;
    fromStart?: boolean;
    includeExtension?: boolean;
  }) {
    super();

    this._counterStart = opt.counterStart ?? 1;
    this._position = opt.position ?? 0;
    this._paddedLength = opt.paddedLength ?? 0;
    this._paddingChar = opt.paddingChar ?? '0';
    this._fromStart = opt.fromStart ?? true;
    this._includeExtension = opt.includeExtension ?? false;
  }

  protected getCounterValue(index: number): string {
    const num = this._counterStart + index;
    return `${num}`.padStart(this._paddedLength, this._paddingChar);
  }

  protected fromStart(filename: string, index: number): string {
    const num = this.getCounterValue(index);

    const firstPart = filename.slice(0, this._position);
    const secondPart = filename.slice(this._position);

    return `${firstPart}${num}${secondPart}`;
  }

  protected fromEnd(filename: string, index: number): string {
    const num = this.getCounterValue(index);

    if (!this._includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);

      const firstPart = name.slice(0, name.length - this._position);
      const secondPart = name.slice(name.length - this._position);

      return `${firstPart}${num}${secondPart}${extension}`;
    }

    const firstPart = filename.slice(0, filename.length - this._position);
    const secondPart = filename.slice(filename.length - this._position);

    return `${firstPart}${num}${secondPart}`;
  }

  apply(filename: string, index: number): string {
    if (this._fromStart) {
      return this.fromStart(filename, index);
    } else {
      return this.fromEnd(filename, index);
    }
  }
}
