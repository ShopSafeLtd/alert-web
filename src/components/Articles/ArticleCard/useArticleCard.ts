import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';

import { notification } from 'antd';
import { useDeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  createdById: string | undefined;
  update?: MutationUpdaterFn<DeleteArticleMutation>;
}
interface Return {
  onDelete: (id: string) => void;
  onNavigate: (id: string) => void;
}
const useArticleCard = ({ update }: Props): Return => {
  const navigate = useNavigate();
  const intl = useIntl();

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
    void deleteArticle({
      variables: {
        where: { id },
      },
    });
  };

  return {
    onDelete,
    onNavigate,
  };
};

export default useArticleCard;
