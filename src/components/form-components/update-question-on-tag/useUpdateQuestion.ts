import type { FormInstance } from 'antd';

import { useQuestionDetailsQuery } from '#/components/form-components/update-question-on-tag/graphql/__generated__/get-question.generated';
import { useUpdateQuestionOnTagMutation } from '#/components/form-components/update-question-on-tag/graphql/__generated__/update-question.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { Form, notification } from 'antd';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { AnswerType, AnyAll, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import type { TagQuestion } from './UpdateQuestion.container';

import errorNotification from '../../../types/mutation_notifications/error_notification';

const ANSWER_SEPARATOR = '|||';

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
  tags: { label: string; value: string }[];
}

export interface FormData {
  dependantTags: string[];
  dependentAnswer: null | number | string | string[];
  dependentBrands: string[];
  dependentMatchMode?: 'all' | 'any';
  dependentOn: string;
  newOptions: string[];
  newQuestion: string;
  origOptions: string[];
  origQuestion: string;
  required: boolean;
  roles: string[];
  tooltip?: string;
  type: AnswerType;
}

const { useForm } = Form;

export const convertAnyAllToEnum = (
  value: 'all' | 'any' | null | undefined
): AnyAll | null => {
  switch (value) {
    case 'all': {
      return AnyAll.All;
    }
    case 'any': {
      return AnyAll.Any;
    }
    default: {
      return null;
    }
  }
};
interface Props {
  dependent?: {
    dependentAnswer: string;
    dependentMatchMode?: 'all' | 'any' | null;
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
    dependantTags: [],
    dependentAnswer: null,
    dependentBrands: [],
    dependentMatchMode: 'any',
    dependentOn: '',
    newOptions: [],
    newQuestion: '',
    origOptions: [],
    origQuestion: '',
    required: false,
    roles: [],
    type: AnswerType.String,
  });
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const { data: questionData, loading } = useQuestionDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: questionId || '',
      },
    },
  });

  const { data: tagData } = useTagsQuery({
    variables: {
      where: {
        recycled: {
          equals: false,
        },
        schemes: {
          some: {
            id: {
              equals: currentSchemeId,
            },
          },
        },
        type: {
          equals: TagType.IncidentInvolved,
        },
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
      const mode = checkExists ? dependent?.dependentMatchMode : undefined;
      const checkIfArray = (value: string | undefined) => {
        if (!value || !checkExists) return '';
        if (value.includes('|||') || mode) {
          return value.split(ANSWER_SEPARATOR);
        }

        return value;
      };

      console.log(checkIfArray(dependent?.dependentAnswer));
      setData({
        dependantTags:
          questionData.question.tags.find((tag) => tag.id === tagQId)
            ?.dependentTags ?? [],
        dependentAnswer: checkIfArray(dependent?.dependentAnswer),
        dependentBrands:
          questionData.question?.tags?.find((tag) => tag.id === tagQId)
            ?.dependentBrands || [],
        dependentMatchMode: checkExists
          ? dependent?.dependentMatchMode || 'any'
          : undefined,

        dependentOn: checkExists ? dependent?.dependentOn || '' : '',
        newOptions: questionData.question?.optionsFormatted || [],
        newQuestion: questionData.question?.questionFormatted || '',
        origOptions: formatOption(),
        origQuestion: questionData.question?.question || '',
        required,
        roles:
          questionData.question?.tags
            ?.find((tag) => tag.id === tagQId)
            ?.roles.map((role) => role.id) || [],
        tooltip:
          questionData.question.tags.find((tag) => tag.id === tagQId)
            ?.tooltip ?? undefined,
        type: questionData.question?.type || AnswerType.String,
      });

      form.setFieldsValue({
        dependantTags:
          questionData.question.tags.find((tag) => tag.id === tagQId)
            ?.dependentTags ?? [],
        dependentAnswer: checkIfArray(dependent?.dependentAnswer),
        dependentBrands:
          questionData.question?.tags?.find((tag) => tag.id === tagQId)
            ?.dependentBrands || [],
        dependentMatchMode: checkExists
          ? dependent?.dependentMatchMode || 'any'
          : undefined,
        dependentOn: checkExists ? dependent?.dependentOn || '' : '',
        newOptions: questionData.question?.optionsFormatted || [],
        newQuestion: questionData.question?.questionFormatted || '',
        origOptions: formatOption(),
        origQuestion: questionData.question?.question || '',
        required,
        roles:
          questionData.question?.tags
            ?.find((tag) => tag.id === tagQId)
            ?.roles.map((role) => role.id) || [],
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
      const raw = values.dependentAnswer;
      answerString = Array.isArray(raw)
        ? raw.map((item) => String(item).toLowerCase()).join(ANSWER_SEPARATOR)
        : String(raw).toLowerCase();
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
          dependentMatchMode: convertAnyAllToEnum(values.dependentMatchMode),
          dependentOnQId: dependentOnTag?.questionId,

          dependentOnTagQId: values.dependentOn ?? undefined,
          dependentTags: values.dependantTags ?? [],
          newOptions: values.newOptions,
          newQuestion: values.newQuestion,
          origOptions: data.origOptions,
          origQuestion: data.origQuestion,
          questionId,
          roles: values.roles,
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
    tags:
      tagData?.tags.map(({ id, name }) => ({ label: name, value: id })) ?? [],
  };
};

export default useUpdateQuestion;
