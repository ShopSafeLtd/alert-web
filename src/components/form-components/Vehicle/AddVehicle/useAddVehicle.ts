/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  ImagePosition,
  useListCustomGalleriesQuery,
  SortOrder,
  useSchemeGroupsQuery,
  useListCrimeGroupsQuery,
  Role,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, message, Upload } from 'antd';
import { useStoreState } from 'state';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type {
  CustomGalleryData,
  IncidentCardData,
  VehicleData,
} from 'types/DataType';
import update from 'immutability-helper';

interface Props {
  update: (value: VehicleData) => void;
}
export interface Image extends UploadFile {
  position?: ImagePosition;
  primary?: boolean;
  policeImage?: boolean;
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
  images?: { id: string; url: string; optimised: string }[];
}
interface Return {
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  offendersData: OffenderData[];
  incidentsData: IncidentCardData[];
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
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

const useAddVehicle = ({ update: updateVehicle }: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const { role, id: userId } = useStoreState((state) => state.user);
  const schemeId = useStoreState((state) => state.scheme.id);

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

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
      orderBy: {
        name: SortOrder.Asc,
      },
    },
  });
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
    updateVehicle({
      id: Math.floor(Math.random() * 1000).toString(),
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      customGalleries:
        customGalleriesIds && customGalleriesIds.length > 0
          ? customGalleriesIds
          : [],
      newCustomGalleriesData:
        newCustomGalleries && newCustomGalleries.length > 0
          ? newCustomGalleries
          : [],
      groups:
        data?.groups && data.groups.length > 0
          ? data?.groups?.map((id) => id)
          : [],
      crimeGroup:
        data?.crimeGroup && data.crimeGroup.length > 0
          ? data?.crimeGroup?.map((id) => id)
          : [],
      incidents:
        incidentsData && incidentsData.length > 0
          ? incidentsData.map(({ id }) => id)
          : [],
      offenders:
        offendersData && offendersData.length > 0
          ? offendersData.map(({ id }) => id)
          : [],
      images:
        imageChange && fileList.length > 0
          ? fileList.map((item) => ({
              id: item.uid,
              filename: item.fileName || '',
              mimetype: item.type || '',
              url: item.url || '',
              position: item.position,
              primary: item.uid === primaryImage,
              policeImage: item.policeImage,
            }))
          : [],
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
    return !isFileDuplicate || Upload.LIST_IGNORE;
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
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
    adminRights: role !== Role.User,
    imgChange,
    beforeUpload,
    fileList,
    onRemoveImage,
    onEditImage,
    toggleEditImage,
    editImage,
    primaryImage,
    setPrimaryImage,
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
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
export default useAddVehicle;
