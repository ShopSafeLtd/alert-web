import { useState } from 'react';
import type {
  Age,
  Build,
  CreateCrimeGroupDataInput,
  CreateTagMutation,
  Gender,
  IdSource,
  ListVehiclesQuery,
  OffenderUpdateInput,
  Race,
  TagsQuery,
  ViewOffenderQuery,
} from 'graphql/generated';
import {
  Model,
  Role,
  TagsDocument,
  useCreateCrimeGroupMutation,
  useListCrimeGroupsQuery,
  useListVehiclesQuery,
  useRecycleOffenderMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateOffenderMutation,
  useViewOffenderQuery,
  ImagePosition,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import type { BanData, CrimeGroupData, VehicleData } from 'types/DataType';
import update from 'immutability-helper';

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
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource?: string;
  dateOfBirth?: Date;
  groups: string[];
  tags: string[];
  images?: { id: string; url: string; optimised: string }[];
  idVerified?: boolean;
  idSource?: IdSource;
}

interface Image extends UploadFile {
  optimised?: string | null;
  position?: ImagePosition;
  edited?: boolean;
  new?: boolean;
}

interface BanType extends BanData {
  new: boolean;
  updated: boolean;
  deleted: boolean;
}

interface Return {
  onSubmit: (value: FormData) => void;
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;

  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  onUpdateExclusion: (value: BanData) => void;
  onAddExclusion: (value: BanData) => void;
  setBanData: (value: BanType) => void;
  bansData: BanType[];
  banData: BanType | null;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  onReject: () => void;
  deleteConfirm: (value: string) => void;
  adminRights: boolean;
  form: FormInstance<FormData>;
  selectedItems: string[];
  setSelectedItems: (value: string[]) => void;
  listVehiclesData: ListVehiclesQuery | undefined;
  // listCrimeGroupsData: ListCrimeGroupsQuery | undefined;
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleId: string;
  setEditVehicleId: (value: string) => void;
  vehiclesData: VehicleData[];
  updateVehiclesData: (value: VehicleData) => void;
  removeVehicle: (vehicleId: string) => void;
  removeCrimeGroup: (crimeGroupId: string) => void;
  addNewCrimeGroup: boolean;
  addExistingCrimeGroup: boolean;
  toggleAddNewCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  editCrimeGroupId: string;
  setEditCrimeGroupId: (value: string) => void;
  crimeGroupsData: CrimeGroupData[];
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  idVerified: boolean;
  addAddress: boolean;
  toggleAddAddress: () => void;
  editAddress: string | null;
  toggleEditAddress: (value: string | null) => void;
  onSubmitAddress: (data: AddAddressForm) => void;
  addressesData: AddressesData[] | null;
  onEditAddress: (data: EditAddressForm) => void;
  onDeleteAddress: (addressId: string) => void;
  onAddVehicles: (data: VehicleData, existing: boolean) => void;
  onEditImage: (value: Image) => void;
  toggleEditImage: (value?: Image) => void;
  editImage: Image | null;
}

const errorNotification = () => {
  notification.error({
    message: 'error!',
    description: 'Whoops, there are some errors. Please try again. ',
    placement: 'bottomRight',
  });
};

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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editImage, setEditImage] = useState<Image | null>(null);

  const [addNewCrimeGroup, setAddNewCrimeGroup] = useState(false);
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);
  const [editCrimeGroupId, setEditCrimeGroupId] = useState<string>('');
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);

  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState<string>('');
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

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
            edited: false,
            new: false,
          }))
        );
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
            updated: false,
            existing: false,
          }))
        );
      }
      if (offender?.crimeGroups && offender.crimeGroups.length > 0) {
        setCrimeGroupsData(offender.crimeGroups);
      }
      if (offender?.idVerified) setIDVerified(true);
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
  const { data: listCrimeGroupsData } = useListCrimeGroupsQuery({
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

  const [createCrimeGroup] = useCreateCrimeGroupMutation({});
  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: async () => {
      const getOffender = (): CreateCrimeGroupDataInput['offenders'] => {
        const newCrimeGroups = crimeGroupsData.filter((item) =>
          listCrimeGroupsData?.listCrimeGroups.crimeGroups.filter(
            ({ id }) => id !== item.id
          )
        );
        const connectIds = newCrimeGroups
          .flatMap((crimeGroup) => crimeGroup.offenders?.map((id) => ({ id })))
          .filter((item) => item !== null && item !== undefined) as {
          id: string;
        }[];
        if (connectIds.map(({ id }) => id).includes(offenderId)) {
          return { connect: connectIds };
        }
        return { connect: [...connectIds, { id: offenderId }] };
      };
      await createCrimeGroup({
        variables: {
          data: {
            schemes: {
              connect: [
                {
                  id: schemeId,
                },
              ],
            },
            vehicles: {},
            offenders: getOffender(),
          },
        },
      });
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
      const vehiclesIds =
        listVehiclesData?.listVehicles.vehicles.map((vehicle) => vehicle.id) ||
        [];
      const removeVehicles = vehiclesIds?.filter(
        (vehicleId) => !vehiclesData?.map(({ id }) => id).includes(vehicleId)
      );
      const newVehicles = vehiclesData.filter(
        (item) => !vehiclesIds.includes(item.id)
      );

      const existingVehicles = vehiclesData.filter((item) =>
        vehiclesIds.includes(item.id)
      );
      const editedVehicles = existingVehicles.filter(
        ({ edited }) => edited === true
      );
      return {
        connect:
          existingVehicles.length > 0
            ? existingVehicles.map(({ id }) => ({ id }))
            : undefined,
        disconnect:
          removeVehicles && removeVehicles.length > 0
            ? removeVehicles.map((id) => ({ id }))
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
      const crimeGroupsIds =
        listCrimeGroupsData?.listCrimeGroups.crimeGroups.map(
          (crimeGroup) => crimeGroup.id
        );
      const removeCrimeGroups = crimeGroupsIds?.filter(
        (crimeGroupId) =>
          !crimeGroupsData?.map(({ id }) => id).includes(crimeGroupId)
      );

      const existingCrimeGroups = crimeGroupsData.filter((item) =>
        crimeGroupsIds?.includes(item.id)
      );

      return {
        connect:
          existingCrimeGroups.length > 0
            ? existingCrimeGroups.map(({ id }) => ({ id }))
            : undefined,
        disconnect:
          removeCrimeGroups && removeCrimeGroups.length > 0
            ? removeCrimeGroups.map((id) => ({ id }))
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
                }))
            : undefined,
        delete: imageChange
          ? offenderData?.offender?.images
              .filter(
                (image) => !fileList.map((item) => item.uid).includes(image.id)
              )
              .map((image) => ({
                id: image.id,
              }))
          : [],
        update:
          editedImages.length > 0
            ? editedImages.map((item) => ({
                data: {
                  position: { set: item.position },
                },
                where: {
                  id: item.uid,
                },
              }))
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
          name: { set: data.name || 'Unidentified Offender' },
          gender: { set: data.gender || null },
          race: { set: data.race || null },
          build: { set: data.build || null },
          hair: { set: data.hair || 'Unknown' },
          peculiarities: { set: data.peculiarities || '' },
          age: { set: ageCheck ? null : data.age || null },
          dateSource: { set: ageCheck ? data.dateSource || null : null },
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          groups: {
            set: data.groups.map((id) => ({ id })),
          },
          tags: {
            set: data.tags.map((id) => ({ id })) || undefined,
          },
          scheme: { connect: { id: schemeId } },
          idSource: data.idSource ? { set: data.idSource } : undefined,
          idVerified: data.idVerified ? { set: data.idVerified } : undefined,
          bans: getBans(),
          vehicles: getVehicles(),
          crimeGroups: getCrimeGroups(),
          addresses: {
            create: addressesData
              .filter((item) => item.new)
              .map((item) => ({
                postcode: item.postcode,
                street: item.street,
                townCity: item.townCity,
                alias: item.alias,
                building: item.building,
                county: item.county,
              })),
            update: addressesData
              .filter((item) => item.updated)
              .map((item) => ({
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
            delete: addressesData
              .filter((item) => item.deleted)
              .map((item) => ({
                id: item.id,
              })),
          },
          images: getImages(),
        },
      },
    });
  };
  // update tag list after adding a new item
  const updateOffenderTag: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Offender,
          },
        },
      },
    });
    setSelectedItems([...selectedItems, res.createTag.id]);
    form.setFieldsValue({ tags: [...selectedItems, res.createTag.id] });
    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: [...existingData.tags, res.createTag],
        __typename: 'Query',
      },
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Offender,
          },
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
      message.error(
        'This image has already existed, please choose another one.'
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
  const toggleAddNewVehicle = () => {
    setAddNewVehicle(!addNewVehicle);
  };
  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };
  const toggleAddNewCrimeGroup = () => {
    setAddNewCrimeGroup(!addNewCrimeGroup);
  };
  const toggleAddExistingCrimeGroup = () => {
    setAddExistingCrimeGroup(!addExistingCrimeGroup);
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

  const onAddVehicles = (vehicle: VehicleData, existing: boolean) => {
    setVehiclesData([
      ...vehiclesData,
      {
        ...vehicle,
        new: !existing,
        existing,
      },
    ]);
  };
  const updateVehiclesData = (vehicle: VehicleData) => {
    const editedData = vehiclesData.find(({ id }) => id === vehicle.id);
    if (editedData) {
      setVehiclesData([
        ...(vehiclesData?.filter(({ id }) => id !== vehicle.id) || []),
        {
          ...vehicle,
        },
      ]);
    } else {
      setVehiclesData([...vehiclesData, vehicle]);
    }
  };
  const removeVehicle = (vehicleId: string) => {
    setVehiclesData(
      vehiclesData?.filter((vehicle) => vehicle.id !== vehicleId)
    );
  };

  const updateCrimeGroupsData = (crimeGroup: CrimeGroupData) => {
    const editedData = crimeGroupsData.find(({ id }) => id === crimeGroup.id);
    if (editedData) {
      setCrimeGroupsData([
        ...(crimeGroupsData?.filter(({ id }) => id !== crimeGroup.id) || []),
        {
          ...crimeGroup,
        },
      ]);
    } else {
      setCrimeGroupsData([...crimeGroupsData, crimeGroup]);
    }
  };

  const removeCrimeGroup = (crimeGroupId: string) => {
    setCrimeGroupsData(
      crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
    );
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
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
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
    selectedItems,
    setSelectedItems,
    adminRights: role !== Role.User,
    form,
    addNewVehicle,
    addExistingVehicle,
    editVehicleId,
    setEditVehicleId,
    toggleAddNewVehicle,
    toggleAddExistingVehicle,
    vehiclesData,
    updateVehiclesData,
    removeVehicle,
    addNewCrimeGroup,
    addExistingCrimeGroup,
    editCrimeGroupId,
    setEditCrimeGroupId,
    toggleAddNewCrimeGroup,
    toggleAddExistingCrimeGroup,
    crimeGroupsData,
    updateCrimeGroupsData,
    removeCrimeGroup,
    listVehiclesData,
    // listCrimeGroupsData,
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
    onAddVehicles,
    editImage,
    onEditImage,
    toggleEditImage,
  };
};

export default useEditOffender;
