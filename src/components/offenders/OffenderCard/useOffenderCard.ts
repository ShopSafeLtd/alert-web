import { useStoreState } from 'state';
import { Role, useDeleteOffenderMutation } from 'graphql/generated';
import { notification } from 'antd';

interface Props {
  createdById: string | undefined;
}

const useOffenderCard = ({ createdById }: Props) => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);

  const approvalRights = role !== Role.User;
  const menuRights = role !== Role.User || userId === createdById;
  const deleteRights = role !== Role.User;

  const [deleteOffender] = useDeleteOffenderMutation();

  const onDelete = (id: string) => {
    if (deleteRights)
      deleteOffender({
        variables: {
          where: {
            id,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteOffender: {
            id,
            __typename: 'Offender',
          },
        },
        onCompleted: () => {
          notification.success({
            message: 'Successfully Deleted',
            description:
              'The offender has been deleted from the feed and moved to the recycle bin.',
          });
        },
      });
  };

  return {
    approvalRights,
    menuRights,
    deleteRights,
    onDelete,
  };
};

export default useOffenderCard;
