/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { TodoQuery } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/view-task.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type {
  ChecklistData,
  CrimeGroupData,
  IncidentCardData,
  InvestigationData,
  OffenderData,
} from 'types/DataType';

import { useAddTodoUsersQuery } from '#/components/form-components/Todos/AddTodo/graphql/__generated__/AddTodoUsers.generated';
import { useUpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import { useTodoQuery } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/view-task.generated';
import {
  currentSchemeAtom,
  currentSchemeIdAtom,
  // currentUserAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import {
  userIdAtom,
  userSchemesAtom,
} from '#/providers/UserProvider/UserProvider';
import { Form } from 'antd';
import { PermissionMethod, PermissionModel, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

import customRequest from '../../../../utils/custom-request';
import { useIncidentActivityAuthorisedLazyQuery } from './graphql/__generated__/Incident-activity-authorised.generated';
import { useUserParentRolesLazyQuery } from './graphql/__generated__/user-parent-roles.generated';

export interface FormData {
  [key: string]: boolean | number | string | undefined;
}
interface Return {
  actionsOpen: boolean;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  loading: boolean;
  minimal?: boolean;
  needAuthorised: boolean;
  offendersData: OffenderData | undefined;
  onAuthorisedTodo: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  taskTimeTracking: boolean | undefined;
  todo: TodoQuery | undefined;
  toggleActionsOpen: () => void;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
}

const { useForm } = Form;

const useTodo = ({
  id,
  minimal,
  onClose,
  updateQuery,
  updateTodo,
}: {
  id: null | string;
  minimal: boolean;
  onClose: () => void;
  updateQuery?: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodo?: (value: boolean, i?: string) => void;
}): Return => {
  const [form] = useForm();
  const currentScheme = useAtomValue(currentSchemeAtom);
  const activityAssignToUser = currentScheme?.activityAssignToUser;
  const schemeRequireAuthorised = currentScheme?.requireActivityAuthorised;
  const taskTimeTracking = currentScheme?.taskTimeTracking;
  // const currentUser = useAtomValue(currentUserAtom);
  const currentUser = useAtomValue(userIdAtom);
  const userSchemes = useAtomValue(userSchemesAtom);
  const userRoleIds = new Set(
    userSchemes.map((el) => el.permissionsId).filter(Boolean)
  );

  const [saving, setSaving] = useState(false);
  const [needAuthorised, setNeedAuthorised] = useState(false);

  const [actionsOpen, setActionsOpen] = useState(false);
  const [users, setUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const [availableUsers, setAvailableUsers] = useState<
    { id: string; name: string; timeTaken: number }[]
  >([]);
  const schemeId = useAtomValue(currentSchemeIdAtom);
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

  const { data: todo, loading } = useTodoQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ todo }) => {
      if (todo?.evidence && todo?.evidence.length > 0)
        setDocumentList(
          todo?.evidence?.map((document) => ({
            name: document.name,
            status: 'done',
            uid: document.id,
            url: document.url,
          }))
        );
      setOffendersData(todo.offender ?? undefined);
      setCrimeGroupsData(todo.crimeGroup ?? undefined);
      setChecklistsData(todo.checklist ?? undefined);
      setIncidentsData(todo.incident ?? undefined);
      setInvestigationsData(todo.investigation ?? undefined);
    },
    variables: {
      where: {
        id: id || '',
      },
    },
  });
  // check if the user can authorise
  const [getIncident] = useIncidentActivityAuthorisedLazyQuery();
  const [getCreatedByParentRole] = useUserParentRolesLazyQuery();
  useEffect(() => {
    if (
      minimal &&
      schemeRequireAuthorised &&
      incidentsData?.id &&
      userRoleIds
    ) {
      void getIncident({
        // ????
        onCompleted: ({ incident }) => {
          if (incident.activityAuthorised) {
            void getCreatedByParentRole({
              onCompleted: ({ user }) => {
                const parentRoleIds = new Set(
                  user.schemes
                    .map((scheme) => scheme.orignalPermissions.parentId)
                    .filter(Boolean)
                );
                const hasCommonRole = [...userRoleIds].some((roleId) =>
                  parentRoleIds.has(roleId as string)
                );
                setNeedAuthorised(hasCommonRole);
              },
              variables: {
                schemeWhere: {
                  id: {
                    equals: schemeId,
                  },
                },

                where: {
                  id: todo?.todo.createdBy?.id,
                },
              },
            });
          }
        },
        variables: {
          where: {
            id: incidentsData?.id,
          },
        },
      });
    }
  }, [incidentsData, schemeRequireAuthorised, minimal]);

  // useEffect(() => {
  //   if (incidentData?.incident.activityAuthorised) {
  //     void getCreatedByParentRole({
  //       onCompleted: ({ user }) => {
  //         const parentRoleIds = new Set(
  //           user.schemes
  //             .map((scheme) => scheme.orignalPermissions.parentId)
  //             .filter(Boolean)
  //         );
  //         const hasCommonRole = [...userRoleIds].some((roleId) =>
  //           parentRoleIds.has(roleId as string)
  //         );
  //         setNeedAuthorised(hasCommonRole);
  //       },
  //       variables: {
  //         schemeWhere: {
  //           id: {
  //             equals: schemeId,
  //           },
  //         },

  //         where: {
  //           id: todo?.todo.createdBy?.id,
  //         },
  //       },
  //     });
  //   }
  // }, [incidentsData]);

  useEffect(() => {
    if (todo?.todo?.assignedUsers) {
      const u = todo?.todo?.assignedUsers.map((user) => ({
        id: user?.id || '',
        name: user?.fullName || '',
        timeTaken:
          todo.todo?.timeTaken.find((time) => time?.user?.id === user?.id)
            ?.timeTaken || 0,
      }));
      setUsers(u || []);
      form.setFieldsValue(
        Object.fromEntries(u.map((item) => [item.id, item.timeTaken]))
      );
    }
  }, [todo]);

  const { data: usersData, loading: usersLoading } = useAddTodoUsersQuery({
    fetchPolicy: 'cache-and-network',
    skip: !todo,
    variables: {
      orderBy: {
        fullName: SortOrder.Asc,
      },
      where: {
        businesses: todo?.todo?.business?.id
          ? {
              some: {
                id: {
                  equals: todo?.todo?.business?.id,
                },
              },
            }
          : undefined,

        groups: {
          some: {
            users: {
              some: {
                id: {
                  equals: currentUser,
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

  const [updateTodoMutation] = useUpdateTaskMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
    },
    onError: () => {
      setSaving(false);
    },
    update: updateQuery,
  });

  useEffect(() => {
    if (usersData?.users && todo?.todo) {
      const userr = todo?.todo?.assignedUsers.map((user) => ({
        id: user?.id || '',
        name: user?.fullName || '',
        timeTaken:
          todo.todo?.timeTaken.find((time) => time?.user?.id === user?.id)
            ?.timeTaken || 0,
      }));
      const u = usersData?.users
        .map((user) => ({
          id: user?.id || '',
          name: user?.fullName || '',
          timeTaken: 0,
        }))
        .filter((user) => !userr.some((us) => us.id === user.id));
      setAvailableUsers(u || []);
    }
  }, [todo, usersData]);

  const onSubmit = (value: FormData) => {
    setSaving(true);
    const userTime = users.map((user) => ({
      id: user.id,
      timeTaken: value[user.id],
    }));

    const answers = todo?.todo?.questions.map(({ id: qId, question }) => ({
      answer: value[question?.id || ''],
      questionId: qId,
      type: question?.type,
    }));

    const answerIds = todo?.todo?.answers?.map(({ id: aId }) => aId);

    const timeTaken = userTime
      .map((time) => ({
        timeTaken: time.timeTaken as number,
        userId: time.id,
      }))
      ?.filter((time) => time.timeTaken && time.timeTaken > 0);
    const existingDocumentIds = todo?.todo?.evidence.map((el) => el.id);
    const newDocuments = documentList.filter(
      (el) => !existingDocumentIds?.includes(el.uid)
    );
    const deletedDocuments = existingDocumentIds?.filter((documentId) =>
      documentList.map((el) => el.uid !== documentId)
    );

    void updateTodoMutation({
      variables: {
        data: {
          answers: {
            deleteMany: answerIds
              ? [
                  {
                    id: {
                      in: answerIds || [],
                    },
                  },
                ]
              : undefined,
            // createMany: {
            //   data: answers?.map((answer) => ({
            //     answer: answer.answer as string,
            //     taskQuestionId: answer.questionId,
            //     type: answer.type,
            //   })),
            // },
          },
          checklistId: checklistsData?.id,
          completed: {
            set: true,
          },
          completedBy: {
            connect: { id: currentUser },
          },
          completedDate: {
            set: new Date(),
          },
          crimeGroupId: crimeGroupsData?.id,

          documents: {
            // @ts-expect-error TODO fix this date issue Wait to check
            deleted:
              deletedDocuments && deletedDocuments.length > 0
                ? deletedDocuments.map((el) => ({ id: el }))
                : undefined,
            upload:
              newDocuments && newDocuments.length > 0
                ? newDocuments.map((file) => ({
                    fileType: file.type || '',
                    name: file.name || '',
                    origFileName: file.fileName || '',
                    url: file.url || '',
                  }))
                : undefined,
          },
          incidentId: incidentsData?.id,
          investigationId: investigationsData?.id,
          offenderId: offendersData?.id,
          questions: {
            update: answers?.map((answer) => ({
              data: {
                answers: {
                  create: [
                    {
                      answer: (answer.answer as string) || '',
                      todo: {
                        connect: {
                          id: id || '',
                        },
                      },
                      type: answer.type,
                    },
                  ],
                },
              },
              where: {
                id: answer.questionId,
              },
            })),
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
        where: {
          id: id || '',
        },
      },
    });
    if (updateTodo) updateTodo(true, id || '');
  };
  const onAuthorisedTodo = () => {
    setSaving(true);
    void updateTodoMutation({
      variables: {
        data: {
          authorised: {
            set: true,
          },
        },
        where: {
          id: id || '',
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

  const toggleActionsOpen = () => {
    setActionsOpen(!actionsOpen);
  };

  return {
    actionsOpen,
    availableUsers,
    checklistsData,
    crimeGroupsData,
    documentList,
    documentUploadProps,
    form,
    incidentsData,
    investigationsData,
    loading: loading || usersLoading,
    needAuthorised,
    offendersData,
    onAuthorisedTodo,
    onSubmit,
    saving,
    setAvailableUsers,
    setUsers,
    taskTimeTracking,
    todo,
    toggleActionsOpen,
    updateChecklistsList: setChecklistsData,
    updateCrimeGroupsList: setCrimeGroupsData,
    updateIncidentList: setIncidentsData,
    updateInvestigationList: setInvestigationsData,
    updateOffendersList: setOffendersData,
    users,
  };
};

export default useTodo;
