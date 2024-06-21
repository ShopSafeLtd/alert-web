import type React from 'react';

import moment from 'moment';
import { AnswerType } from 'graphql/types';

const formatAnswer = (value: string, type: AnswerType): React.ReactNode => {
  if (type === AnswerType.Date) return moment(value).format('DD/MM/YYYY');
  return value;
};

export default formatAnswer;
