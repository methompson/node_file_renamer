import { FileOp } from '@/string_ops/file_op';
import { extractFileNameAndExtension } from '@/utils/extract_name';

export class InsertStartOp extends FileOp {
  protected insertStr: string;
  protected position: number;
  protected includeExtension: boolean;

  constructor(opt: {
    insertStr: string;
    position: number;
    includeExtension?: boolean;
  }) {
    super();

    this.insertStr = opt.insertStr;
    this.position = opt.position;
    this.includeExtension = opt.includeExtension ?? false;
  }

  apply(filename: string): string {
    if (!this.includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);

      const newName = `${name.substring(0, this.position)}${this.insertStr}${name.substring(this.position)}`;

      return `${newName}${extension}`;
    }

    const newName = `${filename.substring(0, this.position)}${this.insertStr}${filename.substring(this.position)}`;

    return newName;
  }
}

/**
 * FileOp that inserts a string at a specified position at the end of the
 * filename. If the position is greater than the filename length, it will
 * insert at the end of the filename.
 */
export class InsertEndOp extends FileOp {
  protected insertStr: string;
  protected position: number;
  protected includeExtension: boolean;

  constructor(opt: {
    insertStr: string;
    position: number;
    includeExtension?: boolean;
  }) {
    super();

    this.insertStr = opt.insertStr;
    this.position = opt.position;
    this.includeExtension = opt.includeExtension ?? false;
  }

  protected rename(name: string) {
    const firstPart = name.substring(0, name.length - this.position);
    const secondPart = name.substring(name.length - this.position);

    return `${firstPart}${this.insertStr}${secondPart}`;
  }

  apply(filename: string): string {
    if (!this.includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);

      const newName = this.rename(name);

      return `${newName}${extension}`;
    }

    return this.rename(filename);
  }
}
