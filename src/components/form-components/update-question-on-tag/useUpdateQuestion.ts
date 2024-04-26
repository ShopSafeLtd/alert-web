import { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import {
  AnswerType,
  useBrandsQuery,
  useQuestionDetailsQuery,
  useUpdateQuestionOnTagMutation,
} from 'graphql/generated';
import errorNotification from '../../../types/mutation_notifications/error_notification';
import type { TagQuestion } from './UpdateQuestion.container';

interface Return {
  loading: boolean;
  form: FormInstance<FormData>;
  data: FormData;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  brands: {
    label: string;
    value: string;
  }[];
}

export interface FormData {
  origQuestion: string;
  newQuestion: string;
  type: AnswerType;
  origOptions: string[];
  newOptions: string[];
  required: boolean;
  dependentOn: string;
  dependentAnswer: string | number;
  dependentBrands: string[];
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
    dependentBrands: [],
  });
  const { id: currentSchemeId } = useStoreState((state) => state.scheme);
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
        (tagQ) => tagQ.tagQuestionId === dependent?.dependentOn
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
        dependentBrands:
          questionData.question?.tags?.find((tag) => tag.id === tagQId)
            ?.dependentBrands || [],
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
        dependentBrands:
          questionData.question?.tags?.find((tag) => tag.id === tagQId)
            ?.dependentBrands || [],
      });
    }
  }, [questionData, required]);

  const { data: BrandsData, loading: brandsLoading } = useBrandsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
      },
    },
  });

  const onSubmit = (values: FormData) => {
    setSaving(true);

    const dependentOnTag = tagQuestions.find(
      (tagQ) => tagQ.tagQuestionId === values.dependentOn
    );
    let answerString: string | undefined;
    if (dependentOnTag) {
      answerString =
        typeof values.dependentAnswer === 'number'
          ? values.dependentAnswer.toString()
          : values.dependentAnswer.toLowerCase();
    }
    updateQuestionOnTag(
      values.newQuestion,
      questionId,
      dependentOnTag && answerString
        ? {
            tagQuestionId: dependentOnTag?.tagQuestionId,
            questionId: dependentOnTag?.questionId,
            answer: answerString,
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
          dependentAnswer: answerString ?? undefined,
          dependentOnQId: dependentOnTag?.questionId,
          dependentOnTagQId: values.dependentOn ?? undefined,
          brands: values.dependentBrands ?? [],
          tag: {
            id: tagQId,
            req: values.required,
          },
        },
      },
    });
  };

  const brands =
    BrandsData?.brands?.edges?.map(({ node: brand }) => ({
      label: brand?.name || '',
      value: brand?.id || '',
    })) || [];
  return {
    data,
    loading: loading || brandsLoading,
    form,
    onSubmit,
    saving,
    brands,
  };
};

export default useUpdateQuestion;
