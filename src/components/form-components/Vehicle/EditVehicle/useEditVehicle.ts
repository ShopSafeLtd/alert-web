/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type {
  CustomGalleryData,
  Image,
  VehicleCardData,
  VehicleData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { compressImage } from '#/utils/compress-images';
import { Form, message } from 'antd';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { ImagePosition, Role } from 'graphql/types';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';

interface Props {
  editData: VehicleCardData | null | undefined;
  onClose: () => void;
  update: (value: VehicleData) => void;
}

export interface FormData {
  colour?: string;
  crimeGroup?: string[];
  customGalleries?: ({ label: string; value: string } | string)[];
  groups?: string[];
  make?: string;
  model?: string;
  name: string;
  reference?: null | number;
  registration?: string;
  totalOffenders?: null | number;
}

interface Return {
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  addCustomGallery: boolean;
  adminRights: boolean;

  beforeUpload: (value: RcFile) => void;
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  toggleAddCustomGallery: () => void;
  toggleEditImage: (value?: Image) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
}

const useEditVehicle = ({
  editData,
  onClose,
  update: updateVehicle,
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
      colour: data.colour || '',
      crimeGroup:
        data?.crimeGroup && data.crimeGroup.length > 0
          ? data?.crimeGroup?.map((id) => id)
          : [],
      customGalleries:
        customGalleriesIds && customGalleriesIds.length > 0
          ? customGalleriesIds
          : [],
      groups:
        data?.groups && data.groups.length > 0
          ? data?.groups?.map((id) => id)
          : [],
      id: editData?.id || '',
      images:
        imageChange && fileList.length > 0
          ? fileList
              // .filter((item) => !item.optimised)
              // .filter((item) => item.new || item.edited || item.deleted)
              .map((item) => ({
                deleted: item.deleted,
                edited: item.edited && !item.new,
                filename: item.fileName || '',
                id: item.uid,
                mimetype: item.type || '',
                new: item.new,
                policeImage: item.policeImage,
                position: item.position,
                primary: item.uid === primaryImage,
                rotation: item.rotation || 0,
                url: item.url || '',
              }))
          : undefined,
      make: data.make || '',
      model: data.model || '',
      newCustomGalleriesData:
        newCustomGalleries && newCustomGalleries.length > 0
          ? newCustomGalleries
          : [],

      registration: data.registration || '',
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
          { label: values.name, value: values.id },
        ],
      });
    } else {
      form.setFieldsValue({
        customGalleries: [{ label: values.name, value: values.id }],
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
          fileName: info.file.response[0].blobName,
          new: true,
          position: ImagePosition.CenterCenter,
          rotation: 0,
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
    CrimeGroupsData,
    CrimeGroupsLoading,
    addCustomGallery,
    adminRights: role !== Role.User,

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    customGalleries:
      customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: tag }) => ({
          label: tag.name,
          value: tag.id,
        })
      ) || [],
    customGalleriesLoading,
    editImage,
    fileList: fileList.filter(({ deleted }) => !deleted),
    form,
    groups,
    groupsLoading,
    imgChange,
    onEditImage,
    onRemoveImage,
    onSubmit,
    primaryImage,
    saving,
    setPrimaryImage,
    toggleAddCustomGallery,
    toggleEditImage,
    updateNewCustomGalleryData,
  };
};
export default useEditVehicle;
