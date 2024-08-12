import type { AvailableTaskQuestionsQuery } from '#/components/form-components/createQuestion/graphql/__generated__/available-questions.generated';
import type { FormInstance } from 'antd';

import { useCreateOrAddQuestionMutation } from '#/components/form-components/addQuestion/graphql/__generated__/create-question.generated';
import { useAvailableTaskQuestionsQuery } from '#/components/form-components/createQuestion/graphql/__generated__/available-questions.generated';
import { Form, notification } from 'antd';
import { AnswerType, QuestionModel } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import errorNotification from '../../../types/mutation_notifications/error_notification';

interface Return {
  data: FormData;
  form: FormInstance<FormData>;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  questionData: AvailableTaskQuestionsQuery | undefined;
  saving: boolean;
}

export interface FormData {
  options: string[];
  question: string;
  selectedId: string;
  type: AnswerType;
}

const { useForm } = Form;

interface Props {
  ids?: string[];
  onClose: () => void;
  update: (id: string, question: string) => void;
}

const useCreateQuestion = ({ ids, onClose, update }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [data] = useState<FormData>({
    options: [],
    question: '',
    selectedId: '',
    type: AnswerType.String,
  });

  const { data: questionData, loading } = useAvailableTaskQuestionsQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: ids || [],
    },
  });

  const [addQuestion] = useCreateOrAddQuestionMutation({
    onCompleted: (res) => {
      update(
        res.addQuestion?.id || '',
        res.addQuestion?.questionFormatted || ''
      );
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The operation was successful!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successful!',
        }),

        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (values: FormData) => {
    setSaving(true);
    if (values.selectedId) {
      update(values.selectedId || '', values.question || '');
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The question has been successfully created!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully created!',
        }),

        placement: 'bottomRight',
      });
      onClose();
    } else {
      const dataToSubmit = {
        model: QuestionModel.Task,
        options: values.options,
        question: values.question,
        type: values.type,
      };
      void addQuestion({
        variables: {
          data: { ...dataToSubmit },
        },
      });
    }
  };
  return { data, form, loading, onSubmit, questionData, saving };
};

export default useCreateQuestion;
