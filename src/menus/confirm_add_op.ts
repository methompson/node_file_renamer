import { confirm } from '@inquirer/prompts';

import { showFileListPreview } from '@/utils/file_preview';

export async function confirmAddOp(files, op): Promise<boolean> {
  showFileListPreview(files, [op]);
  const confirmOp = await confirm({
    message: 'Add this operation to the list?',
    default: true,
  });
  return confirmOp;
}
