import useReportPrint from '#/utils/reportPrint/usePrintReports';
import { Modal } from 'antd';
import { useDeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';
import { useArticleQuery } from 'graphql/article/queries/__generated__/view-article.generated';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { Props, ReturnProps } from '../types/ViewArticle';

import { useMarkBulletinViewedMutation } from '../../../../graphql/engagement/mutations/__generated__/mark-bulletin-viewed.generated';

const useViewArticle = ({ id }: Props): ReturnProps => {
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  const intl = useIntl();
  const navigation = useNavigate();
  const hasTrackedView = useRef(false);

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
    fetchPolicy: 'cache-and-network',
    variables: {
      where: { id },
    },
  });

  // Track bulletin view silently
  const [markBulletinViewed] = useMarkBulletinViewedMutation({
    onError: () => {
      // Silent failure - don't block UI if tracking fails
    },
  });

  useEffect(() => {
    if (id && !hasTrackedView.current && !loading && data?.article) {
      hasTrackedView.current = true;
      void markBulletinViewed({
        variables: {
          articleId: id,
        },
      });
    }
  }, [id, loading, data, markBulletinViewed]);

  const [deleteArticle] = useDeleteArticleMutation({
    update: (store, result) => {
      if (!result.data?.deleteArticle?.id) return;
      store.evict({
        id: store.identify({
          __typename: 'Article',
          id: result.data.deleteArticle.id,
        }),
      });
      store.gc();
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
