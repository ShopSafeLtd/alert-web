import type { FormInstance } from 'antd';

import { useQuestionDetailsQuery } from '#/components/form-components/update-question-on-tag/graphql/__generated__/get-question.generated';
import { useUpdateQuestionOnTagMutation } from '#/components/form-components/update-question-on-tag/graphql/__generated__/update-question.generated';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { Form, notification } from 'antd';
import { AnswerType } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

import type { TagQuestion } from './UpdateQuestion.container';

import errorNotification from '../../../types/mutation_notifications/error_notification';

interface Return {
  brands: {
    label: string;
    value: string;
  }[];
  data: FormData;
  form: FormInstance<FormData>;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

export interface FormData {
  dependentAnswer: number | string;
  dependentBrands: string[];
  dependentOn: string;
  newOptions: string[];
  newQuestion: string;
  origOptions: string[];
  origQuestion: string;
  required: boolean;
  tooltip?: string;
  type: AnswerType;
}

const { useForm } = Form;

interface Props {
  dependent?: {
    dependentAnswer: string;
    dependentOn: string;
  };
  onClose: () => void;
  questionId: string;
  required: boolean;
  tagQId: string;
  tagQuestions: TagQuestion[];
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      answer: string;
      questionId: string;
      tagQuestionId: string;
    }
  ) => void;
}

const useUpdateQuestion = ({
  dependent,
  onClose,
  questionId,
  required,
  tagQId,
  tagQuestions,
  updateQuestionOnTag,
}: Props): Return => {
  const intl = useIntl();
  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<FormData>({
    dependentAnswer: '',
    dependentBrands: [],
    dependentOn: '',
    newOptions: [],
    newQuestion: '',
    origOptions: [],
    origQuestion: '',
    required: false,
    type: AnswerType.String,
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
      const checkExists = tagQuestions.find(
        (tagQ) => tagQ.tagQuestionId === dependent?.dependentOn
      );

      setData({
        dependentAnswer: checkExists ? dependent?.dependentAnswer || '' : '',
        dependentBrands:
          questionData.question?.tags?.find((tag) => tag.id === tagQId)
            ?.dependentBrands || [],
        dependentOn: checkExists ? dependent?.dependentOn || '' : '',
        newOptions: questionData.question?.optionsFormatted || [],
        newQuestion: questionData.question?.questionFormatted || '',
        origOptions: formatOption(),
        origQuestion: questionData.question?.question || '',
        required,
        tooltip:
          questionData.question.tags.find((tag) => tag.id === tagQId)
            ?.tooltip ?? undefined,
        type: questionData.question?.type || AnswerType.String,
      });

      form.setFieldsValue({
        dependentAnswer: checkExists ? dependent?.dependentAnswer || '' : '',
        dependentBrands:
          questionData.question?.tags?.find((tag) => tag.id === tagQId)
            ?.dependentBrands || [],
        dependentOn: checkExists ? dependent?.dependentOn || '' : '',
        newOptions: questionData.question?.optionsFormatted || [],
        newQuestion: questionData.question?.questionFormatted || '',
        origOptions: formatOption(),
        origQuestion: questionData.question?.question || '',
        required,
        tooltip:
          questionData.question.tags.find((tag) => tag.id === tagQId)
            ?.tooltip ?? undefined,
        type: questionData.question?.type || AnswerType.String,
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
            answer: answerString,
            questionId: dependentOnTag?.questionId,
            tagQuestionId: dependentOnTag?.tagQuestionId,
          }
        : undefined
    );

    void updateQuestion({
      variables: {
        data: {
          brands: values.dependentBrands ?? [],
          dependentAnswer: answerString ?? undefined,
          dependentOnQId: dependentOnTag?.questionId,
          dependentOnTagQId: values.dependentOn ?? undefined,
          newOptions: values.newOptions,
          newQuestion: values.newQuestion,
          origOptions: data.origOptions,
          origQuestion: data.origQuestion,
          questionId,
          tag: {
            id: tagQId,
            req: values.required,
          },
          tooltip: values.tooltip,
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
    brands,
    data,
    form,
    loading: loading || brandsLoading,
    onSubmit,
    saving,
  };
};

export default useUpdateQuestion;
