/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from 'react';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  ImagePosition,
  Role,
  useListCrimeGroupsQuery,
  useListCustomGalleriesQuery,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, message } from 'antd';
import { useStoreState } from 'state';

import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type {
  CustomGalleryData,
  Image,
  VehicleCardData,
  VehicleData,
} from 'types/DataType';
import update from 'immutability-helper';
import { useGroupsContext } from '#/context/groups-context';
import { compressImage } from '../../../../utils/compress-images';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleCardData | undefined | null;
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
  customGalleries?: Array<string | { value: string; label: string }>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving: boolean;

  adminRights: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  toggleEditImage: (value?: Image) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  form: FormInstance<FormData>;
}

const useEditVehicle = ({
  onClose,
  update: updateVehicle,
  editData,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const { role } = useStoreState((state) => state.user);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [addCustomGallery, setAddCustomGallery] = useState(false);
  const [customGalleryData, setCustomGalleryData] = useState<
    CustomGalleryData[]
  >([]);
  useEffect(() => {
    if (editData?.images && editData.images.length > 0) {
      setFileList(
        editData?.images.map((image) => ({
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
      const findPrimaryImage = editData?.images.find(
        ({ primary }) => primary
      )?.id;
      if (findPrimaryImage) setPrimaryImage(findPrimaryImage);
    }
  }, [editData]);

  const { groups, groupsLoading } = useGroupsContext();

  // custom galleries
  const { data: customGalleriesData, loading: customGalleriesLoading } =
    useListCustomGalleriesQuery({
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    });
  const { data: CrimeGroupsData, loading: CrimeGroupsLoading } =
    useListCrimeGroupsQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    const customGalleriesIds = data.customGalleries?.map((el) => {
      if (typeof el === 'object') {
        return el.value;
      }
      return el;
    });
    const newCustomGalleries = customGalleryData.filter(
      (item) => item.isNew && customGalleriesIds?.includes(item.id)
    );

    updateVehicle({
      id: editData?.id || '',
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      groups:
        data?.groups && data.groups.length > 0
          ? data?.groups?.map((id) => id)
          : [],
      crimeGroup:
        data?.crimeGroup && data.crimeGroup.length > 0
          ? data?.crimeGroup?.map((id) => id)
          : [],
      customGalleries:
        customGalleriesIds && customGalleriesIds.length > 0
          ? customGalleriesIds
          : [],
      newCustomGalleriesData:
        newCustomGalleries && newCustomGalleries.length > 0
          ? newCustomGalleries
          : [],

      images:
        imageChange && fileList.length > 0
          ? fileList
              // .filter((item) => !item.optimised)
              // .filter((item) => item.new || item.edited || item.deleted)
              .map((item) => ({
                id: item.uid,
                filename: item.fileName || '',
                mimetype: item.type || '',
                url: item.url || '',
                position: item.position,
                primary: item.uid === primaryImage,
                policeImage: item.policeImage,
                rotation: item.rotation || 0,
                edited: item.edited && !item.new,
                new: item.new,
                deleted: item.deleted,
              }))
          : undefined,
    });
    onClose();
  };
  // function

  const toggleAddCustomGallery = () => {
    setAddCustomGallery(!addCustomGallery);
  };
  const updateNewCustomGalleryData = (values: CustomGalleryData) => {
    setAddCustomGallery(false);
    const selectedCustomGallery = form.getFieldValue('customGalleries');
    if (selectedCustomGallery) {
      form.setFieldsValue({
        customGalleries: [
          ...selectedCustomGallery,
          { value: values.id, label: values.name },
        ],
      });
    } else {
      form.setFieldsValue({
        customGalleries: [{ value: values.id, label: values.name }],
      });
    }
    setCustomGalleryData([...customGalleryData, { ...values, isNew: true }]);
  };

  // image
  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      void message.error(
        'This image already exists, please choose another one.'
      );
    }
    return compressImage(file);
  };
  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          position: ImagePosition.CenterCenter,
          rotation: 0,
          new: true,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
  };
  const onEditImage = (value: Image) => {
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
            edited: {
              $set: false,
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
    CrimeGroupsData,
    CrimeGroupsLoading,
    saving,

    adminRights: role !== Role.User,
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
    groups,
    groupsLoading,
    customGalleries:
      customGalleriesData?.listCustomGalleries.customGalleries.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) || [],
    customGalleriesLoading,
    addCustomGallery,
    toggleAddCustomGallery,
    updateNewCustomGalleryData,
    form,
  };
};
export default useEditVehicle;
