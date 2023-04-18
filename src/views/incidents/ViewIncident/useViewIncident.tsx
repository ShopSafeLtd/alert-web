import { useEffect, useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  Race,
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from 'graphql/generated';
import {
  Role,
  useAddImagesToIncidentMutation,
  useDeleteUpdateMutation,
  useRecycleIncidentMutation,
  useSubscribeToIncidentMutation,
  useUnsubscribeFromIncidentMutation,
  useUpdateIncidentMutation,
  useUpdateUpdateMutation,
  useViewIncidentQuery,
  ViewIncidentDocument,
} from 'graphql/generated';
import update from 'immutability-helper';

import { useStoreState } from 'state';
import { Modal, notification } from 'antd';

const { confirm } = Modal;

interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

interface Return {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  addOffenderRights: boolean;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  loadMore: boolean;
  scrolledToTop: () => void;
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
  toggleSubscribe: () => void;
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  closeAddImages: () => void;
  toggleSelectImages: (id: string) => void;
  selectedImages: string[];
  confirmDeleteUpdate: (updateId: string) => void;
  editUpdate: { id: string; text: string } | null;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
}

const useViewIncident = (incidentId: string): Return => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [optionRowShow, setOptionRowShow] = useState(false);

  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [addImages, setAddImages] = useState<
    | {
        id: string;
        url: string;
      }[]
    | null
  >(null);
  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);
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

  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);

  const { data, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },
    onCompleted: (res) => {
      setLightboxElements(
        res.incident?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
  });

  const [updateIncident] = useUpdateIncidentMutation({
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

  const updateOffendersList = (selectedOffender: OffenderData) => {
    setSaving(true);
    if (incidentId && selectedOffender) {
      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            offenders: {
              connect: [{ id: selectedOffender.id }],
            },
          },
        },
      });
    }
    setSaving(false);
  };

  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        message: 'Successfully Deleted!',
        description:
          'The incident has been deleted from the feed and moved to the recycle bin.',
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
        'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Delete',
      onOk() {
        recycleIncident({
          variables: {
            where: { id },
          },
        });
      },
    });
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };

  const scrolledToTop = () => {
    setLoadMore(true);
  };

  const [subscribeToIncident] = useSubscribeToIncidentMutation();
  const [unsubscribeFromIncident] = useUnsubscribeFromIncidentMutation();

  const toggleSubscribe = () => {
    if (data?.incident?.subscribed) {
      unsubscribeFromIncident({
        variables: {
          where: { id: incidentId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeFromIncident: {
            id: incidentId,
            __typename: 'Incident',
            subscribed: false,
          },
        },
      });
    } else {
      subscribeToIncident({
        variables: {
          where: { id: incidentId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          subscribeToIncident: {
            id: incidentId,
            __typename: 'Incident',
            subscribed: true,
          },
        },
      });
    }
  };

  const [addImagesToIncident] = useAddImagesToIncidentMutation();

  const addUpdateImages = (images: { id: string }[]) => {
    addImagesToIncident({
      variables: {
        images,
        incident: {
          id: incidentId,
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

  const closeAddImages = () => {
    setAddImages(null);
  };

  const toggleSelectImages = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
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
            ViewIncidentQuery,
            ViewIncidentQueryVariables
          >({
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });

          if (oldData?.incident)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.incident.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(
                  {
                    query: ViewIncidentDocument,
                    variables: {
                      where: {
                        id: incidentId,
                      },
                    },
                    data: {
                      incident: {
                        ...oldData.incident,
                        updates: update(oldData.incident.updates, {
                          [oldData.incident.updates
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
              store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
                query: ViewIncidentDocument,
                variables: {
                  where: {
                    id: incidentId,
                  },
                },
                data: {
                  incident: {
                    ...oldData.incident,
                    updates: oldData.incident.updates.filter(
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

  return {
    addImages,
    addOffenderRights: role !== Role.User,
    addUpdateImages,
    closeAddImages,
    confirmDeleteUpdate,
    confirmUpdateImages,
    data,
    deleteRights: role !== Role.User,
    editRights: role !== Role.User,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    lightboxElements,
    linkOffender,
    loadMore,
    loading: (data === null || data === undefined) && loading,
    onDelete,
    replyTo,
    saving,
    scrolledToTop,
    selectedImages,
    setEditUpdate,
    setEditUpdateInput,
    setReplyTo,
    toggleLinkOffender,
    toggleSelectImages,
    toggleSubscribe,
    updateOffendersList,
    userId,
    openLightbox,
    lightBoxOpen,
    optionRowShow,
    setOptionRowShow,
  };
};

export default useViewIncident;
