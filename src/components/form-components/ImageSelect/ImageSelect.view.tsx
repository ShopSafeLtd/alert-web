import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Upload } from 'antd';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as faCheckedCircle,
  faUpload,
} from '@fortawesome/pro-solid-svg-icons';
import { useIntl } from 'react-intl';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { ImagePosition } from 'graphql/generated';
import WatermarkImage from '../../images/WatermarkImage.view';
import type { StateImageData } from '../../incidents/IncidentForm/ImageSection/useImageSection';
import customRequest from '../../../utils/custom-request';
import compressImage from '../../../utils/compress-images';

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
  id?: string;
  url?: string | null | undefined;
  fileName?: string | null;
  type?: string | null;
  optimised?: string | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  policeImage?: boolean | null | undefined;
  rotation?: number;
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
  fileName?: string | null;
  type?: string | null;
  new?: boolean;
  isFace?: boolean | null;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  policeImage?: boolean | null | undefined;
  rotation?: number;
  totalFaces?: number;
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
  // selectedImages: ImageData[] | undefined;
  value?: ImageValue[] | null;
  onChange?: (value?: ImageValue[]) => void;
  uploading?: boolean;
  setUploading?: (value: boolean) => void;
}

const ImageSelect = ({
  images: imagesProp,
  value,
  onChange,
  uploading = false,
  setUploading = (_arg1: boolean) => {},
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
          url: image.url,
          id: image.uid,
          optimised: image.url,
          boundingBox: image.boundingBox,
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
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
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
    // if (info.file.status === 'error') {
    //   setUploading(false);
    //   void message.error('Image upload failed');
    // }
  };

  return (
    <div>
      <Upload
        onChange={onImageChange}
        // listType="picture-card"
        // action={import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT}
        // action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
        customRequest={customRequest}
        beforeUpload={async (file) => compressImage(file)}

        // showUploadList={false}
      >
        <Button loading={uploading} disabled={uploading}>
          <FontAwesomeIcon icon={faUpload} className={classes.uploadIcon} />
          {intl.formatMessage({
            defaultMessage: 'Upload Image',
            id: 'MntrZe',
          })}
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
              <WatermarkImage
                url={image.url}
                position={image.position}
                rotation={image.rotation || 0}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageSelect;
