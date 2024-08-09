import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';

import { notification } from 'antd';
import { useDeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import { Role } from 'graphql/types';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  createdById: string | undefined;
  update?: MutationUpdaterFn<DeleteArticleMutation>;
}
interface Return {
  deleteRights: boolean;
  menuRights: boolean;
  onDelete: (id: string) => void;
  onNavigate: (id: string) => void;
}
const useArticleCard = ({ createdById, update }: Props): Return => {
  const navigate = useNavigate();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  // TODO fix adming to new perms
  const menuRights = update
    ? role !== Role.User || userId === createdById
    : false;
  const deleteRights = role !== Role.User;

  const onNavigate = (id: string) => navigate(`/app/article/edit/${id}`);
  const [deleteArticle] = useDeleteArticleMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The article has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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
      void deleteArticle({
        variables: {
          where: { id },
        },
      });
  };

  return {
    deleteRights,
    menuRights,
    onDelete,
    onNavigate,
  };
};

export default useArticleCard;
