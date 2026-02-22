import { FileOp } from '@/string_ops/file_op';
import { extractFileNameAndExtension } from '../utils/extract_name';

export class TrimStartOp extends FileOp {
  protected trimLength: number;
  protected includeExtension: boolean;

  constructor(options: { trimLength: number; includeExtension?: boolean }) {
    super();
    this.trimLength = options.trimLength;
    this.includeExtension = options.includeExtension ?? false;
  }

  apply(filename: string): string {
    if (this.trimLength < 0) {
      return filename;
    }

    if (!this.includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);

      return `${name.substring(this.trimLength)}${extension}`;
    }

    return filename.substring(this.trimLength);
  }
}

export class TrimEndOp extends FileOp {
  protected trimLength: number;
  protected includeExtension: boolean;

  constructor(options: { trimLength: number; includeExtension?: boolean }) {
    super();
    this.trimLength = options.trimLength;
    this.includeExtension = options.includeExtension ?? false;
  }

  apply(filename: string): string {
    if (this.trimLength < 0) {
      return filename;
    }

    if (!this.includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);
      return `${name.substring(0, name.length - this.trimLength)}${extension}`;
    }

    return filename.substring(0, filename.length - this.trimLength);
  }
}

export class TrimBetweenOp extends FileOp {
  protected startIndex: number;
  protected endIndex: number;
  protected includeExtension: boolean;

  constructor(options: {
    startIndex: number;
    endIndex: number;
    includeExtension?: boolean;
  }) {
    super();
    this.startIndex = options.startIndex;
    this.endIndex = options.endIndex;
    this.includeExtension = options.includeExtension ?? false;
  }

  rename(filename: string): string {
    const firstPart = filename.substring(0, this.startIndex);
    const secondPart = filename.substring(this.endIndex);
    return `${firstPart}${secondPart}`;
  }

  apply(filename: string): string {
    if (
      this.startIndex < 0 ||
      this.endIndex < 0 ||
      this.startIndex > this.endIndex
    ) {
      return filename;
    }

    if (!this.includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);
      return `${this.rename(name)}${extension}`;
    }

    return this.rename(filename);
  }
}
