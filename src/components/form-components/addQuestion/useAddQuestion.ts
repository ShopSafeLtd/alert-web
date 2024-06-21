import { useParams } from 'react-router-dom';
import { useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useIntl } from 'react-intl';

import errorNotification from '../../../types/mutation_notifications/error_notification';
import type { TagQuestion } from '../update-question-on-tag/UpdateQuestion.container';
import { useStoreState } from '../../../state';
import type { AvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/get-questions.generated';
import { useAvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/get-questions.generated';
import { AnswerType } from 'graphql/types';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/brands.generated';
import { useCreateOrAddQuestionMutation } from '#/components/form-components/addQuestion/graphql/create-question.generated';

interface Return {
  questionData: AvailableQuestionsQuery | undefined;
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
  selectedId: string;
  type: AnswerType;
  options: string[];
  question: string;
  required: boolean;
  dependentOn: string;
  dependentAnswer: string | number;
  dependentBrands: string[];
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
    dependentOn: '',
    dependentAnswer: '',
    dependentBrands: [],
  });
  const { id: currentSchemeId } = useStoreState((state) => state.scheme);

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
        message: intl.formatMessage({
          defaultMessage: 'Successfully created/added!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The question has been succesfully created/added!',
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
      answerString =
        typeof values.dependentAnswer === 'number'
          ? values.dependentAnswer.toString()
          : values.dependentAnswer.toLowerCase();
    }

    const dataToSubmit = {
      question: values.question,
      options: values.options,
      required: values.required,
      type: values.type,
      tagId: id || '',
      dependentAnswer: answerString ?? undefined,
      dependentOnQId: dependentOnTag?.questionId ?? undefined,
      dependentOnTagQId: values.dependentOn ?? undefined,
      brands: values.dependentBrands ?? [],
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
  const brands =
    BrandsData?.brands?.edges.map(({ node: brand }) => ({
      label: brand?.name || '',
      value: brand?.id || '',
    })) || [];
  return {
    data,
    loading: loading || brandsLoading,
    form,
    questionData,
    onSubmit,
    saving,
    brands,
  };
};

export default useAddQuestion;
