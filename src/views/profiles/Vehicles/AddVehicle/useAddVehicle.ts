/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type { CreateVehicleDataInput } from 'graphql/generated';
import {
  useCreateVehicleMutation,
  ImagePosition,
  Role,
  SortOrder,
  useListCustomGalleriesQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import type { FormInstance, UploadFile } from 'antd';
import { notification, Form, message } from 'antd';
import { useStoreState } from 'state';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type {
  CrimeGroupData,
  CustomGalleryData,
  Image,
  IncidentCardData,
} from 'types/DataType';
import update from 'immutability-helper';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { compressImage } from '../../../../utils/compress-images';

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
  crimeGroupsData: CrimeGroupData[];
  addCrimeGroup: boolean;
  toggleAddCrimeGroup: () => void;
  updateCrimeGroupsList: (value: CrimeGroupData) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  adminRights: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
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
  saving: boolean;
  reportOnly: boolean;
}

const useAddVehicle = (): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormData>();
  const { role, id: userId } = useStoreState((state) => state.user);
  const { id: schemeId, reportOnly } = useStoreState((state) => state.scheme);
  const [saving, setSaving] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [addCrimeGroup, setAddCrimeGroup] = useState(false);
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [incidentsData, setIncidentsData] = useState<IncidentCardData[]>([]);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [addCustomGallery, setAddCustomGallery] = useState(false);
  const [customGalleryData, setCustomGalleryData] = useState<
    CustomGalleryData[]
  >([]);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  // query

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
  const [createVehicle] = useCreateVehicleMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been added!',
          id: 'htkq75',
        }),
        placement: 'bottomRight',
      });
      if (reportOnly && role === Role.User) {
        navigate('/app/vehicles/add');
      } else {
        navigate('/app/vehicles');
      }
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    // setSaving(true);
    const getCustomGalleries =
      (): CreateVehicleDataInput['customGalleries'] => {
        if (data.customGalleries) {
          const customGalleriesIds = data.customGalleries.map((el) => {
            if (typeof el === 'object') {
              return el.value;
            }
            return el;
          });
          const newCustomGalleries = customGalleryData.filter(
            (item) => item.isNew && customGalleriesIds.includes(item.id)
          );
          const connectedCustomGalleries = customGalleriesIds.filter(
            (id) => !newCustomGalleries.map((el) => el.id).includes(id)
          );

          return {
            connect:
              connectedCustomGalleries && connectedCustomGalleries.length > 0
                ? connectedCustomGalleries.map((id) => ({ id }))
                : undefined,
            create:
              newCustomGalleries && newCustomGalleries.length > 0
                ? newCustomGalleries.map((value) => ({
                    name: value.name,
                    description: value.description || '',
                    schemes: { connect: [{ id: schemeId }] },
                    groups: {
                      connect:
                        groupsData?.groups && groupsData.groups.length === 1
                          ? groupsData?.groups.map(({ id }) => ({ id }))
                          : data.groups?.map((id) => ({ id })),
                    },
                  }))
                : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
    void createVehicle({
      variables: {
        data: {
          make: data.make || '',
          model: data.model || '',
          colour: data.colour || '',
          registration: data.registration || '',
          groups:
            groupsData?.groups && groupsData.groups.length === 1
              ? groupsData?.groups.map(({ id }) => ({ id }))
              : data.groups?.map((id) => ({ id })),
          customGalleries: getCustomGalleries(),
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length > 0
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          incidents:
            incidentsData && incidentsData.length > 0
              ? incidentsData.map(({ id }) => ({ id }))
              : [],
          offenders:
            offendersData && offendersData.length > 0
              ? offendersData.map(({ id }) => ({ id }))
              : [],
          schemes: schemeId,
          image: {
            upload:
              imageChange && fileList.length > 0
                ? fileList.map((item) => ({
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                    position: item.position,
                    primary: item.uid === primaryImage,
                    policeImage: item.policeImage,
                    rotation: item.rotation || 0,
                  }))
                : undefined,
          },
        },
      },
    });
  };

  // function
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const toggleAddCrimeGroup = () => {
    setAddCrimeGroup(!addCrimeGroup);
  };
  const updateCrimeGroupsList = (selectedCrimeGroup: CrimeGroupData) => {
    setCrimeGroupsData([...crimeGroupsData, selectedCrimeGroup]);
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    setOffendersData([...offendersData, selectedOffender]);
  };
  const updateIncidentList = (selectedIncident: IncidentCardData) => {
    setIncidentsData([...incidentsData, selectedIncident]);
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
  const removeCrimeGroup = (crimeGroupId: string | undefined) => {
    if (crimeGroupId) {
      setCrimeGroupsData(
        crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
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

  // evidence
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign
        file.url = file.response[0].url;
        // eslint-disable-next-line no-param-reassign
        file.fileName = file.response[0].blobName;
      }
      return file;
    });

    setDocumentList(newFileList);
  };
  const documentUploadProps: UploadProps = {
    action: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT,
    onChange: handleChange,
    multiple: true,
  };
  return {
    onSubmit,
    crimeGroupsData,
    addCrimeGroup,
    toggleAddCrimeGroup,
    updateCrimeGroupsList,
    removeCrimeGroup,
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
    saving,
    reportOnly,
    documentList,
    documentUploadProps,
  };
};
export default useAddVehicle;
