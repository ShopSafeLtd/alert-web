/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { StateImageData } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { Image, ImageCardData } from 'types/DataType';

import { message } from 'antd';
import { ImagePosition } from 'graphql/types';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { compressImage } from '../../../utils/compress-images';

interface Props {
  facialDet?: boolean;
  images: ImageCardData[] | null | undefined;
  onClose: () => void;
  update: (value: ImageCardData[]) => void;
}

export interface FormData {
  colour?: string;
  crimeGroup?: string[];
  customGalleries?: Array<{ label: string; value: string } | string>;
  groups?: string[];
  incidents?: string[];
  make?: string;
  model?: string;
  name: string;
  offenders?: string[];
  reference?: null | number;
  registration?: string;
  totalOffenders?: null | number;
}

interface Return {
  beforeUpload: (value: RcFile) => void;
  editImage: Image | null;
  fileList: Image[];
  imgChange: UploadProps['onChange'];
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: () => void;
  primaryImage: string;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  toggleEditImage: (value?: Image) => void;
}

const useEditImagesList = ({
  facialDet,
  images,
  update: updateImageList,
}: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');

  useEffect(() => {
    if (images && images.length > 0) {
      setFileList(
        images?.map((image) => ({
          edited: false,
          name: `${image.id}.png`,
          new: false,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          optimised: `${image.optimised || image.url}`,
          policeImage: image.policeImage || false,
          position: image.position,
          primary: image.primary || false,
          rotation: image.rotation || 0,
          status: 'done',
          uid: `${image.id}`,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          url: `${image.optimised || image.url}`,
        }))
      );
      const findPrimaryImage = images.find(({ primary }) => primary)?.id;
      if (findPrimaryImage) setPrimaryImage(findPrimaryImage);
    }
  }, [images]);
  const onEditImage = (value: Image) => {
    setImageChange(true);
    setEditImage(null);
    const index = fileList.map((item) => item.uid).indexOf(value.uid);
    setFileList(
      update(fileList, {
        [index]: {
          $set: { ...value, edited: !value.new },
        },
      })
    );
  };
  const onSubmit = () => {
    setSaving(true);

    if (imageChange && fileList.length > 0) {
      const findPrimaryId = images?.find(({ primary }) => primary)?.id;
      const imagesData = fileList
        // .filter((item) => !item.optimised)
        // .filter((item) => item.new || item.edited || item.deleted)
        .map((item) => ({
          deleted: item.deleted,
          edited:
            (item.edited && !item.new && !item.deleted) ||
            (findPrimaryId === item.uid && findPrimaryId !== primaryImage) ||
            (item.uid === primaryImage && findPrimaryId !== primaryImage),
          filename: item.fileName || '',
          id: item.uid || `${Math.random()}`,
          mimetype: item.type || '',
          new: item.new,
          policeImage: item.policeImage || false,
          position: item.position,

          primary: item.uid === primaryImage,
          rotation: item.rotation,
          url: item.url || '',
        }));

      updateImageList(imagesData);
    }
    setSaving(false);
  };
  // function

  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      void message.error(
        intl.formatMessage({
          defaultMessage:
            'This image already exists, please choose another one.',
        })
      );
    }
    return compressImage(file);
  };
  const imgChange: UploadProps['onChange'] = (
    info: UploadChangeParam<StateImageData>
  ) => {
    if (info.file.response && info.file.status === 'done') {
      const uploadImage = info.file.response[0];

      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          edited: false,
          fileName: info.file.response[0].blobName,
          new: true,
          position: ImagePosition.CenterCenter,
          rotation: 0,
          totalFaces:
            facialDet && uploadImage.faces && uploadImage.faces.length > 0
              ? uploadImage.faces.length
              : 0,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
  };

  const onRemoveImage = (imageId: string) => {
    setImageChange(true);
    const image = fileList.find((item) => item.uid === imageId);
    if (image?.new) {
      setFileList(fileList.filter((item) => item.uid !== imageId));
    } else {
      const index = fileList.map((item) => item.uid).indexOf(imageId);
      setFileList(
        update(fileList, {
          [index]: {
            deleted: {
              $set: true,
            },
          },
        })
      );
    }
  };

  const toggleEditImage = (image?: Image) => {
    setEditImage(image || null);
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    editImage,
    fileList: fileList.filter(({ deleted }) => !deleted),
    imgChange,
    onEditImage,
    onRemoveImage,
    onSubmit,
    primaryImage,
    saving,
    setPrimaryImage,
    toggleEditImage,
  };
};
export default useEditImagesList;
