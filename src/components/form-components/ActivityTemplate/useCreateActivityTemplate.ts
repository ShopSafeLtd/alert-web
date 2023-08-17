import { useEffect, useState } from 'react';
import {
  useCreateOneQuestionGroupMutation,
  useUpdateQuestionGroupMutation,
} from 'graphql/generated';
import errorNotification from 'types/error_notification';
import type { FormInstance } from 'antd';
import { notification } from 'antd';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';
import type { ListData } from '../../../views/adminTodo/useActivities';

export interface FormData {
  name: string;
  description: string;
  questions: {
    id: string;
    question: string;
  }[];
  defaultDueDate: number;
}

interface Props {
  onClose: () => void;
  update: (item: ListData, type: 'create' | 'update' | 'delete') => void;
  id?: string;
  initData?: {
    name: string;
    description: string;
    questions: {
      id: string;
      question: string;
    }[];
    defaultDueDays: number;
  };
}

interface Return {
  onSubmit: (value: FormData) => void;

  saving: boolean;
  addQuestion: boolean;
  setAddQuestion: (value: boolean) => void;
  updateQs: (id: string, question: string) => void;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string }[];
  setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  setSelectedIds: (value: string[]) => void;
  form: FormInstance<FormData>;
}

const useCreateActivityTemplate = ({
  onClose,
  update,
  initData,
  id,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: string; question: string }[]
  >([]);

  useEffect(() => {
    if (initData) {
      const { name, description, questions, defaultDueDays } = initData;
      setSelectedIds(questions.map((question) => question.id));
      setSelectedQuestions(
        questions.map((question) => ({
          id: question.id,
          question: question.question,
        }))
      );

      form.setFieldsValue({
        name,
        description,
        defaultDueDate: defaultDueDays,
      });
    }
  }, [initData]);

  const [createGroup] = useCreateOneQuestionGroupMutation({
    onCompleted: ({ createOneQuestionGroup }) => {
      if (createOneQuestionGroup) {
        update(
          {
            name: createOneQuestionGroup.name,
            description: createOneQuestionGroup.description || '',
            questions: selectedQuestions,
            defaultDueDays: createOneQuestionGroup.defaultDueDate,
            id: createOneQuestionGroup.id,
          },
          'create'
        );
      }
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The activity has been added.',
          id: 'hDZLqK',
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The activity has been added.',
          id: 'hDZLqK',
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
          where: {
            id,
          },
          data: {
            name: {
              set: data.name,
            },
            description: {
              set: data.description,
            },
            defaultDueDate: {
              set: data.defaultDueDate,
            },
            questions: {
              set: selectedQuestions.map((question) => ({
                id: question.id,
              })),
            },
          },
        },
      });
      update(
        {
          name: data.name,
          description: data.description,
          questions: selectedQuestions,
          defaultDueDays: data.defaultDueDate,
          id,
        },
        'update'
      );
    } else {
      void createGroup({
        variables: {
          data: {
            name: data.name,
            description: data.description,
            defaultDueDate: data.defaultDueDate,
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
    onSubmit,
    saving,
    addQuestion,
    setAddQuestion,
    selectedIds,
    selectedQuestions,
    setSelectedQuestions,
    setSelectedIds,
    form,
    updateQs,
  };
};
export default useCreateActivityTemplate;
