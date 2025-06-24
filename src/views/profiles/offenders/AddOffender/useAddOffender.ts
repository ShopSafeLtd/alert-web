/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { StateImageData } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { CreateOffenderMutation } from 'graphql/offenders/mutations/__generated__/crreate-offender.generated';
import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import type {
  Age,
  Build,
  CreateOffenderData,
  Gender,
  Height,
  IdSource,
  Race,
} from 'graphql/types';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  Image,
  ImageFaceType,
  OffenderData,
  OffenderSettingsType,
  SelectOptions,
  TagData,
  VehicleData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { sessionIdAtom } from '#/hooks/useManageSession';
import {
  currentSchemeAtom,
  currentSchemeBusinessesAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { Form, Modal, message, notification } from 'antd';
import { useBusinessOffenderSettingsQuery } from 'graphql/businesses/queries/__generated__/business-offender-settings.generated';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { useCreateOffenderMutation } from 'graphql/offenders/mutations/__generated__/crreate-offender.generated';
import { ListOffendersDocument } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import { useSearchOffendersLazyQuery } from 'graphql/offenders/queries/__generated__/search-offenders.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import {
  ImagePosition,
  Model,
  PermissionMethod,
  PermissionModel,
  QueryMode,
  SortOrder,
} from 'graphql/types';
import { useListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import compressImage from 'utils/compress-images';

import customRequest from '../../../../utils/custom-request';

const { confirm } = Modal;

export interface FormData {
  addressAlias?: string;
  age: Age;
  alias?: string[];
  bans?: BanData[];
  build: Build;
  building?: string;
  comment: string;
  county?: string;
  customGalleries: (SelectOptions | string)[];
  dateOfBirth?: Date;
  dateSource?: string;
  gender: Gender;
  groups: string[];
  hair: string;
  height: Height;
  idSource?: IdSource;
  idVerified?: boolean;
  images?: { id: string; optimised: string; url: string }[];
  justification?: string;
  name: string;
  peculiarities: string;
  postcode?: string;
  race: Race;
  sourceDetails?: string;
  street?: string;
  tags: (SelectOptions | string)[];
  townCity?: string;
}

interface VehicleType extends VehicleData {
  edited: boolean;
  existing: boolean;
  new: boolean;
}

interface Return {
  addCustomGallery: boolean;
  addExclusion: boolean;
  addOffenderTag: boolean;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanData | null;
  bansData: BanData[];
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  deleteConfirm: (value: string | undefined) => void;
  documentList: UploadFile[];
  documentUploadProps: UploadProps;
  editExclusion: boolean;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  listVehiclesData: ListVehiclesQuery | undefined;
  loading: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddVehicle: (value: VehicleData, existing: boolean) => void;
  onCloseFaces: () => void;
  onEditImage: (value: Image) => void;
  onEditVehicle: (value: VehicleData) => void;
  // onPreview: (value: UploadFile) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSearchOffender: () => void;
  onSelectFace: (value: ImageFaceType) => void;
  onSubmit: (value: FormData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  potentialOffenders: OffenderData[];
  primaryImage: string;
  reportOnly: boolean;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanData | null) => void;
  setPrimaryImage: (value: string) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddCustomGallery: () => void;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;
  toggleViewPotentialOffenders: () => void;
  updateExclusion: (value: BanData) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
  uploadFaces: ImageFaceType[];
  uploading: boolean;
  vehiclesData: VehicleType[];
  viewPotentialOffenders: boolean;
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
  const userBusinesses = useAtomValue(currentSchemeBusinessesAtom);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';

  const adminRights = useAtomValue(isAdminAtom);

  const {
    facialRecognition: facialRec,
    facialRedaction: facialDed,
    id: schemeId,
    needJustification,
  } = useAtomValue(currentSchemeAtom) ?? {
    facialRecognition: false,
    facialRedaction: false,
    id: '',
    needJustification: false,
  };
  const reportOnly =
    useAtomValue(currentSchemeAtom)?.reportOnly &&
    !hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Offenders,
      },
    });
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const imagesRequired =
    useAtomValue(currentSchemeAtom)?.imagesRequiredOnOffenders;
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const sessionId = useAtomValue(sessionIdAtom);

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
  const [uploadFaces, setUploadFaces] = useState<ImageFaceType[]>([]);
  const [facesUploading, setFacesUploading] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
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
  const { data: businessData, loading } = useBusinessOffenderSettingsQuery({
    fetchPolicy: 'network-only',
    skip: !userBusinesses[0]?.id,
    variables: {
      where: {
        id: userBusinesses[0]?.id,
      },
    },
  });
  const [queryOffenders] = useSearchOffendersLazyQuery();

  const onSearchOffender = () => {
    const offenderName = form.getFieldValue('name');
    if (offenderName && offenderName !== 'Unidentified Offender') {
      void queryOffenders({
        fetchPolicy: 'cache-and-network',
        // skip: !offenderName || offenderName === 'Unidentified Offender',
        onCompleted: ({ listOffenders }) => {
          if (listOffenders && listOffenders?.total > 0) {
            setPotentialOffenders(listOffenders?.offenders);
          } else {
            setPotentialOffenders([]);
          }
        },
        variables: {
          scheme: {
            id: schemeId,
          },
          where: {
            groups: {
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
            name: {
              equals: offenderName,
              mode: QueryMode.Insensitive,
            },
          },
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

  const { groups, groupsLoading } = useGroupsContext();

  useEffect(() => {
    if (groups)
      setOffendersState({
        order,
        pagination,
        variables: {
          ...variables,
          groups: groups.map((group) => group.value),
        },
      });
  }, [groups]);
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        dataType: {
          equals: Model.Offender,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
      },
    },
  });
  // custom galleries
  const { data: customGalleriesData, loading: customGalleriesLoading } =
    useListCustomGalleriesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        order: {
          name: SortOrder.Asc,
        },
        take: 100,
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
      data: {
        __typename: 'Query',
        listOffenders: {
          ...existingData.listOffenders,
          // TODO fix graphql type
          offenders:
            existingData?.listOffenders?.offenders &&
            existingData.listOffenders.offenders.length > 0
              ? // eslint-disable-next-line unicorn/prefer-spread
                existingData?.listOffenders?.offenders.concat({
                  ...res.createOffender,
                  totalImages: res?.createOffender.images.length || 0,
                  totalIncidents: res?.createOffender.incidents.length || 0,
                })
              : [
                  {
                    ...res.createOffender,
                    totalImages: res?.createOffender.images.length || 0,
                    totalIncidents: res?.createOffender.incidents.length || 0,
                  },
                ],
        },
      },
      query: ListOffendersDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });
  };
  const [createOffender] = useCreateOffenderMutation({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/require-await
    onCompleted: async () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender has been added!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
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
        content:
          'An offender needs to have one image to be created in the database',
        title: 'Please add at least one image to the offender.',
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
        create:
          newVehicles.length > 0
            ? newVehicles.map((vehicle) => ({
                colour: vehicle.colour,
                crimeGroup:
                  vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                    ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                    : undefined,
                groups: {
                  connect:
                    groups && groups.length === 1
                      ? groups.map(({ value: id }) => ({ id }))
                      : data.groups.map((id) => ({ id })),
                },
                incidents: vehicle.incidents
                  ? { connect: vehicle.incidents.map((id) => ({ id })) }
                  : undefined,
                make: vehicle.make,
                model: vehicle.model,
                registration: vehicle.registration,
                schemes: { connect: [{ id: schemeId }] },
              }))
            : undefined,
        update: editedVehicles.map((vehicle) => ({
          data: {
            colour: { set: vehicle.colour },
            crimeGroup:
              vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                : undefined,
            groups: {
              connect:
                groups && groups.length === 1
                  ? groups.map(({ value: id }) => ({ id }))
                  : data.groups.map((id) => ({ id })),
            },
            incidents: vehicle.incidents
              ? { connect: vehicle.incidents.map((id) => ({ id })) }
              : undefined,
            make: { set: vehicle.make },
            model: { set: vehicle.model },
            offenders:
              vehicle.offenders && vehicle.offenders.length > 0
                ? { connect: vehicle.offenders.map((id) => ({ id })) }
                : undefined,
            registration: { set: vehicle.registration },
          },
          where: { id: vehicle.id },
        })),
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
                  description: value.description || '',
                  groups: {
                    connect:
                      groups && groups.length === 1
                        ? groups.map(({ value: id }) => ({ id }))
                        : data.groups.map((id) => ({ id })),
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
                  createdBy: { connect: { id: userId } },
                  dataType: Model.Offender,
                  description: value.description || '',
                  name: value.name,
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
          address:
            data.street && data.townCity && data.postcode
              ? {
                  alias: data.addressAlias,
                  building: data.building,
                  county: data.county,
                  postcode: data.postcode,
                  street: data.street,
                  townCity: data.townCity,
                }
              : undefined,
          age: ageCheck ? null : data.age || null,
          alias:
            data.alias && data.alias.length > 0
              ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
              : [],
          bans:
            bansData && bansData.length > 0
              ? bansData.map((ban) => ({
                  createdBy: { connect: { id: userId } },
                  description: ban?.description || null,
                  endDate: ban?.endDate || new Date(),
                  fineValue: ban?.fineValue,
                  location: ban?.location || '',
                  months: ban?.months,
                  scheme: {
                    connect: {
                      id: schemeId,
                    },
                  },
                  startDate: ban?.startDate || new Date(),
                  type: ban.type || null,
                }))
              : undefined,
          build: data.build || null,
          comment: data.comment || null,
          crimeGroups: getCrimeGroups(),
          customGalleries: getCustomGalleries(),
          dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
          dateSource: ageCheck ? data.dateSource || null : null,
          documents:
            documentList.map((file) => ({
              fileType: file.type || '',
              name: file.name || '',
              origFileName: file.fileName || '',
              url: file.url || '',
            })) || [],
          gender: data.gender || null,
          groups: {
            connect:
              groups && groups.length === 1
                ? groups.map(({ value: id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
          },
          hair: data.hair || null,
          height: data.height || null,
          idSource: data.idSource,
          idVerified: data.idVerified,
          image: {
            upload:
              imageChange && fileList.length > 0
                ? fileList.map((item) => ({
                    blurFaces:
                      item.blurFaces && item.blurFaces.length > 0
                        ? item.blurFaces.map((face) => ({
                            blur: true,
                            height: Number(face.BoundingBox.Height),
                            left: Number(face.BoundingBox.Left),
                            top: Number(face.BoundingBox.Top),
                            width: Number(face.BoundingBox.Width),
                          }))
                        : undefined,
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
          justification: data.justification || null,
          name: data.name,
          peculiarities: data.peculiarities || null,
          race: data.race || null,
          scheme: schemeId,
          sessionId,
          sourceDetails: data.sourceDetails || null,
          tags: getOffenderTags(),
          vehicles: getVehicles(),
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

  const imgChange: UploadProps['onChange'] = (
    info: UploadChangeParam<StateImageData>
  ) => {
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
          fileName: info.file.response[0].blobName,
          position: ImagePosition.CenterCenter,
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

    if (facialDed) {
      const blurFaces = uploadFaces.filter(
        (el) => el.imageURL !== face.imageURL
      );
      newData = newData.map((image) => {
        if (image.uid === facesUploading) return { ...image, blurFaces };
        return image;
      });
    }
    setFileList(newData);
    setFacesUploading('');
    setUploadFaces([]);
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
      tags: [...selectedOffenderTag, { label: values.name, value: values.id }],
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
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        onRemoveBan(currentId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the exclusion?',
      }),
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
  const onCloseFaces = () => {
    setUploadFaces([]);
    setFacesUploading('');
  };

  return {
    addCustomGallery,
    addExclusion,
    addOffenderTag,
    // role === Role.SchemeAdmin
    //   ? groupData?.groups.map((group) => ({
    //       value: group.id,
    //       label: group.name,
    adminRights,
    //     })) || []
    ageCheck,
    banData,
    bansData,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    crimeGroupsData,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    customGalleries:
      customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: tag }) => ({
          label: tag.name,
          value: tag.id,
        })
      ) || [],
    customGalleriesLoading,
    deleteConfirm,
    documentList,
    documentUploadProps,
    editExclusion,
    editImage,
    fileList,
    form,
    groups,
    //   : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    idVerified,
    imgChange,
    listVehiclesData,
    loading,
    needJustification,
    offenderSettings: businessData?.business.offenderSettings || {
      age: true,
      alias: true,
      build: true,
      comment: true,
      dateOfBirth: true,
      dateOfBirthSource: true,
      ethnicity: true,
      gender: true,
      hair: true,
      height: true,
      idVerified: true,
      images: true,
      name: true,
      peculiarities: true,
    },
    onAddCrimeGroup,
    onAddVehicle,
    onCloseFaces,
    onEditImage,
    onEditVehicle,
    onRemoveCrimeGroup,
    // onPreview,
    onRemoveImage,
    onRemoveVehicle,
    onSearchOffender,
    onSelectFace,
    onSubmit,
    onValuesChange,
    potentialOffenders,
    primaryImage,
    reportOnly,
    saving,
    setAgeCheck,
    setBanData,
    setPrimaryImage,
    tags:
      tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id })) || [],
    tagsLoading,
    toggleAddCustomGallery,
    toggleAddExclusion,
    toggleAddOffenderTag,
    toggleEditExclusion,
    toggleEditImage,
    toggleViewPotentialOffenders,
    updateExclusion,
    updateNewCustomGalleryData,
    updateNewOffenderTagData,
    uploadFaces,
    uploading:
      imageUploading || (!!facesUploading && uploadFaces?.length === 0),
    vehiclesData,
    viewPotentialOffenders,
  };
};

export default useAddOffender;
