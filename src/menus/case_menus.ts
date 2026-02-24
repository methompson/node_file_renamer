import { select } from '@inquirer/prompts';

import { FileOp } from '@/string_ops/file_op';
import {
  ToLowerCaseOp,
  ToUpperCaseOp,
  ToTitleCaseOp,
  ToSentenceCaseOp,
} from '@/string_ops/case';
import { showFileListPreview } from '@/utils/file_preview';

export async function configureCaseOp(
  files: string[],
): Promise<FileOp | undefined> {
  let includeExtension = false;
  let op: ToLowerCaseOp | ToUpperCaseOp | ToTitleCaseOp | ToSentenceCaseOp =
    new ToLowerCaseOp({ includeExtension });

  let caseTypeName: 'lowercase' | 'UPPERCASE' | 'Title Case' | 'Sentence case' =
    'lowercase';

  while (true) {
    console.clear();

    if (caseTypeName === 'lowercase') {
      op = new ToLowerCaseOp({ includeExtension });
    } else if (caseTypeName === 'UPPERCASE') {
      op = new ToUpperCaseOp({ includeExtension });
    } else if (caseTypeName === 'Title Case') {
      op = new ToTitleCaseOp();
    } else if (caseTypeName === 'Sentence case') {
      op = new ToSentenceCaseOp();
    }

    const toShow = op ? [op] : [];
    showFileListPreview(files, toShow);

    const caseType = await select({
      message: 'Select case operation. Current: ' + caseTypeName,
      choices: [
        { name: 'lowercase', value: 'lowercase' },
        { name: 'UPPERCASE', value: 'uppercase' },
        { name: 'Title Case', value: 'titlecase' },
        { name: 'Sentence case', value: 'sentencecase' },
        {
          name: `Include extension? ${includeExtension ? 'Yes' : 'No'}`,
          value: 'toggleExtension',
        },
        { name: 'Apply', value: 'apply' },
        { name: 'Cancel', value: 'cancel' },
      ],
    });

    switch (caseType) {
      case 'lowercase': {
        caseTypeName = 'lowercase';
        break;
      }
      case 'uppercase': {
        caseTypeName = 'UPPERCASE';
        break;
      }
      case 'titlecase': {
        caseTypeName = 'Title Case';
        break;
      }
      case 'sentencecase': {
        caseTypeName = 'Sentence case';
        break;
      }
      case 'toggleExtension': {
        includeExtension = !includeExtension;
        break;
      }
      case 'apply': {
        return op;
      }
      case 'cancel': {
        return undefined;
      }
    }
  }
}
