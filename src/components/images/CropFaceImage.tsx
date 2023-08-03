import React, { useEffect, useRef } from 'react';

interface CropFaceImageProps {
  url: string;
  boundingBox: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  height: number;
  width: number;
}

function StringToNumber(value: string | number | undefined | null): number {
  if (typeof value === 'string') {
    return Number(value);
  }
  if (!value) return 0;
  return value;
}

const CropFaceImage = ({
  url,
  boundingBox,
  width,
  height,
}: CropFaceImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    const canvasImage = new Image();
    canvasImage.src = url || '';
    canvasImage.onload = () => {
      if (context) {
        const imageHeight = canvasImage.height;
        const imageWidth = canvasImage.width;

        // width of the bounding box
        const boundingWidth = StringToNumber(boundingBox.width) * imageWidth;
        // height of the bounding box
        const boundingHeight = StringToNumber(boundingBox.height) * imageHeight;
        const xOffset = boundingWidth;
        const yOffset = boundingHeight;
        // position of bounding box from the left
        let boundingX =
          StringToNumber(boundingBox.left) * imageWidth - xOffset / 2;
        // position of bounding box from the top
        let boundingY =
          StringToNumber(boundingBox.top) * imageHeight - yOffset / 2.5;
        const extendedBoundingWidth = boundingWidth + xOffset;
        const extendedBoundingHeight = boundingHeight + yOffset;

        let croppedWidth = width;
        const croppedRatio = extendedBoundingWidth / croppedWidth;

        let croppedHeight = extendedBoundingHeight / croppedRatio;

        if (boundingX < 0) boundingX = 0;

        if (boundingY < 0) boundingY = 0;

        if (croppedHeight < height) {
          const diff = height - croppedHeight;
          const diffRatio = croppedHeight / diff;
          croppedWidth *= diffRatio;
          croppedHeight = height;
        }

        context.drawImage(
          canvasImage,
          boundingX,
          boundingY,
          extendedBoundingWidth,
          extendedBoundingHeight,
          0,
          0,
          croppedWidth,
          croppedHeight
        );
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default CropFaceImage;
