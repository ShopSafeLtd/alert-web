import { useStoreState } from 'state';

import type { DeleteArticleMutation } from 'graphql/generated';
import { useDeleteArticleMutation, Role } from 'graphql/generated';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The article has been deleted.',
          id: 'Bwx7T/',
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
    menuRights,
    deleteRights,
    onNavigate,
    onDelete,
  };
};

export default useArticleCard;
