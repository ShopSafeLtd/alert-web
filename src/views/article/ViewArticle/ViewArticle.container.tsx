import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import ArticlesSideList from '#/components/Articles/ArticleSideList';
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
    componentRef,
    handlePrint,
    isPrinting,
  } = useViewArticle({ id });

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <ArticlesSideList />
        </Col>

        <Col flex={1} style={{ overflowY: 'scroll' }}>
          <View
            handlePrint={handlePrint}
            isPrinting={isPrinting}
            componentRef={componentRef}
            data={data}
            loading={loading}
            lightboxElements={lightboxElements}
            openLightbox={openLightbox}
            lightBoxOpen={lightBoxOpen}
            onDeleteArticle={onDeleteArticle}
            role={role}
            editArticle={editArticle}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ViewArticleContainer;
