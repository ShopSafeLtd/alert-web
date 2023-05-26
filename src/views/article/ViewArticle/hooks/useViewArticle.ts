import { useState } from 'react';
import { useStoreState } from 'state';
import { Modal } from 'antd';
import { useNavigate } from 'react-router';
import type {
  ListArticlesQuery,
  ListArticlesQueryVariables,
} from '../../../../graphql/generated';
import {
  ListArticlesDocument,
  QueryMode,
  SortOrder,
  useArticleQuery,
  useDeleteArticleMutation,
} from '../../../../graphql/generated';
import type { Props, ReturnProps } from '../types/ViewArticle';

const useViewArticle = ({ id }: Props): ReturnProps => {
  const navigation = useNavigate();
  const schemeId = useStoreState((state) => state.scheme.id);
  const role = useStoreState((state) => state.user.role);
  const editArticle = () => {
    navigation(`/app/article/edit/${id}`);
  };
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const { data, loading } = useArticleQuery({
    variables: {
      where: { id },
    },
  });

  const listArticlesVars = {
    scheme: {
      id: schemeId,
    },
    where: {
      OR: [
        {
          title: {
            contains: '',
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
    order: { updatedAt: SortOrder.Desc },
    take: 12,
    skip: 0,
  };

  const [deleteArticle] = useDeleteArticleMutation({
    update: (store, result) => {
      const existingData = store.readQuery<
        ListArticlesQuery,
        ListArticlesQueryVariables
      >({
        query: ListArticlesDocument,
        variables: listArticlesVars,
      });

      if (existingData && result.data)
        store.writeQuery<ListArticlesQuery, ListArticlesQueryVariables>({
          query: ListArticlesDocument,
          variables: listArticlesVars,
          data: {
            listArticles: {
              total: (existingData?.listArticles.total || 1) - 1,
              articles: existingData.listArticles.articles.filter(
                (item) => item.id !== result.data?.deleteArticle?.id
              ),
            },
          },
        });
    },
  });

  const onDeleteArticle = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This will delete the bulletin and move it to the recycle bin.',
      onOk() {
        deleteArticle({
          variables: {
            where: {
              id,
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteArticle: {
              id,
              __typename: 'Article',
            },
          },
        });
        navigation('/app/dashboard');
      },
    });
  };

  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        open: !lightBoxOpen.open,
        index,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            open: !lightBoxOpen.open,
            index,
          }),
        0.3
      );
    }
  };

  return {
    data,
    loading,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
    onDeleteArticle,
    role,
    editArticle,
  };
};

export default useViewArticle;
