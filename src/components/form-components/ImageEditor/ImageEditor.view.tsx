import type { UploadFile } from 'antd';
import type { EditFeedImage } from 'types/DataType';

import {
  faRotateBackward,
  faRotateForward,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Modal, Row, Skeleton, Switch } from 'antd';
import { ImagePosition } from 'graphql/types';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from './ImageEditor.styles';

interface BaseImage extends UploadFile {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
  policeImage?: boolean;
  position?: ImagePosition;
  positionX?: number;
  positionY?: number;
  primary?: boolean;
  rotation?: number;
}

// Props for upload/creation flow (with primary image handling)
interface UploadFlowProps {
  image: BaseImage | null;
  onClose: () => void;
  open: boolean;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  submitImage: (value: BaseImage) => void;
}

// Props for feed/edit flow (without primary image handling)
interface FeedFlowProps {
  image: EditFeedImage | null | undefined;
  onClose: () => void;
  open: boolean;
  submitImage: (value: EditFeedImage) => void;
}

type Props = FeedFlowProps | UploadFlowProps;

// Type guards
const isUploadFlow = (props: Props): props is UploadFlowProps =>
  'primaryImage' in props;

const ImageEditor = (props: Props) => {
  const { image, onClose, open } = props;

  if (!image) return <div />;

  const intl = useIntl();
  const classes = useStyles();
  const imagePreviewRef = useRef<HTMLDivElement>(null);

  const [_position] = useState(image?.position || ImagePosition.CenterCenter);
  const [positionX, setPositionX] = useState(
    image?.positionX !== undefined && image?.positionX !== null
      ? image.positionX
      : 50
  );
  const [positionY, setPositionY] = useState(
    image?.positionY !== undefined && image?.positionY !== null
      ? image.positionY
      : 50
  );
  const [rotation, setRotation] = useState(image?.rotation || 0);
  const [policeImage, setPoliceImage] = useState(image?.policeImage || false);

  const getInitialPrimaryImage = () => {
    if (isUploadFlow(props)) {
      const { primaryImage } = props;
      const baseImage = image as BaseImage;
      return baseImage?.uid === primaryImage;
    }
    return false;
  };
  const [isPrimaryImage, setIsPrimaryImage] = useState(
    getInitialPrimaryImage()
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{
    mouseX: number;
    mouseY: number;
    posX: number;
    posY: number;
  } | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: positionX,
      posY: positionY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart || !imagePreviewRef.current) return;

    const rect = imagePreviewRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStart.mouseX;
    const deltaY = e.clientY - dragStart.mouseY;

    // Convert pixel delta to percentage of container size
    const deltaXPercent = (deltaX / rect.width) * 100;
    const deltaYPercent = (deltaY / rect.height) * 100;

    // Invert both axes for intuitive dragging
    const newX = Math.max(0, Math.min(100, dragStart.posX - deltaXPercent));
    const newY = Math.max(0, Math.min(100, dragStart.posY - deltaYPercent));

    setPositionX(newX);
    setPositionY(newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleSubmit = () => {
    if (image) {
      if (isUploadFlow(props)) {
        const { primaryImage, setPrimaryImage, submitImage: submit } = props;
        const baseImage = image as BaseImage;
        if (isPrimaryImage && baseImage.uid !== primaryImage)
          setPrimaryImage(baseImage.uid);
        if (!isPrimaryImage && baseImage.uid === primaryImage)
          setPrimaryImage('');

        submit({
          ...baseImage,
          policeImage,
          position: _position,
          positionX,
          positionY,
          rotation,
        });
      } else {
        const { submitImage: submit } = props;
        const feedImage = image as EditFeedImage;
        submit({
          ...feedImage,
          policeImage,
          position: _position,
          positionX,
          positionY,
          primary: isPrimaryImage,
          rotation,
        });
      }
    }
    onClose();
  };

  const onRotateRight = () => {
    setRotation(rotation + 90);
  };

  const onRotateLeft = () => {
    setRotation(rotation - 90);
  };

  const handleResetPosition = () => {
    setPositionX(50);
    setPositionY(50);
  };

  const handleResetRotation = () => {
    setRotation(0);
  };

  // Get the image URL depending on the type
  const getImageUrl = () => {
    if (isUploadFlow(props)) {
      return (image as BaseImage)?.url;
    }
    const feedImage = image as EditFeedImage;
    return feedImage?.optimised || feedImage?.url || feedImage?.low;
  };
  const imageUrl = getImageUrl();

  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      okText={intl.formatMessage({
        defaultMessage: 'Save Image',
      })}
      onCancel={() => {
        onClose();
      }}
      onOk={handleSubmit}
      open={open}
      title={intl.formatMessage({
        defaultMessage: 'Edit Image',
      })}
      width={600}
    >
      {open && (
        <Row style={{ height: '100%' }} wrap={false}>
          <Col className={classes.toolbar}>
            <Form
              className={classes.select}
              initialValues={{
                policeImage: image?.policeImage,
                position: image?.position || ImagePosition.CenterCenter,
                primaryImage: getInitialPrimaryImage(),
              }}
              layout="vertical"
            >
              <div className={classes.sectionHeader}>
                <FormattedMessage defaultMessage="Image Position" />
              </div>
              <div className={classes.instructionText}>
                <FormattedMessage defaultMessage="Drag the image to adjust position" />
              </div>
              <div className={classes.valueDisplay}>
                <FormattedMessage
                  defaultMessage="X: {x}% / Y: {y}%"
                  values={{
                    x: (positionX ?? 50).toFixed(0),
                    y: (positionY ?? 50).toFixed(0),
                  }}
                />
              </div>
              <Button
                block
                className={classes.resetButton}
                onClick={handleResetPosition}
                size="small"
              >
                <FormattedMessage defaultMessage="Reset Position" />
              </Button>

              <div className={classes.sectionHeader} style={{ marginTop: 20 }}>
                <FormattedMessage defaultMessage="Rotation" />
              </div>
              <div className={classes.valueDisplay}>
                <FormattedMessage
                  defaultMessage="{degrees}°"
                  values={{ degrees: rotation % 360 }}
                />
              </div>
              <Row className={classes.rotationControls} gutter={8}>
                <Col span={12}>
                  <Button block onClick={onRotateLeft} size="small">
                    <FontAwesomeIcon icon={faRotateBackward} />
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block onClick={onRotateRight} size="small">
                    <FontAwesomeIcon icon={faRotateForward} />
                  </Button>
                </Col>
              </Row>
              <Button
                block
                className={classes.resetButton}
                onClick={handleResetRotation}
                size="small"
                style={{ marginTop: 8 }}
              >
                <FormattedMessage defaultMessage="Reset Rotation" />
              </Button>

              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Set as primary image',
                })}
                name="primaryImage"
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                  marginTop: 20,
                }}
              >
                <Switch
                  checked={isPrimaryImage}
                  onChange={() => setIsPrimaryImage(!isPrimaryImage)}
                  style={{ marginLeft: 10, marginTop: -20 }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Received from the police',
                })}
                name="policeImage"
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
              >
                <Switch
                  checked={policeImage}
                  onChange={() => setPoliceImage(!policeImage)}
                  style={{ marginLeft: 10, marginTop: -20 }}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col flex={1} style={{ height: '100%' }}>
            <div className={classes.cardPreviewSection}>
              <div className={classes.mockupCard}>
                <div
                  className={classes.cardImage}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  ref={imagePreviewRef}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${positionX ?? 50}% ${positionY ?? 50}%`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transform: `rotate(${rotation ?? 0}deg)`,
                  }}
                />
                <div className={classes.cardBody}>
                  <Skeleton />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default ImageEditor;
