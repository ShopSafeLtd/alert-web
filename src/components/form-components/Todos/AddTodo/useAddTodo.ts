/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type {
  ChecklistData,
  CrimeGroupData,
  CustomQuestion,
  IncidentCardData,
  InvestigationData,
  OffenderData,
  SelectOptions,
} from 'types/DataType';

import { useAddTodoUsersQuery } from '#/components/form-components/Todos/AddTodo/graphql/__generated__/AddTodoUsers.generated';
import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { Form, notification } from 'antd';
import { useCreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import {
  AnswerType,
  PermissionMethod,
  PermissionModel,
  SortOrder,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import customRequest from '../../../../utils/custom-request';

const { useForm } = Form;

export interface FormData {
  [answer: string]: Date | boolean | number | string | string[] | undefined;
  assignedUsers: string[];
  businesses: string[];
  completed: boolean;
  description: string;
  dueDate: Date;
  groups?: string[];
  name: string;
  questionGroup?: string;
}

interface Props {
  businessId?: string;
  checklistId?: string;
  crimeGroupId?: string;
  incidentId?: string;
  initData?: {
    id: string;
  };
  investigationId?: string;
  offenderId?: string;
  onClose: () => void;
  updateMutation?: MutationUpdaterFn<CreateTodoMutation>;
  vehicleId?: string;
}

interface Return {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  currentStep: number;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance<FormData>;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  offendersData: OffenderData | undefined;
  // removeChecklist: (value: string | undefined) => void;
  // removeCrimeGroup: (value: string | undefined) => void;
  // removeIncident: (value: string | undefined) => void;
  onSubmit: (value: FormData) => void;
  questions: CustomQuestion[];

  // removeOffender: (value: string | undefined) => void;
  saveData: FormData | undefined;
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
  taskTimeTracking: boolean | undefined;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  update: (id: string, question: string) => void;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
  usersLoading: boolean;
}

const useAddTodo = ({
  businessId,
  checklistId,
  crimeGroupId,
  incidentId,
  initData,
  investigationId,
  offenderId,
  onClose,
  updateMutation,
  vehicleId,
}: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const currentScheme = useAtomValue(currentSchemeAtom);
  const activityAssignToUser = currentScheme?.activityAssignToUser;
  const activityAllowAllGroups = currentScheme?.activityAllowAllGroups;
  const taskTimeTracking = currentScheme?.taskTimeTracking;

  const userId = useAtomValue(userIdAtom);
  const [saving, setSaving] = useState(false);
  const [saveData, setSaveData] = useState<FormData | undefined>(undefined);
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<CustomQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
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

  const [crimeGroupsData, setCrimeGroupsData] = useState<
    CrimeGroupData | undefined
  >(undefined);
  const [offendersData, setOffendersData] = useState<OffenderData | undefined>(
    undefined
  );
  const [checklistsData, setChecklistsData] = useState<
    ChecklistData | undefined
  >(undefined);
  const [incidentsData, setIncidentsData] = useState<
    IncidentCardData | undefined
  >(undefined);
  const [investigationsData, setInvestigationsData] = useState<
    InvestigationData | undefined
  >(undefined);
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
        dueDate,
        name,
      });

      setQuestions(
        templateQuestions.map((question) => ({
          actions: [],
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
        businesses: businessId
          ? {
              some: {
                id: {
                  equals: businessId,
                },
              },
            }
          : undefined,

        groups: activityAllowAllGroups
          ? undefined
          : {
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
                permissions: activityAssignToUser
                  ? undefined
                  : {
                      permissions: {
                        some: {
                          allowedMethods: {
                            hasSome: [
                              PermissionMethod.Write,
                              PermissionMethod.Read,
                              PermissionMethod.Edit,
                              PermissionMethod.ReadAll,
                            ],
                          },
                          model: {
                            equals: PermissionModel.Tasks,
                          },
                        },
                      },
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

  const onSubmit = (data: FormData, next?: boolean) => {
    setSaving(true);

    if (next) {
      setSaveData(data);
      setCurrentStep(currentStep + 1);
      setSaving(false);
    } else {
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
      const getId = (id?: string, dataId?: string) => {
        if (id) return { connect: { id } };
        if (dataId) return { connect: { id: dataId } };
        return undefined;
      };
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
            QuestionGroup: questionGroup
              ? { connect: { id: questionGroup } }
              : undefined,

            assignedUsers:
              data.assignedUsers && data.assignedUsers.length > 0
                ? { connect: data.assignedUsers.map((id) => ({ id })) }
                : undefined,
            business: businessId
              ? { connect: { id: businessId } }
              : data.businesses && data.businesses.length > 0
                ? { connect: { id: data.businesses[0] } }
                : undefined,
            checklist: getId(checklistId, checklistsData?.id),
            completed: data.completed,
            createdBy: { connect: { id: userId } },
            crimeGroup: getId(crimeGroupId, crimeGroupsData?.id),
            description: data.description,

            // investigation: investigationId
            //   ? { connect: { id: investigationId } }
            documents:
              documentList.map((file) => ({
                fileType: file.type || '',
                name: file.name || '',
                origFileName: file.fileName || '',
                url: file.url || '',
              })) || [],
            //   : investigationsData
            dueDate: data.dueDate,
            groups: data.groups ? data.groups.map((id) => ({ id })) : [],

            //     ? { connect: { id: investigationsData.id } }
            incident: getId(incidentId, incidentsData?.id),
            //     : undefined,
            investigation: getId(investigationId, investigationsData?.id),
            name: data.name,
            offender: getId(offenderId, offendersData?.id),
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
            vehicle: getId(vehicleId),
          },
        },
      });
    }
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

  // function

  // const updateCrimeGroupsList = (selectedCrimeGroup: CrimeGroupData) => {
  //   setCrimeGroupsData([...crimeGroupsData, selectedCrimeGroup]);
  // };
  // const updateChecklistsList = (selectedChecklist: ChecklistData) => {
  //   setChecklistsData([...offendersData, selectedChecklist]);
  // };
  // const updateOffendersList = (selectedOffender: OffenderData) => {
  //   console.log('updateOffendersList');

  //   setOffendersData(selectedOffender);
  // };
  // const updateIncidentList = (selectedIncident: IncidentCardData) => {
  //   setIncidentsData([...incidentsData, selectedIncident]);
  // };
  // const removeChecklist = (checklistId: string | undefined) => {
  //   if (checklistId) {
  //     setChecklistsData(
  //       checklistsData?.filter((checklist) => checklist.id !== checklistId)
  //     );
  //   }
  // };
  // const removeOffender = (offenderId: string | undefined) => {
  //   if (offenderId) {
  //     setOffendersData(
  //       offendersData?.filter((offender) => offender.id !== offenderId)
  //     );
  //   }
  // };
  // const removeIncident = (incidentId: string | undefined) => {
  //   if (incidentId) {
  //     setIncidentsData(
  //       incidentsData?.filter((incident) => incident.id !== incidentId)
  //     );
  //   }
  // };
  // const removeCrimeGroup = (crimeGroupId: string | undefined) => {
  //   if (crimeGroupId) {
  //     setCrimeGroupsData(
  //       crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
  //     );
  //   }
  // };
  return {
    addQuestion,
    adminUsersData: usersData?.users.map((user) => ({
      label: user.fullName,
      value: user.id,
    })),
    availableUsers,
    checklistsData,
    crimeGroupsData,
    currentStep,
    documentList,
    documentUploadProps,
    form,

    incidentsData,
    investigationsData,
    offendersData,
    // removeChecklist,
    // removeCrimeGroup,
    // removeIncident,
    onSubmit,
    questions,
    // removeOffender,
    saveData,
    saving,
    selectedIds,
    selectedQuestions,
    setAddQuestion,
    setAvailableUsers,
    setSelectedIds,
    setSelectedQuestions,
    setUsers,
    taskTimeTracking,
    templatesData,
    templatesLoading,
    update,
    updateChecklistsList: setChecklistsData,
    updateCrimeGroupsList: setCrimeGroupsData,
    updateIncidentList: setIncidentsData,
    updateInvestigationList: setInvestigationsData,
    updateOffendersList: setOffendersData,
    users,
    usersLoading,
  };
};
export default useAddTodo;
