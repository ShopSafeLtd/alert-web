import { useStoreState } from "state";
import { Role, useDeleteIncidentMutation } from "graphql/generated";
import { notification } from 'antd'

interface Props {
  createdById: string | undefined;
}

const useIncidentCard = ({ createdById }: Props) => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);

  const approvalRights = role !== Role.User;
  const menuRights = role !== Role.User || userId === createdById;
  const deleteRights = role !== Role.User;

  const [deleteIncident] = useDeleteIncidentMutation();

  const onDelete = (id: string) => {
    if (deleteRights)
      deleteIncident({
        variables: {
          where: {
            id,
          },
        },
        optimisticResponse: {
          __typename: "Mutation",
          deleteIncident: {
            id,
            __typename: "Incident",
          },
        },
        onCompleted: () => {
          notification.success({
            message: 'Successfully Deleted',
            description: 'The incident has been deleted from the feed and moved to the recycle bin.'
          })
        }
      });
  };

  return {
    approvalRights,
    menuRights,
    deleteRights,
    onDelete,
  };
};

export default useIncidentCard;
