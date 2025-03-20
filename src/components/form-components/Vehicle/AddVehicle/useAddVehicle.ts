/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type {
  CustomGalleryData,
  Image,
  IncidentCardData,
  VehicleData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { compressImage } from '#/utils/compress-images';
import { Form, message } from 'antd';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { ImagePosition } from 'graphql/types';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Props {
  update: (value: VehicleData) => void;
}

export interface FormData {
  colour?: string;
  crimeGroup?: string[];
  customGalleries?: ({ label: string; value: string } | string)[];
  groups?: string[];
  images?: { id: string; optimised: string; url: string }[];
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
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  addCustomGallery: boolean;
  beforeUpload: (value: RcFile) => void;
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  incidentsData: IncidentCardData[];
  linkIncident: boolean;
  linkOffender: boolean;
  offendersData: OffenderData[];
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
  removeIncident: (value: string | undefined) => void;
  removeOffender: (value: string | undefined) => void;
  setPrimaryImage: (value: string) => void;
  toggleAddCustomGallery: () => void;
  toggleEditImage: (value?: Image) => void;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateOffendersList: (value: OffenderData) => void;
}

const useAddVehicle = ({ update: updateVehicle }: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [incidentsData, setIncidentsData] = useState<IncidentCardData[]>([]);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [addCustomGallery, setAddCustomGallery] = useState(false);
  const [customGalleryData, setCustomGalleryData] = useState<
    CustomGalleryData[]
  >([]);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  // query
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

  const onSubmit = (data: FormData) => {
    const customGalleriesIds = data.customGalleries?.map((el) => {
      if (typeof el === 'object') {
        return el.value;
      }
      return el;
    });

    const newCustomGalleries = customGalleryData.filter(
      (item) => item.isNew && customGalleriesIds?.includes(item.id)
    );
    const connectCustomGalleriesIds = customGalleriesIds?.filter(
      (id) => !newCustomGalleries.map((el) => el.id).includes(id)
    );

    updateVehicle({
      colour: data.colour || '',
      crimeGroup:
        data?.crimeGroup && data.crimeGroup.length > 0
          ? data?.crimeGroup?.map((id) => id)
          : [],
      customGalleries:
        connectCustomGalleriesIds && connectCustomGalleriesIds.length > 0
          ? connectCustomGalleriesIds
          : [],
      groups:
        data?.groups && data.groups.length > 0
          ? data?.groups?.map((id) => id)
          : [],
      id: Math.floor(Math.random() * 1000).toString(),
      images:
        imageChange && fileList.length > 0
          ? fileList.map((item) => ({
              filename: item.fileName || '',
              id: item.uid,
              mimetype: item.type || '',
              policeImage: item.policeImage,
              position: item.position,
              primary: item.uid === primaryImage,
              rotation: item.rotation || 0,
              url: item.url || '',
            }))
          : [],
      incidents:
        incidentsData && incidentsData.length > 0
          ? incidentsData.map(({ id }) => id)
          : [],
      make: data.make || '',
      model: data.model || '',
      newCustomGalleriesData:
        newCustomGalleries && newCustomGalleries.length > 0
          ? newCustomGalleries
          : [],
      offenders:
        offendersData && offendersData.length > 0
          ? offendersData.map(({ id }) => id)
          : [],
      registration: data.registration || '',
    });
  };
  // function
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };

  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (!offendersData?.find(({ id }) => id === selectedOffender.id)) {
      setOffendersData([...offendersData, selectedOffender]);
    }
  };
  const updateIncidentList = (selectedIncident: IncidentCardData) => {
    if (selectedIncident) {
      setIncidentsData([...incidentsData, selectedIncident]);
    }
  };
  const removeOffender = (offenderId: string | undefined) => {
    if (offenderId) {
      setOffendersData(
        offendersData?.filter((offender) => offender.id !== offenderId)
      );
    }
  };
  const removeIncident = (incidentId: string | undefined) => {
    if (incidentId) {
      setIncidentsData(
        incidentsData?.filter((incident) => incident.id !== incidentId)
      );
    }
  };
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
          position: ImagePosition.CenterCenter,
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
          $set: value,
        },
      })
    );
  };

  const onRemoveImage = (imageId: string) => {
    setFileList(fileList.filter((item) => item.uid !== imageId));
  };

  const toggleEditImage = (image?: Image) => {
    setEditImage(image || null);
  };

  return {
    CrimeGroupsData,
    CrimeGroupsLoading,
    addCustomGallery,
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
    fileList,
    form,
    groups,
    groupsLoading,
    imgChange,
    incidentsData,
    linkIncident,
    linkOffender,
    offendersData,
    onEditImage,
    onRemoveImage,
    onSubmit,
    primaryImage,
    removeIncident,
    removeOffender,
    setPrimaryImage,
    toggleAddCustomGallery,
    toggleEditImage,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateNewCustomGalleryData,
    updateOffendersList,
  };
};
export default useAddVehicle;
