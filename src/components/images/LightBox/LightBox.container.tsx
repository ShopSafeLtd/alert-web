import React from 'react';
import View from './LightBox.view';
import useLightBox from './useLightBox';
import type { Image } from './LightBox.types';

interface Props {
  images?: Image[];
  open: boolean;
  close: () => void;
  index: number;
}

const LightBox = ({ close, index, open, images }: Props) => {
  const {
    isAdmin,
    onReIndex,
    reIndexing,
    showBoxes,
    toggleBoxes,
    linkOffender,
    toggleLinkOffender,
    linkNewOffender,
    toggleLinkNewOffender,
    toggleViewMatches,
    viewMatches,
  } = useLightBox();

  return (
    <View
      close={close}
      index={index}
      open={open}
      images={images}
      isAdmin={isAdmin}
      onReIndex={onReIndex}
      reIndexing={reIndexing}
      showBoxes={showBoxes}
      toggleBoxes={toggleBoxes}
      linkOffender={linkOffender}
      toggleLinkOffender={toggleLinkOffender}
      linkNewOffender={linkNewOffender}
      toggleLinkNewOffender={toggleLinkNewOffender}
      toggleViewMatches={toggleViewMatches}
      viewMatches={viewMatches}
    />
  );
};

export default LightBox;
