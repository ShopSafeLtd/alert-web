import type { FormInstance } from 'antd';

import { useUpdateQuestionOnActivityMutation } from '#/components/form-components/update-question-on-activity/graphql/__generated__/update-question.generated';
import { useQuestionDetailsQuery } from '#/components/form-components/update-question-on-tag/graphql/__generated__/get-question.generated';
import { Form, notification } from 'antd';
import { AnswerType } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import errorNotification from '../../../types/mutation_notifications/error_notification';

interface Return {
  data: FormData;
  form: FormInstance<FormData>;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

export interface FormData {
  newOptions: string[];
  newQuestion: string;
  origOptions: string[];
  origQuestion: string;
  type: AnswerType;
}

const { useForm } = Form;

interface Props {
  onClose: () => void;
  questionId: string;
  required: boolean;
}

const useUpdateQuestion = ({
  onClose,
  questionId,
  required,
}: Props): Return => {
  const intl = useIntl();
  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<FormData>({
    newOptions: [],
    newQuestion: '',
    origOptions: [],
    origQuestion: '',
    type: AnswerType.String,
  });
  const { data: questionData, loading } = useQuestionDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: questionId || '',
      },
    },
  });

  const [updateQuestion] = useUpdateQuestionOnActivityMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The question has been succesfully updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully updated!',
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

  useEffect(() => {
    if (questionData) {
      const formatOption = () => {
        const options = questionData.question?.options[0] as {
          [key: string]: string[];
        };
        if (options) {
          return options.en;
        }
        return [];
      };

      setData({
        newOptions: questionData.question?.optionsFormatted || [],
        newQuestion: questionData.question?.questionFormatted || '',
        origOptions: formatOption(),
        origQuestion: questionData.question?.question || '',
        type: questionData.question?.type,
      });

      form.setFieldsValue({
        newOptions: questionData.question?.optionsFormatted || [],
        newQuestion: questionData.question?.questionFormatted || '',
        origOptions: formatOption(),
        origQuestion: questionData.question?.question || '',
        type: questionData.question?.type,
      });
    }
  }, [questionData, required]);

  const onSubmit = (values: FormData) => {
    setSaving(true);

    void updateQuestion({
      variables: {
        data: {
          newOptions: values.newOptions,
          newQuestion: values.newQuestion,
          origOptions: data.origOptions,
          origQuestion: data.origQuestion,
          questionId,
          type: values.type === data.type ? undefined : values.type,
        },
      },
    });
  };

  return {
    data,
    form,
    loading,
    onSubmit,
    saving,
  };
};

export default useUpdateQuestion;
