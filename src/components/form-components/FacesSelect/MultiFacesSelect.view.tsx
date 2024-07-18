import type { ImageFaceType } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';

import { faCheckCircle as faCheckedCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Modal, Row } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useStyles from './FacesSelect.styles';

interface Props {
  faces: ImageFaceType[] | undefined;
  onClose: () => void;
  open: boolean;
  submitFace: (value: ImageFaceType[]) => void;
}

const MultiFacesSelect = ({ faces, onClose, open, submitFace }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageFaceType[]>([]);
  const toggleSelected = (face: ImageFaceType) => {
    const findSelected = selected.find((el) => el.imageURL === face.imageURL);
    if (findSelected) {
      if (selected.length === 1) {
        console.log('length1');

        setSelected([]);
      } else {
        console.log('findSelected');

        setSelected(selected.filter((el) => el.imageURL !== face.imageURL));
      }
    } else {
      console.log('else');

      setSelected([...selected, face]);
    }
  };

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
        defaultMessage: 'Cancel',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Save',
      })}
      onCancel={() => {
        onClose();
      }}
      onOk={handleSubmit}
      open={open}
      title={intl.formatMessage({
        defaultMessage:
          'Select faces that you want to keep, the rest will be blurred ',
      })}
      width={600}
      zIndex={9002}
    >
      {open && (
        <Row className={classes.row} gutter={[16, 16]}>
          {faces?.map((face) => (
            <Col
              className={classes.container}
              key={face.imageURL}
              onClick={() => toggleSelected(face)}
            >
              {selected.find((el) => el.imageURL === face.imageURL) && (
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

export default MultiFacesSelect;
