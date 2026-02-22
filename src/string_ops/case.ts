import { FileOp } from '@/string_ops/file_op';
import { extractFileNameAndExtension } from '../utils/extract_name';

export class ToLowerCaseOp extends FileOp {
  protected _includeExtension: boolean;
  constructor(opt: { includeExtension?: boolean } = {}) {
    super();
    this._includeExtension = opt.includeExtension ?? false;
  }

  apply(filename: string): string {
    if (this._includeExtension) {
      return filename.toLowerCase();
    }

    const { name, extension } = extractFileNameAndExtension(filename);
    return `${name.toLowerCase()}${extension}`;
  }
}

export class ToUpperCaseOp extends FileOp {
  protected _includeExtension: boolean;
  constructor(opt: { includeExtension?: boolean } = {}) {
    super();
    this._includeExtension = opt.includeExtension ?? false;
  }

  apply(filename: string): string {
    if (this._includeExtension) {
      return filename.toUpperCase();
    }

    const { name, extension } = extractFileNameAndExtension(filename);
    return `${name.toUpperCase()}${extension}`;
  }
}

export class ToTitleCaseOp extends FileOp {
  apply(filename: string): string {
    return filename
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}

export class ToSentenceCaseOp extends FileOp {
  apply(filename: string): string {
    if (filename.length === 0) {
      return filename;
    }

    return filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase();
  }
}
