/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type { Moment } from 'moment';
import type { CustomQuestion, SelectOptions } from 'types/DataType';

import { useAddTodoUsersQuery } from '#/components/form-components/Todos/AddTodo/graphql/__generated__/AddTodoUsers.generated';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { Form, notification } from 'antd';
import { useCreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import { AnswerType, Role, SortOrder } from 'graphql/types';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

import customRequest from '../../../../utils/custom-request';

const { useForm } = Form;

export interface FormData {
  [answer: string]: Moment | number | string | string[] | undefined;
  assignedUsers: string[];
  businesses: string[];
  description: string;
  dueDate: Moment;
  groups: string[];
  name: string;
  questionGroup?: string;
}

interface Props {
  businessId?: string;
  incidentId?: string;
  initData?: {
    id: string;
  };
  investigationId?: string;
  onClose: () => void;
  updateMutation?: MutationUpdaterFn<CreateTodoMutation>;
}

interface Return {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance<FormData>;
  onSubmit: (value: FormData) => void;
  questions: CustomQuestion[];
  saving: boolean;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string; type: AnswerType }[];
  setAddQuestion: (value: boolean) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setSelectedIds: (value: string[]) => void;
  setSelectedQuestions: (
    value: { id: string; question: string; type: AnswerType }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  update: (id: string, question: string) => void;
  users: { id: string; name: string; timeTaken: number }[];
  usersLoading: boolean;
}

const useAddTodo = ({
  businessId,
  incidentId,
  initData,
  investigationId,
  onClose,
  updateMutation,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const activityAssignToUser = useStoreState(
    (state) => state.scheme.activityAssignToUser
  );
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
  useEffect(() => {
    if (businessId) {
      form.setFieldsValue({
        businesses: [businessId],
      });
    }
  }, [businessId]);

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
        description,
        name,
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
        description: description || '',
        dueDate: formattedDate,
        name,
      });

      setQuestions(
        templateQuestions.map((question) => ({
          answerType: question.type,
          label: question.questionFormatted,
          options: question.optionsFormFormatted || [],
          questionId: question.id,
          required: false,
          tagQuestionId: '',
          value: '',
        }))
      );
    }
  }, [questionGroup, templatesData]);

  const { data: usersData, loading: usersLoading } = useAddTodoUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: {
        fullName: SortOrder.Asc,
      },
      where: {
        groups: {
          some: {
            users: {
              some: {
                id: {
                  equals: userId,
                },
              },
            },
          },
        },
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
                role: activityAssignToUser
                  ? undefined
                  : {
                      in: [
                        Role.ContentAdmin,
                        Role.SchemeAdmin,
                        Role.ShopsafeAdmin,
                      ],
                    },
              },
            ],
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
    onError: () => {
      setSaving(false);
      errorNotification();
    },
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
      update: updateMutation,
      variables: {
        data: {
          assignedUsers:
            data.assignedUsers && data.assignedUsers.length > 0
              ? { connect: data.assignedUsers.map((id) => ({ id })) }
              : undefined,
          business: businessId
            ? { connect: { id: businessId } }
            : data.businesses
              ? { connect: { id: data.businesses[0] } }
              : undefined,
          completed: false,
          createdBy: { connect: { id: userId } },
          description: data.description,
          documents:
            documentList.map((file) => ({
              fileType: file.type || '',
              name: file.name || '',
              origFileName: file.fileName || '',
              url: file.url || '',
            })) || [],
          dueDate: data.dueDate.toDate(),
          groups: data.groups.map((id) => ({ id })),
          incident: incidentId ? { connect: { id: incidentId } } : undefined,
          investigation: investigationId
            ? { connect: { id: investigationId } }
            : undefined,
          name: data.name,
          questions:
            selectedQuestions && selectedQuestions.length > 0
              ? {
                  create: selectedQuestions.map((question) => ({
                    answers: {
                      create: [
                        {
                          answer: (data[question.id] as string) || '',
                          type: question.type,
                        },
                      ],
                    },
                    question: {
                      connect: {
                        id: question.id,
                      },
                    },
                  })),
                }
              : undefined,
          schemes: {
            connect: [
              {
                id: schemeId,
              },
            ],
          },
          timeTaken:
            userTime && timeTaken
              ? {
                  createMany: {
                    data: timeTaken,
                  },
                }
              : undefined,
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
    multiple: true,
    onChange: handleChange,
  };
  return {
    addQuestion,
    adminUsersData: usersData?.users.map((user) => ({
      label: user.fullName,
      value: user.id,
    })),
    availableUsers,
    documentList,
    documentUploadProps,
    form,
    onSubmit,
    questions,
    saving,
    selectedIds,
    selectedQuestions,
    setAddQuestion,
    setAvailableUsers,
    setSelectedIds,
    setSelectedQuestions,
    setUsers,
    templatesData,
    templatesLoading,
    update,
    users,
    usersLoading,
  };
};
export default useAddTodo;
