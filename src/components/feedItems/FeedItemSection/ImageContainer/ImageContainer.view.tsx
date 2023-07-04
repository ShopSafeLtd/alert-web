import React from 'react';
import type { ImagePosition } from 'graphql/generated';

import WatermarkImage from 'components/images/WatermarkImage.view';

const ImageContainer = ({
  src,
  position,
}: {
  src: string;
  position: ImagePosition;
}) => (
  <div
    style={{
      width: 150,
      height: 180,
      marginRight: -15,
    }}
  >
    <WatermarkImage url={src} position={position} />
  </div>
);

export default ImageContainer;
