import ArticlesSideList from '#/components/Articles/ArticleSideList';
import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import View from './ViewArticle.view';
import useViewArticle from './hooks/useViewArticle';

const ViewArticleContainer = () => {
  const id = useParams().id || '';

  const {
    componentRef,
    data,
    editArticle,
    handlePrint,
    isPrinting,
    lightBoxOpen,
    lightboxElements,
    loading,
    onDeleteArticle,
    openLightbox,
  } = useViewArticle({ id });

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <ArticlesSideList />
        </Col>

        <Col flex={1} style={{ overflowY: 'scroll' }}>
          <View
            componentRef={componentRef}
            data={data}
            editArticle={editArticle}
            handlePrint={handlePrint}
            isPrinting={isPrinting}
            lightBoxOpen={lightBoxOpen}
            lightboxElements={lightboxElements}
            loading={loading}
            onDeleteArticle={onDeleteArticle}
            openLightbox={openLightbox}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ViewArticleContainer;
