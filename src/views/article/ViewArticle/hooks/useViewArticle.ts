import type {
  ListArticlesQuery,
  ListArticlesQueryVariables,
} from 'graphql/article/queries/__generated__/list_articles.generated';

import useReportPrint from '#/utils/reportPrint/usePrintReports';
import { Modal } from 'antd';
import { useDeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import { ListArticlesDocument } from 'graphql/article/queries/__generated__/list_articles.generated';
import { useArticleQuery } from 'graphql/article/queries/__generated__/view-article.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';

import type { Props, ReturnProps } from '../types/ViewArticle';

const useViewArticle = ({ id }: Props): ReturnProps => {
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  const intl = useIntl();
  const navigation = useNavigate();
  const schemeId = useStoreState((state) => state.scheme.id);
  const editArticle = () => {
    navigation(`/app/article/edit/${id}`);
  };
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const { data, loading } = useArticleQuery({
    variables: {
      where: { id },
    },
  });

  const listArticlesVars = {
    order: { updatedAt: SortOrder.Desc },
    scheme: {
      id: schemeId,
    },
    skip: 0,
    take: 12,
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

      if (existingData && result.data) {
        store.writeQuery<ListArticlesQuery, ListArticlesQueryVariables>({
          data: {
            listArticles: {
              articles: existingData.listArticles.articles.filter(
                (item) => item.id !== result.data?.deleteArticle?.id
              ),
              total: (existingData?.listArticles.total || 1) - 1,
            },
          },
          query: ListArticlesDocument,
          variables: listArticlesVars,
        });
      }
    },
  });

  const onDeleteArticle = () => {
    Modal.confirm({
      content: intl.formatMessage({
        defaultMessage: 'Are you sure you want to delete this article?',
      }),
      onOk() {
        void deleteArticle({
          optimisticResponse: {
            __typename: 'Mutation',
            deleteArticle: {
              __typename: 'Article',
              id,
            },
          },
          variables: {
            where: {
              id,
            },
          },
        });
        navigation('/app/dashboard');
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        index,
        open: !lightBoxOpen.open,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            index,
            open: !lightBoxOpen.open,
          }),
        0.3
      );
    }
  };

  return {
    componentRef,
    data,
    editArticle,
    handlePrint,
    isPrinting,
    lightBoxOpen,
    lightboxElements,
    loading,
    onDeleteArticle,
    openLightbox: triggerLightbox,
  };
};

export default useViewArticle;
