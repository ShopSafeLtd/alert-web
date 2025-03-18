/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance, UploadFile } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { CreateVehicleDataInput } from 'graphql/types';
import type {
  CrimeGroupData,
  CustomGalleryData,
  Image,
  IncidentCardData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import hasRolePermission from '#/utils/has-role-permission';
import { Form, message, notification } from 'antd';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import {
  ImagePosition,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import { useCreateVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-vehicle.generated';
import update from 'immutability-helper';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import { compressImage } from 'utils/compress-images';
import customRequest from 'utils/custom-request';

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
  addCrimeGroup: boolean;
  addCustomGallery: boolean;
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
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
  removeCrimeGroup: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeOffender: (value: string | undefined) => void;
  reportOnly: boolean;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  toggleAddCrimeGroup: () => void;
  toggleAddCustomGallery: () => void;
  toggleEditImage: (value?: Image) => void;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateCrimeGroupsList: (value: CrimeGroupData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateOffendersList: (value: OffenderData) => void;
}

const useAddVehicle = (): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormData>();
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
  const [createVehicle] = useCreateVehicleMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been added!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
      if (
        reportOnly &&
        !hasRolePermission({
          permission: {
            method: PermissionMethod.Read,
            model: PermissionModel.Vehicles,
          },
        })
      ) {
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
                    description: value.description || '',
                    groups: {
                      connect:
                        groups && groups.length === 1
                          ? groups.map(({ value: id }) => ({ id }))
                          : data.groups?.map((id) => ({ id })) || [],
                    },
                    name: value.name,
                    schemes: { connect: [{ id: schemeId }] },
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
          colour: data.colour || '',
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length > 0
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          customGalleries: getCustomGalleries(),
          documents:
            documentList.map((file) => ({
              fileType: file.type || '',
              name: file.name || '',
              origFileName: file.fileName || '',
              url: file.url || '',
            })) || [],
          groups:
            groups && groups.length === 1
              ? groups.map(({ value: id }) => ({ id }))
              : data.groups?.map((id) => ({ id })) || [],
          image: {
            upload:
              imageChange && fileList.length > 0
                ? fileList.map((item) => ({
                    policeImage: item.policeImage,
                    position: item.position,
                    primary: item.uid === primaryImage,
                    rotation: item.rotation || 0,
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                  }))
                : undefined,
          },
          incidents:
            incidentsData && incidentsData.length > 0
              ? incidentsData.map(({ id }) => ({ id }))
              : [],
          make: data.make || '',
          model: data.model || '',
          offenders:
            offendersData && offendersData.length > 0
              ? offendersData.map(({ id }) => ({ id }))
              : [],
          registration: data.registration || '',
          schemes: schemeId,
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
    customRequest,
    multiple: true,
    onChange: handleChange,
  };
  return {
    addCrimeGroup,
    addCustomGallery,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    crimeGroupsData,
    customGalleries:
      customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: tag }) => ({
          label: tag.name,
          value: tag.id,
        })
      ) || [],
    customGalleriesLoading,
    documentList,
    documentUploadProps,
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
    removeCrimeGroup,
    removeIncident,
    removeOffender,
    reportOnly,
    saving,
    setPrimaryImage,
    toggleAddCrimeGroup,
    toggleAddCustomGallery,
    toggleEditImage,
    toggleLinkIncident,
    toggleLinkOffender,
    updateCrimeGroupsList,
    updateIncidentList,
    updateNewCustomGalleryData,
    updateOffendersList,
  };
};
export default useAddVehicle;
