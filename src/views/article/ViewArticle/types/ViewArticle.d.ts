import type { ArticleQuery } from 'graphql/article/queries/__generated__/view-article.generated';
import type { Role } from 'graphql/types';
import type { RefObject } from 'react';

export interface Props {
  id: string;
}

export interface ReturnProps {
  componentRef: RefObject<HTMLDivElement>;
  data: ArticleQuery | undefined;
  editArticle: () => void;
  handlePrint: () => void;
  isPrinting: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;

  onDeleteArticle: () => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  role: Role;
}
