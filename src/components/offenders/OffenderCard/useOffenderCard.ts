import { useStoreState } from 'state';
import type { RecycleOffenderMutation } from 'graphql/generated';
import { Role, useRecycleOffenderMutation } from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { useIntl } from 'react-intl';
import errorNotification from 'types/error_notification';

interface Props {
  createdById: string | undefined;
  update?: MutationUpdaterFn<RecycleOffenderMutation>;
}
interface Return {
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  onNavigate: (id?: string | undefined, url?: string | undefined) => void;
  onDelete: (id: string) => void;
}
const useOffenderCard = ({ createdById, update }: Props): Return => {
  const navigate = useNavigate();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const intl = useIntl();
  const approvalRights = update ? role !== Role.User : false;
  const menuRights = update
    ? role !== Role.User || userId === createdById
    : false;
  const deleteRights = role !== Role.User;

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

  const onDelete = (id: string) => {
    if (deleteRights)
      void recycleOffender({
        variables: {
          where: { id },
        },
      });
  };

  return {
    approvalRights,
    menuRights,
    deleteRights,
    onNavigate,
    onDelete,
  };
};

export default useOffenderCard;
