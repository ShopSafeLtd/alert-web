import React from 'react';

import WatermarkImage from 'components/images/WatermarkImage.view';
import type { ImagePosition } from 'graphql/types';

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
      width: 130,
      height: 130,
      marginRight: -5,
    }}
  >
    <WatermarkImage url={src} position={position} rotation={rotation || 0} />
  </div>
);

export default ImageContainer;
