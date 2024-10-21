/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { StateImageData } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { Image, ImageCardData, ImageFaceType } from 'types/DataType';

import { compressImage } from '#/utils/compress-images';
import { message } from 'antd';
import { ImagePosition } from 'graphql/types';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

interface Props {
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
  facialRec: boolean;
  fileList: Image[];
  imgChange: UploadProps['onChange'];
  onCloseSelectFace: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSelectFace: (value: ImageFaceType) => void;
  onSubmit: () => void;
  primaryImage: string;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  toggleEditImage: (value?: Image) => void;
  uploadFaces: ImageFaceType[];
  uploading: boolean;
}

const useEditImageAnalyseList = ({
  images,
  update: updateImageList,
}: Props): Return => {
  const intl = useIntl();
  const facialRec = useStoreState((state) => state.scheme.facialRecognition);
  const facialDed = useStoreState((state) => state.scheme.facialRedaction);

  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [uploadFaces, setUploadFaces] = useState<ImageFaceType[]>([]);
  const [facesUploading, setFacesUploading] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setFileList(
        images?.map((image) => ({
          edited: false,
          isFace: image.isFace || false,
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
          blurFaces: item.blurFaces?.map(({ BoundingBox }) => ({
            blur: true,
            height: Number(BoundingBox.Height),
            left: Number(BoundingBox.Left),
            top: Number(BoundingBox.Top),
            width: Number(BoundingBox.Width),
          })),
          deleted: item.deleted,
          edited:
            (item.edited && !item.new && !item.deleted) ||
            (findPrimaryId === item.uid && findPrimaryId !== primaryImage),
          filename: item.fileName || '',
          id: item.uid || `${Math.random()}`,
          is: item.policeImage || false,
          isFace: item.isFace || false,
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
    setImageUploading(true);

    if (info.file.response && info.file.status === 'done') {
      const uploadImage = info.file.response[0];

      if (facialRec && uploadImage.faces && uploadImage.faces.length > 0) {
        setUploadFaces(uploadImage.faces);
        if (facialDed) setFacesUploading(info.file.uid);
      }

      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          edited: false,
          fileName: info.file.response[0].blobName,
          new: true,
          position: ImagePosition.CenterCenter,
          rotation: 0,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
        },
      ]);
      setImageChange(true);
      setImageUploading(false);
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
  const onSelectFace = (face: ImageFaceType) => {
    let newData = [
      ...fileList,
      {
        ...face,
        edited: false,
        fileName: Math.floor(Math.random() * 1000).toString(),
        isFace: true,
        name: Math.floor(Math.random() * 1000).toString(),
        new: true,
        position: ImagePosition.CenterCenter,
        rotation: 0,
        type: 'image/jpeg',
        uid: Math.floor(Math.random() * 1000).toString(),
        url: face.imageURL,
      },
    ];

    // setFileList((prevList) => [
    //   ...prevList,
    //   {
    //     ...face,
    //     edited: false,
    //     fileName: Math.floor(Math.random() * 1000).toString(),
    //     isFace: true,
    //     name: Math.floor(Math.random() * 1000).toString(),
    //     new: true,
    //     position: ImagePosition.CenterCenter,
    //     rotation: 0,
    //     type: 'image/jpeg',
    //     uid: Math.floor(Math.random() * 1000).toString(),
    //     url: face.imageURL,
    //   },
    // ]);

    if (facialDed) {
      // const findIndex = fileList
      //   .map((item) => item.uid)
      //   .indexOf(facesUploading);

      const blurFaces = uploadFaces.filter(
        (el) => el.imageURL !== face.imageURL
      );
      newData = newData.map((image) => {
        if (image.uid === facesUploading) return { ...image, blurFaces };
        return image;
      });
      // setFileList((prevList) =>
      //   update(prevList, {
      //     [findIndex]: {
      //       $set: {
      //         ...fileList[findIndex],
      //         blurFaces,
      //       },
      //     },
      //   })
      // );
    }
    setFileList(newData);
    setFacesUploading('');
    setUploadFaces([]);
  };
  const toggleEditImage = (image?: Image) => {
    setEditImage(image || null);
  };
  const onCloseSelectFace = () => {
    setUploadFaces([]);
    setFacesUploading('');
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    editImage,
    facialRec,
    fileList: fileList.filter(({ deleted }) => !deleted),
    imgChange,
    onCloseSelectFace,
    onEditImage,
    onRemoveImage,
    onSelectFace,
    onSubmit,
    primaryImage,
    saving,
    setPrimaryImage,
    toggleEditImage,
    uploadFaces,
    uploading:
      imageUploading || (!!facesUploading && uploadFaces?.length === 0),
  };
};
export default useEditImageAnalyseList;
