import { useParams } from 'react-router-dom';
import { useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useIntl } from 'react-intl';
import type { AvailableQuestionsQuery } from '../../../graphql/generated';
import {
  AnswerType,
  useAvailableQuestionsQuery,
  useCreateOrAddQuestionMutation,
} from '../../../graphql/generated';
import errorNotification from '../../../types/error_notification';

interface Return {
  questionData: AvailableQuestionsQuery | undefined;
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
  required: boolean;
}

const { useForm } = Form;

interface Props {
  onClose: () => void;
}

const useAddQuestion = ({ onClose }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const { data: questionData, loading } = useAvailableQuestionsQuery({
    variables: {
      where: {
        id: id || '',
      },
    },
  });

  const [form] = useForm<FormData>();
  const [data] = useState<FormData>({
    selectedId: '',
    type: AnswerType.String,
    options: [],
    question: '',
    required: false,
  });

  const [addQuestion] = useCreateOrAddQuestionMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully created/added!',
          id: 'Qdgb9w',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The question has been succesfully created/added!',
          id: '1UtqCZ',
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
    const dataToSubmit = {
      question: values.question,
      options: values.options,
      required: values.required,
      type: values.type,
      tagId: id || '',
    };
    void addQuestion({
      variables: values.selectedId
        ? {
            where: {
              id: values.selectedId || '',
            },
            data: { ...dataToSubmit },
          }
        : {
            data: { ...dataToSubmit },
          },
    });
  };
  return { data, loading, form, questionData, onSubmit, saving };
};

export default useAddQuestion;
