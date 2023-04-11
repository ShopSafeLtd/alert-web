import React, { useEffect, useState } from 'react';
import type {
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/generated';
import {
  useSchemeQuery,
  Role,
  useAddImagesToOffenderMutation,
  useDeleteUpdateMutation,
  useRecycleOffenderMutation,
  useSubscribeToOffenderMutation,
  useUpdateOffenderMutation,
  useUpdateUpdateMutation,
  useViewOffenderQuery,
  ViewOffenderDocument,
} from 'graphql/generated';

import { Modal, notification } from 'antd';
import { useStoreState } from 'state';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPeople, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';
import update from 'immutability-helper';

const { confirm } = Modal;

interface Return {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  editRights: boolean;

  deleteRights: boolean;
  linkIncident: boolean;
  toggleLinkIncident: () => void;
  updateIncidentList: (value: string) => void;
  optionMenuItems: ItemType[];
  toggleSubscribe: () => void;
  lightboxElements: {
    src: string;
  }[];
  scrolledToTop: () => void;
  loadMore: boolean;
  userId: string;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  editUpdate: { id: string; text: string } | null;
  selectedImages: string[];
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  toggleSelectImages: (id: string) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  closeAddImages: () => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  publicOffenderDOB: boolean;
}

const useViewOffender = (offenderId: string): Return => {
  const navigate = useNavigate();
  const schemeId = useStoreState((state) => state.scheme.id);
  const role = useStoreState((state) => state.user.role);
  const groups = useStoreState((state) => state.user.groups);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [publicOffenderDOB, setPublicOffenderDOB] = useState(false);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [optionMenuItems, setOptionsMenuItems] = useState<ItemType[]>([]);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };
  const groupsId = groups.map((group) => group.id);
  const [loadMore, setLoadMore] = useState(false);
  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [addImages, setAddImages] = useState<
    | {
        id: string;
        url: string;
      }[]
    | null
  >(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [editUpdateInput, setEditUpdateInput] = useState('');

  const { data, loading } = useViewOffenderQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: offenderId,
      },
      banWhere: {
        groups:
          role === Role.User || role === Role.ContentAdmin
            ? { some: { id: { in: groupsId } } }
            : undefined,
      },
    },
    onCompleted: (res) => {
      setLightboxElements(
        res.offender?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
  });
  useSchemeQuery({
    variables: { where: { id: schemeId } },
    onCompleted: ({ scheme }) => {
      setPublicOffenderDOB(scheme?.defaultPublicOffenderDOB || false);
    },
  });
  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Linked!',
        description: 'The offenders have been Linked to this incidents!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const updateIncidentList = (selectedIncidentId: string) => {
    setSaving(true);
    if (offenderId && selectedIncidentId) {
      updateOffender({
        variables: {
          where: {
            id: offenderId,
          },
          data: {
            incidents: {
              connect: [{ id: selectedIncidentId }],
            },
          },
        },
      });
    }
  };
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        message: 'Successfully Deleted!',
        description:
          'The offender has been deleted from the feed and moved to the recycle bin.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onDelete = (id: string) => {
    confirm({
      title: 'Are you sure?',
      content:
        'Click delete if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Delete',
      onOk() {
        recycleOffender({
          variables: {
            where: { id },
          },
        });
      },
    });
  };
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };

  const [subscribe] = useSubscribeToOffenderMutation();

  const toggleSubscribe = () => {
    subscribe({
      variables: {
        where: {
          id: offenderId,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        subscribeToOffender: {
          id: offenderId,
          __typename: 'Offender',
          subscribed: data?.offender?.subscribed,
        },
      },
    });
  };

  const scrolledToTop = () => {
    setLoadMore(true);
  };

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
            ViewOffenderQuery,
            ViewOffenderQueryVariables
          >({
            query: ViewOffenderDocument,
            variables: {
              where: {
                id: offenderId,
              },
            },
          });

          if (oldData?.offender)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.offender.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>(
                  {
                    query: ViewOffenderDocument,
                    variables: {
                      where: {
                        id: offenderId,
                      },
                    },
                    data: {
                      offender: {
                        ...oldData.offender,
                        updates: update(oldData.offender.updates, {
                          [oldData.offender.updates
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
                  }
                );
              }
            } else {
              store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>({
                query: ViewOffenderDocument,
                variables: {
                  where: {
                    id: offenderId,
                  },
                },
                data: {
                  offender: {
                    ...oldData.offender,
                    updates: oldData.offender.updates.filter(
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
      title: 'Are you sure?',
      content: 'The update will be permanently deleted.',
      onOk() {
        handleDeleteUpdate(updateId);
      },
      okText: 'Delete',
    });
  };

  const [addImagesToIncident] = useAddImagesToOffenderMutation();

  const addUpdateImages = (images: { id: string }[]) => {
    addImagesToIncident({
      variables: {
        images,
        offender: {
          id: offenderId,
        },
      },
    });
    setAddImages(null);
    setSelectedImages([]);
  };

  const confirmUpdateImages = (images: { id: string; url: string }[]) => {
    if (images.length > 1) {
      setAddImages(images);
    } else {
      confirm({
        title: 'Are you sure?',
        content:
          'Adding this image will notify any other users following the incident.',
        onOk() {
          addUpdateImages(images.map(({ id }) => ({ id })));
        },
        okText: 'Add Images',
      });
    }
  };

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

  const toggleSelectImages = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const closeAddImages = () => {
    setAddImages(null);
  };

  useEffect(() => {
    if (
      [Role.ContentAdmin, Role.SchemeAdmin, Role.ShopsafeAdmin].includes(role)
    ) {
      setOptionsMenuItems([
        {
          label: 'Compare',
          key: '0',
          icon: <FontAwesomeIcon size="3x" icon={faPeople} />,
          onClick: () => navigate(`/app/offenders/compare/${offenderId}`),
        },
        {
          label: 'Edit',
          key: '1',
          icon: <FontAwesomeIcon size="3x" icon={faEdit} />,
          onClick: () => navigate(`/app/offenders/edit/${offenderId}`),
        },
        {
          label: 'Delete',
          key: '2',
          icon: <FontAwesomeIcon icon={faTrash} />,
          onClick: () => onDelete(offenderId),
        },
      ]);
    }
  }, [role]);

  return {
    data,
    loading: data?.offender ? false : loading,
    saving,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    linkIncident,
    toggleLinkIncident,
    updateIncidentList,
    optionMenuItems,
    toggleSubscribe,
    lightboxElements,
    scrolledToTop,
    loadMore,
    userId,
    replyTo,
    setReplyTo,
    confirmDeleteUpdate,
    setEditUpdate,
    confirmUpdateImages,
    addImages,
    editUpdate,
    selectedImages,
    handleEditUpdate,
    addUpdateImages,
    closeAddImages,
    editUpdateInput,
    setEditUpdateInput,
    toggleSelectImages,
    openLightbox,
    lightBoxOpen,
    optionRowShow,
    setOptionRowShow,
    publicOffenderDOB,
  };
};

export default useViewOffender;
