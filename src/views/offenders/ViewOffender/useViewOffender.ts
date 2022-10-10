import { useState } from 'react';
import {
  Role,
  useRecycleOffenderMutation,
  useUpdateOffenderMutation,
  useViewOffenderQuery,
  ViewOffenderQuery,
} from 'graphql/generated';

import { useLightbox } from 'simple-react-lightbox';
import { Modal, notification } from 'antd';

import { useStoreState } from 'state';

const { confirm } = Modal;

interface Return {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  addIncidentRights: boolean;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  linkIncident: boolean;
  toggleLinkIncident: () => void;
  updateIncidentList: (value: string) => void;
}

const useViewOffender = (offenderId: string): Return => {
  const { openLightbox } = useLightbox();
  const role = useStoreState((state) => state.user.role);
  const [saving, setSaving] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);

  const { data, loading } = useViewOffenderQuery({
    variables: {
      where: {
        id: offenderId,
      },
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
  return {
    data,
    loading,
    saving,
    openLightbox,
    addIncidentRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    offenderId: offenderId || '',
    onDelete,
    linkIncident,
    toggleLinkIncident,
    updateIncidentList,
  };
};

export default useViewOffender;
