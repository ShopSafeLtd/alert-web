import type React from 'react';
import { AnswerType } from 'graphql/generated';
import moment from 'moment';

const formatAnswer = (value: string, type: AnswerType): React.ReactNode => {
  if (type === AnswerType.Date) return moment(value).format('DD/MM/YYYY');
  return value;
};

export default formatAnswer;
