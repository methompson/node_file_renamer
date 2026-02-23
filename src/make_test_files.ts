import { writeFile, mkdir } from 'fs/promises';

const dirName = 'test_files';

main();
async function main() {
  await mkdir(dirName, { recursive: true });

  const baseNum = 1020;
  for (let i = 0; i < 30; i++) {
    const fileName = `_file_with_extra_information_${baseNum + i}.txt`;
    await writeFile(`${dirName}/${fileName}`, `This is file ${baseNum + i}`);
  }
}
