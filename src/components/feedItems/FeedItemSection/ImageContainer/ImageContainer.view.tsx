import React from 'react';
import type { ImagePosition } from 'graphql/generated';

import WatermarkImage from 'components/images/WatermarkImage.view';

const ImageContainer = ({
  src,
  position,
  rotation,
}: {
  src: string;
  position: ImagePosition;
  rotation?: number;
}) => (
  <div
    style={{
      width: 150,
      height: 180,
      marginRight: -15,
    }}
  >
    <WatermarkImage url={src} position={position} rotation={rotation || 0} />
  </div>
);

export default ImageContainer;
