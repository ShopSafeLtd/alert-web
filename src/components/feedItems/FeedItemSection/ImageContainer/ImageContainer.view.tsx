import type { ImagePosition } from 'graphql/types';

import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';

const ImageContainer = ({
  position,
  rotation,
  src,
}: {
  position: ImagePosition;
  rotation?: number;
  src: string;
}) => (
  <div
    style={{
      height: 130,
      marginRight: -5,
      width: 130,
    }}
  >
    <WatermarkImage position={position} rotation={rotation || 0} url={src} />
  </div>
);

export default ImageContainer;
