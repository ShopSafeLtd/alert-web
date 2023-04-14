import React, { useEffect, useState } from 'react';
import type { UploadFile } from 'antd';
import { Form, Select, Skeleton, Col, Modal, Row } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ImagePosition } from 'graphql/generated';
import useStyles from './ImageEditor.styles';

const positionOptions = [
  {
    value: ImagePosition.CenterBottom,
    label: 'Center Bottom',
  },
  {
    value: ImagePosition.CenterCenter,
    label: 'Center Center',
  },
  {
    value: ImagePosition.CenterTop,
    label: 'Center Top',
  },
  {
    value: ImagePosition.LeftBottom,
    label: 'Left Bottom',
  },
  {
    value: ImagePosition.LeftCenter,
    label: 'Left Center',
  },
  {
    value: ImagePosition.LeftTop,
    label: 'Left Top',
  },
  {
    value: ImagePosition.RightBottom,
    label: 'Right Bottom',
  },
  {
    value: ImagePosition.RightCenter,
    label: 'Right Center',
  },
  {
    value: ImagePosition.RightTop,
    label: 'Right Top',
  },
];

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  position?: ImagePosition;
}

interface Props {
  open: boolean;
  image: Image | null;
  submitImage: (value: Image) => void;
  onClose: () => void;
}

const ImageEditor = ({ open, image, submitImage, onClose }: Props) => {
  const classes = useStyles();

  const [position, setPosition] = useState(ImagePosition.CenterCenter);

  useEffect(() => {
    setPosition(image?.position || ImagePosition.CenterCenter);
  }, [image]);

  const handleSubmit = () => {
    if (image) {
      submitImage({
        ...image,
        position,
      });
    }
    setPosition(ImagePosition.CenterCenter);
  };

  return (
    <Modal
      width={700}
      open={open}
      title="Edit Image"
      bodyStyle={{ padding: 0 }}
      okText="Save Image"
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <Row wrap={false}>
        <Col className={classes.toolbar}>
          <Form className={classes.select} layout="vertical">
            <Form.Item label="Image Position">
              <Select
                value={position}
                onChange={setPosition}
                options={positionOptions}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col flex={1}>
          <div className={classes.cardPreviewSection}>
            <div className={classes.mockupCard}>
              <div className={classes.cardImage}>
                <WatermarkImage url={image?.url} position={position} />
              </div>
              <div className={classes.cardBody}>
                <Skeleton />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ImageEditor;
