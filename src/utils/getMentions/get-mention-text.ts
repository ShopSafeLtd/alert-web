import { Mentions } from 'antd';
import type { SchemeUserData } from '../../types/DataType';

/**
 *
 * @param user list
 * @returns mention user data
 */

const { getMentions } = Mentions;

export const appendDuplicates = (arr: SchemeUserData[]) => {
  // to store number of instances for each type
  const counts: { [key: string]: number } = {};

  const fullNames = arr.map((elem) => {
    if (counts[elem.fullName] === undefined) {
      counts[elem.fullName] = 0;
      return `[${elem.id}]${elem.fullName}`;
    }
    counts[elem.fullName] += 1;
    return `[${elem.id}]${elem.fullName}_${counts[elem.fullName]}`;
  });

  return arr.map((item) => ({
    ...item,
    fullName:
      fullNames
        .find((name) => name.split('[')[1].split(']')[0] === item.id)
        ?.split(']')[1]
        .replace(/ /g, '_') || '',
  }));
};

export const getText = (
  text: string,
  schemeUsers: SchemeUserData[] | Map<string, SchemeUserData> | undefined
) => {
  const mentions = getMentions(text);
  let newText = text;

  if (typeof schemeUsers === 'object' && schemeUsers instanceof Map) {
    // eslint-disable-next-line no-restricted-syntax
    for (const mention of mentions) {
      const mentioned = schemeUsers?.get(mention.value);

      if (mentioned)
        newText = newText.replace(
          `@${mention.value}`,
          `@[${mentioned.oldFullName}]`
        );
    }
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const mention of mentions) {
      const mentioned = schemeUsers?.find(
        (member) => mention.value === member.fullName
      );

      if (mentioned)
        newText = newText.replace(
          `@${mention.value}`,
          `@[${mentioned.oldFullName}]`
        );
    }
  }
  return newText;
};
export const getChatListContent = (content: string) =>
  content.replace(/@\[([^]+?)]/g, '@$1');
