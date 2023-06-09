import { useStoreState } from 'state';

import type { DeleteArticleMutation } from 'graphql/generated';
import { useDeleteArticleMutation, Role } from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/error_notification';

interface Props {
  createdById: string | undefined;
  update?: MutationUpdaterFn<DeleteArticleMutation>;
}
interface Return {
  deleteRights: boolean;
  menuRights: boolean;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}
const useArticleCard = ({ createdById, update }: Props): Return => {
  const navigate = useNavigate();

  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const menuRights = update
    ? role !== Role.User || userId === createdById
    : false;
  const deleteRights = role !== Role.User;

  const onNavigate = (id: string) => navigate(`/app/article/edit/${id}`);
  const [deleteArticle] = useDeleteArticleMutation({
    onCompleted: () => {
      notification.success({
        message: 'Successfully Deleted',
        description: 'The article has been deleted.',
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
      deleteArticle({
        variables: {
          where: { id },
        },
      });
  };

  return {
    menuRights,
    deleteRights,
    onNavigate,
    onDelete,
  };
};

export default useArticleCard;
