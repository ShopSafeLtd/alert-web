import type { ArticlePreviewFragment } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteArticleMutation } from 'graphql/article/mutations/__generated__/delete_article.generated';

import React from 'react';

import View from './ArticleCard.view';
import useArticleCard from './useArticleCard';

interface Props {
  article: ArticlePreviewFragment | null | undefined;
  openLightbox: (elements: { src: string }[], index: number) => void;
  update: MutationUpdaterFn<DeleteArticleMutation>;
}

const ArticleCard = ({ article, openLightbox, update }: Props): JSX.Element => {
  const { onDelete, onNavigate } = useArticleCard({
    createdById: article?.createdBy?.id,
    update,
  });

  return (
    <View
      article={article}
      onDelete={onDelete}
      onNavigate={onNavigate}
      openLightbox={openLightbox}
    />
  );
};

export default ArticleCard;
