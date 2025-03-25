import type { FormInstance } from 'antd';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useCreateOneQuestionGroupMutation } from '#/views/adminTodo/graphql/mutations/__generated__/createQuestionGroup.generated';
import { useUpdateQuestionGroupMutation } from '#/views/adminTodo/graphql/mutations/__generated__/updateQuestionGroup.generated';
import { Form, notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { ListData } from '../../../views/adminTodo/useActivities';

const { useForm } = Form;

export interface FormData {
  defaultDueDate: number;
  description: string;
  name: string;
  questions: {
    id: string;
    question: string;
  }[];
}

interface Props {
  id?: string;
  initData?: {
    defaultDueDays: number;
    description: string;
    name: string;
    questions: {
      id: string;
      question: string;
    }[];
  };
  onClose: () => void;
  update: (item: ListData, type: 'create' | 'delete' | 'update') => void;
}

interface Return {
  addQuestion: boolean;

  form: FormInstance<FormData>;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string }[];
  setAddQuestion: (value: boolean) => void;
  setSelectedIds: (value: string[]) => void;
  setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  updateQs: (id: string, question: string) => void;
}

const useCreateActivityTemplate = ({
  id,
  initData,
  onClose,
  update,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: string; question: string }[]
  >([]);

  useEffect(() => {
    if (initData) {
      const { defaultDueDays, description, name, questions } = initData;
      setSelectedIds(questions.map((question) => question.id));
      setSelectedQuestions(
        questions.map((question) => ({
          id: question.id,
          question: question.question,
        }))
      );

      form.setFieldsValue({
        defaultDueDate: defaultDueDays,
        description,
        name,
      });
    }
  }, [initData]);

  const [createGroup] = useCreateOneQuestionGroupMutation({
    onCompleted: ({ createOneQuestionGroup }) => {
      if (createOneQuestionGroup) {
        update(
          {
            defaultDueDays: createOneQuestionGroup.defaultDueDate,
            description: createOneQuestionGroup.description || '',
            id: createOneQuestionGroup.id,
            name: createOneQuestionGroup.name,
            questions: selectedQuestions,
          },
          'create'
        );
      }
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The activity has been added.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const [updateGroup] = useUpdateQuestionGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The activity has been added.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (id) {
      void updateGroup({
        variables: {
          data: {
            defaultDueDate: {
              set: data.defaultDueDate,
            },
            description: {
              set: data.description,
            },
            name: {
              set: data.name,
            },
            questions: {
              set: selectedQuestions.map((question) => ({
                id: question.id,
              })),
            },
          },
          where: {
            id,
          },
        },
      });
      update(
        {
          defaultDueDays: data.defaultDueDate,
          description: data.description,
          id,
          name: data.name,
          questions: selectedQuestions,
        },
        'update'
      );
    } else {
      void createGroup({
        variables: {
          data: {
            defaultDueDate: data.defaultDueDate,
            description: data.description,
            name: data.name,
            questions: {
              connect: selectedQuestions.map((question) => ({
                id: question.id,
              })),
            },
            schemes: {
              connect: [
                {
                  id: schemeId,
                },
              ],
            },
          },
        },
      });
    }
  };

  const updateQs = (qId: string, question: string) => {
    setSelectedQuestions([...selectedQuestions, { id: qId, question }]);
    setSelectedIds([...selectedIds, qId]);
  };

  return {
    addQuestion,
    form,
    onSubmit,
    saving,
    selectedIds,
    selectedQuestions,
    setAddQuestion,
    setSelectedIds,
    setSelectedQuestions,
    updateQs,
  };
};
export default useCreateActivityTemplate;
