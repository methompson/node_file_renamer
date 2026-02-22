export function extractFileNameAndExtension(filename: string) {
  const lastDotIndex = filename.lastIndexOf('.');

  if (lastDotIndex === -1) {
    return { name: filename, extension: '' };
  }

  const name = filename.substring(0, lastDotIndex);
  const extension = `.${filename.substring(lastDotIndex + 1)}`;

  return { name, extension };
}
