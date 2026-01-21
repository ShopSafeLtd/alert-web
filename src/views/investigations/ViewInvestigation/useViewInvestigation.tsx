import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpdateInvestigationOffendersMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-offenders.generated';
import type { UpdateInvestigationVehiclesMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-vehicles.generated';
import type {
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';
import type * as Types from 'graphql/types';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { demIdAtom } from '#/providers/UserProvider/UserProvider';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { useCloseInvestigationMutation } from '#/views/investigations/ViewInvestigation/graphql/__generated__/close-investigation.generated';
import { useReopenInvestigationMutation } from '#/views/investigations/ViewInvestigation/graphql/__generated__/reopen-investigation.generated';
import { notification } from 'antd';
import { useCreateCrimeGroupSuggestedDataMutation } from 'graphql/crime-groups/mutations/__generated__/create-crime-group-suggested-data.generated';
import { useUpdateCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/update_crime_group.generated';
import { useDeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import { useDeleteInvestigationMutation } from 'graphql/investigations/mutations/__generated__/delete-investigation.generated';
import { useSubscribeToInvestigationMutation } from 'graphql/investigations/mutations/__generated__/subscribe-to-investigation.generated';
import { useUnsubscribeToInvestigationMutation } from 'graphql/investigations/mutations/__generated__/unsubscribe-from-incident.generated';
import { useUpdateInvestigationCrimeGroupsMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-crime-group.generated';
import { useUpdateInvestigationIncidentsMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-incidents.generated';
import { useUpdateInvestigationOffendersMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-offenders.generated';
import { useUpdateInvestigationVehiclesMutation } from 'graphql/investigations/mutations/update/__generated__/update-investigation-vehicles.generated';
import {
  ViewInvestigationDocument,
  useViewInvestigationQuery,
} from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import { useCreateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-simple-vehicle.generated';
import { useUpdateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/update-simple-vehicle.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import errorNotification from 'types/mutation_notifications/error_notification';
import successNotification from 'types/mutation_notifications/success_notification';

import { useStoreState } from '../../../state';

interface Return {
  addCrimeGroup: boolean;
  addDemDocument: boolean;
  addDocument: boolean;
  addExistingCrimeGroup: boolean;
  addExistingIncident: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addOffender: boolean;
  addTodo: boolean;
  addVehicle: boolean;
  completeTodoVisible: null | string;
  crimeGroupIds: string[];
  data: ViewInvestigationQuery | undefined;
  demId: null | string | undefined;
  editCrimeGroupData: CrimeGroupCardData | null;
  editInvestigation: boolean;
  editOffenderData: OffenderData | null;
  editVehicleData: VehicleData | null;
  incidentIds: string[];
  loading: boolean;
  offenderIds: string[];
  onAddCrimeGroup: (value: CrimeGroupCardData) => void;
  onAddExistingCrimeGroup: (value: string) => void;
  onAddExistingIncident: (value: string[]) => void;
  onAddExistingOffenders: (value: string[]) => void;
  onAddExistingVehicle: (value: string) => void;
  onAddExistingVehicles: (value: string[]) => void;
  // onEditOffender: (value: OffenderData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onCloseInvestigation: () => void;
  onCompletedAddOffender: () => void;
  onCompletedEditOffender: () => void;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onDeleteIncident: (id: string) => void;
  onDeleteInvestigation: () => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  // onAddOffender: (value: OffenderData) => void;
  onEditCrimeGroup: (value: CrimeGroupCardData) => void;
  onEditVehicle: (value: VehicleData) => void;
  onRefetchInvestigation: () => void;
  onReopenInvestigation: () => void;
  saving: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  setViewTodoVisible: (value: null | string) => void;
  showSuggestedOffenders: boolean;
  showSuggestedVehicles: boolean;
  suggestedOffenders: OffenderData[] | undefined;
  suggestedVehicles: VehicleData[] | undefined;
  takeAllSchemes: boolean;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  toggleAddCrimeGroup: () => void;
  toggleAddDemDocument: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleCloseSuggestedOffenders: () => void;
  toggleCloseSuggestedVehicles: () => void;
  toggleEditInvestigation: () => void;
  toggleShowSuggestedOffenders: () => void;
  toggleShowSuggestedVehicles: () => void;
  toggleSubscribe: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  vehicleIds: string[];
  viewTodoVisible: null | string;
}

const onCompletedEditOffender = () => {
  successNotification(
    ProfileUpdatedModel.Offender,
    ProfileUpdatedModel.Investigation,
    ProfileUpdatedType.updated
  );
};
const onCompletedAddOffender = () => {
  successNotification(
    ProfileUpdatedModel.Offender,
    ProfileUpdatedModel.Investigation,
    ProfileUpdatedType.added
  );
};

const useViewInvestigation = (investigationId: string): Return => {
  const intl = useIntl();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const demId = useAtomValue(demIdAtom);
  const takeAllSchemes = useStoreState(
    (state) => state.data.investigations.takeAllSchemes
  );
  const [offenderIds, setOffenderIds] = useState<string[]>([]);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [crimeGroupIds, setCrimeGroupIds] = useState<string[]>([]);
  const [incidentIds, setIncidentIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [editInvestigation, setEditInvestigation] = useState(false);
  const [addVehicle, setAddVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState<VehicleData | null>(
    null
  );
  const [showSuggestedVehicles, setShowSuggestedVehicles] = useState(false);
  const [showSuggestedOffenders, setShowSuggestedOffenders] = useState(false);

  const [addCrimeGroup, setAddCrimeGroup] = useState(false);
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);
  const [editCrimeGroupData, setEditCrimeGroupData] =
    useState<CrimeGroupCardData | null>(null);
  const [addExistingIncident, setAddExistingIncident] = useState(false);

  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [editOffenderData, setEditOffenderData] = useState<OffenderData | null>(
    null
  );
  const [suggestedOffenders, setSuggestedOffenders] =
    useState<OffenderData[]>();
  const [suggestedVehicles, setSuggestedVehicles] = useState<VehicleData[]>();

  const [addDocument, setAddDocument] = useState(false);
  const [addDemDocument, setAddDemDocument] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [viewTodoVisible, setViewTodoVisible] = useState<null | string>(null);
  const [completeTodoVisible, setCompleteTodoVisible] = useState<null | string>(
    null
  );

  const toggleCloseSuggestedOffenders = () => {
    setSuggestedOffenders([]);
    setShowSuggestedOffenders(false);
  };
  const toggleCloseSuggestedVehicles = () => {
    setSuggestedVehicles([]);
    setShowSuggestedVehicles(false);
  };

  const variables = {
    where: {
      id: investigationId,
    },
  };
  const { data, loading, refetch } = useViewInvestigationQuery({
    onCompleted: ({ investigation }) => {
      if (
        investigation?.offenders &&
        (investigation.offenders as Array<{ id: string }>).length > 0
      ) {
        setOffenderIds(
          (investigation.offenders as Array<{ id: string }>).map(({ id }) => id)
        );
      }
      if (
        investigation?.vehicles &&
        (investigation.vehicles as Array<{ id: string }>).length > 0
      ) {
        setVehicleIds(
          (investigation.vehicles as Array<{ id: string }>).map(({ id }) => id)
        );
      }
      if (
        investigation?.crimeGroups &&
        (investigation.crimeGroups as Array<{ id: string }>).length > 0
      ) {
        setCrimeGroupIds(
          (investigation.crimeGroups as Array<{ id: string }>).map(
            ({ id }) => id
          )
        );
      }
      if (
        investigation?.incidents &&
        (investigation.incidents as Array<{ id: string }>).length > 0
      ) {
        setIncidentIds(
          (investigation.incidents as Array<{ id: string }>).map(({ id }) => id)
        );
      }
    },
    skip: !investigationId,
    variables,
  });

  const onRefetchInvestigation = () => {
    void refetch();
  };
  const onSetSuggestedOffenders = (values: OffenderData[]) => {
    if (values) {
      const offendersId = (
        data?.investigation?.offenders as Array<{ id: string }> | undefined
      )?.map(({ id }) => id);
      const filterData = values.filter(({ id }) => !offendersId?.includes(id));
      setSuggestedOffenders(filterData);
    }
  };
  const onSetSuggestedVehicles = (values: VehicleData[]) => {
    if (values) {
      const vehiclesId = (
        data?.investigation?.vehicles as Array<{ id: string }> | undefined
      )?.map(({ id }) => id);
      const filterData = values.filter(({ id }) => !vehiclesId?.includes(id));
      setSuggestedVehicles(filterData);
    }
  };
  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        questionGroupsWhere: {
          defaultForIncidents: {
            equals: true,
          },
        },
        where: {
          id: schemeId,
        },
      },
    });
  // todo
  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;
    const existingData = store.readQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      variables,
    });

    if (!existingData?.investigation) return;
    store.writeQuery<ViewInvestigationQuery>({
      data: {
        __typename: 'Query',
        investigation: {
          ...existingData.investigation,
          todos: [...existingData.investigation.todos, res.createTodo],
        },
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };
  const updateTodo: MutationUpdaterFn<UpdateTaskMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.updateTodo === null || res.updateTodo === undefined) return;
    // get existing group list data from Apollo store
    const existingData = store.readQuery<
      ViewInvestigationQuery,
      ViewInvestigationQueryVariables
    >({
      query: ViewInvestigationDocument,
      variables,
    });

    if (existingData === null) return;
    if (existingData?.investigation?.todos === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<ViewInvestigationQuery, ViewInvestigationQueryVariables>({
      data: {
        __typename: 'Query',
        investigation: update<ViewInvestigationQuery['investigation']>(
          existingData.investigation,
          {
            todos: {
              [existingData.investigation.todos.findIndex(
                ({ id }) => id === res.updateTodo?.id
              )]: {
                $set: res.updateTodo,
              },
            },
          }
        ),
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };
  const [subscribeToInvestigation] = useSubscribeToInvestigationMutation();
  const [unsubscribeFromInvestigation] =
    useUnsubscribeToInvestigationMutation();

  // const [updateInvestigation] = useUpdateInvestigationMutation({
  //   onError: () => {
  //     errorNotification();
  //   },
  // });
  // offender
  const [updateInvestigationOffenders] =
    useUpdateInvestigationOffendersMutation({
      onError: () => {
        errorNotification();
      },
    });

  const updateAddExistingOffenderList: MutationUpdaterFn<
    UpdateInvestigationOffendersMutation
  > = (store, { data: res }) => {
    if (
      res?.updateInvestigation === null ||
      res?.updateInvestigation === undefined
    )
      return;

    const existingData = store.readQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      variables,
    });

    if (!existingData?.investigation) return;
    store.writeQuery<ViewInvestigationQuery>({
      data: {
        __typename: 'Query',
        investigation: {
          ...existingData.investigation,
          offenders: res.updateInvestigation.offenders.map((offender) => ({
            ...offender,
            totalIncidents: 0,
            totalValue: 0,
          })),
        },
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };
  const onAddExistingOffenders = (value: string[]) => {
    setSaving(true);
    if (value) {
      void updateInvestigationOffenders({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateAddExistingOffenderList,
        variables: {
          id: investigationId,
          offenderIds: value,
        },
      }).finally(() => {
        toggleCloseSuggestedOffenders();
        setSaving(false);
      });
    }
  };
  const updateEditOffenderList: MutationUpdaterFn<
    UpdateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;
    const existingData = store.readQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      variables,
    });
    if (!existingData?.investigation) return;
    const index = (
      existingData?.investigation?.offenders as Array<{ id: string }>
    )
      .map((item) => item.id)
      .indexOf(res.updateOffender.id);

    store.writeQuery<ViewInvestigationQuery>({
      data: {
        __typename: 'Query',
        investigation: {
          ...existingData.investigation,
          offenders: update(
            existingData.investigation.offenders as Array<unknown>,
            {
              [index]: {
                $set: {
                  ...res.updateOffender,
                  totalIncidents: 0,
                  totalValue: 0,
                },
              },
            }
          ),
        },
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };

  // const onEditOffender = (value: OffenderData) => {
  //   setSaving(true);
  //   if (value) {
  //     const existingImageIds = editOffenderData?.images?.map(({ id }) => id);
  //     const deleteIds = existingImageIds?.filter(
  //       (id) => !value.images?.map((el) => el.id).includes(id)
  //     );

  //     void updateOffender({
  //       variables: {
  //         where: {
  //           id: value.id,
  //         },
  //         data: {
  //           name: { set: value.name },
  //           gender: { set: value.gender || null },
  //           race: { set: value.race || null },
  //           build: { set: value.build || null },
  //           hair: { set: value.hair || 'Unknown' },
  //           peculiarities: { set: value.peculiarities || '' },
  //           age: { set: value.age || null },
  //           dateSource: { set: value.dateSource || null },
  //           dateOfBirth: { set: value.dateOfBirth || null },
  //           groups: {
  //             set:
  //               value.groups && value.groups.length > 0
  //                 ? value.groups.map(({ id }) => ({ id }))
  //                 : undefined,
  //           },
  //           images:
  //             value.images && value.images.length > 0
  //               ? {
  //                   delete:
  //                     deleteIds && deleteIds.length > 0
  //                       ? deleteIds.map((id) => ({ id }))
  //                       : undefined,
  //                   connect: value.images
  //                     ?.filter((image) => !image.new)
  //                     .map((image) => ({
  //                       id: image.id,
  //                     })),
  //                   upload: value.images
  //                     ?.filter((image) => image.new)
  //                     .map((item) => ({
  //                       url: {
  //                         filename: item.fileName || '',
  //                         mimetype: item.type || '',
  //                         url: item.url || '',
  //                       },
  //                       position: item.position,
  //                       primary: item.primary,
  //                       policeImage: item.policeImage,
  //                       rotation: item.rotation || 0,
  //                     }))
  //                     .filter((obj) => obj.url !== undefined),
  //                 }
  //               : {
  //                   delete:
  //                     deleteIds && deleteIds.length > 0
  //                       ? deleteIds.map((id) => ({ id }))
  //                       : undefined,
  //                 },
  //         },
  //       },
  //       onCompleted: () => {
  //         successNotification(
  //           ProfileUpdatedModel.Offender,
  //           ProfileUpdatedModel.Investigation,
  //           ProfileUpdatedType.updated
  //         );
  //       },
  //     }).finally(() => {
  //       setEditOffenderData(null);
  //       setSaving(false);
  //     });
  //   }
  // };
  // const [createOffender] = useCreateSimpleOffenderMutation({
  //   onCompleted: () => {
  //     successNotification(
  //       ProfileUpdatedModel.Offender,
  //       ProfileUpdatedModel.Investigation,
  //       ProfileUpdatedType.added
  //     );
  //   },
  //   onError: () => {
  //     errorNotification();
  //   },
  //   update: (store, { data: res }) => {
  //     if (res?.createOffender === null || res?.createOffender === undefined)
  //       return;
  //     const existingData = store.readQuery<ViewInvestigationQuery>({
  //       query: ViewInvestigationDocument,
  //       variables,
  //     });

  //     if (!existingData?.investigation) return;
  //     store.writeQuery<ViewInvestigationQuery>({
  //       query: ViewInvestigationDocument,
  //       data: {
  //         investigation: {
  //           ...existingData.investigation,
  //           offenders: [
  //             ...existingData.investigation.offenders,
  //             res.createOffender,
  //           ],
  //         },
  //         __typename: 'Query',
  //       },
  //       variables,
  //     });
  //   },
  // });

  // const onAddOffender = (value: OffenderData) => {
  //   setSaving(true);
  //   if (value) {
  //     void createOffender({
  //       variables: {
  //         data: {
  //           name: value.name,
  //           gender: value.gender || null,
  //           race: value.race || null,
  //           build: value.build || null,
  //           height: value.height || null,
  //           hair: value.hair || null,
  //           peculiarities: value.peculiarities || null,
  //           comment: value.comment || null,
  //           age: value.age || null,
  //           dateSource: value.dateSource || null,
  //           dateOfBirth: value.dateOfBirth || null,
  //           groups: {
  //             connect:
  //               value?.groups && value.groups.length > 0
  //                 ? value.groups.map(({ id }) => ({ id }))
  //                 : [],
  //           },
  //           scheme: schemeId,
  //           investigationId,
  //           // createdBy: { connect: { id: userId } },
  //           // localId: value.id,
  //           image:
  //             value.images && value.images.length > 0
  //               ? {
  //                   connect: value.images
  //                     ?.filter((image) => !image.new)
  //                     .map((image) => ({
  //                       id: image.id,
  //                     })),
  //                   upload: value.images
  //                     ?.filter((image) => image.new)
  //                     .map((item) => ({
  //                       url: {
  //                         filename: item.fileName || '',
  //                         mimetype: item.type || '',
  //                         url: item.url || '',
  //                       },
  //                       position: item.position,
  //                       primary: item.primary,
  //                       policeImage: item.policeImage,
  //                       rotation: item.rotation || 0,
  //                     }))
  //                     .filter((obj) => obj.url !== undefined),
  //                 }
  //               : {},
  //         },
  //       },
  //     }).finally(() => {
  //       setAddOffender(false);
  //       setSaving(false);
  //     });
  //   }
  // };

  const updateAddOffenderList: MutationUpdaterFn<
    CreateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.createOffender === null || res?.createOffender === undefined)
      return;
    const existingData = store.readQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      variables,
    });

    if (!existingData?.investigation) return;
    store.writeQuery<ViewInvestigationQuery>({
      data: {
        __typename: 'Query',
        investigation: {
          ...existingData.investigation,
          offenders: [
            ...(existingData.investigation.offenders as Array<unknown>),
            res.createOffender,
          ],
        },
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };

  const onDeleteOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateInvestigationOffenders({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: (store, { data: res }) => {
          if (
            res?.updateInvestigation === null ||
            res?.updateInvestigation === undefined
          )
            return;
          const existingData = store.readQuery<ViewInvestigationQuery>({
            query: ViewInvestigationDocument,
            variables,
          });

          if (!existingData?.investigation) return;
          store.writeQuery<ViewInvestigationQuery>({
            data: {
              __typename: 'Query',
              investigation: {
                ...existingData.investigation,
                offenders: (
                  existingData.investigation.offenders as Array<{ id: string }>
                ).filter(({ id }) => id !== value),
              },
            },
            query: ViewInvestigationDocument,
            variables,
          });
        },
        variables: {
          disconnectOffenderIds: [value],
          id: investigationId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  const [closeInvestigation] = useCloseInvestigationMutation({
    onError: errorNotification,
  });
  const [reopenInvestigation] = useReopenInvestigationMutation({
    onError: errorNotification,
  });

  // vehicle
  const [updateInvestigationVehicles] = useUpdateInvestigationVehiclesMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateVehicleList: MutationUpdaterFn<
    UpdateInvestigationVehiclesMutation
  > = (store, { data: res }) => {
    if (
      res?.updateInvestigation === null ||
      res?.updateInvestigation === undefined
    )
      return;

    const existingData = store.readQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      variables,
    });

    if (!existingData?.investigation) return;
    store.writeQuery<ViewInvestigationQuery>({
      data: {
        __typename: 'Query',
        investigation: {
          ...existingData.investigation,
          vehicles: res.updateInvestigation.vehicles,
        },
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };
  const onAddExistingVehicles = (value: string[]) => {
    setSaving(true);
    if (value) {
      void updateInvestigationVehicles({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateVehicleList,
        variables: {
          id: investigationId,
          vehicleIds: value,
        },
      }).finally(() => {
        toggleCloseSuggestedVehicles();
        setSaving(false);
      });
    }
  };
  const onAddExistingVehicle = (value: string) => {
    setSaving(true);
    if (value) {
      void updateInvestigationVehicles({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateVehicleList,
        variables: {
          id: investigationId,
          vehicleIds: value,
        },
      }).finally(() => {
        setAddExistingVehicle(false);
        setSaving(false);
      });
    }
  };

  const [updateVehicle] = useUpdateSimpleVehicleMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.updateVehicle === null || res?.updateVehicle === undefined)
        return;
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });

      if (!existingData?.investigation) return;
      const index = existingData?.investigation?.vehicles
        .map((item) => item.id)
        .indexOf(res.updateVehicle.id);
      store.writeQuery<ViewInvestigationQuery>({
        data: {
          __typename: 'Query',
          investigation: {
            ...existingData.investigation,
            vehicles: update(existingData.investigation.vehicles, {
              [index]: {
                $set: { ...res.updateVehicle },
              },
            }),
          },
        },
        query: ViewInvestigationDocument,
        variables,
      });
    },
  });
  const onEditVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      const existingImageIds = editVehicleData?.images?.map(({ id }) => id);
      const deleteIds = existingImageIds?.filter(
        (id) => !value.images?.map((el) => el.id).includes(id)
      );
      void updateVehicle({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          data: {
            colour: { set: value.colour || '' },
            images:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    upload: value.images
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        policeImage: item.policeImage,
                        position: item.position,
                        primary: item.primary,
                        rotation: item.rotation || 0,
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
            make: { set: value.make || '' },
            model: { set: value.model || '' },
            registration: { set: value.registration || '' },
          },
          where: {
            id: value.id,
          },
        },
      }).finally(() => {
        setEditVehicleData(null);
        setSaving(false);
      });
    }
  };
  const [createVehicle] = useCreateSimpleVehicleMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.createVehicle === null || res?.createVehicle === undefined)
        return;
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });

      if (!existingData?.investigation) return;
      store.writeQuery<ViewInvestigationQuery>({
        data: {
          __typename: 'Query',
          investigation: {
            ...existingData.investigation,
            vehicles: [
              ...existingData.investigation.vehicles,
              res.createVehicle,
            ],
          },
        },
        query: ViewInvestigationDocument,
        variables,
      });
    },
  });
  const onAddVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      void createVehicle({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        variables: {
          data: {
            colour: value.colour || '',
            groups: value.groups?.map((id) => ({ id })),
            image:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        policeImage: item.policeImage,
                        position: item.position,
                        primary: item.primary,
                        rotation: item.rotation || 0,
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
            investigationId,
            make: value.make || '',
            model: value.model || '',
            registration: value.registration || '',

            schemes: schemeId,
          },
        },
      }).finally(() => {
        setAddVehicle(false);
        setSaving(false);
      });
    }
  };
  const onDeleteVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateInvestigationVehicles({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.deleted
          );
        },
        update: (store, { data: res }) => {
          if (
            res?.updateInvestigation === null ||
            res?.updateInvestigation === undefined
          )
            return;
          const existingData = store.readQuery<ViewInvestigationQuery>({
            query: ViewInvestigationDocument,
            variables,
          });

          if (!existingData?.investigation) return;
          store.writeQuery<ViewInvestigationQuery>({
            data: {
              __typename: 'Query',
              investigation: {
                ...existingData.investigation,
                vehicles: existingData.investigation.vehicles.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewInvestigationDocument,
            variables,
          });
        },
        variables: {
          disconnectVehicleIds: [value],
          id: investigationId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  // crime group
  const [updateInvestigationCrimeGroups] =
    useUpdateInvestigationCrimeGroupsMutation({
      onError: () => {
        errorNotification();
      },
    });

  const onAddExistingCrimeGroup = (value: string) => {
    setSaving(true);
    if (value) {
      void updateInvestigationCrimeGroups({
        onCompleted: (res) => {
          const newData = res.updateInvestigation?.crimeGroups.find(
            ({ id }) => id === value
          );
          if (newData) {
            onSetSuggestedOffenders(newData?.offenders);
            onSetSuggestedVehicles(newData?.vehicles);
          }
          successNotification(
            ProfileUpdatedModel.Crime_Group,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: (store, { data: res }) => {
          if (
            res?.updateInvestigation === null ||
            res?.updateInvestigation === undefined
          )
            return;

          const existingData = store.readQuery<ViewInvestigationQuery>({
            query: ViewInvestigationDocument,
            variables,
          });

          if (!existingData?.investigation) return;
          store.writeQuery<ViewInvestigationQuery>({
            data: {
              __typename: 'Query',
              investigation: {
                ...existingData.investigation,
                crimeGroups: res.updateInvestigation.crimeGroups,
              },
            },
            query: ViewInvestigationDocument,
            variables,
          });
        },
        variables: {
          crimeGroupIds: [value],
          id: investigationId,
        },
      }).finally(() => {
        setAddExistingCrimeGroup(false);
        setSaving(false);
      });
    }
  };
  const onDeleteCrimeGroup = (value: string) => {
    setSaving(true);
    if (value)
      void updateInvestigationCrimeGroups({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Crime_Group,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.deleted
          );
        },
        update: (store, { data: res }) => {
          if (
            res?.updateInvestigation === null ||
            res?.updateInvestigation === undefined
          )
            return;
          const existingData = store.readQuery<ViewInvestigationQuery>({
            query: ViewInvestigationDocument,
            variables,
          });

          if (!existingData?.investigation) return;
          store.writeQuery<ViewInvestigationQuery>({
            data: {
              __typename: 'Query',
              investigation: {
                ...existingData.investigation,
                crimeGroups: existingData.investigation.crimeGroups.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewInvestigationDocument,
            variables,
          });
        },
        variables: {
          disconnectCrimeGroupIds: [value],
          id: investigationId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  const [createCrimeGroup] = useCreateCrimeGroupSuggestedDataMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.createCrimeGroup === null || res?.createCrimeGroup === undefined)
        return;
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });
      if (!existingData?.investigation) return;
      store.writeQuery<ViewInvestigationQuery>({
        data: {
          __typename: 'Query',
          investigation: {
            ...existingData.investigation,
            crimeGroups: [
              // TODO change graphql
              ...existingData.investigation.crimeGroups,
              {
                ...res.createCrimeGroup,
                totalIncidents: 0,
                totalOffenders: 0,
                totalRecoveredValue: 0,
                totalTheftSuccess: 0,
                totalValue: 0,
              },
            ],
          },
        },
        query: ViewInvestigationDocument,
        variables,
      });
    },
  });

  const onAddCrimeGroup = (value: CrimeGroupCardData) => {
    setSaving(true);
    if (value) {
      void createCrimeGroup({
        // },
        onCompleted: (res) => {
          onSetSuggestedOffenders(res.createCrimeGroup.offenders);
          onSetSuggestedVehicles(res.createCrimeGroup.offenders);
          successNotification(
            ProfileUpdatedModel.Crime_Group,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        // optimisticResponse: {
        //   createCrimeGroup: {
        //     id: Math.random().toString(),
        //     reference: 1000,
        //     totalIncidents: 0,
        //     totalOffenders: 0,
        //     totalRecoveredValue: 0,
        //     totalTheftSuccess: 0,
        //     totalValue: 0,
        //     updatedAt: new Date(),
        //     alias: '',
        //   },
        variables: {
          data: {
            alias: value.alias,
            investigations: {
              connect: [{ id: investigationId }],
            },
            offenders: {
              connect:
                value?.offenders?.map(({ id }) => ({
                  id,
                })) || [],
            },

            schemes: {
              connect: [
                {
                  id: schemeId,
                },
              ],
            },
            vehicles: {
              connect:
                value?.vehicles?.map(({ id }) => ({
                  id,
                })) || [],
            },
          },
        },
      }).finally(() => {
        setAddCrimeGroup(false);
        setSaving(false);
      });
    }
  };
  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.updateCrimeGroup === null || res?.updateCrimeGroup === undefined)
        return;
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });
      if (!existingData?.investigation) return;

      const filterCrimeGroups = (
        existingData?.investigation?.crimeGroups as Array<{ id: string }>
      ).filter(({ id }) => id !== res.updateCrimeGroup.id);

      store.writeQuery<ViewInvestigationQuery>({
        data: {
          __typename: 'Query',
          investigation: {
            ...existingData.investigation,
            // TODO fix the types ?????
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            crimeGroups: [...filterCrimeGroups, res.updateCrimeGroup],
          },
        },
        query: ViewInvestigationDocument,
        variables,
      });
    },
  });
  const onEditCrimeGroup = (value: CrimeGroupCardData) => {
    setSaving(true);
    if (value) {
      const existingOffenderIds = editCrimeGroupData?.offenders?.map(
        ({ id }) => id
      );
      const disconnectOffenderIds = existingOffenderIds?.filter(
        (id) => !value.offenders?.map((el) => el.id).includes(id)
      );
      const connectOffenders = value.offenders?.filter(
        ({ id }) => !existingOffenderIds?.includes(id)
      );
      const existingVehicleIds = editCrimeGroupData?.vehicles?.map(
        ({ id }) => id
      );
      const disconnectVehicleIds = existingVehicleIds?.filter(
        (id) => !value.vehicles?.map((el) => el.id).includes(id)
      );
      const connectVehicles = value.vehicles?.filter(
        ({ id }) => !existingVehicleIds?.includes(id)
      );
      void updateCrimeGroup({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Crime_Group,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          data: {
            alias: value.alias ?? undefined,
            offenders:
              value.offenders && value.offenders.length > 0
                ? {
                    connect: connectOffenders?.map(({ id }) => ({ id })),
                    disconnect:
                      disconnectOffenderIds && disconnectOffenderIds.length > 0
                        ? disconnectOffenderIds.map((id) => ({ id }))
                        : undefined,
                  }
                : {
                    disconnect:
                      disconnectOffenderIds && disconnectOffenderIds.length > 0
                        ? disconnectOffenderIds.map((id) => ({ id }))
                        : undefined,
                  },
            vehicles:
              value.vehicles && value.vehicles.length > 0
                ? {
                    connect: connectVehicles?.map(({ id }) => ({ id })),
                    disconnect:
                      disconnectVehicleIds && disconnectVehicleIds.length > 0
                        ? disconnectVehicleIds.map((id) => ({ id }))
                        : undefined,
                  }
                : {
                    disconnect:
                      disconnectVehicleIds && disconnectVehicleIds.length > 0
                        ? disconnectVehicleIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
          where: {
            id: value.id,
          },
        },
      }).finally(() => {
        setEditCrimeGroupData(null);
        setSaving(false);
      });
    }
  };

  // incident
  const [updateInvestigationIncidents] =
    useUpdateInvestigationIncidentsMutation({
      onError: () => {
        errorNotification();
      },
    });
  const onAddExistingIncident = (values: string[]) => {
    setSaving(true);
    if (values) {
      void updateInvestigationIncidents({
        onCompleted: (res) => {
          const newData = res.updateInvestigation?.incidents.filter(({ id }) =>
            values.includes(id)
          );
          const newOffenders = newData?.flatMap((el) => el.offenders);
          const newVehicles = newData?.flatMap((el) => el.vehicles);

          if (newOffenders && newOffenders.length > 0) {
            onSetSuggestedOffenders(newOffenders);
          }
          if (newVehicles) {
            onSetSuggestedVehicles(newVehicles);
          }
          successNotification(
            ProfileUpdatedModel.Incident,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: (store, { data: res }) => {
          if (
            res?.updateInvestigation === null ||
            res?.updateInvestigation === undefined
          )
            return;

          const existingData = store.readQuery<ViewInvestigationQuery>({
            query: ViewInvestigationDocument,
            variables,
          });

          if (!existingData?.investigation) return;
          store.writeQuery<ViewInvestigationQuery>({
            data: {
              __typename: 'Query',
              investigation: {
                ...existingData.investigation,
                incidents: res.updateInvestigation.incidents.map(
                  (incident) => ({
                    ...incident,
                    createdBy: {
                      __typename: 'User' as const,
                      fullName: '',
                      id: '',
                    },
                    crimeTypes: [],
                    description: '',
                    groups: [],
                    priority: 'LOW' as Types.IncidentPriority,
                  })
                ),
              },
            },
            query: ViewInvestigationDocument,
            variables,
          });
        },
        variables: {
          id: investigationId,
          incidentIds: values,
        },
      }).finally(() => {
        setAddExistingIncident(false);
        setSaving(false);
      });
    }
  };

  const onDeleteIncident = (value: string) => {
    setSaving(true);
    if (value)
      void updateInvestigationIncidents({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.deleted
          );
        },
        update: (store, { data: res }) => {
          if (
            res?.updateInvestigation === null ||
            res?.updateInvestigation === undefined
          )
            return;
          const existingData = store.readQuery<ViewInvestigationQuery>({
            query: ViewInvestigationDocument,
            variables,
          });

          if (!existingData?.investigation) return;
          store.writeQuery<ViewInvestigationQuery>({
            data: {
              __typename: 'Query',
              investigation: {
                ...existingData.investigation,
                incidents: (
                  existingData.investigation.incidents as Array<{ id: string }>
                ).filter(({ id }) => id !== value),
              },
            },
            query: ViewInvestigationDocument,
            variables,
          });
        },
        variables: {
          disconnectIncidentIds: [value],
          id: investigationId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  const [deleteDocument] = useDeleteDocumentMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The document has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });

      if (!existingData?.investigation) return;
      store.writeQuery<ViewInvestigationQuery>({
        data: {
          __typename: 'Query',
          investigation: {
            ...existingData.investigation,
            documents: existingData.investigation.documents.filter(
              ({ id }) => id !== res?.deleteDocument.id
            ),
          },
        },
        query: ViewInvestigationDocument,
        variables,
      });
    },
  });

  const onDeleteDocument = (documentId: string) => {
    void deleteDocument({
      variables: {
        id: documentId,
      },
    });
  };

  const [deleteInvestigation] = useDeleteInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The investigation has been deleted!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onDeleteInvestigation = () => {
    setSaving(true);
    void deleteInvestigation({
      variables: {
        id: investigationId || '',
      },
    });
  };
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(() => !addExistingOffender);
  };
  const toggleAddVehicle = () => {
    setAddVehicle(!addVehicle);
  };
  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(() => !addExistingVehicle);
  };
  const toggleAddCrimeGroup = () => {
    setAddCrimeGroup(!addCrimeGroup);
  };
  const toggleAddExistingCrimeGroup = () => {
    setAddExistingCrimeGroup(() => !addExistingCrimeGroup);
  };

  const toggleAddExistingIncident = () => {
    setAddExistingIncident(() => !addExistingIncident);
  };

  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };
  const toggleAddDemDocument = () => {
    setAddDemDocument(() => !addDemDocument);
  };
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };
  const toggleEditInvestigation = () => {
    setEditInvestigation(() => !editInvestigation);
  };
  const toggleShowSuggestedOffenders = () => {
    setShowSuggestedOffenders(true);
  };
  const toggleShowSuggestedVehicles = () => {
    setShowSuggestedVehicles(true);
  };

  const toggleSubscribe = () => {
    if (data?.investigation?.subscribed) {
      void unsubscribeFromInvestigation({
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeToInvestigation: {
            __typename: 'Investigation',
            id: investigationId,
            subscribed: false,
          },
        },
        variables: {
          where: { id: investigationId },
        },
      });
    } else {
      void subscribeToInvestigation({
        optimisticResponse: {
          __typename: 'Mutation',
          subscribeToInvestigation: {
            __typename: 'Investigation',
            id: investigationId,
            subscribed: true,
          },
        },
        variables: {
          where: { id: investigationId },
        },
      });
    }
  };

  const onCloseInvestigation = () => {
    void closeInvestigation({
      variables: {
        where: {
          id: investigationId,
        },
      },
    });
  };

  const onReopenInvestigation = () => {
    void reopenInvestigation({
      variables: {
        where: {
          id: investigationId,
        },
      },
    });
  };

  return {
    addCrimeGroup,
    addDemDocument,
    addDocument,
    addExistingCrimeGroup,
    addExistingIncident,
    addExistingOffender,
    addExistingVehicle,
    addOffender,
    addTodo,
    addVehicle,
    completeTodoVisible,
    crimeGroupIds,
    data,
    demId,
    editCrimeGroupData,
    editInvestigation,
    editOffenderData,
    editVehicleData,
    incidentIds,
    loading,
    offenderIds,
    onAddCrimeGroup,
    onAddExistingCrimeGroup,
    onAddExistingIncident,
    onAddExistingOffenders,
    onAddExistingVehicle,
    onAddExistingVehicles,
    // onEditOffender,
    onAddVehicle,
    onCloseInvestigation,
    onCompletedAddOffender,
    onCompletedEditOffender,
    onDeleteCrimeGroup,
    onDeleteDocument,
    onDeleteIncident,
    onDeleteInvestigation,
    onDeleteOffender,
    onDeleteVehicle,
    onEditCrimeGroup,
    onEditVehicle,
    onRefetchInvestigation,
    onReopenInvestigation,
    saving,
    setCompleteTodoVisible,
    setEditCrimeGroupData,
    setEditOffenderData,
    setEditVehicleData,
    setViewTodoVisible,
    showSuggestedOffenders,
    showSuggestedVehicles,
    // onAddOffender,
    suggestedOffenders,
    suggestedVehicles,
    takeAllSchemes,
    templatesData,
    templatesLoading,
    toggleAddCrimeGroup,
    toggleAddDemDocument,
    toggleAddDocument,
    toggleAddExistingCrimeGroup,
    toggleAddExistingIncident,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddOffender,
    toggleAddTodo,
    toggleAddVehicle,
    toggleCloseSuggestedOffenders,
    toggleCloseSuggestedVehicles,
    toggleEditInvestigation,
    toggleShowSuggestedOffenders,
    toggleShowSuggestedVehicles,
    toggleSubscribe,
    updateAddOffenderList,
    updateEditOffenderList,
    updateTodo,
    updateTodoList,
    vehicleIds,
    viewTodoVisible,
  };
};

export default useViewInvestigation;
