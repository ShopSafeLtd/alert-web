import { useStoreState } from 'state';
import type {
  ImageUpdateWithWhereUniqueWithoutOffendersInput,
  ListOffendersQuery,
  RecycleOffenderMutation,
} from 'graphql/generated';
import {
  Role,
  useRecycleOffenderMutation,
  useUpdateOffenderImagesMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import { useIntl } from 'react-intl';
import errorNotification from 'types/error_notification';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import type { EditFeedImage } from 'types/DataType';

interface Props {
  offender: Exclude<
    ListOffendersQuery['listOffenders'],
    undefined | null
  >['offenders'][0];
  update?: MutationUpdaterFn<RecycleOffenderMutation>;
}
interface Return {
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  onNavigate: (id?: string | undefined, url?: string | undefined) => void;
  onDelete: (id: string) => void;
  editOffenderFeed: boolean;
  toggleEditOffenderFeed: () => void;
  editImage: boolean;
  toggleEditImage: () => void;
  editImageId: string;
  setEditImageId: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
}
const useOffenderCard = ({ offender, update }: Props): Return => {
  const navigate = useNavigate();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const intl = useIntl();
  const approvalRights = update ? role !== Role.User : false;
  const menuRights = update
    ? role !== Role.User || userId === offender.createdBy.id
    : false;
  const deleteRights = role !== Role.User;
  const [editOffenderFeed, setEditOffenderFeed] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editImageId, setEditImageId] = useState<string>(
    offender?.images[0]?.id || ''
  );
  const onNavigate = (id: string | undefined, url: string | undefined) => {
    if (id) {
      navigate(`/app/offenders/edit/${id}`);
    }
    if (url) {
      navigate(`${url}`);
    }
  };
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted',
          id: 'zJsyF1',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
          id: 'nQ1eW+',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });
  const [updateOffender] = useUpdateOffenderImagesMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
          id: 'ryTk34',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The image of the offender has been updated.',
          id: 'adSBwZ',
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
      const findPrimaryId = offender?.images.find(({ primary }) => primary)?.id;
      const u: ImageUpdateWithWhereUniqueWithoutOffendersInput[] = [
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

      void updateOffender({
        variables: {
          id: offender.id,
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
      void recycleOffender({
        variables: {
          where: { id },
        },
      });
  };
  const toggleEditOffenderFeed = () => {
    setEditOffenderFeed(!editOffenderFeed);
  };
  const toggleEditImage = () => {
    setEditImage(!editImage);
  };
  return {
    approvalRights,
    menuRights,
    deleteRights,
    onDelete,
    editOffenderFeed,
    toggleEditOffenderFeed,
    editImage,
    toggleEditImage,
    editImageId,
    setEditImageId,
    onEditImage,
    onNavigate,
  };
};

export default useOffenderCard;
