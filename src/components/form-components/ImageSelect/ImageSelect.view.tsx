import React, { useEffect, useState } from 'react';
import { Col, Empty, Row } from 'antd';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle as faCheckedCircle } from '@fortawesome/pro-solid-svg-icons';
import { useIntl } from 'react-intl';
import WatermarkImage from '../../images/WatermarkImage.view';

const useStyles = createUseStyles((theme: Theme) => ({
  image: {
    height: 150,
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    border: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
  },
  container: {
    position: 'relative',
  },
  check: {
    position: 'absolute',
    top: 5,
    right: 12,
    zIndex: 10,
    background: '#FFF',
    borderRadius: '100%',
    width: 21,
    height: 21,
    cursor: 'pointer',
  },
}));

export interface ImageData {
  uid: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
}

interface ImageValue {
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
  new: boolean;
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
}

interface Props {
  images: ImageData[] | undefined;
  value?: ImageValue[];
  onChange?: (value?: ImageValue[]) => void;
}

const ImageSelect = ({ images, value, onChange }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageValue[]>([]);

  useEffect(() => {
    if (value) setSelected(value);
  }, []);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

  const toggleSelected = (image: ImageData) => {
    if (selected.some(({ id }) => id === image.uid)) {
      setSelected(selected.filter(({ id }) => id !== image.uid));
    } else {
      setSelected([
        ...selected,
        {
          new: true,
          url: image.url,
          id: image.uid,
          optimised: image.url,
          boundingBox: image.boundingBox,
        },
      ]);
    }
  };

  return images && images.length > 0 ? (
    <Row gutter={16}>
      {images.map((image) => (
        <Col
          key={image.uid}
          className={classes.container}
          onClick={() => toggleSelected(image)}
        >
          {selected.some(({ id }) => id === image.uid) && (
            <div className={classes.check}>
              <FontAwesomeIcon size="xl" color="red" icon={faCheckedCircle} />
            </div>
          )}
          <div className={classes.image}>
            <WatermarkImage url={image.url} />
          </div>
        </Col>
      ))}
    </Row>
  ) : (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={intl.formatMessage({
        defaultMessage: 'No images on record.',
        id: 'ZyAHSw',
      })}
    />
  );
};

export default ImageSelect;
