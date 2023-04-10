import { useState } from 'react';
import { useArticleQuery } from '../../../../graphql/generated';
import type { Props, ReturnProps } from '../types/ViewArticle';

const useViewArticle = ({ id }: Props): ReturnProps => {
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const { data, loading } = useArticleQuery({
    variables: {
      where: { id },
    },
  });

  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        open: !lightBoxOpen.open,
        index,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            open: !lightBoxOpen.open,
            index,
          }),
        0.3
      );
    }
  };

  return {
    data,
    loading,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
  };
};

export default useViewArticle;
