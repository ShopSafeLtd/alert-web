import React from 'react';
import { useParams } from 'react-router-dom';
import useViewArticle from './hooks/useViewArticle';
import View from './ViewArticle.view';

const ViewArticleContainer = () => {
  const id = useParams().id || '';

  const {
    data,
    loading,
    lightboxElements,
    openLightbox,
    lightBoxOpen,
    onDeleteArticle,
    role,
    editArticle,
  } = useViewArticle({ id });

  return (
    <View
      data={data}
      loading={loading}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      lightBoxOpen={lightBoxOpen}
      onDeleteArticle={onDeleteArticle}
      role={role}
      editArticle={editArticle}
    />
  );
};

export default ViewArticleContainer;
