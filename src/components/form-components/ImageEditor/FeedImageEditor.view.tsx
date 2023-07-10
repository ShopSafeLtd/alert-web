import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Select, Skeleton, Switch } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ImagePosition } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateBackward,
  faRotateForward,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import type { EditFeedImage } from 'types/DataType';
import useStyles from './ImageEditor.styles';

const positionOptions = [
  {
    value: ImagePosition.CenterBottom,
    label: <FormattedMessage id="sXTiFB" defaultMessage="Center Bottom" />,
  },
  {
    value: ImagePosition.CenterCenter,
    label: <FormattedMessage id="K+qua6" defaultMessage="Center Center" />,
  },
  {
    value: ImagePosition.CenterTop,
    label: <FormattedMessage id="9X8NHT" defaultMessage="Center Top" />,
  },
  {
    value: ImagePosition.LeftBottom,
    label: <FormattedMessage id="sfcQw6" defaultMessage="Left Bottom" />,
  },
  {
    value: ImagePosition.LeftCenter,
    label: <FormattedMessage id="Ei0973" defaultMessage="Left Center" />,
  },
  {
    value: ImagePosition.LeftTop,
    label: <FormattedMessage id="0B9/ob" defaultMessage="Left Top" />,
  },
  {
    value: ImagePosition.RightBottom,
    label: <FormattedMessage id="Mm1WF/" defaultMessage="Right Bottom" />,
  },
  {
    value: ImagePosition.RightCenter,
    label: <FormattedMessage id="iF7Gcw" defaultMessage="Right Center" />,
  },
  {
    value: ImagePosition.RightTop,
    label: <FormattedMessage id="b8244+" defaultMessage="Right Top" />,
  },
];

interface Props {
  open: boolean;
  image: EditFeedImage | null | undefined;
  submitImage: (value: EditFeedImage) => void;
  onClose: () => void;
}

const FeedImageEditor = ({ open, image, submitImage, onClose }: Props) => {
  if (!image) return <div />;
  const intl = useIntl();
  const classes = useStyles();
  const [position, setPosition] = useState(
    image?.position || ImagePosition.CenterCenter
  );
  const [rotation, setRotation] = useState(0);
  const [policeImage, setPoliceImage] = useState(image?.policeImage);
  const [primary, setPrimary] = useState(image?.primary);
  // console.log('imageId', image.id);
  // console.log('primary', image.position);
  // console.log('primary', image.primary);
  // console.log('policeImage', image.policeImage);
  // console.log('rotation', image.rotation);

  const handleSubmit = () => {
    if (image) {
      submitImage({
        ...image,
        position,
        primary,
        policeImage,
        rotation,
      });
    }
    // onClose();
    setRotation(0);
    setPosition(ImagePosition.CenterCenter);
    setPrimary(false);
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
      width={600}
      open={open}
      title={intl.formatMessage({
        id: '9UlLIw',
        defaultMessage: 'Edit Image',
      })}
      bodyStyle={{ padding: 0 }}
      okText={intl.formatMessage({
        id: 'gR55Uz',
        defaultMessage: 'Save Image',
      })}
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
              initialValues={{
                position: image?.position || ImagePosition.CenterCenter,
                primaryImage: image?.primary,
                policeImage: image?.policeImage,
              }}
              // onFinish={onSubmit}
            >
              <Form.Item
                label={intl.formatMessage({
                  id: 't9T6TI',
                  defaultMessage: 'Image Position',
                })}
              >
                <Select
                  value={position}
                  onChange={setPosition}
                  options={positionOptions}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: 'dQJGtK',
                  defaultMessage: 'Rotation',
                })}
              >
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
                label={intl.formatMessage({
                  id: '8U+Csh',
                  defaultMessage: 'Set as primary image',
                })}
                name="primaryImage"
                style={{
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyItems: 'center',
                }}
              >
                <Switch
                  // disabled={saving}
                  checked={primary}
                  onChange={() => setPrimary(!primary)}
                  style={{ marginLeft: 10, marginTop: -20 }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  id: 'fOYafo',
                  defaultMessage: 'Received from the police',
                })}
                name="policeImage"
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

export default FeedImageEditor;
