import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function getFileList(directory: string) {
  // Get list of files
  const files = await readdir(directory);
  const fileList = (
    await Promise.all(
      files.map(async (file) => {
        const fullPath = join(directory, file);
        const fileStat = await stat(fullPath);
        return fileStat.isFile() ? file : null;
      }),
    )
  ).filter((file): file is string => file !== null);

  return fileList;
}
