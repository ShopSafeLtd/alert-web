import { useStoreState } from 'state';
import type { RecycleOffenderMutation } from 'graphql/generated';
import { Role, useRecycleOffenderMutation } from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';

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
        message: 'Successfully Deleted',
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
    update,
  });

  const onDelete = (id: string) => {
    if (deleteRights)
      recycleOffender({
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
