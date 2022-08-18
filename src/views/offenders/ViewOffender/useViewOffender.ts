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
  addOffenderRights: boolean;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  updateIncidentList: (value: string[] | undefined) => void;
}

const useViewOffender = (offenderId: string): Return => {
  const { openLightbox } = useLightbox();
  const role = useStoreState((state) => state.user.role);
  const [saving, setSaving] = useState(false);
  const [addExistingIncident, setAddExistingIncident] = useState(false);

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

  const updateIncidentList = (value: string[] | undefined) => {
    setSaving(true);
    if (offenderId) {
      updateOffender({
        variables: {
          where: {
            id: offenderId,
          },
          data: {
            incidents: {
              connect:
                value && value.length > 0
                  ? value.map((id) => ({ id }))
                  : undefined,
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
        'Deleting this Offender will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
      okType: 'danger',
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
  const toggleAddExistingIncident = () => {
    setAddExistingIncident(!addExistingIncident);
  };
  return {
    data,
    loading,
    saving,
    openLightbox,
    addOffenderRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    offenderId: offenderId || '',
    onDelete,
    addExistingIncident,
    toggleAddExistingIncident,
    updateIncidentList,
  };
};

export default useViewOffender;
