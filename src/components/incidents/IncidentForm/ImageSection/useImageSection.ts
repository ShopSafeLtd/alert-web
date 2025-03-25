/* eslint-disable no-param-reassign */
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form } from 'antd';
import {
  Age,
  Build,
  Gender,
  Height,
  ImagePosition,
  IncidentFormField,
  Race,
} from 'graphql/types';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

import type { StateOffenderData } from '../Profiles/Offenders/useOffenders';

import customRequest from '../../../../utils/custom-request';

export const getClosestAgeRange = (high: number, low: number) => {
  const middle = high - (high - low) / 2;
  if (middle < 18) return Age.UnderEighteen;
  if (middle >= 18 && middle < 30) return Age.EighteenThirty;
  if (middle >= 30 && middle < 40) return Age.ThirtyForty;
  if (middle >= 40 && middle < 50) return Age.FortyFifty;
  if (middle >= 50 && middle < 60) return Age.FiftySixty;
  if (middle >= 60 && middle < 70) return Age.SixtySeventy;
  if (middle >= 70 && middle < 80) return Age.SeventyEighty;
  if (middle >= 80) return Age.OverEighty;
  return Age.Unknown;
};
export const getGenderFromFace = (gender: 'Female' | 'Male') => {
  if (gender === 'Male') return Gender.Male;
  if (gender === 'Female') return Gender.Female;
  return Gender.Unknown;
};
export const getPeculiaritiesFromFace = (beard: boolean, mustache: boolean) => {
  if (mustache) return 'They have a moustache.';
  if (beard) return 'They have a beard.';
  return undefined;
};

export interface ImageFaceType {
  AgeRange: {
    High: number;
    Low: number;
  };
  Beard: boolean;
  BoundingBox: {
    Height: string;
    Left: string;
    Top: string;
    Width: string;
  };
  Gender: 'Female' | 'Male';
  Mustache: boolean;
  imageURL: string;
}
export interface ImageResponseType {
  blobName?: string;
  faces?: ImageFaceType[];
  mimetype?: string;
  url?: string;
}

export interface StateImageData extends UploadFile<ImageResponseType[]> {
  isFace?: boolean;
  policeImage?: boolean;
  position?: ImagePosition;
  primary?: boolean;
  rotation?: number;
  totalFaces?: number;
}

interface Props {
  form: FormInstance<FormData>;
  incidentForm: IncidentFormField[];
  onChange?: (data: StateImageData[]) => void;
  value?: StateImageData[];
}

interface Return {
  documentUploadProps: UploadProps;
  editImage: StateImageData | null;
  fileList: UploadFile[];
  images: StateImageData[];
  onEditImage: (value: StateImageData) => void;
  onImageChange: (info: UploadChangeParam<StateImageData>) => void;
  onRemoveImage: (uid: string) => void;
  setEditImage: (data: StateImageData | null) => void;
}

const useImageSection = ({ form, incidentForm, onChange }: Props): Return => {
  const formImages = Form.useWatch('images', form);
  const [images, setImages] = useState<StateImageData[]>([]);
  const [editImage, setEditImage] = useState<StateImageData | null>(null);
  const facialDetection =
    useAtomValue(currentSchemeAtom)?.facialDetection ?? true;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (formImages && formImages !== images) {
      setImages(formImages);
    }
  }, [formImages]);

  useEffect(() => {
    if (onChange && formImages?.length !== images.length) {
      onChange(images);
    }
  }, [images]);

  useEffect(() => {
    form.setFieldValue('images', images);
  }, [form, images]);

  const onImageChange = (info: UploadChangeParam<StateImageData>) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response && file.response[0]) {
        const image = file.response[0];
        file.url = image.url;
        file.fileName = image.blobName;
        file.type = image.mimetype;
        file.policeImage = false;
        file.primary = false;
        file.rotation = 0;
        file.position = ImagePosition.CenterCenter;
        // Component will show file.url as link
        file.url = file.response[0].url;
        file.totalFaces = file.response[0].faces?.length || 0;
      }
      return file;
    });

    setImages(newFileList);

    if (info.file.response) {
      const image = info.file.response[0];

      if (
        image &&
        facialDetection &&
        incidentForm.includes(IncidentFormField.Offenders) &&
        image.faces &&
        image.faces.length > 0
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const currentOffenders: StateOffenderData[] =
          form.getFieldValue('offenders') || [];

        form.setFieldsValue({
          // TODO alias issue -Fix this
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          offenders: [
            ...currentOffenders,
            ...image.faces.map((face) => ({
              age: getClosestAgeRange(face.AgeRange.High, face.AgeRange.Low),
              blank: true,
              build: Build.Unknown,
              confirmedInIncident: false,
              edited: false,
              existing: false,
              gender: getGenderFromFace(face.Gender),
              height: Height.Unknown,
              id: Math.floor(Math.random() * 1000).toString(),
              imageConfirmed: true,
              images: [
                {
                  boundingBox: {
                    height: face.BoundingBox.Height,
                    left: face.BoundingBox.Left,
                    top: face.BoundingBox.Top,
                    width: face.BoundingBox.Width,
                  },
                  id: info.file.uid,
                  new: true,
                  optimised: face.imageURL || image.url,
                  url: face.imageURL || image.url,
                },
              ],
              name: 'Unidentified Offender',
              new: true,
              peculiarities: getPeculiaritiesFromFace(
                face.Beard,
                face.Mustache
              ),
              race: Race.Unknown,
            })),
          ],
        });
      }
      // setImages([
      //   ...images.filter((item) => item.uid !== info.file.uid),
      //   {
      //     ...info.file,
      //     url: image.url,
      //     fileName: image.blobName,
      //     type: image.mimetype,
      //     policeImage: false,
      //     primary: false,
      //     rotation: 0,
      //     position: ImagePosition.CenterCenter,
      //   },
      // ]);
    }
  };

  const onEditImage = (data: StateImageData) => {
    const index = images.map((item) => item.uid).indexOf(data.uid);
    setImages(
      update<StateImageData[]>(images, {
        [index]: {
          $set: {
            ...data,
            position: data.position || ImagePosition.CenterCenter,
          },
        },
      })
    );

    setEditImage(null);
  };

  const onRemoveImage = (uid: string) => {
    setImages(images.filter((image) => image.uid !== uid));
  };

  // // other medias
  // const handleChange: UploadProps['onChange'] = (info) => {
  //   let newFileList = [...info.fileList];

  //   newFileList = newFileList.map((file) => {
  //     if (file.response) {
  //       // eslint-disable-next-line no-param-reassign
  //       file.url = file.response[0].url;

  //       // eslint-disable-next-line no-param-reassign
  //       file.fileName = file.response[0].blobName;
  //     }
  //     return file;
  //   });

  //   setFileList(newFileList);
  // };

  // const documentUploadProps: UploadProps = {
  //   action: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT_GO,
  //   onChange: handleChange,
  //   multiple: false,
  //   headers: {
  //     type: 'pdf',
  //   },
  // };

  // evidence
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        file.url = file.response[0].url;
        // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        file.fileName = file.response[0].blobName;
      }
      return file;
    });

    setFileList(newFileList);
  };
  const documentUploadProps: UploadProps = {
    customRequest,
    multiple: true,
    onChange: handleChange,
  };
  return {
    documentUploadProps,
    editImage,
    fileList,
    images,
    onEditImage,
    onImageChange,
    onRemoveImage,
    setEditImage,
  };
};

export default useImageSection;
