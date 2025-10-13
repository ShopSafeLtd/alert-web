import React from 'react';

import WatermarkImage from './WatermarkImage.view';

export interface WatermarkSlideType {
  src: string | undefined;
  type?: 'image' | 'watermark' | undefined;
}

const WatermarkSlide = ({ slide }: { slide: WatermarkSlideType }) => (
  <WatermarkImage image url={slide.src} />
);

export default WatermarkSlide;
