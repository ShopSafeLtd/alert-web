import type {
  InvestigationSuggestionsQuery,
  InvestigationSuggestionsQueryVariables,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/generated';
import {
  InvestigationSuggestionsDocument,
  Role,
  TagType,
  useDeleteUpdateMutation,
  useInvestigationSuggestionsQuery,
  useUpdateInvestigationMutation,
  useUpdateUpdateMutation,
  useViewInvestigationQuery,
  ViewInvestigationDocument,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import { useStoreState } from '../../../../../state';

const { confirm } = Modal;

interface Return {
  data: ViewInvestigationQuery | undefined;
  loading: boolean;

  scrolledToTop: () => void;
  loadMore: boolean;
  handleEditUpdate: () => void;

  editRights: boolean;
  userId: string;
  saving: boolean;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  editUpdate: { id: string; text: string } | null;
  setEditUpdateInput: (value: string) => void;
  editUpdateInput: string;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
  viewSuggestedOffenders: boolean;
  toggleViewSuggestedOffenders: () => void;
  handleConnectOffender: (id: string) => void;
  handleConnectIncident: (id: string) => void;
  handleConnectVehicle: (id: string) => void;
  viewSuggestedIncidents: boolean;
  toggleViewSuggestedIncidents: () => void;
  viewSuggestedVehicles: boolean;
  toggleViewSuggestedVehicles: () => void;
}

interface Props {
  investigationId: string;
}
const useViewDetails = ({ investigationId }: Props): Return => {
  const intl = useIntl();
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const [optionRowShow, setOptionRowShow] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [viewSuggestedOffenders, setViewSuggestedOffenders] = useState(false);
  const [viewSuggestedIncidents, setViewSuggestedIncidents] = useState(false);
  const [viewSuggestedVehicles, setViewSuggestedVehicles] = useState(false);
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const [saving] = useState(false);

  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);
  const { data, loading } = useViewInvestigationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: investigationId,
      },
    },
  });

  const { data: suggestedData } = useInvestigationSuggestionsQuery({
    variables: {
      where: {
        id: investigationId,
      },
      associatedInvestigation: {
        id: investigationId,
      },
      crimeTypesWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
    },
  });

  // function

  const [updateUpdate] = useUpdateUpdateMutation();
  const [updateInvestigation] = useUpdateInvestigationMutation();

  const handleEditUpdate = () => {
    if (editUpdate !== null)
      void updateUpdate({
        variables: {
          data: {
            text: editUpdateInput,
          },
          where: {
            id: editUpdate.id,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateUpdate: {
            id: editUpdate.id || '',
            __typename: 'Update',
            text: editUpdateInput,
          },
        },
      });
    setEditUpdate(null);
    setEditUpdateInput('');
  };

  const scrolledToTop = () => {
    setLoadMore(true);
  };
  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);
  const [deleteUpdate] = useDeleteUpdateMutation();

  const handleDeleteUpdate = (updateId: string) => {
    void deleteUpdate({
      variables: {
        where: {
          id: updateId,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          id: updateId,
          __typename: 'Update',
          replyToId: '',
        },
      },
      update: (store, result) => {
        if (result.data?.deleteUpdate) {
          const oldData = store.readQuery<
            ViewInvestigationQuery,
            ViewInvestigationQueryVariables
          >({
            query: ViewInvestigationDocument,
            variables: {
              where: {
                id: investigationId,
              },
            },
          });

          if (oldData?.investigation)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.investigation.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<
                  ViewInvestigationQuery,
                  ViewInvestigationQueryVariables
                >({
                  query: ViewInvestigationDocument,
                  variables: {
                    where: {
                      id: investigationId,
                    },
                  },
                  data: {
                    investigation: {
                      ...oldData.investigation,
                      updates: update(oldData.investigation.updates, {
                        [oldData.investigation.updates
                          .map((item) => item.id)
                          .indexOf(result.data.deleteUpdate.replyToId)]: {
                          replies: {
                            $set: updateItem.replies.filter(
                              (item) =>
                                item.id !== result.data?.deleteUpdate?.id
                            ),
                          },
                        },
                      }),
                    },
                  },
                });
              }
            } else {
              store.writeQuery<
                ViewInvestigationQuery,
                ViewInvestigationQueryVariables
              >({
                query: ViewInvestigationDocument,
                variables: {
                  where: {
                    id: investigationId,
                  },
                },
                data: {
                  investigation: {
                    ...oldData.investigation,
                    updates: oldData.investigation.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
              });
            }
        }
      },
    });
  };

  const confirmDeleteUpdate = (updateId: string) => {
    confirm({
      title: intl.formatMessage({
        id: '2oCaym',
        defaultMessage: 'Are you sure?',
      }),
      content: intl.formatMessage({
        id: 'gwznO0',
        defaultMessage: 'The update will be permanently deleted.',
      }),
      okText: intl.formatMessage({
        id: 'K3r6DQ',
        defaultMessage: 'Delete',
      }),

      onOk() {
        handleDeleteUpdate(updateId);
      },
    });
  };

  const toggleViewSuggestedOffenders = () => {
    setViewSuggestedOffenders(!viewSuggestedOffenders);
  };
  const toggleViewSuggestedVehicles = () => {
    setViewSuggestedVehicles(!viewSuggestedVehicles);
  };
  const toggleViewSuggestedIncidents = () => {
    setViewSuggestedIncidents(!viewSuggestedIncidents);
  };

  const handleConnectOffender = (offenderId: string) => {
    toggleViewSuggestedOffenders();
    void updateInvestigation({
      variables: {
        data: {
          offenderIds: [offenderId],
        },
        where: {
          id: investigationId,
        },
      },
      update: (store, result) => {
        const existingData = store.readQuery<
          InvestigationSuggestionsQuery,
          InvestigationSuggestionsQueryVariables
        >({
          query: InvestigationSuggestionsDocument,
          variables: {
            where: {
              id: investigationId,
            },
            associatedInvestigation: {
              id: investigationId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
          },
        });

        if (existingData?.investigation && result.data?.updateInvestigation)
          store.writeQuery<
            InvestigationSuggestionsQuery,
            InvestigationSuggestionsQueryVariables
          >({
            query: InvestigationSuggestionsDocument,
            variables: {
              where: {
                id: investigationId,
              },
              associatedInvestigation: {
                id: investigationId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
            },
            data: {
              investigation: {
                ...existingData.investigation,
                suggestedOffenders:
                  existingData.investigation?.suggestedOffenders?.filter(
                    (offender) => offender.id !== offenderId
                  ),
              },
            },
          });
      },
    });
  };
  const handleConnectIncident = (incidentId: string) => {
    toggleViewSuggestedIncidents();
    void updateInvestigation({
      variables: {
        data: {
          incidentIds: [incidentId],
        },
        where: {
          id: investigationId,
        },
      },
      update: (store, result) => {
        const existingData = store.readQuery<
          InvestigationSuggestionsQuery,
          InvestigationSuggestionsQueryVariables
        >({
          query: InvestigationSuggestionsDocument,
          variables: {
            where: {
              id: investigationId,
            },
            associatedInvestigation: {
              id: investigationId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
          },
        });

        if (existingData?.investigation && result.data?.updateInvestigation)
          store.writeQuery<
            InvestigationSuggestionsQuery,
            InvestigationSuggestionsQueryVariables
          >({
            query: InvestigationSuggestionsDocument,
            variables: {
              where: {
                id: investigationId,
              },
              associatedInvestigation: {
                id: investigationId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
            },
            data: {
              investigation: {
                ...existingData.investigation,
                suggestedIncidents:
                  existingData.investigation?.suggestedIncidents?.filter(
                    (incident) => incident.id !== incidentId
                  ),
              },
            },
          });
      },
    });
  };
  const handleConnectVehicle = (vehicleId: string) => {
    toggleViewSuggestedVehicles();
    void updateInvestigation({
      variables: {
        data: {
          vehicleIds: [vehicleId],
        },
        where: {
          id: investigationId,
        },
      },
      update: (store, result) => {
        const existingData = store.readQuery<
          InvestigationSuggestionsQuery,
          InvestigationSuggestionsQueryVariables
        >({
          query: InvestigationSuggestionsDocument,
          variables: {
            where: {
              id: investigationId,
            },
            associatedInvestigation: {
              id: investigationId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
          },
        });

        if (existingData?.investigation && result.data?.updateInvestigation)
          store.writeQuery<
            InvestigationSuggestionsQuery,
            InvestigationSuggestionsQueryVariables
          >({
            query: InvestigationSuggestionsDocument,
            variables: {
              where: {
                id: investigationId,
              },
              associatedInvestigation: {
                id: investigationId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
            },
            data: {
              investigation: {
                ...existingData.investigation,
                suggestedVehicles:
                  existingData.investigation?.suggestedVehicles?.filter(
                    (vehicle) => vehicle.id !== vehicleId
                  ),
              },
            },
          });
      },
    });
  };

  return {
    confirmDeleteUpdate,
    data,
    scrolledToTop,
    loading: data && data.investigation ? false : loading,
    loadMore,
    editRights: role !== Role.User,
    saving,
    replyTo,
    setEditUpdate,
    setReplyTo,
    userId,
    handleEditUpdate,
    editUpdate,
    setEditUpdateInput,
    editUpdateInput,
    optionRowShow,
    setOptionRowShow,
    suggestedData,
    viewSuggestedOffenders,
    toggleViewSuggestedOffenders,
    handleConnectOffender,
    handleConnectIncident,
    handleConnectVehicle,
    toggleViewSuggestedIncidents,
    toggleViewSuggestedVehicles,
    viewSuggestedIncidents,
    viewSuggestedVehicles,
  };
};

export default useViewDetails;
