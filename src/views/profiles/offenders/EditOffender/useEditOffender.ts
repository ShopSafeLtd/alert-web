/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { ViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import type {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  OffenderUpdateInput,
  Race,
} from 'graphql/types';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import type {
  BanData,
  CrimeGroupData,
  CustomGalleryData,
  Image,
  SelectOptions,
  TagData,
  VehicleData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { Form, Modal, Upload, message, notification } from 'antd';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { useRecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import { useUpdateOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-offender.generated';
import { useViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { ImagePosition, Model, Role } from 'graphql/types';
import { useListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreActions, useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface AddAddressForm {
  alias: string;
  building: string;
  county: string;
  postcode: string;
  street: string;
  townCity: string;
}

interface EditAddressForm {
  alias: string;
  building: string;
  county: string;
  id: string;
  postcode: string;
  street: string;
  townCity: string;
}

interface AddressesData {
  alias: string;
  building: string;
  county: string;
  deleted: boolean;
  id: string;
  new: boolean;
  postcode: string;
  street: string;
  townCity: string;
  updated: boolean;
}

interface Props {
  offenderId: string;
  reviewed: boolean;
}

export interface FormData {
  age: Age;
  alias?: string[];
  build: Build;
  comment: string;
  customGalleries?: (SelectOptions | string)[];
  dateOfBirth?: Date;
  dateSource?: string;
  gender: Gender;
  groups: string[];
  hair: string;
  height: Height;
  idSource?: IdSource;
  idVerified?: boolean;
  images?: { id: string; optimised: string; url: string }[];
  name: string;
  peculiarities: string;
  race: Race;
  tags: (SelectOptions | string)[];
}

export interface BanType extends BanData {
  deleted?: boolean;
  new?: boolean;
  updated?: boolean;
}

interface VehicleType extends VehicleData {
  deleted: boolean;
  edited: boolean;
  existing: boolean;
  new: boolean;
}

interface CrimeGroupType extends VehicleData {
  deleted: boolean;
  existing: boolean;
}

interface Return {
  addAddress: boolean;
  addCustomGallery: boolean;
  addExclusion: boolean;
  addOffenderTag: boolean;
  addressesData: AddressesData[] | null;
  adminRights: boolean;
  ageCheck: boolean;
  banData: BanType | null;
  bansData: BanType[];
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupType[];
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  data: ViewOffenderQuery | undefined;
  deleteConfirm: (value: string) => void;
  editAddress: null | string;
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
  onAddCrimeGroup: (value: CrimeGroupData) => void;
  onAddExclusion: (value: BanData) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onDeleteAddress: (addressId: string) => void;
  onEditAddress: (data: EditAddressForm) => void;
  onEditImage: (value: Image) => void;
  onEditVehicle: (data: VehicleData) => void;
  onReject: () => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (imageId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSubmit: (value: FormData) => void;
  onSubmitAddress: (data: AddAddressForm) => void;
  onUpdateExclusion: (value: BanData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  primaryImage: string;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanType) => void;
  setPrimaryImage: (value: string) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddAddress: () => void;

  toggleAddCustomGallery: () => void;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditAddress: (value: null | string) => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
  vehiclesData: VehicleType[];
}

const useEditOffender = ({ offenderId, reviewed }: Props): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
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
        deleted: false,
        id: `${Math.random()}`,
        new: true,
        updated: false,
      },
    ]);
    setAddAddress(false);
  };

  const onEditAddress = (data: EditAddressForm) => {
    const index = addressesData.map(({ id }) => id).indexOf(data.id);
    const existingData = addressesData.find(({ id }) => id === data.id);

    if (existingData) {
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
    }
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
              deleted: true,
              updated: false,
            },
          },
        })
      );
    }
  };

  const { data: offenderData, loading } = useViewOffenderQuery({
    onCompleted: ({ offender }) => {
      setAgeCheck(!!offender?.dateOfBirth);
      if (offender?.images && offender.images.length > 0) {
        setFileList(
          offender?.images.map((image) => ({
            edited: false,
            name: `${image.id}.png`,
            new: false,
            optimised: `${image.optimised || image.url || ''}`,
            policeImage: image.policeImage || false,
            position: image.position,
            primary: image.primary || false,
            rotation: image.rotation || 0,
            status: 'done',
            // id: image.id,
            uid: `${image.id}`,
            url: `${image.optimised || image.url || ''}`,
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
            id: ban.id,
            location: ban.location,
            new: false,
            startDate: ban.startDate,
            type: ban.type,
            updated: false,
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
            edited: false,
            existing: false,
            new: false,
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
    variables: {
      where: {
        id: offenderId,
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
    if (groups) {
      setOffendersState({
        order,
        pagination,
        variables: {
          ...variables,
          groups: groups.map((group) => group.value),
        },
      });
    }
  }, [groups]);

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
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

  const [updateOffender] = useUpdateOffenderMutation({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/require-await
    onCompleted: async () => {
      setSaving(false);
      navigate(`/app/offenders/view/${offenderId}`);
      notification.success({
        description: reviewed
          ? 'The offender has been approved!'
          : 'The offender has been updated!',
        message: 'Successfully Updated!',
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
        alias: item.alias,
        building: item.building,
        county: item.county,
        postcode: item.postcode,
        street: item.street,
        townCity: item.townCity,
      })),
      delete: deleteAddresses.map((item) => ({
        id: item.id,
      })),
      update: updateAddresses.map((item) => ({
        data: {
          alias: { set: item.alias },
          building: { set: item.building },
          county: { set: item.county },
          postcode: { set: item.postcode },
          street: { set: item.street },
          townCity: { set: item.townCity },
        },
        where: {
          id: item.id,
        },
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
              description: ban.description,
              endDate: ban.endDate || new Date(),
              location: ban.location || '',
              scheme: {
                connect: {
                  id: schemeId,
                },
              },
              startDate: ban.startDate || new Date(),
              type: ban.type,
            }))
          : undefined,
        delete: deletedBans
          ? deletedBans.map((ban) => ({
              id: ban.id,
            }))
          : undefined,
        update: updatedBans
          ? updatedBans.map((ban) => ({
              data: {
                description: { set: ban.description },
                endDate: { set: ban.endDate },
                location: { set: ban.location },
                startDate: { set: ban.startDate },
                type: { set: ban.type },
              },
              where: {
                id: ban.id,
              },
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
        create:
          newVehicles.length > 0
            ? newVehicles.map((vehicle) => ({
                colour: vehicle.colour,
                crimeGroup:
                  vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                    ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                    : undefined,
                incidents: vehicle.incidents
                  ? { connect: vehicle.incidents.map((id) => ({ id })) }
                  : undefined,
                make: vehicle.make,
                model: vehicle.model,
                registration: vehicle.registration,
              }))
            : undefined,
        disconnect:
          removeVehicles && removeVehicles.length > 0
            ? removeVehicles.map(({ id }) => ({ id }))
            : undefined,
        update: editedVehicles.map((vehicle) => ({
          data: {
            colour: { set: vehicle.colour },
            crimeGroup:
              vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                : undefined,
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
                  policeImage: { set: item.policeImage },
                  position: { set: item.position },
                  primary: { set: item.uid === primaryImage },
                  rotation: { set: item.rotation || 0 },
                },
                where: {
                  id: item.uid,
                },
              }))
            : undefined,
        upload:
          imageChange && fileList.length > 0
            ? fileList
                .filter((item) => !item.optimised)
                .map((item) => ({
                  policeImage: item.policeImage,
                  position: item.position,
                  primary: item.uid === primaryImage,
                  rotation: item.rotation,
                  url: {
                    filename: item.fileName || '',
                    mimetype: item.type || '',
                    url: item.url || '',
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
          connect:
            connectedCustomGalleries.length > 0
              ? connectedCustomGalleries.map((id) => ({ id }))
              : undefined,
          disconnect:
            disconnectedCustomGalleries &&
            disconnectedCustomGalleries.length > 0
              ? disconnectedCustomGalleries.map((id) => ({ id }))
              : undefined,
          // create:
          //   newCustomGalleries.length > 0
          //     ? newCustomGalleries.map((value) => ({
          //         name: value.name,
          //         description: value.description || '',
          //         schemes: schemeId,
          //         groups: {
          //           connect:
          //             groupData?.groups && groupData.groups.length === 1
          //               ? groupData?.groups.map(({ id }) => ({ id }))
          //               : data.groups.map((id) => ({ id })) || [],
          //         },
          //       }))
          //     : undefined,
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
          disconnect:
            disconnectedOffenderTags && disconnectedOffenderTags.length > 0
              ? disconnectedOffenderTags.map((id) => ({ id }))
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
        data: {
          addresses: getAddresses(),
          age: { set: ageCheck ? null : data.age || null },
          alias: { set: data.alias },
          approved: { set: true },
          bans: getBans(),
          build: { set: data.build || null },
          comment: { set: data.comment || '' },
          crimeGroups: getCrimeGroups(),
          customGalleries: getCustomGalleries(),
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          dateSource: { set: ageCheck ? data.dateSource || null : null },
          gender: { set: data.gender || null },
          groups: {
            set: data.groups.map((id) => ({ id })),
          },
          hair: {
            set:
              data.hair ||
              intl.formatMessage({
                defaultMessage: 'Unknown',
              }),
          },
          height: { set: data.height || null },
          idSource: data.idSource ? { set: data.idSource } : undefined,
          idVerified: data.idVerified ? { set: data.idVerified } : undefined,
          images: getImages(),
          name: { set: data.name || null },
          peculiarities: { set: data.peculiarities || '' },
          race: { set: data.race || null },
          scheme: { connect: { id: schemeId } },
          tags: getOffenderTags(),
          vehicles: getVehicles(),
        },
        where: {
          id: offenderId,
        },
      },
    });
  };

  // delete incident
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      navigate('/app/offenders');
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onReject = () => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click reject if you wish to reject the approving of this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Reject',
      }),
      onOk() {
        void recycleOffender({
          variables: {
            where: { id: offenderId },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
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

    return !isFileDuplicate || Upload.LIST_IGNORE;
  };

  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
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
      tags: [...selectedOffenderTag, { label: values.name, value: values.id }],
    });
    setOffenderTagsData([...offenderTagsData, { ...values, isNew: true }]);
  };
  const updateNewCustomGalleryData = (values: CustomGalleryData) => {
    setAddCustomGallery(false);
    const selectedCustomGallery = form.getFieldValue('customGalleries');
    form.setFieldsValue({
      customGalleries: [
        ...selectedCustomGallery,
        { label: values.name, value: values.id },
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
              description: value.description,
              endDate: value.endDate,
              id: value.id,
              location: value.location,
              new: true,
              startDate: value.startDate,
              type: value.type,
              updated: false,
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
        id: `${(Math.random() * 1000).toFixed(0)}`,
        new: true,
        updated: false,
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
        deleted: false,
        edited: false,
        existing,
        new: !existing,
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
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
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

      title: intl.formatMessage({
        defaultMessage: 'Do you want to remove the image?',
      }),
    });
  };

  const deleteConfirm = (currentId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        onRemoveExclusion(currentId);
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
    addAddress,
    addCustomGallery,
    addExclusion,
    addOffenderTag,
    addressesData: addressesData.filter((item) => !item.deleted),
    adminRights: role !== Role.User,
    ageCheck,
    banData,
    bansData: bansData.filter((item) => !item.deleted),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    crimeGroupsData: crimeGroupsData.filter((item) => !item.crimeGroup),
    customGalleries:
      customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: tag }) => ({
          label: tag.name,
          value: tag.id,
        })
      ) || [],
    customGalleriesLoading,
    data: offenderData,
    deleteConfirm,
    editAddress,
    editExclusion,
    editImage,
    fileList: fileList.filter((item) => !item.deleted),
    form,
    groups,
    groupsLoading,
    idVerified,
    imgChange,
    listVehiclesData,
    loading,
    onAddCrimeGroup,
    onAddExclusion,
    onAddVehicle,
    onDeleteAddress,
    onEditAddress,
    onEditImage,
    onEditVehicle,
    onReject,
    onRemoveCrimeGroup,
    onRemoveImage,
    onRemoveVehicle,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    onSubmitAddress,
    onUpdateExclusion,
    onValuesChange,
    primaryImage,
    saving,
    setAgeCheck,
    setBanData,
    setPrimaryImage,
    tags:
      tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id })) || [],
    tagsLoading,
    toggleAddAddress,
    toggleAddCustomGallery,
    toggleAddExclusion,
    toggleAddOffenderTag,
    toggleEditAddress,
    toggleEditExclusion,
    toggleEditImage,
    updateNewCustomGalleryData,
    updateNewOffenderTagData,
    vehiclesData: vehiclesData.filter((item) => !item.deleted),
  };
};

export default useEditOffender;
