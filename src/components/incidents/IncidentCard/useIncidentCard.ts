import { useStoreState } from 'state';

import { notification } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useState } from 'react';
import type { EditFeedImage } from 'types/DataType';
import type { RecycleIncidentMutation } from 'graphql/incidents/mutations/recycle-incident.generated';
import { useRecycleIncidentMutation } from 'graphql/incidents/mutations/recycle-incident.generated';
import type { ImagePosition } from 'graphql/types';
import { Role } from 'graphql/types';
import type { IncidentCardFragment } from 'graphql/fragments/incident-card.generated';
import { useUpdateIncidentImagesMutation } from 'graphql/incidents/mutations/update/update-incident-images.generated';

interface Props {
  incident: IncidentCardFragment;
  update?: MutationUpdaterFn<RecycleIncidentMutation>;
}

interface Return {
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  // onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
  editIncidentFeed: boolean;
  toggleEditIncidentFeed: () => void;
  editImage: boolean;
  toggleEditImage: () => void;
  editImageId: string;
  setEditImageId: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
}
const useIncidentCard = ({ incident, update }: Props): Return => {
  // const navigate = useNavigate();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const [editIncidentFeed, setEditIncidentFeed] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [editImageId, setEditImageId] = useState<string>(
    incident?.images[0]?.id || ''
  );

  const approvalRights = update ? role !== Role.User : false;
  const menuRights = update
    ? role !== Role.User || incident?.createdByUser
    : false;
  const deleteRights = role !== Role.User;

  // const onNavigate = (id: string) => navigate(`/app/incidents/edit/${id}`);
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been deleted from the feed and moved to the recycle bin.',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });

  const [updateIncident] = useUpdateIncidentImagesMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The image of the incident has been updated.',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onEditImage = (value: EditFeedImage) => {
    if (value) {
      const findPrimaryId = incident?.images.find(({ primary }) => primary)?.id;
      const u: {
        data: {
          policeImage?: { set: boolean };
          rotation?: { set: number };
          position?: { set: ImagePosition | undefined };
          primary: { set: boolean };
        };
        where: { id: string };
      }[] = [
        {
          where: {
            id: value.id,
          },
          data: {
            position: { set: value.position },
            primary: { set: value.primary || false },
            policeImage: { set: value.policeImage || false },
            rotation: { set: value.rotation || 0 },
          },
        },
      ];

      if (findPrimaryId && value.primary && findPrimaryId !== value.id) {
        u.push({
          where: {
            id: findPrimaryId,
          },
          data: {
            primary: { set: false },
          },
        });
      }

      void updateIncident({
        variables: {
          id: incident.id,
          images: {
            update: u,
          },
        },
      }).finally(() => {
        setEditImage(false);
      });
    }
  };
  const onDelete = (id: string) => {
    if (deleteRights)
      void recycleIncident({
        variables: {
          where: { id },
        },
      });
  };
  const toggleEditIncidentFeed = () => {
    setEditIncidentFeed(!editIncidentFeed);
  };
  const toggleEditImage = () => {
    setEditImage(!editImage);
  };
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  return {
    approvalRights,
    menuRights,
    deleteRights,
    // onNavigate,
    onDelete,
    editIncidentFeed,
    toggleEditIncidentFeed,
    editImage,
    toggleEditImage,
    editImageId,
    setEditImageId,
    onEditImage,
    addInvestigation,
    toggleAddInvestigation,
  };
};

export default useIncidentCard;
