import { useStoreState } from 'state';
import {
  RecycleOffenderMutation,
  Role,
  useRecycleOffenderMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MutationUpdaterFn } from '@apollo/client';

interface Props {
  createdById: string | undefined;
  update: MutationUpdaterFn<RecycleOffenderMutation>;
}

const useOffenderCard = ({ createdById, update }: Props) => {
  const navigate = useNavigate();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);

  const approvalRights = role !== Role.User;
  const menuRights = role !== Role.User || userId === createdById;
  const deleteRights = role !== Role.User;

  const onNavigate = (id: string) => navigate(`/app/offenders/edit/${id}`);
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
