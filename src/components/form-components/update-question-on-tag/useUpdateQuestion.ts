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
import type { TagQuestion } from './UpdateQuestion.container';

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
  dependentOn: string;
  dependentAnswer: string;
}

const { useForm } = Form;

interface Props {
  onClose: () => void;
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      tagQuestionId: string;
      questionId: string;
      answer: string;
    }
  ) => void;
  tagQId: string;
  questionId: string;
  required: boolean;
  tagQuestions: TagQuestion[];
  dependent?: {
    dependentOn: string;
    dependentAnswer: string;
  };
}

const useUpdateQuestion = ({
  onClose,
  tagQId,
  questionId,
  required,
  updateQuestionOnTag,
  tagQuestions,
  dependent,
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
    dependentOn: '',
    dependentAnswer: '',
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
      const checkExists = tagQuestions.find(
        (tagQ) => tagQ.questionId === questionId
      );

      setData({
        type: questionData.question?.type || AnswerType.String,
        required,
        origQuestion: questionData.question?.question || '',
        newQuestion: questionData.question?.questionFormatted || '',
        newOptions: questionData.question?.optionsFormatted || [],
        origOptions: formatOption(),
        dependentOn: checkExists ? dependent?.dependentOn || '' : '',
        dependentAnswer: checkExists ? dependent?.dependentAnswer || '' : '',
      });

      form.setFieldsValue({
        type: questionData.question?.type || AnswerType.String,
        required,
        origQuestion: questionData.question?.question || '',
        newQuestion: questionData.question?.questionFormatted || '',
        newOptions: questionData.question?.optionsFormatted || [],
        origOptions: formatOption(),
        dependentOn: checkExists ? dependent?.dependentOn || '' : '',
        dependentAnswer: checkExists ? dependent?.dependentAnswer || '' : '',
      });
    }
  }, [questionData, required]);

  const onSubmit = (values: FormData) => {
    setSaving(true);

    const dependentOnTag = tagQuestions.find(
      (tagQ) => tagQ.tagQuestionId === values.dependentOn
    );
    updateQuestionOnTag(
      values.newQuestion,
      questionId,
      dependentOnTag
        ? {
            tagQuestionId: dependentOnTag?.tagQuestionId,
            questionId: dependentOnTag?.questionId,
            answer: values.dependentAnswer,
          }
        : undefined
    );

    void updateQuestion({
      variables: {
        data: {
          newOptions: values.newOptions,
          newQuestion: values.newQuestion,
          origOptions: data.origOptions,
          origQuestion: data.origQuestion,
          questionId,
          dependentAnswer: values.dependentAnswer ?? undefined,
          dependentOnQId: dependentOnTag?.questionId,
          dependentOnTagQId: values.dependentOn ?? undefined,
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
