import { useState } from 'react';

import {
  Role,
  useRecycleIncidentMutation,
  useUpdateIncidentMutation,
  useViewIncidentQuery,
  ViewIncidentQuery,
} from 'graphql/generated';

import { useLightbox } from 'simple-react-lightbox';
import { useStoreState } from 'state';
import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: string[] | undefined) => void;
}

const useViewIncident = (incidentId: string): Return => {
  const { openLightbox } = useLightbox();

  const role = useStoreState((state) => state.user.role);
  const [saving, setSaving] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);

  const { data, loading } = useViewIncidentQuery({
    variables: {
      where: {
        id: incidentId,
      },
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

  const updateOffenderList = (selectOffenders: string[] | undefined) => {
    setSaving(true);
    if (incidentId) {
      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            offenders: {
              connect:
                selectOffenders && selectOffenders.length > 0
                  ? selectOffenders.map((id) => ({ id }))
                  : undefined,
            },
          },
        },
      });
    }
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
        'Deleting this incident will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
      okType: 'danger',
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
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  return {
    data,
    loading,
    saving,
    openLightbox,
    addOffenderRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    onDelete,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
  };
};

export default useViewIncident;
