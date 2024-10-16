import type { BlurFaceData } from '#/types/DataType';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { Theme } from 'configs/ThemeConfig';
import type { ImagePosition } from 'graphql/types';

import {
  faCheckCircle as faCheckedCircle,
  faUpload,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { StateImageData } from '../../incidents/IncidentForm/ImageSection/useImageSection';

import compressImage from '../../../utils/compress-images';
import customRequest from '../../../utils/custom-request';
import WatermarkImage from '../../images/WatermarkImage.view';

const useStyles = createUseStyles((theme: Theme) => ({
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  check: {
    background: '#FFF',
    borderRadius: '100%',
    cursor: 'pointer',
    height: 21,
    position: 'absolute',
    right: 12,
    top: 5,
    width: 21,
    zIndex: 10,
  },
  container: {
    position: 'relative',
  },
  image: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 150,
    overflow: 'hidden',
    width: 150,
  },
  row: { marginTop: 10 },
  uploadIcon: {
    marginRight: 10,
  },
}));

export interface ImageData {
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  file?: StateImageData;
  fileName?: null | string;
  id?: string;
  optimised?: null | string | undefined;
  policeImage?: boolean | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  rotation?: number;
  type?: null | string;
  uid: string;
  url?: null | string | undefined;
}

export interface ImageValue {
  blurFaces?: BlurFaceData[];
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  file?: StateImageData;
  fileName?: null | string;
  id: string;
  isFace?: boolean | null;
  new?: boolean;
  optimised?: null | string | undefined;
  policeImage?: boolean | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  rotation?: number;
  totalFaces?: number;
  type?: null | string;
  url?: null | string | undefined;
}

interface Props {
  images: ImageData[] | undefined;
  onChange?: (value?: ImageValue[]) => void;
  setUploading?: (value: boolean) => void;
  uploading?: boolean;
  // selectedImages: ImageData[] | undefined;
  value?: ImageValue[] | null;
}

const ImageSelect = ({
  images: imagesProp,
  onChange,
  setUploading = (_arg1: boolean) => {},
  uploading = false,
  value,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageValue[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (value) setSelected(value);
  }, []);

  useEffect(() => {
    if (imagesProp) setImages(imagesProp);
  }, [imagesProp]);

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected]);

  const toggleSelected = (image: ImageData) => {
    if (selected.some(({ id }) => id === image.uid)) {
      setSelected(selected.filter(({ id }) => id !== image.uid));
    } else {
      setSelected([
        ...selected,
        {
          boundingBox: image.boundingBox,
          id: image.uid,
          optimised: image.url,
          url: image.url,
        },
      ]);
    }
  };

  const onImageChange = (info: UploadChangeParam<StateImageData>) => {
    // if (info.file.status === 'uploading') {
    //   setUploading(true);
    // }
    if (
      info.file.status === 'done' &&
      info.file.response &&
      info.file.response[0]
    ) {
      setImages([
        ...images,
        {
          file: info.file,
          fileName: info.file.response[0].blobName,
          optimised: info.file.response[0].url,
          type: info.file.response[0].mimetype,
          uid: info.file.uid,
          url: info.file.response[0].url,
        },
      ]);
      setSelected([
        ...selected,
        {
          file: info.file,
          id: info.file.uid,
          optimised: info.file.response[0].url,
          url: info.file.response[0].url,
        },
      ]);
      setUploading(false);
    }
    // if (info.file.status === 'error') {
    //   setUploading(false);
    //   void message.error('Image upload failed');
    // }
  };

  return (
    <div>
      <Upload
        beforeUpload={async (file) => compressImage(file)}
        // listType="picture-card"
        // action={import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT}
        // action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
        customRequest={customRequest}
        onChange={onImageChange}

        // showUploadList={false}
      >
        <Button disabled={uploading} loading={uploading}>
          <FontAwesomeIcon className={classes.uploadIcon} icon={faUpload} />
          {intl.formatMessage({
            defaultMessage: 'Upload Image',
          })}
        </Button>
      </Upload>
      <Row className={classes.row} gutter={[16, 16]}>
        {images.map((image) => (
          <Col
            className={classes.container}
            key={image.uid}
            onClick={() => toggleSelected(image)}
          >
            {selected.some(({ id }) => id === image.uid) && (
              <div className={classes.check}>
                <FontAwesomeIcon color="red" icon={faCheckedCircle} size="xl" />
              </div>
            )}
            <div className={classes.image}>
              <WatermarkImage
                position={image.position}
                rotation={image.rotation || 0}
                url={image.url}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageSelect;
