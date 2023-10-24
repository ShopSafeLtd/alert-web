import type {
  CreateTodoMutation,
  QuestionGroupOnSchemeQuery,
  UpdateInvestigationOffendersMutation,
  UpdateInvestigationVehiclesMutation,
  UpdateTaskMutation,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/generated';
import {
  useCreateCrimeGroupSuggestedDataMutation,
  useUpdateInvestigationCrimeGroupsMutation,
  useUpdateInvestigationIncidentsMutation,
  useUpdateInvestigationOffendersMutation,
  useUpdateInvestigationVehiclesMutation,
  useDeleteInvestigationMutation,
  useCreateSimpleOffenderMutation,
  useCreateSimpleVehicleMutation,
  useQuestionGroupOnSchemeQuery,
  useSubscribeToInvestigationMutation,
  useUnsubscribeToInvestigationMutation,
  useUpdateCrimeGroupMutation,
  useUpdateSimpleOffenderMutation,
  useUpdateSimpleVehicleMutation,
  useViewInvestigationQuery,
  ViewInvestigationDocument,
} from 'graphql/generated';
import { useState } from 'react';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';
import update from 'immutability-helper';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import successNotification from 'types/mutation_notifications/success_notification';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import { notification } from 'antd';
import { useIntl } from 'react-intl';
import { useStoreState } from '../../../state';

interface Return {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;
  offenderIds: string[];
  vehicleIds: string[];
  incidentIds: string[];
  crimeGroupIds: string[];
  addOffender: boolean;
  addExistingOffender: boolean;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  editOffenderData: OffenderData | null;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  addVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleData: VehicleData | null;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  addCrimeGroup: boolean;
  addExistingCrimeGroup: boolean;
  toggleAddCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  editCrimeGroupData: CrimeGroupCardData | null;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  onDeleteCrimeGroup: (id: string) => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  toggleAddDemDocument: () => void;
  addDemDocument: boolean;
  demId: string | null | undefined;
  onAddExistingOffender: (value: string) => void;
  onAddExistingVehicle: (value: string) => void;
  onAddExistingCrimeGroup: (value: string) => void;
  onAddExistingIncident: (value: string) => void;
  onAddOffender: (value: OffenderData) => void;
  onEditOffender: (value: OffenderData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onEditVehicle: (value: VehicleData) => void;
  onAddCrimeGroup: (value: CrimeGroupCardData) => void;
  onEditCrimeGroup: (value: CrimeGroupCardData) => void;
  onDeleteIncident: (id: string) => void;
  toggleSubscribe: () => void;
  takeAllSchemes: boolean;
  addTodo: boolean;
  toggleAddTodo: () => void;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  viewTodoVisible: string | null;
  setViewTodoVisible: (value: string | null) => void;
  completeTodoVisible: string | null;
  setCompleteTodoVisible: (value: string | null) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  saving: boolean;
  onDeleteInvestigation: () => void;
  suggestedOffenders: OffenderData[] | undefined;
  toggleCloseSuggestedOffenders: () => void;
  toggleCloseSuggestedVehicles: () => void;
  suggestedVehicles: VehicleData[] | undefined;
  onAddExistingOffenders: (value: string[]) => void;
  onAddExistingVehicles: (value: string[]) => void;
  showSuggestedVehicles: boolean;
  showSuggestedOffenders: boolean;
  toggleShowSuggestedVehicles: () => void;
  toggleShowSuggestedOffenders: () => void;
  editInvestigation: boolean;
  toggleEditInvestigation: () => void;
}
const useViewInvestigation = (investigationId: string): Return => {
  const intl = useIntl();

  const schemeId = useStoreState((state) => state.scheme.id);
  const demId = useStoreState((state) => state.user.demId);
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
  const [viewTodoVisible, setViewTodoVisible] = useState<string | null>(null);
  const [completeTodoVisible, setCompleteTodoVisible] = useState<string | null>(
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
  const { data, loading } = useViewInvestigationQuery({
    variables,
    skip: !investigationId,
    onCompleted: ({ investigation }) => {
      if (investigation?.offenders && investigation.offenders.length > 0) {
        setOffenderIds(investigation.offenders.map(({ id }) => id));
      }
      if (investigation?.vehicles && investigation.vehicles.length > 0) {
        setVehicleIds(investigation.vehicles.map(({ id }) => id));
      }
      if (investigation?.crimeGroups && investigation.crimeGroups.length > 0) {
        setCrimeGroupIds(investigation.crimeGroups.map(({ id }) => id));
      }
      if (investigation?.incidents && investigation.incidents.length > 0) {
        setIncidentIds(investigation.incidents.map(({ id }) => id));
      }
    },
  });
  const onSetSuggestedOffenders = (values: OffenderData[]) => {
    if (values) {
      const offendersId = data?.investigation?.offenders.map(({ id }) => id);
      const filterData = values.filter(({ id }) => !offendersId?.includes(id));
      setSuggestedOffenders(filterData);
    }
  };
  const onSetSuggestedVehicles = (values: VehicleData[]) => {
    if (values) {
      const vehiclesId = data?.investigation?.vehicles.map(({ id }) => id);
      const filterData = values.filter(({ id }) => !vehiclesId?.includes(id));
      setSuggestedVehicles(filterData);
    }
  };
  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        where: {
          id: schemeId,
        },
        questionGroupsWhere: {
          defaultForIncidents: {
            equals: true,
          },
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
      query: ViewInvestigationDocument,
      data: {
        investigation: {
          ...existingData.investigation,
          todos: [...existingData.investigation.todos, res.createTodo],
        },
        __typename: 'Query',
      },
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
      query: ViewInvestigationDocument,
      data: {
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
        __typename: 'Query',
      },
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
  const updateOffenderList: MutationUpdaterFn<
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
      query: ViewInvestigationDocument,
      data: {
        investigation: {
          ...existingData.investigation,
          offenders: res.updateInvestigation.offenders,
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const onAddExistingOffenders = (value: string[]) => {
    setSaving(true);
    if (value) {
      void updateInvestigationOffenders({
        variables: {
          id: investigationId,
          offenderIds: value,
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateOffenderList,
      }).finally(() => {
        toggleCloseSuggestedOffenders();
        setSaving(false);
      });
    }
  };
  const onAddExistingOffender = (value: string) => {
    setSaving(true);
    if (value) {
      void updateInvestigationOffenders({
        variables: {
          id: investigationId,
          offenderIds: value,
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateOffenderList,
      }).finally(() => {
        setAddExistingOffender(false);
        setSaving(false);
      });
    }
  };
  const [updateOffender] = useUpdateSimpleOffenderMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.updateOffender === null || res?.updateOffender === undefined)
        return;
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });
      if (!existingData?.investigation) return;
      const index = existingData?.investigation?.offenders
        .map((item) => item.id)
        .indexOf(res.updateOffender.id);

      store.writeQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        data: {
          investigation: {
            ...existingData.investigation,
            offenders: update(existingData.investigation.offenders, {
              [index]: {
                $set: { ...res.updateOffender },
              },
            }),
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const onEditOffender = (value: OffenderData) => {
    setSaving(true);
    if (value) {
      const existingImageIds = editOffenderData?.images?.map(({ id }) => id);
      const deleteIds = existingImageIds?.filter(
        (id) => !value.images?.map((el) => el.id).includes(id)
      );

      void updateOffender({
        variables: {
          where: {
            id: value.id,
          },
          data: {
            name: { set: value.name },
            gender: { set: value.gender || null },
            race: { set: value.race || null },
            build: { set: value.build || null },
            hair: { set: value.hair || 'Unknown' },
            peculiarities: { set: value.peculiarities || '' },
            age: { set: value.age || null },
            dateSource: { set: value.dateSource || null },
            dateOfBirth: { set: value.dateOfBirth || null },
            groups: {
              set:
                value.groups && value.groups.length > 0
                  ? value.groups.map(({ id }) => ({ id }))
                  : undefined,
            },
            images:
              value.images && value.images.length > 0
                ? {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                        position: item.position,
                        primary: item.primary,
                        policeImage: item.policeImage,
                        rotation: item.rotation || 0,
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.updated
          );
        },
      }).finally(() => {
        setEditOffenderData(null);
        setSaving(false);
      });
    }
  };
  const [createOffender] = useCreateSimpleOffenderMutation({
    onCompleted: () => {
      successNotification(
        ProfileUpdatedModel.Offender,
        ProfileUpdatedModel.Investigation,
        ProfileUpdatedType.added
      );
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.createOffender === null || res?.createOffender === undefined)
        return;
      const existingData = store.readQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        variables,
      });

      if (!existingData?.investigation) return;
      store.writeQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        data: {
          investigation: {
            ...existingData.investigation,
            offenders: [
              ...existingData.investigation.offenders,
              res.createOffender,
            ],
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const onAddOffender = (value: OffenderData) => {
    setSaving(true);
    if (value) {
      void createOffender({
        variables: {
          data: {
            name: value.name,
            gender: value.gender || null,
            race: value.race || null,
            build: value.build || null,
            height: value.height || null,
            hair: value.hair || null,
            peculiarities: value.peculiarities || null,
            comment: value.comment || null,
            age: value.age || null,
            dateSource: value.dateSource || null,
            dateOfBirth: value.dateOfBirth || null,
            groups: {
              connect:
                value?.groups && value.groups.length > 0
                  ? value.groups.map(({ id }) => ({ id }))
                  : [],
            },
            scheme: schemeId,
            investigationId,
            // createdBy: { connect: { id: userId } },
            // localId: value.id,
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
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                        position: item.position,
                        primary: item.primary,
                        policeImage: item.policeImage,
                        rotation: item.rotation || 0,
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
          },
        },
      }).finally(() => {
        setAddOffender(false);
        setSaving(false);
      });
    }
  };
  const onDeleteOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateInvestigationOffenders({
        variables: {
          id: investigationId,
          disconnectOffenderIds: [value],
        },
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
            query: ViewInvestigationDocument,
            data: {
              investigation: {
                ...existingData.investigation,
                offenders: existingData.investigation.offenders.filter(
                  ({ id }) => id !== value
                ),
              },
              __typename: 'Query',
            },
            variables,
          });
        },
      }).finally(() => {
        setSaving(false);
      });
  };

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
      query: ViewInvestigationDocument,
      data: {
        investigation: {
          ...existingData.investigation,
          vehicles: res.updateInvestigation.vehicles,
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const onAddExistingVehicles = (value: string[]) => {
    setSaving(true);
    if (value) {
      void updateInvestigationVehicles({
        variables: {
          id: investigationId,
          vehicleIds: value,
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateVehicleList,
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
        variables: {
          id: investigationId,
          vehicleIds: value,
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
        },
        update: updateVehicleList,
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
        query: ViewInvestigationDocument,
        data: {
          investigation: {
            ...existingData.investigation,
            vehicles: update(existingData.investigation.vehicles, {
              [index]: {
                $set: { ...res.updateVehicle },
              },
            }),
          },
          __typename: 'Query',
        },
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
        variables: {
          where: {
            id: value.id,
          },
          data: {
            make: { set: value.make || '' },
            model: { set: value.model || '' },
            colour: { set: value.colour || '' },
            registration: { set: value.registration || '' },
            images:
              value.images && value.images.length > 0
                ? {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                        position: item.position,
                        primary: item.primary,
                        policeImage: item.policeImage,
                        rotation: item.rotation || 0,
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.updated
          );
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
        query: ViewInvestigationDocument,
        data: {
          investigation: {
            ...existingData.investigation,
            vehicles: [
              ...existingData.investigation.vehicles,
              res.createVehicle,
            ],
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const onAddVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      void createVehicle({
        variables: {
          data: {
            make: value.make || '',
            model: value.model || '',
            colour: value.colour || '',
            registration: value.registration || '',
            investigationId,
            schemes: schemeId,
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
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                        position: item.position,
                        primary: item.primary,
                        policeImage: item.policeImage,
                        rotation: item.rotation || 0,
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
          },
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.added
          );
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
        variables: {
          id: investigationId,
          disconnectVehicleIds: [value],
        },
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
            query: ViewInvestigationDocument,
            data: {
              investigation: {
                ...existingData.investigation,
                vehicles: existingData.investigation.vehicles.filter(
                  ({ id }) => id !== value
                ),
              },
              __typename: 'Query',
            },
            variables,
          });
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
        variables: {
          id: investigationId,
          crimeGroupIds: [value],
        },
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
            query: ViewInvestigationDocument,
            data: {
              investigation: {
                ...existingData.investigation,
                crimeGroups: res.updateInvestigation.crimeGroups,
              },
              __typename: 'Query',
            },
            variables,
          });
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
        variables: {
          id: investigationId,
          disconnectCrimeGroupIds: [value],
        },
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
            query: ViewInvestigationDocument,
            data: {
              investigation: {
                ...existingData.investigation,
                crimeGroups: existingData.investigation.crimeGroups.filter(
                  ({ id }) => id !== value
                ),
              },
              __typename: 'Query',
            },
            variables,
          });
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
        query: ViewInvestigationDocument,
        data: {
          investigation: {
            ...existingData.investigation,
            crimeGroups: [
              ...existingData.investigation.crimeGroups,
              res.createCrimeGroup,
            ],
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const onAddCrimeGroup = (value: CrimeGroupCardData) => {
    setSaving(true);
    if (value) {
      void createCrimeGroup({
        variables: {
          data: {
            alias: value.alias,
            schemes: {
              connect: [
                {
                  id: schemeId,
                },
              ],
            },
            offenders: {
              connect: value?.offenders?.map(({ id }) => ({
                id,
              })),
            },

            vehicles: {
              connect: value?.vehicles?.map(({ id }) => ({
                id,
              })),
            },
            investigations: {
              connect: [{ id: investigationId }],
            },
          },
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
      const index = existingData?.investigation?.crimeGroups
        .map((item) => item.id)
        .indexOf(res.updateCrimeGroup.id);

      store.writeQuery<ViewInvestigationQuery>({
        query: ViewInvestigationDocument,
        data: {
          investigation: {
            ...existingData.investigation,
            crimeGroups: update(existingData.investigation.crimeGroups, {
              [index]: {
                $set: { ...res.updateCrimeGroup },
              },
            }),
          },
          __typename: 'Query',
        },
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
        variables: {
          where: {
            id: value.id,
          },
          data: {
            alias: value.alias ?? undefined,
            vehicles:
              value.vehicles && value.vehicles.length > 0
                ? {
                    disconnect:
                      disconnectVehicleIds && disconnectVehicleIds.length > 0
                        ? disconnectVehicleIds.map((id) => ({ id }))
                        : undefined,
                    connect: connectVehicles?.map(({ id }) => ({ id })),
                  }
                : {
                    disconnect:
                      disconnectVehicleIds && disconnectVehicleIds.length > 0
                        ? disconnectVehicleIds.map((id) => ({ id }))
                        : undefined,
                  },
            offenders:
              value.offenders && value.offenders.length > 0
                ? {
                    disconnect:
                      disconnectOffenderIds && disconnectOffenderIds.length > 0
                        ? disconnectOffenderIds.map((id) => ({ id }))
                        : undefined,
                    connect: connectOffenders?.map(({ id }) => ({ id })),
                  }
                : {
                    disconnect:
                      disconnectOffenderIds && disconnectOffenderIds.length > 0
                        ? disconnectOffenderIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Crime_Group,
            ProfileUpdatedModel.Investigation,
            ProfileUpdatedType.updated
          );
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
  const onAddExistingIncident = (value: string) => {
    setSaving(true);
    if (value) {
      void updateInvestigationIncidents({
        variables: {
          id: investigationId,
          incidentIds: [value],
        },
        onCompleted: (res) => {
          const newData = res.updateInvestigation?.incidents.find(
            ({ id }) => id === value
          );
          if (newData) {
            onSetSuggestedOffenders(newData?.offenders);
            onSetSuggestedVehicles(newData?.vehicles);
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
            query: ViewInvestigationDocument,
            data: {
              investigation: {
                ...existingData.investigation,
                incidents: res.updateInvestigation.incidents,
              },
              __typename: 'Query',
            },
            variables,
          });
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
        variables: {
          id: investigationId,
          disconnectIncidentIds: [value],
        },
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
            query: ViewInvestigationDocument,
            data: {
              investigation: {
                ...existingData.investigation,
                incidents: existingData.investigation.incidents.filter(
                  ({ id }) => id !== value
                ),
              },
              __typename: 'Query',
            },
            variables,
          });
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  const [deleteInvestigation] = useDeleteInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The investigation has been deleted!',
          id: 'GtLkNt',
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
        variables: {
          where: { id: investigationId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeToInvestigation: {
            id: investigationId,
            __typename: 'Investigation',
            subscribed: false,
          },
        },
      });
    } else {
      void subscribeToInvestigation({
        variables: {
          where: { id: investigationId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          subscribeToInvestigation: {
            id: investigationId,
            __typename: 'Investigation',
            subscribed: true,
          },
        },
      });
    }
  };

  return {
    data,
    loading,
    offenderIds,
    vehicleIds,
    incidentIds,
    crimeGroupIds,
    addDemDocument,
    toggleAddDemDocument,
    addDocument,
    toggleAddDocument,
    demId,
    toggleSubscribe,
    takeAllSchemes,
    addTodo,
    toggleAddTodo,
    templatesData,
    templatesLoading,
    setViewTodoVisible,
    setCompleteTodoVisible,
    completeTodoVisible,
    viewTodoVisible,
    updateTodo,
    updateTodoList,
    addOffender,
    addExistingOffender,
    toggleAddOffender,
    toggleAddExistingOffender,
    editOffenderData,
    setEditOffenderData,
    onDeleteOffender,
    addVehicle,
    addExistingVehicle,
    toggleAddVehicle,
    toggleAddExistingVehicle,
    editVehicleData,
    setEditVehicleData,
    onDeleteVehicle,
    addCrimeGroup,
    addExistingCrimeGroup,
    toggleAddCrimeGroup,
    toggleAddExistingCrimeGroup,
    editCrimeGroupData,
    setEditCrimeGroupData,
    addExistingIncident,
    toggleAddExistingIncident,
    onAddExistingOffender,
    onAddExistingVehicle,
    onAddExistingCrimeGroup,
    onAddExistingIncident,
    onAddOffender,
    onEditOffender,
    onAddVehicle,
    onEditVehicle,
    onAddCrimeGroup,
    onEditCrimeGroup,
    onDeleteCrimeGroup,
    onDeleteIncident,
    saving,
    onDeleteInvestigation,
    suggestedOffenders,
    suggestedVehicles,
    toggleCloseSuggestedOffenders,
    toggleCloseSuggestedVehicles,
    onAddExistingOffenders,
    onAddExistingVehicles,
    showSuggestedVehicles,
    showSuggestedOffenders,
    toggleShowSuggestedVehicles,
    toggleShowSuggestedOffenders,
    editInvestigation,
    toggleEditInvestigation,
  };
};

export default useViewInvestigation;
