import React from 'react';

import type { Image } from './LightBox.types';

import View from './LightBox.view';
import useLightBox from './useLightBox';

interface Props {
  close: () => void;
  images?: Image[];
  index: number;
  open: boolean;
}

const LightBox = ({ close, images, index, open }: Props) => {
  const {
    linkNewOffender,
    linkOffender,
    showBoxes,
    toggleBoxes,
    toggleLinkNewOffender,
    toggleLinkOffender,
    toggleViewMatches,
    viewMatches,
  } = useLightBox();

  return (
    <View
      close={close}
      images={images}
      index={index}
      linkNewOffender={linkNewOffender}
      linkOffender={linkOffender}
      open={open}
      showBoxes={showBoxes}
      toggleBoxes={toggleBoxes}
      toggleLinkNewOffender={toggleLinkNewOffender}
      toggleLinkOffender={toggleLinkOffender}
      toggleViewMatches={toggleViewMatches}
      viewMatches={viewMatches}
    />
  );
};

export default LightBox;
