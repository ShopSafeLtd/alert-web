import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Spin } from 'antd';
import WatermarkOverlay from '../WatermarkOverlay.view';

const useStyles = createUseStyles((theme: Theme) => ({
  slide: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.imageBackgroundColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface Face {
  id: string;
  confidence?: number | null;
  boundingHeight?: number | null;
  boundingLeft?: number | null;
  boundingTop?: number | null;
  boundingWidth?: number | null;
  offender?: {
    id: string;
    name?: string | null;
  } | null;
}

interface Props {
  image?: {
    id: string;
    optimised?: string | null;
    faces: Face[];
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
        <div ref={containerRef} className={classes.slide}>
          <WatermarkOverlay>
            <canvas ref={canvasRef} width={width} height={height} />
          </WatermarkOverlay>
          {loading && <Spin />}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default LightBox;
