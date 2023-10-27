/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import type { CustomQuestion, SelectOptions } from 'types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type {
  CreateTodoMutation,
  QuestionGroupOnSchemeQuery,
} from 'graphql/generated';
import {
  AnswerType,
  Role,
  SortOrder,
  useCreateTodoMutation,
  useListSchemeUsersQuery,
  useQuestionGroupOnSchemeQuery,
} from 'graphql/generated';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { FormInstance, UploadFile } from 'antd';
import { Form, notification } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';
import type { Moment } from 'moment';
import moment from 'moment';
import customRequest from '../../../../utils/custom-request';

const { useForm } = Form;

export interface FormData {
  name: string;
  description: string;
  dueDate: Moment;
  assignedUsers: string[];
  questionGroup?: string;
  [answer: string]: string | string[] | undefined | Moment | number;
}

interface Props {
  onClose: () => void;
  incidentId?: string;
  investigationId?: string;
  businessId?: string;
  updateMutation?: MutationUpdaterFn<CreateTodoMutation>;
  initData?: {
    id: string;
  };
}

interface Return {
  onSubmit: (value: FormData) => void;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  addQuestion: boolean;
  setAddQuestion: (value: boolean) => void;
  update: (id: string, question: string) => void;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string; type: AnswerType }[];
  setSelectedQuestions: (
    value: { id: string; question: string; type: AnswerType }[]
  ) => void;
  setSelectedIds: (value: string[]) => void;
  form: FormInstance<FormData>;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  questions: CustomQuestion[];
  users: { id: string; name: string; timeTaken: number }[];
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
}

const useAddTodo = ({
  updateMutation,
  onClose,
  incidentId,
  investigationId,
  businessId,
  initData,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [users, setUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const [availableUsers, setAvailableUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: string; question: string; type: AnswerType }[]
  >([]);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);

  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        where: {
          id: schemeId,
        },
      },
    });

  const update = (id: string, question: string) => {
    setSelectedQuestions([
      ...selectedQuestions,
      { id, question, type: AnswerType.String },
    ]);
    setSelectedIds([...selectedIds, id]);
  };
  useEffect(() => {
    if (initData) {
      form.setFieldsValue({
        questionGroup: initData.id,
      });
    }
  }, [initData]);

  const questionGroup = Form.useWatch('questionGroup', form);

  useEffect(() => {
    const template = templatesData?.scheme?.questionGroups.find(
      ({ id }) => id === questionGroup
    );
    if (template) {
      const {
        defaultDueDate,
        name,
        description,
        questions: templateQuestions,
      } = template;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + defaultDueDate);

      const formattedDate = moment(dueDate);
      setSelectedIds(templateQuestions.map((question) => question.id));
      setSelectedQuestions(
        templateQuestions.map((question) => ({
          id: question.id,
          question: question.questionFormatted,
          type: question.type,
        }))
      );

      form.setFieldsValue({
        name,
        description: description || '',
        dueDate: formattedDate,
      });

      setQuestions(
        templateQuestions.map((question) => ({
          answerType: question.type,
          label: question.questionFormatted,
          questionId: question.id,
          required: false,
          tagQuestionId: '',
          value: '',
          options: question.optionsFormFormatted || [],
        }))
      );
    }
  }, [questionGroup, templatesData]);

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            AND: [
              {
                scheme: {
                  id: {
                    equals: schemeId,
                  },
                },
              },
              {
                role: {
                  in: [Role.SchemeAdmin, Role.ShopsafeAdmin],
                },
              },
            ],
          },
        },
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Asc,
      },
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const assignedUsers = Form.useWatch('assignedUsers', form);
  useEffect(() => {
    if (usersData?.users && assignedUsers) {
      const u = usersData?.users
        .map((user) => ({
          id: user?.id || '',
          name: user?.fullName || '',
          timeTaken: 0,
        }))
        .filter((user) => !assignedUsers.includes(user.id));
      setAvailableUsers(u || []);

      setUsers([
        ...users,
        ...assignedUsers
          .filter((id) => !users.some((user) => user.id === id))
          .map((id) => {
            const fullUser = usersData.users.find((user) => user.id === id);
            return {
              id,
              name: fullUser?.fullName || '',
              timeTaken: 0,
            };
          }),
      ]);
    }
  }, [assignedUsers, usersData]);

  const [createTodo] = useCreateTodoMutation({
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
    update: updateMutation,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    const userTime = users.map((user) => ({
      id: user.id,
      timeTaken: data[user.id],
    }));
    const timeTaken = userTime
      .map((time) => ({
        timeTaken: time.timeTaken as number,
        userId: time.id,
      }))
      ?.filter((time) => time.timeTaken && time.timeTaken > 0);
    void createTodo({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          assignedUsers:
            data.assignedUsers && data.assignedUsers.length > 0
              ? { connect: data.assignedUsers.map((id) => ({ id })) }
              : undefined,
          questions:
            selectedQuestions && selectedQuestions.length > 0
              ? {
                  create: selectedQuestions.map((question) => ({
                    question: {
                      connect: {
                        id: question.id,
                      },
                    },
                    answers: {
                      create: [
                        {
                          answer: (data[question.id] as string) || '',
                          type: question.type,
                        },
                      ],
                    },
                  })),
                }
              : undefined,
          timeTaken:
            userTime && timeTaken
              ? {
                  createMany: {
                    data: timeTaken,
                  },
                }
              : undefined,
          dueDate: data.dueDate.toDate(),
          completed: false,
          incident: incidentId ? { connect: { id: incidentId } } : undefined,
          investigation: investigationId
            ? { connect: { id: investigationId } }
            : undefined,
          business: businessId ? { connect: { id: businessId } } : undefined,
          createdBy: { connect: { id: userId } },
          documents:
            documentList.map((file) => ({
              url: file.url || '',
              name: file.name || '',
              fileType: file.type || '',
              origFileName: file.fileName || '',
            })) || [],
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
  };
  // evidence
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment,no-param-reassign,
        file.url = file.response[0].url;

        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment,no-param-reassign,
        file.fileName = file.response[0].blobName;
      }
      return file;
    });

    setDocumentList(newFileList);
  };

  const documentUploadProps: UploadProps = {
    customRequest,
    onChange: handleChange,
    multiple: true,
  };
  return {
    onSubmit,
    saving,
    adminUsersData: usersData?.users.map((user) => ({
      value: user.id,
      label: user.fullName,
    })),
    usersLoading,
    addQuestion,
    setAddQuestion,
    update,
    selectedIds,
    selectedQuestions,
    setSelectedQuestions,
    setSelectedIds,
    form,
    templatesData,
    templatesLoading,
    questions,
    setAvailableUsers,
    setUsers,
    users,
    availableUsers,
    documentList,
    documentUploadProps,
  };
};
export default useAddTodo;
