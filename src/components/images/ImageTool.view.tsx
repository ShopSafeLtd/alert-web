/* eslint-disable */
// TODO - fix this eslint-disable
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Modal, Row, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import { FilesetResolver, ObjectDetector } from '@mediapipe/tasks-vision';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore TODO: look more into this, types don't exist that I can see
import Annotation from 'react-image-annotation';

interface ImageType {
  id: string;
  optimised?: string | null;
}

interface Props {
  images: ImageType[];
}

interface AnnotationType {
  data?: {
    text: string;
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    imgHeight: number;
    imgWidth: number;
  };
  geometry?: {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const useStyles = createUseStyles({
  thumbnail: {
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundSize: 'cover',
    cursor: 'pointer',
  },
  thumbnailCol: {
    height: '100%',
    overflow: 'auto',
    maxHeight: '70vh',
  },
  image: {
    height: 500,
    display: 'none',
  },
});

interface ImageProps {
  image: ImageType | null;
  annotation: AnnotationType;
}

const PersonImage = ({ image, annotation }: ImageProps) => {
  const cropImage = (
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
  ) => {
    const originalImage = new Image();
    originalImage.src = image?.optimised || '';

    const canvas = document.getElementById(
      `${annotation.data?.id}`
    ) as HTMLCanvasElement | null;

    if (canvas !== null) {
      const ctx = canvas.getContext('2d');

      originalImage.addEventListener('load', () => {
        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx?.drawImage(
          originalImage,
          newX,
          newY,
          newWidth,
          newHeight,
          0,
          0,
          newWidth,
          newHeight
        );
      });
    }
  };

  useEffect(() => {
    const x = annotation.data?.x || 0;
    const y = annotation.data?.y || 0;
    const width = annotation.data?.width || 0;
    const height = annotation.data?.height || 0;
    const imgWidth = annotation.data?.imgWidth || 0;
    const imgHeight = annotation.data?.imgHeight || 0;
    const maxWidth = imgWidth - x;
    const maxHeight = imgHeight - y;

    const reducedX = x - 80;
    const reducedY = y - 80;
    const expandedWidth = width + 160;
    const expandedHeight = height + 160;

    const canvasX = reducedX > width ? reducedX : 0;
    const canvasY = reducedY > height ? reducedY : 0;
    const canvasWidth = expandedWidth < maxWidth ? expandedWidth : maxWidth;
    const canvasHeight =
      expandedHeight < maxHeight ? expandedHeight : maxHeight;

    console.log(
      width,
      imgWidth,
      maxWidth,
      expandedWidth,
      canvasWidth,
      canvasX,
      canvasY,
      canvasHeight
    );

    cropImage(x, y, width, height);
  }, []);

  return (
    <div>
      <canvas id={`${annotation.data?.id}`} style={{ height: 200 }} />
    </div>
  );
};

const ImageTool = ({ images }: Props) => {
  const classes = useStyles();

  const imgRef = useRef<HTMLImageElement | null>(null);

  const [currentImage, setCurrentImage] = useState<ImageType | null>(null);
  const [annotation, setAnnotation] = useState<AnnotationType | null>({});
  const [annotations, setAnnotations] = useState<AnnotationType[]>([]);
  const [objectDetector, setObjectDetector] = useState<
    ObjectDetector | undefined
  >(undefined);

  // Initialize the object detector
  const initializeObjectDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.1.0-alpha-11/wasm'
    );
    const value = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite2_uint8.tflite`,
      },
      scoreThreshold: 0.5,
      runningMode: 'IMAGE',
    });
    setObjectDetector(value);
  };

  useEffect(() => {
    void initializeObjectDetector();
  }, []);

  useEffect(() => {
    if (images.length > 0) setCurrentImage(images[0]);
  }, [images]);

  const detectObjects = () => {
    try {
      const image = document.getElementById('image') as HTMLImageElement;
      if (image && objectDetector) {
        const detections = objectDetector.detect(image);
        const filteredDetections = detections.detections.filter(
          (item) =>
            item.categories.map((cat) => cat.categoryName).includes('person') &&
            item.categories.map((cat) => cat.score > 0.6).includes(true)
        );
        console.log(filteredDetections);
        const imgHeight = imgRef.current?.height || 0;
        const imgWidth = imgRef.current?.width || 0;
        const imgNaturalHeight = imgRef.current?.naturalHeight || 0;
        const ratio = imgHeight / imgNaturalHeight;

        setAnnotations([
          ...annotations,
          ...filteredDetections.map((item, index) => {
            const detectionOriginX = item.boundingBox?.originX || 0;
            const detectionOriginY = item.boundingBox?.originY || 0;
            const detectionWidth = item.boundingBox?.width || 0;
            const detectionHeight = item.boundingBox?.height || 0;

            const scaledOriginX = detectionOriginX * ratio;
            const scaledOriginY = detectionOriginY * ratio;
            const scaledWidth = detectionWidth * ratio;
            const scaledHeight = detectionHeight * ratio;

            const percentOriginX = (scaledOriginX / imgWidth) * 100;
            const percentOriginY = (scaledOriginY / imgHeight) * 100;
            const percentWidth = (scaledWidth / imgWidth) * 100;
            const percentHeight = (scaledHeight / imgHeight) * 100;

            return {
              geometry: {
                x: percentOriginX,
                y: percentOriginY,
                width: percentWidth,
                height: percentHeight,
                type: 'RECTANGLE',
              },
              data: {
                id: Math.random(),
                text: `Person ${annotations.length + index + 1}`,
                x: scaledOriginX,
                y: scaledOriginY,
                width: scaledWidth,
                height: scaledHeight,
                imgWidth,
                imgHeight,
              },
            };
          }),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (currentImage) detectObjects();
  }, [currentImage, objectDetector]);

  const onChange = (value: AnnotationType) => {
    setAnnotation(value);
  };

  const onSubmit = (value: AnnotationType) => {
    const { geometry, data } = value;
    setAnnotation(null);
    setAnnotations([
      ...annotations,
      {
        geometry,
        data: {
          id: Math.random(),
          text: data?.text || '',
          height: 0,
          imgHeight: 0,
          imgWidth: 0,
          width: 0,
          x: 0,
          y: 0,
        },
      },
    ]);
  };

  const changeImage = (image: ImageType) => {
    setAnnotation({});
    setAnnotations([]);
    setCurrentImage(image);
  };

  return (
    <Modal open width="90vw">
      <Row gutter={16}>
        <Col className={classes.thumbnailCol}>
          {images.map((image) => (
            <Card
              key={image.id}
              bodyStyle={{ padding: 0 }}
              onClick={() => changeImage(image)}
            >
              <div
                className={classes.thumbnail}
                style={{ backgroundImage: `url(${image.optimised})` }}
              />
            </Card>
          ))}
        </Col>
        <Col>
          {currentImage && (
            <img
              id="image"
              ref={imgRef}
              src={currentImage.optimised || ''}
              alt="current"
              className={classes.image}
              crossOrigin=""
            />
          )}
          {currentImage && (
            <Annotation
              style={{
                height: 500,
              }}
              src={currentImage.optimised || ''}
              alt="Two pebbles anthropomorphized holding hands"
              type="RECTANGLE"
              annotations={annotations}
              value={annotation}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          )}
          <Button onClick={detectObjects}>Detect</Button>
        </Col>
        <Col>
          <Row gutter={16}>
            {annotations.map((item) => (
              <Col key={item.data?.id}>
                <Card
                  bodyStyle={{
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 10,
                  }}
                >
                  <PersonImage image={currentImage} annotation={item} />
                  <Typography.Title level={4}>
                    {item.data?.text}
                  </Typography.Title>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default ImageTool;
