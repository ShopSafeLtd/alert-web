import React from 'react';

import View from './CreateQuestion.view';
import useCreateQuestion from './useCreateQuestion';

interface Props {
  ids?: string[];
  onClose: () => void;
  update: (id: string, question: string) => void;
}

/**
 * @param {Props} props
 * @param {() => void} onClose
 * @param {(id: string, question: string) => void} update
 * @param {string[] | undefined} ids
 * @returns {JSX.Element}
 * @constructor
 * For use with tasks
 */
const CreateQuestionContainer = ({
  ids,
  onClose,
  update,
}: Props): JSX.Element => {
  const { data, form, loading, onSubmit, questionData, saving } =
    useCreateQuestion({
      ids,
      onClose,
      update,
    });
  return (
    <View
      data={data}
      form={form}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      questionData={questionData}
      saving={saving}
    />
  );
};

export default CreateQuestionContainer;
