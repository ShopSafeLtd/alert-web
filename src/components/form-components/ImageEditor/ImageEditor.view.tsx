import type { UploadFile } from 'antd';

import {
  faRotateBackward,
  faRotateForward,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Modal, Row, Select, Skeleton, Switch } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ImagePosition } from 'graphql/types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from './ImageEditor.styles';

const positionOptions = [
  {
    label: <FormattedMessage defaultMessage="Center Bottom" />,
    value: ImagePosition.CenterBottom,
  },
  {
    label: <FormattedMessage defaultMessage="Center Center" />,
    value: ImagePosition.CenterCenter,
  },
  {
    label: <FormattedMessage defaultMessage="Center Top" />,
    value: ImagePosition.CenterTop,
  },
  {
    label: <FormattedMessage defaultMessage="Left Bottom" />,
    value: ImagePosition.LeftBottom,
  },
  {
    label: <FormattedMessage defaultMessage="Left Center" />,
    value: ImagePosition.LeftCenter,
  },
  {
    label: <FormattedMessage defaultMessage="Left Top" />,
    value: ImagePosition.LeftTop,
  },
  {
    label: <FormattedMessage defaultMessage="Right Bottom" />,
    value: ImagePosition.RightBottom,
  },
  {
    label: <FormattedMessage defaultMessage="Right Center" />,
    value: ImagePosition.RightCenter,
  },
  {
    label: <FormattedMessage defaultMessage="Right Top" />,
    value: ImagePosition.RightTop,
  },
];

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
  policeImage?: boolean;
  position?: ImagePosition;
  primary?: boolean;
  rotation?: number;
}
// interface FormData {
//   position?: ImagePosition;
//   primary?: boolean;
// }

interface Props {
  image: Image | null;
  onClose: () => void;
  open: boolean;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  submitImage: (value: Image) => void;
}

const ImageEditor = ({
  image,
  onClose,
  open,
  primaryImage,
  setPrimaryImage,
  submitImage,
}: Props) => {
  if (!image) return <div />;
  const intl = useIntl();
  const classes = useStyles();
  const [position, setPosition] = useState(
    image?.position || ImagePosition.CenterCenter
  );
  const [rotation, setRotation] = useState(image?.rotation || 0);
  const [policeImage, setPoliceImage] = useState(image?.policeImage);
  const [isPrimaryImage, setIsPrimaryImage] = useState(
    image?.uid === primaryImage
  );

  const handleSubmit = () => {
    if (image) {
      if (isPrimaryImage && image.uid !== primaryImage)
        setPrimaryImage(image.uid);
      if (!isPrimaryImage && image.uid === primaryImage) setPrimaryImage('');
      submitImage({
        ...image,
        policeImage,
        position,
        rotation,
      });
    }
    onClose();
    setPosition(ImagePosition.CenterCenter);
    setIsPrimaryImage(false);
    setPoliceImage(false);
  };

  const onRotateRight = () => {
    setRotation(rotation + 90);
  };

  const onRotateLeft = () => {
    setRotation(rotation - 90);
  };

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
        <Row wrap={false}>
          <Col className={classes.toolbar}>
            <Form
              className={classes.select}
              initialValues={{
                policeImage: image?.policeImage,
                position: image?.position || ImagePosition.CenterCenter,
                primaryImage: image?.uid === primaryImage,
              }}
              layout="vertical"
              // onFinish={onSubmit}
            >
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Image Position',
                })}
              >
                <Select
                  onChange={setPosition}
                  options={positionOptions}
                  value={position}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Rotation',
                })}
              >
                <Row gutter={8}>
                  <Col>
                    <Button onClick={onRotateLeft} size="small">
                      <FontAwesomeIcon icon={faRotateBackward} />
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={onRotateRight} size="small">
                      <FontAwesomeIcon icon={faRotateForward} />
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Set as primary image',
                })}
                name="primaryImage"
                style={{
                  flexDirection: 'row',
                  justifyItems: 'center',
                  marginBottom: 0,
                }}
              >
                <Switch
                  // disabled={saving}
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
                  // disabled={saving}
                  checked={policeImage}
                  onChange={() => setPoliceImage(!policeImage)}
                  style={{ marginLeft: 10, marginTop: -20 }}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col flex={1}>
            <div className={classes.cardPreviewSection}>
              <div className={classes.mockupCard}>
                <div className={classes.cardImage}>
                  <WatermarkImage
                    position={position}
                    rotation={rotation}
                    url={image?.url}
                  />
                </div>
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
