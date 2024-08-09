import type {
  InvestigationSuggestionsQuery,
  InvestigationSuggestionsQueryVariables,
} from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';
import type {
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/investigations/queries/__generated__/view-investigation.generated';

import { useStoreState } from '#/state';
import hasPermission from '#/utils/has-permission';
import { Modal } from 'antd';
import { useUpdateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/update-investigation.generated';
import {
  InvestigationSuggestionsDocument,
  useInvestigationSuggestionsQuery,
} from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';
import { ViewInvestigationDocument } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import { useDeleteUpdateMutation } from 'graphql/mutations/__generated__/delete-update.generated';
import { useUpdateUpdateMutation } from 'graphql/mutations/__generated__/update-update.generated';
import { PermissionMethod, PermissionModel, TagType } from 'graphql/types';
import update from 'immutability-helper';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

const { confirm } = Modal;

interface Return {
  confirmDeleteUpdate: (updateId: string) => void;
  editIncidentId: string;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  handleConnectIncident: (id: string) => void;
  handleConnectOffender: (id: string) => void;
  handleConnectVehicle: (id: string) => void;
  handleEditUpdate: () => void;
  loadMore: boolean;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  scrolledToTop: () => void;
  setEditIncidentId: (value: string) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setEditUpdateInput: (value: string) => void;
  setOptionRowShow: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
  toggleViewSuggestedIncidents: () => void;
  toggleViewSuggestedOffenders: () => void;
  toggleViewSuggestedVehicles: () => void;
  userId: string;
  viewSuggestedIncidents: boolean;
  viewSuggestedOffenders: boolean;
  viewSuggestedVehicles: boolean;
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
  const { id: userId, schemes } = useStoreState((state) => state.user);
  const { id: schemeId } = useStoreState((state) => state.scheme);

  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === schemeId),
    [schemes, schemeId]
  );
  const permissions = currentScheme?.permissions;

  const [editIncidentId, setEditIncidentId] = useState('');

  const [replyTo, setReplyTo] = useState<{
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null>(null);

  // const { data, loading } = useViewInvestigationQuery({
  //   fetchPolicy: 'cache-and-network',
  //   variables: {
  //     where: {
  //       id: investigationId,
  //     },
  //   },
  // });

  const { data: suggestedData } = useInvestigationSuggestionsQuery({
    skip: !investigationId,
    variables: {
      associatedInvestigation: {
        id: investigationId,
      },
      crimeTypesWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
      where: {
        id: investigationId,
      },
    },
  });

  // function

  const [updateUpdate] = useUpdateUpdateMutation();
  const [updateInvestigation] = useUpdateInvestigationMutation();

  const handleEditUpdate = () => {
    if (editUpdate !== null)
      void updateUpdate({
        optimisticResponse: {
          __typename: 'Mutation',
          updateUpdate: {
            __typename: 'Update',
            id: editUpdate.id || '',
            text: editUpdateInput,
          },
        },
        variables: {
          data: {
            text: editUpdateInput,
          },
          where: {
            id: editUpdate.id,
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
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          __typename: 'Update',
          id: updateId,
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
                  query: ViewInvestigationDocument,
                  variables: {
                    where: {
                      id: investigationId,
                    },
                  },
                });
              }
            } else {
              store.writeQuery<
                ViewInvestigationQuery,
                ViewInvestigationQueryVariables
              >({
                data: {
                  investigation: {
                    ...oldData.investigation,
                    updates: oldData.investigation.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
                query: ViewInvestigationDocument,
                variables: {
                  where: {
                    id: investigationId,
                  },
                },
              });
            }
        }
      },
      variables: {
        where: {
          id: updateId,
        },
      },
    });
  };

  const confirmDeleteUpdate = (updateId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'The update will be permanently deleted.',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
      }),
      onOk() {
        handleDeleteUpdate(updateId);
      },

      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
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
      update: (store, result) => {
        const existingData = store.readQuery<
          InvestigationSuggestionsQuery,
          InvestigationSuggestionsQueryVariables
        >({
          query: InvestigationSuggestionsDocument,
          variables: {
            associatedInvestigation: {
              id: investigationId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
            where: {
              id: investigationId,
            },
          },
        });

        if (existingData?.investigation && result.data?.updateInvestigation)
          store.writeQuery<
            InvestigationSuggestionsQuery,
            InvestigationSuggestionsQueryVariables
          >({
            data: {
              investigation: {
                ...existingData.investigation,
                suggestedOffenders:
                  existingData.investigation?.suggestedOffenders?.filter(
                    (offender) => offender.id !== offenderId
                  ),
              },
            },
            query: InvestigationSuggestionsDocument,
            variables: {
              associatedInvestigation: {
                id: investigationId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
              where: {
                id: investigationId,
              },
            },
          });
      },
      variables: {
        data: {
          offenderIds: [offenderId],
        },
        where: {
          id: investigationId,
        },
      },
    });
  };
  const handleConnectIncident = (incidentId: string) => {
    toggleViewSuggestedIncidents();
    void updateInvestigation({
      update: (store, result) => {
        const existingData = store.readQuery<
          InvestigationSuggestionsQuery,
          InvestigationSuggestionsQueryVariables
        >({
          query: InvestigationSuggestionsDocument,
          variables: {
            associatedInvestigation: {
              id: investigationId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
            where: {
              id: investigationId,
            },
          },
        });

        if (existingData?.investigation && result.data?.updateInvestigation)
          store.writeQuery<
            InvestigationSuggestionsQuery,
            InvestigationSuggestionsQueryVariables
          >({
            data: {
              investigation: {
                ...existingData.investigation,
                suggestedIncidents:
                  existingData.investigation?.suggestedIncidents?.filter(
                    (incident) => incident.id !== incidentId
                  ),
              },
            },
            query: InvestigationSuggestionsDocument,
            variables: {
              associatedInvestigation: {
                id: investigationId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
              where: {
                id: investigationId,
              },
            },
          });
      },
      variables: {
        data: {
          incidentIds: [incidentId],
        },
        where: {
          id: investigationId,
        },
      },
    });
  };
  const handleConnectVehicle = (vehicleId: string) => {
    toggleViewSuggestedVehicles();
    void updateInvestigation({
      update: (store, result) => {
        const existingData = store.readQuery<
          InvestigationSuggestionsQuery,
          InvestigationSuggestionsQueryVariables
        >({
          query: InvestigationSuggestionsDocument,
          variables: {
            associatedInvestigation: {
              id: investigationId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
            where: {
              id: investigationId,
            },
          },
        });

        if (existingData?.investigation && result.data?.updateInvestigation)
          store.writeQuery<
            InvestigationSuggestionsQuery,
            InvestigationSuggestionsQueryVariables
          >({
            data: {
              investigation: {
                ...existingData.investigation,
                suggestedVehicles:
                  existingData.investigation?.suggestedVehicles?.filter(
                    (vehicle) => vehicle.id !== vehicleId
                  ),
              },
            },
            query: InvestigationSuggestionsDocument,
            variables: {
              associatedInvestigation: {
                id: investigationId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
              where: {
                id: investigationId,
              },
            },
          });
      },
      variables: {
        data: {
          vehicleIds: [vehicleId],
        },
        where: {
          id: investigationId,
        },
      },
    });
  };
  const editRights = hasPermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Investigations,
    },
    permissions,
  });

  return {
    confirmDeleteUpdate,
    editIncidentId,
    editRights,
    editUpdate,
    editUpdateInput,
    handleConnectIncident,
    handleConnectOffender,
    handleConnectVehicle,
    handleEditUpdate,
    loadMore,
    optionRowShow,
    replyTo,
    scrolledToTop,
    setEditIncidentId,
    setEditUpdate,
    setEditUpdateInput,
    setOptionRowShow,
    setReplyTo,
    suggestedData,
    toggleViewSuggestedIncidents,
    toggleViewSuggestedOffenders,
    toggleViewSuggestedVehicles,
    userId,
    viewSuggestedIncidents,
    viewSuggestedOffenders,
    viewSuggestedVehicles,
  };
};

export default useViewDetails;
