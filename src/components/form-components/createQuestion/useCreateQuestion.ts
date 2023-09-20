import { useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useIntl } from 'react-intl';
import type { AvailableTaskQuestionsQuery } from '../../../graphql/generated';
import {
  AnswerType,
  QuestionModel,
  useAvailableTaskQuestionsQuery,
  useCreateOrAddQuestionMutation,
} from '../../../graphql/generated';
import errorNotification from '../../../types/mutation_notifications/error_notification';

interface Return {
  questionData: AvailableTaskQuestionsQuery | undefined;
  loading: boolean;
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

export interface FormData {
  selectedId: string;
  type: AnswerType;
  options: string[];
  question: string;
}

const { useForm } = Form;

interface Props {
  onClose: () => void;
  update: (id: string, question: string) => void;
  ids?: string[];
}

const useCreateQuestion = ({ onClose, update, ids }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [data] = useState<FormData>({
    selectedId: '',
    type: AnswerType.String,
    options: [],
    question: '',
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
        message: intl.formatMessage({
          defaultMessage: 'Successful!',
          id: 'ELUYrG',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The operation was successful!',
          id: 'uQUHna',
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully created!',
          id: '2Ltm8W',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The question has been successfully created!',
          id: '8/Rflz',
        }),

        placement: 'bottomRight',
      });
      onClose();
    } else {
      const dataToSubmit = {
        question: values.question,
        options: values.options,
        type: values.type,
        model: QuestionModel.Task,
      };
      void addQuestion({
        variables: {
          data: { ...dataToSubmit },
        },
      });
    }
  };
  return { data, form, onSubmit, saving, questionData, loading };
};

export default useCreateQuestion;
