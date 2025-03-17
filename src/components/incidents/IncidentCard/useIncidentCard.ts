import type { MutationUpdaterFn } from '@apollo/client';
import type { IncidentCardFragment } from 'graphql/fragments/__generated__/incident-card.generated';
import type { RecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import type { ImagePosition } from 'graphql/types';
import type { EditFeedImage } from 'types/DataType';

import { notification } from 'antd';
import { useRecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import { useUpdateIncidentImagesMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-images.generated';
import { Role } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  incident: IncidentCardFragment;
  update?: MutationUpdaterFn<RecycleIncidentMutation>;
}

interface Return {
  addInvestigation: boolean;
  approvalRights: boolean;
  deleteRights: boolean;
  editImage: boolean;
  editImageId: string;
  editIncidentFeed: boolean;
  menuRights: boolean;
  // onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  setEditImageId: (id: string) => void;
  toggleAddInvestigation: () => void;
  toggleEditImage: () => void;
  toggleEditIncidentFeed: () => void;
}
const useIncidentCard = ({ incident, update }: Props): Return => {
  // const navigate = useNavigate();
  const intl = useIntl();
  // TODO change to perms
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
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been deleted from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted',
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
        description: intl.formatMessage({
          defaultMessage: 'The image of the incident has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
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
          position?: { set: ImagePosition | undefined };
          primary: { set: boolean };
          rotation?: { set: number };
        };
        where: { id: string };
      }[] = [
        {
          data: {
            policeImage: { set: value.policeImage || false },
            position: { set: value.position },
            primary: { set: value.primary || false },
            rotation: { set: value.rotation || 0 },
          },
          where: {
            id: value.id,
          },
        },
      ];

      if (findPrimaryId && value.primary && findPrimaryId !== value.id) {
        u.push({
          data: {
            primary: { set: false },
          },
          where: {
            id: findPrimaryId,
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
    addInvestigation,
    approvalRights,
    deleteRights,
    editImage,
    editImageId,
    editIncidentFeed,
    menuRights,
    // onNavigate,
    onDelete,
    onEditImage,
    setEditImageId,
    toggleAddInvestigation,
    toggleEditImage,
    toggleEditIncidentFeed,
  };
};

export default useIncidentCard;
