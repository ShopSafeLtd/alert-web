import { useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  ListVehiclesQuery,
  OffenderUpdateInput,
  Race,
  ViewOffenderQuery,
} from 'graphql/generated';
import {
  useListCustomGalleriesQuery,
  ImagePosition,
  Model,
  Role,
  useListVehiclesQuery,
  useRecycleOffenderMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateOffenderMutation,
  useViewOffenderQuery,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useNavigate } from 'react-router';
import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  SelectOptions,
  TagData,
  VehicleData,
} from 'types/DataType';
import update from 'immutability-helper';
import errorNotification from 'types/error_notification';

const { confirm } = Modal;

interface AddAddressForm {
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface EditAddressForm {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface AddressesData {
  id: string;
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  new: boolean;
  updated: boolean;
  deleted: boolean;
}

interface Props {
  offenderId: string;
  reviewed: boolean;
}

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
  customGalleries?: Array<string | SelectOptions>;
}

interface Image extends UploadFile {
  optimised?: string | null;
  position?: ImagePosition;
  primary?: boolean;
  policeImage?: boolean;
  edited?: boolean;
  new?: boolean;
  deleted?: boolean;
}

export interface BanType extends BanData {
  new?: boolean;
  updated?: boolean;
  deleted?: boolean;
}

interface VehicleType extends VehicleData {
  new: boolean;
  existing: boolean;
  edited: boolean;
  deleted: boolean;
}

interface CrimeGroupType extends VehicleData {
  existing: boolean;
  deleted: boolean;
}

interface Return {
  addAddress: boolean;
  addExclusion: boolean;
  addOffenderTag: boolean;
  addressesData: AddressesData[] | null;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanType | null;
  bansData: BanType[];
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupType[];
  data: ViewOffenderQuery | undefined;
  deleteConfirm: (value: string) => void;
  editAddress: string | null;
  editExclusion: boolean;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  listVehiclesData: ListVehiclesQuery | undefined;
  loading: boolean;
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddExclusion: (value: BanData) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onDeleteAddress: (addressId: string) => void;
  onEditAddress: (data: EditAddressForm) => void;
  onEditImage: (value: Image) => void;
  onEditVehicle: (data: VehicleData) => void;
  onPreview: (value: UploadFile) => void;
  onReject: () => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSubmit: (value: FormData) => void;
  onSubmitAddress: (data: AddAddressForm) => void;
  onUpdateExclusion: (value: BanData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanType) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddAddress: () => void;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditAddress: (value: string | null) => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;

  vehiclesData: VehicleType[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
}

const onPreview = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.addEventListener('load', () => resolve(reader.result as string));
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const useEditOffender = ({ offenderId, reviewed }: Props): Return => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [saving, setSaving] = useState(false);
  const [idVerified, setIDVerified] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [addOffenderTag, setAddOffenderTag] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [addExclusion, setAddExclusion] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, toggleEditAddress] = useState<null | string>(null);
  const [editExclusion, setEditExclusion] = useState(false);
  const [addressesData, setAddressesData] = useState<AddressesData[]>([]);
  const [bansData, setBansData] = useState<BanType[]>([]);
  const [banData, setBanData] = useState<BanType | null>(null);
  const [editImage, setEditImage] = useState<Image | null>(null);

  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupType[]>([]);

  const [vehiclesData, setVehiclesData] = useState<VehicleType[]>([]);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [addCustomGallery, setAddCustomGallery] = useState(false);
  const [offenderTagsData, setOffenderTagsData] = useState<TagData[]>([]);
  const [customGalleryData, setCustomGalleryData] = useState<
    CustomGalleryData[]
  >([]);

  const onValuesChange = (changedValues: FormData) => {
    if (changedValues.idVerified !== undefined) {
      setIDVerified(changedValues.idVerified);
    }
  };

  const toggleAddAddress = () => {
    setAddAddress(!addAddress);
  };

  const onSubmitAddress = (data: AddAddressForm) => {
    setAddressesData([
      ...addressesData,
      {
        ...data,
        id: `${Math.random()}`,
        deleted: false,
        new: true,
        updated: false,
      },
    ]);
    setAddAddress(false);
  };

  const onEditAddress = (data: EditAddressForm) => {
    const index = addressesData.map(({ id }) => id).indexOf(data.id);
    const existingData = addressesData.find(({ id }) => id === data.id);

    if (existingData)
      setAddressesData(
        update(addressesData, {
          [index]: {
            $set: {
              ...existingData,
              ...data,
              updated: !existingData.new,
            },
          },
        })
      );
    toggleEditAddress(null);
  };

  const onDeleteAddress = (addressId: string) => {
    const index = addressesData.map(({ id }) => id).indexOf(addressId);
    const existingData = addressesData.find(({ id }) => id === addressId);

    if (existingData?.new) {
      setAddressesData(addressesData.filter((item) => item.id !== addressId));
    } else if (existingData) {
      setAddressesData(
        update(addressesData, {
          [index]: {
            $set: {
              ...existingData,
              updated: false,
              deleted: true,
            },
          },
        })
      );
    }
  };

  const { data: offenderData, loading } = useViewOffenderQuery({
    variables: {
      where: {
        id: offenderId,
      },
    },
    onCompleted: ({ offender }) => {
      setAgeCheck(!!offender?.dateOfBirth);
      if (offender?.images && offender.images.length > 0) {
        setFileList(
          offender?.images.map((image) => ({
            uid: `${image.id}`,
            name: `${image.id}.png`,
            status: 'done',
            url: `${image.optimised || image.url}`,
            optimised: `${image.optimised || image.url}`,
            position: image.position,
            primary: image.primary || false,
            policeImage: image.policeImage || false,
            edited: false,
            new: false,
          }))
        );
        const findPrimaryImage = offender?.images.find(
          ({ primary }) => primary
        )?.id;
        if (findPrimaryImage) setPrimaryImage(findPrimaryImage);
      }
      if (offender?.bans && offender.bans.length > 0) {
        setBansData(
          offender.bans.map((ban) => ({
            deleted: false,
            description: ban.description || '',
            endDate: ban.endDate,
            startDate: ban.startDate,
            id: ban.id,
            location: ban.location,
            new: false,
            updated: false,
            type: ban.type,
          }))
        );
      }
      if (offender?.addresses && offender.addresses.length > 0) {
        setAddressesData(
          offender?.addresses.map((item) => ({
            alias: item.alias || '',
            building: item.building || '',
            county: item.county || '',
            deleted: false,
            id: item.id || '',
            new: false,
            postcode: item.postcode || '',
            street: item.street || '',
            townCity: item.townCity || '',
            updated: false,
          }))
        );
      }
      if (offender?.vehicles && offender.vehicles.length > 0) {
        setVehiclesData(
          offender.vehicles.map((item) => ({
            ...item,
            deleted: false,
            new: false,
            edited: false,
            existing: false,
          }))
        );
      }
      if (offender?.crimeGroups && offender.crimeGroups.length > 0) {
        setCrimeGroupsData(
          offender.crimeGroups.map((item) => ({
            ...item,
            deleted: false,
            existing: false,
          }))
        );
      }

      if (offender?.idVerified) setIDVerified(true);
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
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
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

  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: async () => {
      setSaving(false);
      navigate(`/app/offenders/view/${offenderId}`);
      notification.success({
        message: 'Successfully Updated!',
        description: reviewed
          ? 'The offender has been approved!'
          : 'The offender has been updated!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const getAddresses = (): OffenderUpdateInput['addresses'] => {
    const createAddresses = addressesData.filter((item) => item.new);
    const updateAddresses = addressesData.filter((item) => item.updated);
    const deleteAddresses = addressesData.filter((item) => item.deleted);
    return {
      create: createAddresses.map((item) => ({
        postcode: item.postcode,
        street: item.street,
        townCity: item.townCity,
        alias: item.alias,
        building: item.building,
        county: item.county,
      })),
      update: updateAddresses.map((item) => ({
        data: {
          postcode: { set: item.postcode },
          street: { set: item.street },
          townCity: { set: item.townCity },
          alias: { set: item.alias },
          building: { set: item.building },
          county: { set: item.county },
        },
        where: {
          id: item.id,
        },
      })),
      delete: deleteAddresses.map((item) => ({
        id: item.id,
      })),
    };
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const getBans = (): OffenderUpdateInput['bans'] => {
      const newBans = bansData.filter((item) => item.new);
      const deletedBans = bansData.filter((item) => item.deleted);
      const updatedBans = bansData.filter((item) => item.updated);

      return {
        create: newBans
          ? newBans.map((ban) => ({
              createdBy: {
                connect: {
                  id: userId,
                },
              },
              endDate: ban.endDate,
              location: ban.location,
              scheme: {
                connect: {
                  id: schemeId,
                },
              },
              startDate: ban.startDate,
              description: ban.description,
              type: ban.type,
            }))
          : undefined,
        update: updatedBans
          ? updatedBans.map((ban) => ({
              data: {
                endDate: { set: ban.endDate },
                location: { set: ban.location },
                startDate: { set: ban.startDate },
                description: { set: ban.description },
                type: { set: ban.type },
              },
              where: {
                id: ban.id,
              },
            }))
          : undefined,
        delete: deletedBans
          ? deletedBans.map((ban) => ({
              id: ban.id,
            }))
          : undefined,
      };
    };
    const getVehicles = (): OffenderUpdateInput['vehicles'] => {
      const removeVehicles = vehiclesData.filter((item) => item.deleted);
      const newVehicles = vehiclesData.filter((item) => item.new);
      const existingVehicles = vehiclesData.filter((item) => item.existing);
      const editedVehicles = vehiclesData.filter((item) => item.edited);
      return {
        connect:
          existingVehicles.length > 0
            ? existingVehicles.map(({ id }) => ({ id }))
            : undefined,
        disconnect:
          removeVehicles && removeVehicles.length > 0
            ? removeVehicles.map(({ id }) => ({ id }))
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
              }))
            : undefined,
      };
    };
    const getCrimeGroups = (): OffenderUpdateInput['crimeGroups'] => {
      const removeCrimeGroups = crimeGroupsData?.filter((item) => item.deleted);
      const existingCrimeGroups = crimeGroupsData.filter(
        (item) => item.existing
      );

      return {
        connect:
          existingCrimeGroups.length > 0
            ? existingCrimeGroups.map(({ id }) => ({ id }))
            : undefined,
        disconnect:
          removeCrimeGroups && removeCrimeGroups.length > 0
            ? removeCrimeGroups.map(({ id }) => ({ id }))
            : undefined,
      };
    };
    const getImages = (): OffenderUpdateInput['images'] => {
      const editedImages = fileList.filter((item) => item.edited && !item.new);
      return {
        upload:
          imageChange && fileList.length > 0
            ? fileList
                .filter((item) => !item.optimised)
                .map((item) => ({
                  url: {
                    filename: item.fileName || '',
                    mimetype: item.type || '',
                    url: item.url || '',
                  },
                  position: item.position,
                  primary: item.uid === primaryImage,
                  policeImage: item.policeImage,
                }))
            : undefined,
        delete: imageChange
          ? fileList
              .filter((image) => image.deleted)
              .map((image) => ({
                id: image.uid,
              }))
          : undefined,
        update:
          editedImages.length > 0
            ? editedImages.map((item) => ({
                data: {
                  position: { set: item.position },
                  primary: { set: item.uid === primaryImage },
                  policeImage: { set: item.policeImage },
                },
                where: {
                  id: item.uid,
                },
              }))
            : undefined,
      };
    };
    const getCustomGalleries = (): OffenderUpdateInput['customGalleries'] => {
      const existingCustomGalleryIds =
        offenderData?.offender?.customGalleries.map(({ id }) => id);

      const customGalleryIds = data.customGalleries?.map((el) => {
        if (typeof el === 'object') {
          return el.value;
        }
        return el;
      });

      if (customGalleryIds) {
        const newCustomGalleries = customGalleryData.filter(
          (item) => item.isNew && customGalleryIds?.includes(item.id)
        );

        const connectedCustomGalleries = customGalleryIds?.filter(
          (id) =>
            !(
              newCustomGalleries.map((el) => el.id).includes(id) ||
              existingCustomGalleryIds?.includes(id)
            )
        );
        const disconnectedCustomGalleries = existingCustomGalleryIds?.filter(
          (id) => !customGalleryIds?.includes(id)
        );

        return {
          disconnect:
            disconnectedCustomGalleries &&
            disconnectedCustomGalleries.length > 0
              ? disconnectedCustomGalleries.map((id) => ({ id }))
              : undefined,
          connect:
            connectedCustomGalleries.length > 0
              ? connectedCustomGalleries.map((id) => ({ id }))
              : undefined,
          create:
            newCustomGalleries.length > 0
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
        disconnect:
          existingCustomGalleryIds && existingCustomGalleryIds.length > 0
            ? existingCustomGalleryIds.map((id) => ({ id }))
            : undefined,
      };
    };
    const getOffenderTags = (): OffenderUpdateInput['tags'] => {
      const existingTagIds = offenderData?.offender?.tags.map(({ id }) => id);
      const offenderTagIds = data.tags.map((el) => {
        if (typeof el === 'object') {
          return el.value;
        }
        return el;
      });

      if (offenderTagIds) {
        const newOffenderTags = offenderTagsData?.filter(
          (item) => item.isNew && offenderTagIds.includes(item.id)
        );

        const connectedOffenderTags = offenderTagIds.filter(
          (id) =>
            !(
              newOffenderTags.map((el) => el.id).includes(id) ||
              existingTagIds?.includes(id)
            )
        );
        const disconnectedOffenderTags = existingTagIds?.filter(
          (id) => !offenderTagIds.includes(id)
        );
        return {
          disconnect:
            disconnectedOffenderTags && disconnectedOffenderTags.length > 0
              ? disconnectedOffenderTags.map((id) => ({ id }))
              : undefined,
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
        disconnect:
          existingTagIds && existingTagIds.length > 0
            ? existingTagIds.map((id) => ({ id }))
            : undefined,
      };
    };
    await updateOffender({
      variables: {
        where: {
          id: offenderId,
        },
        data: {
          approved: { set: true },
          name: { set: data.name || null },
          alias: { set: data.alias },
          gender: { set: data.gender || null },
          race: { set: data.race || null },
          build: { set: data.build || null },
          height: { set: data.height || null },
          comment: { set: data.comment || '' },
          hair: { set: data.hair || 'Unknown' },
          peculiarities: { set: data.peculiarities || '' },
          age: { set: ageCheck ? null : data.age || null },
          dateSource: { set: ageCheck ? data.dateSource || null : null },
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          groups: {
            set: data.groups.map((id) => ({ id })),
          },
          scheme: { connect: { id: schemeId } },
          idSource: data.idSource ? { set: data.idSource } : undefined,
          idVerified: data.idVerified ? { set: data.idVerified } : undefined,
          bans: getBans(),
          vehicles: getVehicles(),
          crimeGroups: getCrimeGroups(),
          addresses: getAddresses(),
          images: getImages(),
          customGalleries: getCustomGalleries(),
          tags: getOffenderTags(),
        },
      },
    });
  };

  // delete incident
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      navigate(`/app/offenders`);
      notification.success({
        message: 'Successfully Rejected!',
        description:
          'The offender has been deleted from the feed and moved to the recycle bin.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onReject = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Click reject if you wish to reject the approvement of this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Reject',
      onOk() {
        recycleOffender({
          variables: {
            where: { id: offenderId },
          },
        });
      },
    });
  };
  // function

  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      message.error('This image already exists, please choose another one.');
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
          edited: false,
          new: true,
        },
      ]);

      setImageChange(true);
    } else {
      setFileList(info.fileList as Image[]);
      setImageChange(true);
    }
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
    form.setFieldsValue({
      customGalleries: [
        ...selectedCustomGallery,
        { value: values.id, label: values.name },
      ],
    });
    setCustomGalleryData([...customGalleryData, { ...values, isNew: true }]);
  };

  const onUpdateExclusion = (value: BanData) => {
    const exclusion = bansData.find((item) => item.id === value.id);
    const index = bansData.map((item) => item.id).indexOf(value.id);
    if (exclusion?.new) {
      setBansData(
        update(bansData, {
          [index]: {
            $set: {
              deleted: false,
              endDate: value.endDate,
              id: value.id,
              location: value.location,
              new: true,
              startDate: value.startDate,
              updated: false,
              description: value.description,
              type: value.type,
            },
          },
        })
      );
    }
    if (exclusion?.new === false) {
      setBansData(
        update(bansData, {
          [index]: {
            $set: {
              ...exclusion,
              ...value,
              updated: true,
            },
          },
        })
      );
    }
  };

  const onAddExclusion = (value: BanData) => {
    setBansData([
      ...bansData,
      {
        ...value,
        deleted: false,
        new: true,
        updated: false,
        id: `${(Math.random() * 1000).toFixed(0)}`,
      },
    ]);
  };

  const onRemoveExclusion = (value: string) => {
    const exclusion = bansData.find((item) => item.id === value);
    const index = bansData.map((item) => item.id).indexOf(value);
    if (exclusion?.new) {
      setBansData(bansData.filter((item) => item.id !== value));
    }
    if (exclusion?.new === false) {
      setBansData(
        update(bansData, {
          [index]: {
            $set: {
              ...exclusion,
              deleted: true,
            },
          },
        })
      );
    }
  };

  const onAddVehicle = (vehicle: VehicleData, existing: boolean) => {
    setVehiclesData([
      ...vehiclesData,
      {
        ...vehicle,
        new: !existing,
        existing,
        deleted: false,
        edited: false,
      },
    ]);
  };

  const onRemoveVehicle = (vehicleId: string) => {
    const vehicle = vehiclesData.find((item) => item.id === vehicleId);

    if (vehicle?.new || vehicle?.existing) {
      setVehiclesData(vehiclesData.filter((item) => item.id !== vehicleId));
    } else {
      const index = vehiclesData.map((item) => item.id).indexOf(vehicleId);
      setVehiclesData(
        update(vehiclesData, {
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

  const onAddCrimeGroup = (crimeGroup: CrimeGroupData) => {
    setCrimeGroupsData([
      ...crimeGroupsData,
      {
        ...crimeGroup,
        deleted: false,
        existing: true,
      },
    ]);
  };

  const onRemoveCrimeGroup = (crimeGroupId: string) => {
    const crimeGroups = crimeGroupsData.find(
      (item) => item.id === crimeGroupId
    );
    if (crimeGroups?.existing) {
      setCrimeGroupsData(
        crimeGroupsData.filter((item) => item.id !== crimeGroupId)
      );
    } else {
      const index = crimeGroupsData
        .map((item) => item.id)
        .indexOf(crimeGroupId);
      setCrimeGroupsData(
        update(crimeGroupsData, {
          [index]: {
            deleted: {
              $set: true,
            },
          },
        })
      );
    }
  };

  const onRemoveImage = (imageId: string) => {
    confirm({
      title: 'Do you want to remove the image?',
      content: 'This action cannot be undone.',
      onOk() {
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
      },
    });
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the exclusion?',
      content: 'This action cannot be undone.',
      onOk() {
        onRemoveExclusion(currentId);
      },
    });
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

  const toggleEditImage = (image?: Image) => {
    setEditImage(image || null);
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

  return {
    onSubmit,
    data: offenderData,
    loading,
    saving,
    groups:
      role === Role.SchemeAdmin
        ? groupData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    imgChange,
    onPreview,
    beforeUpload,
    fileList: fileList.filter((item) => !item.deleted),
    addOffenderTag,
    toggleAddOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    onUpdateExclusion,
    onAddExclusion,
    setBanData,
    banData,
    bansData: bansData.filter((item) => !item.deleted),
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    onReject,

    adminRights: role !== Role.User,
    form,
    vehiclesData: vehiclesData.filter((item) => !item.deleted),
    onRemoveVehicle,
    crimeGroupsData: crimeGroupsData.filter((item) => !item.crimeGroup),
    onAddCrimeGroup,
    onRemoveCrimeGroup,
    listVehiclesData,
    onValuesChange,
    idVerified,
    addAddress,
    editAddress,
    toggleAddAddress,
    toggleEditAddress,
    addressesData: addressesData.filter((item) => !item.deleted),
    onSubmitAddress,
    onDeleteAddress,
    onEditAddress,
    onAddVehicle,
    editImage,
    onEditImage,
    toggleEditImage,
    onEditVehicle,
    onRemoveImage,
    primaryImage,
    setPrimaryImage,
    customGalleries:
      customGalleriesData?.listCustomGalleries.customGalleries.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) || [],
    customGalleriesLoading,
    toggleAddCustomGallery,
    updateNewOffenderTagData,
    addCustomGallery,
    updateNewCustomGalleryData,
  };
};

export default useEditOffender;
