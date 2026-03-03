import type { ImageFaceType } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';

import { faCheckCircle as faCheckedCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Modal, Row } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import useStyles from './FacesSelect.styles';

interface Props {
  faces: ImageFaceType[] | undefined;
  onClose: () => void;
  open: boolean;
  submitFace: (value: ImageFaceType) => void;
}

const FacesSelect = ({ faces, onClose, open, submitFace }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageFaceType>();

  useEffect(() => {
    if (!open) setSelected(undefined);
  }, [open]);

  const handleSubmit = () => {
    if (selected) {
      submitFace(selected);
      onClose();
    }
  };

  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      cancelText={intl.formatMessage({
        defaultMessage: 'Skip',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Save Face',
      })}
      onCancel={() => {
        onClose();
      }}
      onOk={handleSubmit}
      open={open}
      title={intl.formatMessage({
        defaultMessage: 'Select a face that match the offender',
      })}
      width={600}
    >
      {open && (
        <Row className={classes.row} gutter={[16, 16]}>
          {faces?.map((face) => (
            <Col
              className={classes.container}
              key={face.imageURL}
              onClick={() => setSelected(face)}
            >
              {selected?.imageURL === face.imageURL && (
                <div className={classes.check}>
                  <FontAwesomeIcon
                    color="red"
                    icon={faCheckedCircle}
                    size="xl"
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
