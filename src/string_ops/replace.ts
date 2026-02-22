import { FileOp } from '@/string_ops/file_op';
import { extractFileNameAndExtension } from '@/utils/extract_name';

/**
 * Should replace ALL occurrences of a string or regex pattern in the input
 * string with the specified replacement.
 */
export class ReplaceOp extends FileOp {
  protected searchValue: string | RegExp;
  protected replaceValue: string;
  protected includeExtension: boolean;

  constructor(opt: {
    searchValue: string | RegExp;
    replaceValue: string;
    includeExtension?: boolean;
  }) {
    super();

    this.searchValue = opt.searchValue;
    this.replaceValue = opt.replaceValue;
    this.includeExtension = opt.includeExtension ?? false;
  }

  apply(filename: string): string {
    if (!this.includeExtension) {
      const { name, extension } = extractFileNameAndExtension(filename);
      const newName = name.replaceAll(this.searchValue, this.replaceValue);
      return `${newName}${extension}`;
    }

    return filename.replaceAll(this.searchValue, this.replaceValue);
  }
}
