import React, { useEffect, useState } from 'react';
import type { UploadFile } from 'antd';
import { Button, Col, Form, Modal, Row, Select, Skeleton, Switch } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ImagePosition } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateBackward,
  faRotateForward,
} from '@fortawesome/pro-light-svg-icons';
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
  primary?: boolean;
  policeImage?: boolean;
}
// interface FormData {
//   position?: ImagePosition;
//   primary?: boolean;
// }

interface Props {
  open: boolean;
  image: Image | null;
  submitImage: (value: Image) => void;
  onClose: () => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
}

const ImageEditor = ({
  open,
  image,
  submitImage,
  onClose,
  primaryImage,
  setPrimaryImage,
}: Props) => {
  const classes = useStyles();
  const [position, setPosition] = useState(ImagePosition.CenterCenter);
  const [rotation, setRotation] = useState(0);
  const [policeImage, setPoliceImage] = useState(false);
  const [isPrimaryImage, setIsPrimaryImage] = useState(false);
  // ???
  useEffect(() => {
    setPosition(image?.position || ImagePosition.CenterCenter);
    setPoliceImage(image?.policeImage || false);
    setIsPrimaryImage(image?.uid === primaryImage || false);
  }, [image]);

  const handleSubmit = () => {
    if (image) {
      console.log(22);

      submitImage({
        ...image,
        position,
        policeImage,
      });
      if (isPrimaryImage && image.uid !== primaryImage)
        setPrimaryImage(image.uid);
      if (!isPrimaryImage && image.uid === primaryImage) setPrimaryImage('');
    }
    setPosition(ImagePosition.CenterCenter);
    setIsPrimaryImage(false);
    setPoliceImage(false);
    console.log(11);
  };

  const onRotateRight = () => {
    setRotation(rotation + 90);
  };

  const onRotateLeft = () => {
    setRotation(rotation - 90);
  };

  return (
    <Modal
      width={600}
      open={open}
      title="Edit Image"
      bodyStyle={{ padding: 0 }}
      okText="Save Image"
      onOk={handleSubmit}
      onCancel={() => {
        onClose();
      }}
    >
      {open && (
        <Row wrap={false}>
          <Col className={classes.toolbar}>
            <Form
              className={classes.select}
              layout="vertical"
              // initialValues={{}}
              // onFinish={onSubmit}
            >
              <Form.Item label="Image Position">
                <Select
                  value={position}
                  onChange={setPosition}
                  options={positionOptions}
                />
              </Form.Item>
              <Form.Item label="Rotation">
                <Row gutter={8}>
                  <Col>
                    <Button size="small" onClick={onRotateLeft}>
                      <FontAwesomeIcon icon={faRotateBackward} />
                    </Button>
                  </Col>
                  <Col>
                    <Button size="small" onClick={onRotateRight}>
                      <FontAwesomeIcon icon={faRotateForward} />
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                label="Set as primary image"
                name="primaryImage"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
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
                label="Received from the police"
                name="policeImage"
                valuePropName="checked"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
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
                    url={image?.url}
                    position={position}
                    rotation={rotation}
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
