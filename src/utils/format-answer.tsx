import type React from 'react';

import dayjs from 'dayjs';
import { AnswerType } from 'graphql/types';
import { FormattedMessage } from 'react-intl';

const formatAnswer = (value: string, type: AnswerType): React.ReactNode => {
  if (type === AnswerType.Date) console.log(value);
  if (type === AnswerType.Date)
    return value ? dayjs(value).format('DD/MM/YYYY') : '';
  if (type === AnswerType.Boolean)
    return value === 'true' ? (
      <FormattedMessage defaultMessage="Yes" />
    ) : (
      <FormattedMessage defaultMessage="No" />
    );
  return value;
};

export default formatAnswer;
