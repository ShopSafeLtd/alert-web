import { useStoreState } from 'state';
import type { RecycleIncidentMutation } from 'graphql/generated';
import { Role, useRecycleIncidentMutation } from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { useIntl } from 'react-intl';

interface Props {
  createdById: string | undefined;
  update?: MutationUpdaterFn<RecycleIncidentMutation>;
}
interface Return {
  approvalRights: boolean;
  deleteRights: boolean;
  menuRights: boolean;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}
const useIncidentCard = ({ createdById, update }: Props): Return => {
  const navigate = useNavigate();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);

  const approvalRights = update ? role !== Role.User : false;
  const menuRights = update
    ? role !== Role.User || userId === createdById
    : false;
  const deleteRights = role !== Role.User;

  const onNavigate = (id: string) => navigate(`/app/incidents/edit/${id}`);
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
      notification.error({
        message: intl.formatMessage({ defaultMessage: 'Error!', id: 'DIDBlF' }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
          id: 'tPB3Wl',
        }),
        placement: 'bottomRight',
      });
    },

    update,
  });

  const onDelete = (id: string) => {
    if (deleteRights)
      void recycleIncident({
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

export default useIncidentCard;
