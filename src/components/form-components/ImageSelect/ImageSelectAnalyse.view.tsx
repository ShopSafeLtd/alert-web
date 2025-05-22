import type { BlurFaceData } from '#/types/DataType';
import type { FormInstance } from 'antd';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { Theme } from 'configs/ThemeConfig';
import type { Age, Gender, ImagePosition } from 'graphql/types';

import { getCustomUrls } from '#/providers/GetCustomUrls';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import getFacesFromUrl from '#/utils/get-faces-from-url';
import {
  faCheckCircle as faCheckedCircle,
  faUpload,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Spin, Upload } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type {
  ImageFaceType,
  StateImageData,
} from '../../incidents/IncidentForm/ImageSection/useImageSection';

// import customRequest from '../../../utils/custom-request';
import compressImage from '../../../utils/compress-images';
import WatermarkImage from '../../images/WatermarkImage.view';
import {
  getClosestAgeRange,
  getGenderFromFace,
  getPeculiaritiesFromFace,
} from '../../incidents/IncidentForm/ImageSection/useImageSection';
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
  spin: {
    position: 'absolute',
    right: '45%',
    top: '45%',
    zIndex: 10,
  },
  uploadIcon: {
    marginRight: 10,
  },
}));
export interface OffenderFaceData {
  age: Age;
  gender: Gender;
  peculiarities?: string;
}
export interface ImageData {
  blurFaces?: BlurFaceData[];
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  file?: StateImageData;
  fileName?: null | string;
  id?: string;
  isExisting?: boolean;
  isFace?: boolean;
  new?: boolean;
  optimised?: null | string | undefined;
  policeImage?: boolean | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  // faces?: ImageFaceType[];
  response?: { faces?: ImageFaceType[] }[];
  rotation?: number;
  totalFaces?: number;
  type?: null | string;
  uid: string;
  url?: null | string | undefined;
}

// interface ImageResponse extends ImageResponseType {
//   uid: string;
//   file?: StateImageData;
// }

export interface ImageValue {
  blurFaces?: BlurFaceData[];
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  faces?: ImageFaceType[];
  file?: StateImageData;
  fileName?: null | string;
  id: string;
  isExisting?: boolean;
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
  form: FormInstance<OffenderFaceData>;
  images: ImageData[] | undefined;
  onChange?: (value?: ImageValue[]) => void;
  setUploading?: (value: boolean) => void;
  uploading?: boolean;
  // selectedImages: ImageData[] | undefined;
  value?: ImageValue[] | null;
}

const ImageSelectAnalyse = ({
  form,
  images: imagesProp,
  onChange,
  setUploading = (_arg1: boolean) => {},
  uploading = false,
  value,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<ImageValue[]>(value ?? []);
  const [images, setImages] = useState<ImageData[]>(imagesProp ?? []);
  const [uploadFaces, setUploadFaces] = useState<ImageFaceType[]>([]);
  const [facesUploading, setFacesUploading] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const facialRec = useAtomValue(currentSchemeAtom)?.facialRecognition;
  const facialDed = useAtomValue(currentSchemeAtom)?.facialDetection;

  // useEffect(() => {
  //   if (value) setSelected(value);
  // }, []);

  // useEffect(() => {
  //   if (imagesProp) setImages(imagesProp);
  // }, [imagesProp]);

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    const filterImage = images.filter((image) =>
      selected.some((selection) => selection.id === image.uid)
    );
    form.setFieldValue('images', filterImage);
  }, [form, images, selected]);

  const onSelectFace = (face: ImageFaceType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const offenderAge = form.getFieldValue('age');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const offenderGender = form.getFieldValue('gender');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const offenderPeculiarities = form.getFieldValue('peculiarities');
    const faceId = Math.floor(Math.random() * 1000).toString();
    let newData = images;
    if (facialDed) {
      // const findIndex = images.findIndex(({ uid }) => uid === facesUploading);

      const blurFaces = uploadFaces
        .filter((el) => el.imageURL !== face.imageURL)
        .map(({ BoundingBox }) => ({
          blur: true,
          height: Number(BoundingBox.Height),
          left: Number(BoundingBox.Left),
          top: Number(BoundingBox.Top),
          width: Number(BoundingBox.Width),
        }));

      newData = images.map((image) => {
        if (image.uid === facesUploading) return { ...image, blurFaces };
        return image;
      });

      // setImages((prev) =>
      //   update(prev, {
      //     [findIndex]: {
      //       $set: {
      //         ...images[findIndex],
      //         blurFaces,
      //       },
      //     },
      //   })
      // );
      //  setImages([...images,{
      //     fileName: Math.floor(Math.random() * 1000).toString(),
      //     isFace: true,
      //     new: true,
      //     optimised: face.imageURL,
      //     type: 'image/jpeg',
      //     uid: faceId,
      //     url: face.imageURL,
      //   },])
    }
    newData = [
      ...newData,
      {
        fileName: Math.floor(Math.random() * 1000).toString(),
        isFace: true,
        new: true,
        optimised: face.imageURL,
        type: 'image/jpeg',
        uid: faceId,
        url: face.imageURL,
      },
    ];
    setImages(newData);
    // setImages((prev) => [
    //   ...prev,
    //   {
    //     fileName: Math.floor(Math.random() * 1000).toString(),
    //     isFace: true,
    //     new: true,
    //     optimised: face.imageURL,
    //     type: 'image/jpeg',
    //     uid: faceId,
    //     url: face.imageURL,
    //   },
    // ]);

    setSelected([
      ...selected,
      {
        id: faceId,
        new: true,
        optimised: face.imageURL,
        url: face.imageURL,
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
    setFacesUploading('');
    setUploadFaces([]);
  };

  const onImageChange = (info: UploadChangeParam<StateImageData>) => {
    setImageUploading(true);
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
          file: info.file,
          fileName: uploadImage.blobName,
          new: true,
          optimised: uploadImage.url,
          totalFaces:
            uploadImage.faces && uploadImage.faces.length > 0
              ? uploadImage.faces.length
              : 0,
          type: uploadImage.mimetype,
          uid: info.file.uid,
          url: uploadImage.url,
        },
      ]);

      setSelected([
        {
          file: info.file,
          id: info.file.uid,
          optimised: uploadImage.url,
          url: uploadImage.url,
        },
        ...selected,
      ]);

      setImageUploading(false);
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
      if (facialRec && !image.isFace && !image.isExisting) {
        const imgResponse = image.response;
        setFacesUploading(image.uid || '');

        if (
          imgResponse &&
          imgResponse[0].faces &&
          imgResponse[0].faces.length > 0
        ) {
          setUploadFaces(imgResponse[0].faces);
        } else {
          try {
            void getFacesFromUrl(image.url || '')
              .then((res) => setUploadFaces(res))
              .catch(() => {
                // eslint-disable-next-line no-console
                console.error('Error fetching faces from URL');
              });
          } catch {
            // eslint-disable-next-line no-console
            console.error('Error fetching faces from URL');
          }
        }
      }

      const imageToAdd = image.isExisting
        ? {
            boundingBox: image.boundingBox,
            id: image.uid,
            isExisting: image.isExisting,
            optimised: image.url,
            url: image.url,
            ...image,
          }
        : {
            ...image,
            boundingBox: image.boundingBox,
            id: image.uid,
            isExisting: image.isExisting,
            optimised: image.url,
            url: image.url,
          };
      setSelected([...selected, imageToAdd]);
    }
  };

  const { imageAnalyseGo, imageUpload } = getCustomUrls();
  return (
    <div>
      <Upload
        action={facialRec ? imageAnalyseGo : imageUpload}
        // customRequest={customRequest}
        beforeUpload={async (file) => compressImage(file)}
        // listType="picture-card"
        // action={import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT}
        // action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
        onChange={onImageChange}
        showUploadList={false}
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
            {(imageUploading ||
              (facesUploading === image.uid && uploadFaces?.length === 0)) && (
              <div className={classes.spin}>
                <Spin />
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
        faces={uploadFaces}
        onClose={() => {
          setUploadFaces([]);
          setFacesUploading('');
        }}
        open={!!(uploadFaces && uploadFaces.length > 0)}
        submitFace={onSelectFace}
      />
    </div>
  );
};

export default ImageSelectAnalyse;
