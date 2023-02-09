import { useStoreState } from 'state';
import {
  RecycleIncidentMutation,
  Role,
  useRecycleIncidentMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MutationUpdaterFn } from '@apollo/client';

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
        message: 'Successfully Deleted',
        description:
          'The incident has been deleted from the feed and moved to the recycle bin.',
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
      recycleIncident({
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
