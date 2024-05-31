/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import { message } from 'antd';

import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { Image, ImageCardData } from 'types/DataType';
import update from 'immutability-helper';
import { useIntl } from 'react-intl';
import { ImagePosition } from 'graphql/generated';
import { compressImage } from '../../../utils/compress-images';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { StateImageData } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';

interface Props {
  onClose: () => void;
  update: (value: ImageCardData[]) => void;
  images: ImageCardData[] | undefined | null;
  facialDet?: boolean;
}

export interface FormData {
  name: string;
  make?: string;
  model?: string;
  colour?: string;
  reference?: number | null;
  totalOffenders?: number | null;
  registration?: string;
  crimeGroup?: string[];
  groups?: string[];
  incidents?: string[];
  offenders?: string[];
  customGalleries?: Array<string | { value: string; label: string }>;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  toggleEditImage: (value?: Image) => void;
}

const useEditImagesList = ({
  update: updateImageList,
  images,
  facialDet,
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
          uid: `${image.id}`,
          name: `${image.id}.png`,
          status: 'done',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          url: `${image.optimised || image.url}`,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          optimised: `${image.optimised || image.url}`,
          position: image.position,
          primary: image.primary || false,
          policeImage: image.policeImage || false,
          rotation: image.rotation || 0,
          edited: false,
          new: false,
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
          id: item.uid || `${Math.random()}`,
          filename: item.fileName || '',
          mimetype: item.type || '',
          url: item.url || '',
          position: item.position,
          primary: item.uid === primaryImage,
          policeImage: item.policeImage || false,
          rotation: item.rotation,

          edited:
            (item.edited && !item.new && !item.deleted) ||
            (findPrimaryId === item.uid && findPrimaryId !== primaryImage),
          new: item.new,
          deleted: item.deleted,
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
          id: 'ILB9M+',
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
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          position: ImagePosition.CenterCenter,
          rotation: 0,
          totalFaces:
            facialDet && uploadImage.faces && uploadImage.faces.length > 0
              ? uploadImage.faces.length
              : 0,
          edited: false,
          new: true,
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
    onSubmit,
    saving,
    imgChange,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    fileList: fileList.filter(({ deleted }) => !deleted),
    onRemoveImage,
    onEditImage,
    toggleEditImage,
    editImage,
    primaryImage,
    setPrimaryImage,
  };
};
export default useEditImagesList;
