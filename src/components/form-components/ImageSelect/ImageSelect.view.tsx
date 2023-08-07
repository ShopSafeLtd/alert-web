import React, { useEffect, useState } from 'react';
import { Col, Upload, Row, Button } from 'antd';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as faCheckedCircle,
  faUpload,
} from '@fortawesome/pro-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import type { UploadChangeParam } from 'antd/lib/upload';
import WatermarkImage from '../../images/WatermarkImage.view';
import type { StateImageData } from '../../incidents/IncidentForm/ImageSection/useImageSection';

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
  uploadIcon: {
    marginRight: 10,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { marginTop: 10 },
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
  file?: StateImageData;
}

export interface ImageValue {
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  file?: StateImageData;
}

interface Props {
  images: ImageData[] | undefined;
  value?: ImageValue[];
  onChange?: (value?: ImageValue[]) => void;
}

const ImageSelect = ({ images: imagesProp, value, onChange }: Props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageValue[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (value) setSelected(value);
  }, []);

  useEffect(() => {
    if (imagesProp) setImages(imagesProp);
  }, [imagesProp]);

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
          url: image.url,
          id: image.uid,
          optimised: image.url,
          boundingBox: image.boundingBox,
        },
      ]);
    }
  };

  const onImageChange = (info: UploadChangeParam<StateImageData>) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
    }
    if (
      info.file.status === 'done' &&
      info.file.response &&
      info.file.response[0]
    ) {
      setImages([
        ...images,
        {
          url: info.file.response[0].url,
          uid: info.file.uid,
          file: info.file,
          optimised: info.file.response[0].url,
        },
      ]);
      setSelected([
        ...selected,
        {
          url: info.file.response[0].url,
          id: info.file.uid,
          file: info.file,
          optimised: info.file.response[0].url,
        },
      ]);
      setUploading(false);
    }
  };

  return (
    <div>
      <Upload
        onChange={onImageChange}
        action={import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT}
        showUploadList={false}
      >
        <Button loading={uploading} disabled={uploading}>
          <FontAwesomeIcon icon={faUpload} className={classes.uploadIcon} />
          <FormattedMessage defaultMessage="Upload Image" id="MntrZe" />
        </Button>
      </Upload>
      <Row className={classes.row} gutter={[16, 16]}>
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
    </div>
  );
};

export default ImageSelect;
