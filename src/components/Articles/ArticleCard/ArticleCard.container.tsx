import React from 'react';
import type {
  ArticlePreviewFragment,
  DeleteArticleMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './ArticleCard.view';
import useArticleCard from './useArticleCard';

interface Props {
  article: ArticlePreviewFragment | null | undefined;
  openLightbox: (elements: { src: string }[], index: number) => void;
  update: MutationUpdaterFn<DeleteArticleMutation>;
}

const ArticleCard = ({ article, openLightbox, update }: Props): JSX.Element => {
  const { deleteRights, menuRights, onNavigate, onDelete } = useArticleCard({
    createdById: article?.createdBy.id,
    update,
  });

  return (
    <View
      deleteRights={deleteRights}
      menuRights={menuRights}
      article={article}
      openLightbox={openLightbox}
      onNavigate={onNavigate}
      onDelete={onDelete}
    />
  );
};

export default ArticleCard;
