import React, { useState } from 'react';
import { Col, Modal, Row } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle as faCheckedCircle } from '@fortawesome/pro-solid-svg-icons';
import { useIntl } from 'react-intl';
import type { ImageFaceType } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';
import useStyles from './FacesSelect.styles';

interface Props {
  open: boolean;
  submitFace: (value: ImageFaceType) => void;
  onClose: () => void;
  faces: ImageFaceType[] | undefined;
}

const FacesSelect = ({ open, submitFace, onClose, faces }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageFaceType>();

  const handleSubmit = () => {
    if (selected) {
      submitFace(selected);
    }
  };

  return (
    <Modal
      width={600}
      open={open}
      title={intl.formatMessage({
        id: 'TzsW3k',
        defaultMessage: 'Select a face that match the offender',
      })}
      bodyStyle={{ padding: 0 }}
      okText={intl.formatMessage({
        id: 'p4iOC9',
        defaultMessage: 'Save Face',
      })}
      cancelText={intl.formatMessage({
        id: '/4tOwT',
        defaultMessage: 'Skip',
      })}
      onOk={handleSubmit}
      onCancel={() => {
        onClose();
      }}
    >
      {open && (
        <Row className={classes.row} gutter={[16, 16]}>
          {faces?.map((face) => (
            <Col
              key={face.imageURL}
              className={classes.container}
              onClick={() => setSelected(face)}
            >
              {selected?.imageURL === face.imageURL && (
                <div className={classes.check}>
                  <FontAwesomeIcon
                    size="xl"
                    color="red"
                    icon={faCheckedCircle}
                  />
                </div>
              )}
              <div className={classes.image}>
                <WatermarkImage
                  url={face.imageURL}
                  // position={face.BoundingBox.}
                  // rotation={image.rotation || 0}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Modal>
  );
};

export default FacesSelect;
