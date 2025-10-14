import type { Theme } from 'configs/ThemeConfig';

import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import WatermarkOverlay from '../WatermarkOverlay.view';

const useStyles = createUseStyles((theme: Theme) => ({
  slide: {
    alignItems: 'center',
    backgroundColor: theme.imageBackgroundColor,
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100%',
  },
}));

interface Face {
  boundingHeight?: null | number;
  boundingLeft?: null | number;
  boundingTop?: null | number;
  boundingWidth?: null | number;
  confidence?: null | number;
  id: string;
  offender?: {
    id: string;
    name?: null | string;
  } | null;
}

interface Props {
  image?: {
    faces: Face[];
    id: string;
    optimised?: null | string;
  };
  showBoxes: boolean;
}

const LightBox = ({ image, showBoxes = true }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (image?.optimised) {
      const context = canvasRef.current?.getContext('2d');
      const canvasImage = new Image();
      canvasImage.src = image?.optimised || '';
      canvasImage.onload = () => {
        if (context) {
          const imageHeight = canvasImage.height;
          const imageWidth = canvasImage.width;

          let calcRatio = 0;
          let calcHeight = 0;
          let calcWidth = 0;

          if (imageHeight > imageWidth) {
            const viewHeight = containerRef.current?.offsetHeight || 0;
            const ratio = imageHeight / viewHeight;
            const canvasWidth = imageWidth / ratio;

            calcHeight = viewHeight;
            calcWidth = canvasWidth;
            calcRatio = ratio;
          }

          if (imageWidth > imageHeight) {
            const viewWidth = containerRef.current?.offsetWidth || 0;
            const ratio = imageWidth / viewWidth;
            const canvasHeight = imageHeight / ratio;

            calcHeight = canvasHeight;
            calcWidth = viewWidth;
            calcRatio = ratio;
          }

          setHeight(calcHeight);
          setWidth(calcWidth);
          context.drawImage(canvasImage, 0, 0, calcWidth, calcHeight);

          if (showBoxes) {
            // eslint-disable-next-line unicorn/no-array-for-each
            image.faces.forEach((item) => {
              const boundingX =
                ((item.boundingLeft || 0) * imageWidth) / calcRatio;
              const boundingY =
                ((item.boundingTop || 0) * imageHeight) / calcRatio;
              const boundingWidth =
                ((item.boundingWidth || 0) * imageWidth) / calcRatio;
              const boundingHeight =
                ((item.boundingHeight || 0) * imageHeight) / calcRatio;
              context.strokeStyle = '#de4436';
              context.lineWidth = 2;
              context.strokeRect(
                boundingX,
                boundingY,
                boundingWidth,
                boundingHeight
              );
            });
          }

          setLoading(false);
        }
      };
    }
  }, [image, showBoxes]);

  return (
    <TransformWrapper>
      <TransformComponent
        contentStyle={{ width: '100%' }}
        wrapperStyle={{ width: '100%' }}
      >
        <div className={classes.slide} ref={containerRef}>
          <WatermarkOverlay>
            <canvas height={height} ref={canvasRef} width={width} />
          </WatermarkOverlay>
          {loading && <Spin />}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default LightBox;
