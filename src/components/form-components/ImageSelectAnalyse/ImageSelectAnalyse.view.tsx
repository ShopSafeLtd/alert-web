import type { UploadChangeParam } from 'antd/lib/upload';
import type { Theme } from 'configs/ThemeConfig';
import type { ImagePosition } from 'graphql/types';

import { getCustomUrls } from '#/providers/GetCustomUrls';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCheckCircle as faCheckedCircle,
  faUpload,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Upload, message } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type {
  ImageFaceType,
  ImageResponseType,
  StateImageData,
} from '../../incidents/IncidentForm/ImageSection/useImageSection';

import compressImage from '../../../utils/compress-images';
import WatermarkImage from '../../images/WatermarkImage.view';
import FacesSelect from '../FacesSelect/FacesSelect.view';

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
interface ImageResponse extends ImageResponseType {
  file?: StateImageData;
  uid: string;
}
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
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  file?: StateImageData;
  fileName?: null | string;
  id: string;
  new?: boolean;
  optimised?: null | string | undefined;
  policeImage?: boolean | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  rotation?: number;
  type?: null | string;
  url?: null | string | undefined;
}

interface Props {
  images: ImageData[] | undefined;
  onChange?: (value?: ImageValue[]) => void;
  setUploading: (value: boolean) => void;
  uploading: boolean;
  // selectedImages: ImageData[] | undefined;
  value?: ImageValue[] | null;
}

const ImageSelectAnalyse = ({
  images: imagesProp,
  onChange,
  setUploading,
  uploading,
  value,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const facialDetection =
    useAtomValue(currentSchemeAtom)?.facialDetection ?? false;
  const facialRec = useAtomValue(currentSchemeAtom)?.facialRecognition ?? false;

  const [localUpload, setLocalUpload] = useState(uploading);
  const [selected, setSelected] = useState<ImageValue[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploadImage, setUploadImage] = useState<ImageResponse>();

  useEffect(() => {
    if (value) setSelected(value);
  }, []);

  useEffect(() => {
    if (imagesProp) setImages(imagesProp);
  }, []);

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
    if (info.file.status === 'uploading') {
      setUploading(true);
      setLocalUpload(true);
    }
    if (
      info.file.status === 'done' &&
      info.file.response &&
      info.file.response[0]
    ) {
      if (facialRec) {
        setUploadImage({
          ...info.file.response[0],
          file: info.file,
          uid: info.file.uid,
        });
      }
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
      setLocalUpload(false);
    }
    if (info.file.status === 'error') {
      setUploading(false);
      setLocalUpload(false);
      void message.error('Image upload failed');
    }
  };
  const onSelectFace = (face: ImageFaceType) => {
    setImages([
      ...images,
      {
        file: uploadImage?.file,
        fileName: uploadImage?.blobName,
        optimised: face.imageURL,
        type: uploadImage?.mimetype,
        uid: `${uploadImage?.blobName || ''}`,
        url: face.imageURL,
      },
    ]);
    setSelected([
      ...selected,
      {
        file: uploadImage?.file,
        id: `${uploadImage?.blobName || ''}`,
        optimised: face.imageURL,
        url: face.imageURL,
      },
    ]);
    setUploadImage(undefined);
  };
  const { imageAnalyseGo, imageUpload } = getCustomUrls();

  return (
    <div>
      <Upload
        action={facialDetection ? imageAnalyseGo : imageUpload}
        beforeUpload={async (file) => compressImage(file)}
        onChange={onImageChange}
        showUploadList={false}
      >
        <Button disabled={localUpload} loading={localUpload}>
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
      <FacesSelect
        faces={uploadImage?.faces}
        onClose={() => setUploadImage(undefined)}
        open={!!(uploadImage?.faces && uploadImage.faces.length > 0)}
        submitFace={onSelectFace}
      />
    </div>
  );
};

export default ImageSelectAnalyse;
