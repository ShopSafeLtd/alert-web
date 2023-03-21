import {
  Role,
  useDeleteUpdateMutation,
  useSubscribeToInvestigationMutation,
  useUnsubscribeToInvestigationMutation,
  useUpdateUpdateMutation,
  useViewInvestigationQuery,
  ViewInvestigationDocument,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { Modal } from 'antd';
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
  toggleSubscribe: () => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
}

interface Props {
  investigationId: string;
}
const useViewDetails = ({ investigationId }: Props): Return => {
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const [optionRowShow, setOptionRowShow] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
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

  // function

  const [updateUpdate] = useUpdateUpdateMutation();

  const handleEditUpdate = () => {
    if (editUpdate !== null)
      updateUpdate({
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
    deleteUpdate({
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
                    updates: [
                      ...oldData.investigation.updates.filter(
                        (item) => item.id !== result.data?.deleteUpdate?.id
                      ),
                    ],
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
      title: 'Are you sure?',
      content: 'The update will be permanently deleted.',
      onOk() {
        handleDeleteUpdate(updateId);
      },
      okText: 'Delete',
    });
  };

  const [subscribeToInvestigation] = useSubscribeToInvestigationMutation();
  const [unsubscribeFromInvestigation] =
    useUnsubscribeToInvestigationMutation();

  const toggleSubscribe = () => {
    if (data?.investigation?.subscribed) {
      unsubscribeFromInvestigation({
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
      subscribeToInvestigation({
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
    toggleSubscribe,
    optionRowShow,
    setOptionRowShow,
  };
};

export default useViewDetails;
