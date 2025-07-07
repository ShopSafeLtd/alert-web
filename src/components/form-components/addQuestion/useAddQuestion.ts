import type { AvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/__generated__/get-questions.generated';
import type { FormInstance } from 'antd';
import type { CreateQuestionInput } from 'graphql/types';

import { useCreateOrAddQuestionMutation } from '#/components/form-components/addQuestion/graphql/__generated__/create-question.generated';
import { useAvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/__generated__/get-questions.generated';
import { convertAnyAllToEnum } from '#/components/form-components/update-question-on-tag/useUpdateQuestion';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { Form, notification } from 'antd';
import { AnswerType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import type { TagQuestion } from '../update-question-on-tag/UpdateQuestion.container';

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
  questionData: AvailableQuestionsQuery | undefined;
  saving: boolean;
}

export interface FormData {
  dependentAnswer: null | number | string | string[];
  dependentBrands: string[];
  dependentMatchMode: 'all' | 'any';
  dependentOn: string;
  options: string[];
  question: string;
  required: boolean;
  roles: string[];
  selectedId: string;
  tooltip: string;
  type: AnswerType;
}

const { useForm } = Form;

interface Props {
  onClose: () => void;
  tagQuestions?: TagQuestion[];
}

const useAddQuestion = ({ onClose, tagQuestions }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const { data: questionData, loading } = useAvailableQuestionsQuery({
    skip: !id,
    variables: {
      where: {
        id: id || '',
      },
    },
  });

  const [form] = useForm<FormData>();
  const [data] = useState<FormData>({
    dependentAnswer: null,
    dependentBrands: [],
    dependentMatchMode: 'any',
    dependentOn: '',
    options: [],
    question: '',
    required: false,
    roles: [],
    selectedId: '',
    tooltip: '',
    type: AnswerType.String,
  });
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

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

  const [addQuestion] = useCreateOrAddQuestionMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The question has been succesfully created/added!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully created/added!',
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
    const dependentOnTag = tagQuestions?.find(
      (tagQ) => tagQ.tagQuestionId === values.dependentOn
    );
    let answerString: string | undefined;
    if (dependentOnTag) {
      const raw = values.dependentAnswer;
      answerString = Array.isArray(raw)
        ? raw.map((item) => String(item).toLowerCase()).join(ANSWER_SEPARATOR)
        : String(raw).toLowerCase();
    }

    const dataToSubmit: CreateQuestionInput = {
      brands: values.dependentBrands ?? [],
      dependentAnswer: answerString ?? undefined,
      dependentMatchMode: convertAnyAllToEnum(values.dependentMatchMode),
      dependentOnQId: dependentOnTag?.questionId ?? undefined,
      dependentOnTagQId: values.dependentOn ?? undefined,
      options: values.options,
      question: values.question,
      required: values.required,
      roles: values.roles ?? [],
      tagId: id || '',
      tooltip: values.tooltip ?? undefined,
      type: values.type,
    };
    void addQuestion({
      variables: values.selectedId
        ? {
            data: { ...dataToSubmit },
            where: {
              id: values.selectedId || '',
            },
          }
        : {
            data: { ...dataToSubmit },
          },
    });
  };
  const brands =
    BrandsData?.brands?.edges.map(({ node: brand }) => ({
      label: brand?.name || '',
      value: brand?.id || '',
    })) || [];
  return {
    brands,
    data,
    form,
    loading: loading || brandsLoading,
    onSubmit,
    questionData,
    saving,
  };
};

export default useAddQuestion;
