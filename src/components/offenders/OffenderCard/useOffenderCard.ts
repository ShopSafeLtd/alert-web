import type { MutationUpdaterFn } from '@apollo/client';
import type { OffenderCardFragment } from 'graphql/fragments/__generated__/offender-card.generated';
import type { RecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import type { ImagePosition } from 'graphql/types';
import type { EditFeedImage } from 'types/DataType';

import { notification } from 'antd';
import { useRecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import { useUpdateOffenderImagesMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-images.generated';
import { Role } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  offender: OffenderCardFragment;
  update?: MutationUpdaterFn<RecycleOffenderMutation>;
}
interface Return {
  addInvestigation: boolean;
  approvalRights: boolean;
  editImage: boolean;
  editImageId: string;
  editOffenderFeed: boolean;
  knowOffender: boolean;
  onDelete: (id: string) => void;
  onEditImage: (value: EditFeedImage) => void;
  onNavigate: (id?: string | undefined, url?: string | undefined) => void;
  setEditImageId: (id: string) => void;
  toggleAddInvestigation: () => void;
  toggleEditImage: () => void;
  toggleEditOffenderFeed: () => void;
  toggleKnowOffender: () => void;
}
const useOffenderCard = ({ offender, update }: Props): Return => {
  const navigate = useNavigate();
  const role = useStoreState((state) => state.user.role);
  const intl = useIntl();
  const approvalRights = update ? role !== Role.User : false;
  const [editOffenderFeed, setEditOffenderFeed] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [editImageId, setEditImageId] = useState<string>(
    offender?.images[0]?.id || ''
  );
  const [knowOffender, setKnowOffender] = useState(false);

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
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
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
  const [updateOffender] = useUpdateOffenderImagesMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The image of the offender has been updated.',
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
      const findPrimaryId = offender?.images.find(({ primary }) => primary)?.id;
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
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  const toggleKnowOffender = () => {
    setKnowOffender(!knowOffender);
  };
  return {
    addInvestigation,
    approvalRights,
    editImage,
    editImageId,
    editOffenderFeed,
    knowOffender,
    onDelete,
    onEditImage,
    onNavigate,
    setEditImageId,
    toggleAddInvestigation,
    toggleEditImage,
    toggleEditOffenderFeed,
    toggleKnowOffender,
  };
};

export default useOffenderCard;
