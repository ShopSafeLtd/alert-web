import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Spin, Button, Col, Row, Upload } from 'antd';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as faCheckedCircle,
  faUpload,
} from '@fortawesome/pro-solid-svg-icons';
import { useIntl } from 'react-intl';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { Age, Gender, ImagePosition } from 'graphql/types';
import { useStoreState } from 'state';
import getFacesFromUrl from '#/utils/get-faces-from-url';
import WatermarkImage from '../../images/WatermarkImage.view';
import type {
  ImageFaceType,
  StateImageData,
} from '../../incidents/IncidentForm/ImageSection/useImageSection';
import {
  getPeculiaritiesFromFace,
  getGenderFromFace,
  getClosestAgeRange,
} from '../../incidents/IncidentForm/ImageSection/useImageSection';
// import customRequest from '../../../utils/custom-request';
import compressImage from '../../../utils/compress-images';
import FacesSelect from '../FacesSelect/FacesSelect.view';

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
  spin: {
    position: 'absolute',
    top: '45%',
    right: '45%',
    zIndex: 10,
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
export interface OffenderFaceData {
  age: Age;
  gender: Gender;
  peculiarities?: string;
}
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
  totalFaces?: number;
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  file?: StateImageData;
  new?: boolean;
  // faces?: ImageFaceType[];
  response?: { faces?: ImageFaceType[] }[];
  isFace?: boolean;
}

// interface ImageResponse extends ImageResponseType {
//   uid: string;
//   file?: StateImageData;
// }

export interface ImageValue {
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
  fileName?: string | null;
  type?: string | null;
  new?: boolean;
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
  faces?: ImageFaceType[];
}

interface Props {
  images: ImageData[] | undefined;
  // selectedImages: ImageData[] | undefined;
  value?: ImageValue[] | null;
  onChange?: (value?: ImageValue[]) => void;
  uploading?: boolean;
  setUploading?: (value: boolean) => void;
  form: FormInstance<OffenderFaceData>;
}

const ImageSelectAnalyse = ({
  images: imagesProp,
  value,
  onChange,
  uploading = false,
  setUploading = (_arg1: boolean) => {},
  form,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageValue[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploadFaces, setUploadFaces] = useState<ImageFaceType[]>();
  const [facesUploading, setFacesUploading] = useState('');
  const facialRec = useStoreState((state) => state.scheme.facialRecognition);

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

  useEffect(() => {
    if (uploadFaces) {
      setFacesUploading('');
    }
  }, [uploadFaces]);

  const onSelectFace = (face: ImageFaceType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const offenderAge = form.getFieldValue('age');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const offenderGender = form.getFieldValue('gender');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const offenderPeculiarities = form.getFieldValue('peculiarities');
    const faceId = Math.floor(Math.random() * 1000).toString();

    setImages([
      ...images,
      {
        isFace: true,
        url: face.imageURL,
        fileName: Math.floor(Math.random() * 1000).toString(),
        type: 'image/jpeg',
        uid: faceId,
        optimised: face.imageURL,
        new: true,
      },
    ]);
    setSelected([
      ...selected,
      {
        url: face.imageURL,
        id: faceId,
        optimised: face.imageURL,
        new: true,
      },
    ]);
    if (!offenderAge || offenderAge === 'UNKNOWN')
      form.setFieldValue(
        'age',
        getClosestAgeRange(face.AgeRange.High, face.AgeRange.Low)
      );
    if (!offenderGender || offenderGender === 'UNKNOWN')
      form.setFieldValue('gender', getGenderFromFace(face.Gender));
    if (!offenderPeculiarities)
      form.setFieldValue(
        'peculiarities',
        getPeculiaritiesFromFace(face.Beard, face.Mustache)
      );
    setUploadFaces([]);
  };

  const onImageChange = (info: UploadChangeParam<StateImageData>) => {
    if (
      info.file.status === 'done' &&
      info.file.response &&
      info.file.response[0]
    ) {
      const uploadImage = info.file.response[0];

      if (facialRec && uploadImage.faces && uploadImage.faces.length > 0) {
        setFacesUploading(info.file.uid);
        setUploadFaces(uploadImage.faces);
      }

      setImages([
        ...images,
        {
          url: uploadImage.url,
          fileName: uploadImage.blobName,
          type: uploadImage.mimetype,
          uid: info.file.uid,
          file: info.file,
          optimised: uploadImage.url,
          totalFaces:
            uploadImage.faces && uploadImage.faces.length > 0
              ? uploadImage.faces.length
              : 0,
        },
      ]);
      setSelected([
        {
          url: uploadImage.url,
          id: info.file.uid,
          file: info.file,
          optimised: uploadImage.url,
        },
        ...selected,
      ]);
      setUploading(false);
    }
    // if (info.file.status === 'error') {
    //   setUploading(false);
    //   void message.error('Image upload failed');
    // }
  };

  const toggleSelected = (image: ImageData) => {
    if (selected.some(({ id }) => id === image.uid)) {
      setSelected(selected.filter(({ id }) => id !== image.uid));
    } else {
      if (facialRec && !image.isFace) {
        const imgResponse = image.response;
        setFacesUploading(image.id || '');

        if (
          imgResponse &&
          imgResponse[0].faces &&
          imgResponse[0].faces.length > 0
        ) {
          setUploadFaces(imgResponse[0].faces);
        } else {
          void getFacesFromUrl(image.url || '').then((res) =>
            setUploadFaces(res)
          );
        }
      }
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

  return (
    <div>
      <Upload
        onChange={onImageChange}
        action={
          facialRec
            ? import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT_GO
            : import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT
        }
        // listType="picture-card"
        // action={import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT}
        // action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
        // customRequest={customRequest}
        beforeUpload={async (file) => compressImage(file)}
        showUploadList={false}
      >
        <Button loading={uploading} disabled={uploading}>
          <FontAwesomeIcon icon={faUpload} className={classes.uploadIcon} />
          {intl.formatMessage({
            defaultMessage: 'Upload Image',
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
            {facesUploading === image.id && (
              <div className={classes.spin}>
                <Spin />
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

      <FacesSelect
        submitFace={onSelectFace}
        onClose={() => setUploadFaces([])}
        open={!!(uploadFaces && uploadFaces.length > 0)}
        faces={uploadFaces}
      />
    </div>
  );
};

export default ImageSelectAnalyse;
