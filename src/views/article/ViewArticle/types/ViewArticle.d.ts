import { ArticleQuery } from '../../../../graphql/generated';

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
}
