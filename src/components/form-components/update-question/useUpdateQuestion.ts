import { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useIntl } from 'react-intl';
import {
  AnswerType,
  useQuestionDetailsQuery,
  useUpdateQuestionOnTagMutation,
} from '../../../graphql/generated';
import errorNotification from '../../../types/error_notification';

interface Return {
  loading: boolean;
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

export interface FormData {
  origQuestion: string;
  newQuestion: string;
  type: AnswerType;
  origOptions: string[];
  newOptions: string[];
  required: boolean;
}

const { useForm } = Form;

interface Props {
  onClose: () => void;
  updateQuestionOnTag: (question: string, tagId: string) => void;
  tagQId: string;
  questionId: string;
  required: boolean;
}

const useUpdateQuestion = ({
  onClose,
  tagQId,
  questionId,
  required,
  updateQuestionOnTag,
}: Props): Return => {
  const intl = useIntl();

  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<FormData>({
    type: AnswerType.String,
    required: false,
    origQuestion: '',
    newQuestion: '',
    origOptions: [],
    newOptions: [],
  });

  const { data: questionData, loading } = useQuestionDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: questionId || '',
      },
    },
  });

  const [updateQuestion] = useUpdateQuestionOnTagMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully updated!',
          id: 'zJzbfm',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The question has been succesfully updated!',
          id: 'WKHyMr',
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
        type: questionData.question?.type || AnswerType.String,
        required,
        origQuestion: questionData.question?.question || '',
        newQuestion: questionData.question?.questionFormatted || '',
        newOptions: questionData.question?.optionsFormatted || [],
        origOptions: formatOption(),
      });

      form.setFieldsValue({
        type: questionData.question?.type || AnswerType.String,
        required,
        origQuestion: questionData.question?.question || '',
        newQuestion: questionData.question?.questionFormatted || '',
        newOptions: questionData.question?.optionsFormatted || [],
        origOptions: formatOption(),
      });
    }
  }, [questionData, required]);

  const onSubmit = (values: FormData) => {
    setSaving(true);

    updateQuestionOnTag(values.newQuestion, questionId);

    void updateQuestion({
      variables: {
        data: {
          newOptions: values.newOptions,
          newQuestion: values.newQuestion,
          origOptions: data.origOptions,
          origQuestion: data.origQuestion,
          questionId,
          tag: {
            id: tagQId,
            req: values.required,
          },
        },
      },
    });
  };
  return { data, loading, form, onSubmit, saving };
};

export default useUpdateQuestion;
