import type { ArticleQuery, Role } from '../../../../graphql/generated';
import type { RefObject } from 'react';

export interface Props {
  id: string;
}

export interface ReturnProps {
  data: ArticleQuery | undefined;
  loading: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  lightboxElements: {
    src: string;
  }[];
  onDeleteArticle: () => void;
  role: Role;
  editArticle: () => void;

  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
}
