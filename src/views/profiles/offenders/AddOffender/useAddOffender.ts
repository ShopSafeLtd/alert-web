/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type {
  Age,
  Build,
  CreateOffenderData,
  CreateOffenderMutation,
  Gender,
  Height,
  IdSource,
  ListOffendersQuery,
  ListVehiclesQuery,
  Race,
} from 'graphql/generated';
import {
  QueryMode,
  useSearchOffendersLazyQuery,
  ImagePosition,
  ListOffendersDocument,
  Model,
  Role,
  useCreateOffenderMutation,
  useListCustomGalleriesQuery,
  useListVehiclesQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import type { FormInstance, UploadFile } from 'antd';
import { Form, message, Modal, notification } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import type {
  Image,
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  SelectOptions,
  TagData,
  VehicleData,
  OffenderData,
} from 'types/DataType';
import update from 'immutability-helper';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import compressImage from 'utils/compress-images';
import customRequest from '../../../../utils/custom-request';

const { confirm } = Modal;

export interface FormData {
  name: string;
  alias?: string[];
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  height: Height;
  hair: string;
  peculiarities: string;
  comment: string;
  dateSource?: string;
  dateOfBirth?: Date;
  groups: string[];
  tags: Array<string | SelectOptions>;
  images?: { id: string; url: string; optimised: string }[];
  idVerified?: boolean;
  idSource?: IdSource;
  bans?: BanData[];
  addressAlias?: string;
  building?: string;
  street?: string;
  townCity?: string;
  county?: string;
  postcode?: string;
  customGalleries: Array<string | SelectOptions>;
}

interface VehicleType extends VehicleData {
  new: boolean;
  existing: boolean;
  edited: boolean;
}

interface Return {
  addExclusion: boolean;
  addOffenderTag: boolean;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanData | null;
  bansData: BanData[];
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  deleteConfirm: (value: string | undefined) => void;
  editExclusion: boolean;
  editImage: Image | null;
  fileList: Image[];
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
  form: FormInstance<FormData>;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  listVehiclesData: ListVehiclesQuery | undefined;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddVehicle: (value: VehicleData, existing: boolean) => void;
  onEditImage: (value: Image) => void;
  onEditVehicle: (value: VehicleData) => void;
  // onPreview: (value: UploadFile) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSubmit: (value: FormData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanData | null) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;
  updateExclusion: (value: BanData) => void;
  vehiclesData: VehicleType[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
  reportOnly: boolean;
  potentialOffenders: OffenderData[];
  viewPotentialOffenders: boolean;
  toggleViewPotentialOffenders: () => void;
  onSearchOffender: () => void;
}

// const onPreview = async (file: UploadFile) => {
//   let src = file.url as string;
//   if (!src) {
//     src = await new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file.originFileObj as RcFile);
//       reader.addEventListener('load', () => resolve(reader.result as string));
//     });
//   }
//   const image = new Image();
//   image.src = src;
//   const imgWindow = window.open(src);
//   imgWindow?.document.write(image.outerHTML);
// };

const useAddOffender = (): Return => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const userId = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);
  const reportOnly =
    useStoreState((state) => state.scheme.reportOnly) && role === Role.User;
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const imagesRequired = useStoreState(
    (state) => state.scheme.imagesRequiredOnOffenders
  );
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [saving, setSaving] = useState(false);
  const [idVerified, setIDVerified] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [addOffenderTag, setAddOffenderTag] = useState(false);
  const [addCustomGallery, setAddCustomGallery] = useState(false);
  const [offenderTagsData, setOffenderTagsData] = useState<TagData[]>([]);
  const [customGalleryData, setCustomGalleryData] = useState<
    CustomGalleryData[]
  >([]);

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [documentList, setDocumentList] = useState<UploadFile[]>([]);
  const [addExclusion, setAddExclusion] = useState(false);
  const [editExclusion, setEditExclusion] = useState(false);
  const [bansData, setBansData] = useState<BanData[]>([]);
  const [banData, setBanData] = useState<BanData | null>(null);
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleType[]>([]);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const navigate = useNavigate();
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [potentialOffenders, setPotentialOffenders] = useState<OffenderData[]>(
    []
  );
  const [viewPotentialOffenders, setViewPotentialOffenders] = useState(false);

  const onValuesChange = (changedValues: FormData) => {
    if (changedValues.idVerified !== undefined) {
      setIDVerified(changedValues.idVerified);
    }
    // if (
    //   changedValues.name !== undefined ||
    //   changedValues.name !== 'Unidentified Offender'
    // ) {
    //   setSearch(changedValues.name);
    // }
  };
  const [queryOffenders] = useSearchOffendersLazyQuery();

  const onSearchOffender = () => {
    const offenderName = form.getFieldValue('name');
    if (offenderName && offenderName !== 'Unidentified Offender') {
      void queryOffenders({
        fetchPolicy: 'cache-and-network',
        variables: {
          where: {
            name: {
              equals: offenderName,
              mode: QueryMode.Insensitive,
            },
            groups:
              role === Role.ContentAdmin
                ? undefined
                : {
                    some: {
                      users: {
                        some: {
                          id: {
                            equals: userId,
                          },
                        },
                      },
                    },
                  },
          },
          scheme: {
            id: schemeId,
          },
        },
        // skip: !offenderName || offenderName === 'Unidentified Offender',
        onCompleted: ({ listOffenders }) => {
          if (listOffenders && listOffenders?.total > 0) {
            setPotentialOffenders(listOffenders?.offenders);
          } else {
            setPotentialOffenders([]);
          }
        },
      });
    }
  };

  const { data: listVehiclesData } = useListVehiclesQuery({
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
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
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
    },
    onCompleted: (result) => {
      setOffendersState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map((group) => group.id),
        },
        order,
      });
    },
  });
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
        dataType: {
          equals: Model.Offender,
        },
      },
    },
  });
  // custom galleries
  const { data: customGalleriesData, loading: customGalleriesLoading } =
    useListCustomGalleriesQuery({
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

  // update offender list after adding a new item
  const updateOffender: MutationUpdaterFn<CreateOffenderMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.createOffender === null || res.createOffender === undefined) return;
    const existingData = store.readQuery<ListOffendersQuery>({
      query: ListOffendersDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });

    if (existingData === null) return;
    if (existingData?.listOffenders?.offenders === undefined) return;

    store.writeQuery<ListOffendersQuery>({
      query: ListOffendersDocument,
      data: {
        listOffenders: {
          ...existingData.listOffenders,
          offenders:
            existingData?.listOffenders?.offenders &&
            existingData.listOffenders.offenders.length > 0
              ? // eslint-disable-next-line unicorn/prefer-spread
                existingData?.listOffenders?.offenders.concat(
                  res.createOffender
                )
              : [res.createOffender],
        },
        __typename: 'Query',
      },
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });
  };
  const [createOffender] = useCreateOffenderMutation({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onCompleted: async () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been added!',
          id: '67LUBd',
        }),
        placement: 'bottomRight',
      });
      if (reportOnly) {
        navigate('/app/offenders/add');
      } else {
        navigate('/app/offenders');
      }
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: updateOffender,
  });

  const onSubmit = (data: FormData) => {
    if (imagesRequired && fileList.length === 0) {
      confirm({
        title: 'Please add at least one image to the offender.',
        content:
          'An offender needs to have one image to be created in the database',
        type: 'error',
      });
      return;
    }

    setSaving(true);

    const getVehicles = (): CreateOffenderData['vehicles'] => {
      const newVehicles = vehiclesData.filter((item) => item.new);
      const existingVehicles = vehiclesData.filter((item) => item.existing);
      const editedVehicles = existingVehicles.filter((item) => item.edited);

      return {
        connect:
          existingVehicles.length > 0
            ? existingVehicles.map(({ id }) => ({ id }))
            : undefined,
        update: editedVehicles.map((vehicle) => ({
          where: { id: vehicle.id },
          data: {
            make: { set: vehicle.make },
            model: { set: vehicle.model },
            colour: { set: vehicle.colour },
            registration: { set: vehicle.registration },
            crimeGroup:
              vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                : undefined,
            incidents: vehicle.incidents
              ? { connect: vehicle.incidents.map((id) => ({ id })) }
              : undefined,
            offenders:
              vehicle.offenders && vehicle.offenders.length > 0
                ? { connect: vehicle.offenders.map((id) => ({ id })) }
                : undefined,
            groups: {
              connect:
                groupData?.groups && groupData.groups.length === 1
                  ? groupData?.groups.map(({ id }) => ({ id }))
                  : data.groups.map((id) => ({ id })),
            },
          },
        })),
        create:
          newVehicles.length > 0
            ? newVehicles.map((vehicle) => ({
                make: vehicle.make,
                model: vehicle.model,
                colour: vehicle.colour,
                registration: vehicle.registration,
                crimeGroup:
                  vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                    ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                    : undefined,
                incidents: vehicle.incidents
                  ? { connect: vehicle.incidents.map((id) => ({ id })) }
                  : undefined,
                groups: {
                  connect:
                    groupData?.groups && groupData.groups.length === 1
                      ? groupData?.groups.map(({ id }) => ({ id }))
                      : data.groups.map((id) => ({ id })),
                },
                schemes: { connect: [{ id: schemeId }] },
              }))
            : undefined,
      };
    };
    const getCrimeGroups = (): CreateOffenderData['crimeGroups'] => ({
      connect:
        crimeGroupsData.length > 0
          ? crimeGroupsData.map(({ id }) => ({ id }))
          : undefined,
    });
    const getCustomGalleries = (): CreateOffenderData['customGalleries'] => {
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
                      groupData?.groups && groupData.groups.length === 1
                        ? groupData?.groups.map(({ id }) => ({ id }))
                        : data.groups.map((id) => ({ id })),
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

    const getOffenderTags = (): CreateOffenderData['tags'] => {
      if (data.tags) {
        const offenderTagIds = data.tags.map((el) => {
          if (typeof el === 'object') {
            return el.value;
          }
          return el;
        });
        const newOffenderTags = offenderTagsData.filter(
          (item) => item.isNew && offenderTagIds.includes(item.id)
        );
        const connectedOffenderTags = offenderTagIds.filter(
          (id) => !newOffenderTags.map((el) => el.id).includes(id)
        );

        return {
          connect:
            connectedOffenderTags.length > 0
              ? connectedOffenderTags.map((id) => ({ id }))
              : undefined,
          create:
            newOffenderTags.length > 0
              ? newOffenderTags.map((value) => ({
                  name: value.name,
                  description: value.description || '',
                  schemes: value.schemes.includes(schemeId)
                    ? {
                        connect: value.schemes.map((id) => ({
                          id,
                        })),
                      }
                    : {
                        connect: [
                          ...value.schemes.map((id) => ({
                            id,
                          })),
                          { id: schemeId },
                        ],
                      },
                  createdBy: { connect: { id: userId } },
                  dataType: Model.Offender,
                }))
              : undefined,
        };
      }
      return {
        connect: undefined,
        create: undefined,
      };
    };
    void createOffender({
      variables: {
        data: {
          name: data.name,
          alias:
            data.alias && data.alias.length > 0
              ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
              : [],
          gender: data.gender || null,
          race: data.race || null,
          build: data.build || null,
          height: data.height || null,
          hair: data.hair || null,
          peculiarities: data.peculiarities || null,
          comment: data.comment || null,
          age: ageCheck ? null : data.age || null,
          dateSource: ageCheck ? data.dateSource || null : null,
          dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
          groups: {
            connect:
              groupData?.groups && groupData.groups.length === 1
                ? groupData?.groups.map(({ id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
          },
          scheme: schemeId,
          vehicles: getVehicles(),
          crimeGroups: getCrimeGroups(),
          tags: getOffenderTags(),
          customGalleries: getCustomGalleries(),
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
          documents:
            documentList.map((file) => ({
              url: file.url || '',
              name: file.name || '',
              fileType: file.type || '',
              origFileName: file.fileName || '',
            })) || [],
          bans:
            bansData && bansData.length > 0
              ? bansData.map((ban) => ({
                  startDate: ban?.startDate,
                  endDate: ban?.endDate,
                  location: ban?.location,
                  description: ban?.description || null,
                  type: ban.type || null,
                  scheme: {
                    connect: {
                      id: schemeId,
                    },
                  },
                  createdBy: { connect: { id: userId } },
                }))
              : undefined,
          idVerified: data.idVerified,
          idSource: data.idSource,
          address:
            data.street && data.townCity && data.postcode
              ? {
                  alias: data.addressAlias,
                  building: data.building,
                  street: data.street,
                  townCity: data.townCity,
                  county: data.county,
                  postcode: data.postcode,
                }
              : undefined,
        },
      },
    });
  };

  // function
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
    onChange: handleChange,
    multiple: true,
  };

  const toggleAddOffenderTag = () => {
    setAddOffenderTag(!addOffenderTag);
  };
  const toggleAddExclusion = () => {
    setAddExclusion(!addExclusion);
  };
  const toggleEditExclusion = () => {
    setEditExclusion(!editExclusion);
  };

  const toggleAddCustomGallery = () => {
    setAddCustomGallery(!addCustomGallery);
  };
  const updateNewOffenderTagData = (values: TagData) => {
    setAddOffenderTag(false);
    const selectedOffenderTag = form.getFieldValue('tags');
    form.setFieldsValue({
      tags: [...selectedOffenderTag, { value: values.id, label: values.name }],
    });
    setOffenderTagsData([...offenderTagsData, { ...values, isNew: true }]);
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
  const updateExclusion = (value: BanData) => {
    if (bansData && bansData.length > 0) {
      if (bansData.some(({ id }) => id === value.id)) {
        setBansData(
          bansData.map((ban) => {
            if (ban.id === value.id) {
              return value;
            }
            return ban;
          })
        );
      } else {
        setBansData([...bansData, value]);
      }
    } else {
      setBansData([value]);
    }
  };

  const onAddVehicle = (vehicle: VehicleData, existing: boolean) => {
    setVehiclesData([
      ...vehiclesData,
      {
        ...vehicle,
        edited: false,
        existing,
        new: !existing,
      },
    ]);
  };
  const onEditVehicle = (value: VehicleData) => {
    const vehicle = vehiclesData.find((item) => item.id === value.id);
    if (vehicle) {
      const index = vehiclesData.map((item) => item.id).indexOf(value.id);
      setVehiclesData(
        update(vehiclesData, {
          [index]: {
            $set: {
              ...vehicle,
              ...value,
              edited: !vehicle.new,
            },
          },
        })
      );
    }
  };
  const onRemoveVehicle = (vehicleId: string) => {
    setVehiclesData(
      vehiclesData?.filter((vehicle) => vehicle.id !== vehicleId)
    );
  };
  const onAddCrimeGroup = (value: CrimeGroupData) => {
    setCrimeGroupsData([...crimeGroupsData, value]);
  };
  const onRemoveCrimeGroup = (crimeGroupId: string) => {
    setCrimeGroupsData(
      crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
    );
  };

  const onRemoveBan = (currentId: string | undefined) => {
    setBansData(bansData.filter((ban) => currentId !== ban.id));
  };

  const deleteConfirm = (currentId: string | undefined) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the exclusion?',
        id: 'P70g0z',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
        id: 'JDJoIZ',
      }),
      onOk() {
        onRemoveBan(currentId);
      },
    });
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
  const toggleViewPotentialOffenders = () => {
    setViewPotentialOffenders(!viewPotentialOffenders);
  };

  return {
    onSubmit,
    saving,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    // role === Role.SchemeAdmin
    //   ? groupData?.groups.map((group) => ({
    //       value: group.id,
    //       label: group.name,
    //     })) || []
    //   : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    customGalleries:
      customGalleriesData?.listCustomGalleries.customGalleries.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) || [],
    customGalleriesLoading,
    imgChange,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    // onPreview,
    onRemoveImage,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    banData,
    setBanData,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    bansData,
    updateExclusion,
    adminRights: role !== Role.User,
    form,
    vehiclesData,
    crimeGroupsData,
    listVehiclesData,
    onValuesChange,
    idVerified,
    onEditImage,
    toggleEditImage,
    editImage,
    onAddVehicle,
    onEditVehicle,
    onRemoveVehicle,
    onAddCrimeGroup,
    onRemoveCrimeGroup,
    primaryImage,
    setPrimaryImage,
    addCustomGallery,
    toggleAddCustomGallery,
    updateNewCustomGalleryData,
    updateNewOffenderTagData,
    documentList,
    documentUploadProps,
    reportOnly,
    potentialOffenders,
    toggleViewPotentialOffenders,
    onSearchOffender,
    viewPotentialOffenders,
  };
};

export default useAddOffender;
