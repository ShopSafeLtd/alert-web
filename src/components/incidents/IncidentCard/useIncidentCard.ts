import { useStoreState } from 'state';
import type {
  ImageUpdateWithWhereUniqueWithoutIncidentInput,
  ListIncidentsQuery,
  RecycleIncidentMutation,
} from 'graphql/generated';
import {
  Role,
  useRecycleIncidentMutation,
  useUpdateIncidentImagesMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import { useIntl } from 'react-intl';
import errorNotification from 'types/error_notification';
import { useState } from 'react';
import type { EditFeedImage } from 'types/DataType';

interface Props {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    undefined | null
  >['incidents'][0];
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
}
const useIncidentCard = ({ incident, update }: Props): Return => {
  // const navigate = useNavigate();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const [editIncidentFeed, setEditIncidentFeed] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editImageId, setEditImageId] = useState<string>(
    incident?.images[0]?.id || ''
  );

  const approvalRights = update ? role !== Role.User : false;
  const menuRights = update
    ? role !== Role.User || userId === incident?.createdBy.id
    : false;
  const deleteRights = role !== Role.User;

  // const onNavigate = (id: string) => navigate(`/app/incidents/edit/${id}`);
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted',
          id: 'zJsyF1',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been deleted from the feed and moved to the recycle bin.',
          id: 'YagqVR',
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
          id: 'ryTk34',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The image of the incident has been updated.',
          id: 'fwVovV',
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
      const u: ImageUpdateWithWhereUniqueWithoutIncidentInput[] = [
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
  };
};

export default useIncidentCard;
