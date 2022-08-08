import { useState } from 'react';

import {
  Role,
  useUpdateIncidentMutation,
  useViewIncidentQuery,
  ViewIncidentQuery,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { useLightbox } from 'simple-react-lightbox';
import { useStoreState } from 'state';
import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  incidentId: string | undefined;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: string[] | undefined) => void;
}

const useViewIncident = (): Return => {
  const { openLightbox } = useLightbox();
  const incidentId = useParams().id;

  const role = useStoreState((state) => state.user.role);
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
      // setSaving(false);
      notification.success({
        message: 'Successfully Linked!',
        description: 'The offenders have been Linked to this incidents!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      // setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const updateOffenderList = (selectOffenders: string[] | undefined) => {
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
                  ? selectOffenders.map((offenderId) => ({ id: offenderId }))
                  : undefined,
            },
          },
        },
      });
    }
  };
  const onDelete = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Deleting this incident will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
      okType: 'danger',
      okText: 'Delete',
    });
  };

  return {
    data,
    loading,
    openLightbox,
    addOffenderRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    incidentId,
    onDelete,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
  };
};

export default useViewIncident;
