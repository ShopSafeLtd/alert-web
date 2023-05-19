import { useState } from 'react';
import type {
  Age,
  Build,
  CreateOffenderData,
  CreateOffenderMutation,
  CreateTagMutation,
  Gender,
  IdSource,
  ListOffendersQuery,
  ListVehiclesQuery,
  Race,
  TagsQuery,
} from 'graphql/generated';
import {
  ImagePosition,
  ListOffendersDocument,
  Model,
  Role,
  TagsDocument,
  useCreateOffenderMutation,
  useListVehiclesQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import type { BanData, CrimeGroupData, VehicleData } from 'types/DataType';
import update from 'immutability-helper';

const { confirm } = Modal;

export interface Image extends UploadFile {
  position?: ImagePosition;
  primary?: boolean;
}

export interface FormData {
  name: string;
  alias?: string[];
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
  bans?: BanData[];
  addressAlias?: string;
  building?: string;
  street?: string;
  townCity?: string;
  county?: string;
  postcode?: string;
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
  onPreview: (value: UploadFile) => void;
  onRemoveCrimeGroup: (crimeGroupId: string) => void;
  onRemoveImage: (value: UploadFile) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSubmit: (value: FormData) => void;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  saving: boolean;
  selectedItems: string[];
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanData | null) => void;
  setSelectedItems: (value: string[]) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditExclusion: () => void;
  toggleEditImage: (value?: Image) => void;
  updateExclusion: (value: BanData) => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  vehiclesData: VehicleType[];
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

const useAddOffender = (): Return => {
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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);

  const [addExclusion, setAddExclusion] = useState(false);
  const [editExclusion, setEditExclusion] = useState(false);
  const [bansData, setBansData] = useState<BanData[]>([]);
  const [banData, setBanData] = useState<BanData | null>(null);

  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleType[]>([]);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const navigate = useNavigate();

  const onValuesChange = (changedValues: FormData) => {
    if (changedValues.idVerified !== undefined) {
      setIDVerified(changedValues.idVerified);
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
    onCompleted: async () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Added!',
        description: 'The offender has been added!',
        placement: 'bottomRight',
      });

      navigate('/app/offenders');
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateOffender,
  });

  const onSubmit = (data: FormData) => {
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
    const getCrimeGroups = (): CreateOffenderData['crimeGroups'] => ({
      connect:
        crimeGroupsData.length > 0
          ? crimeGroupsData.map(({ id }) => ({ id }))
          : undefined,
    });
    createOffender({
      variables: {
        data: {
          name: data.name,
          alias: [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))],
          gender: data.gender || null,
          race: data.race || null,
          build: data.build || null,
          hair: data.hair || null,
          peculiarities: data.peculiarities || null,
          age: ageCheck ? null : data.age || null,
          dateSource: ageCheck ? data.dateSource || null : null,
          dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
          groups: {
            connect:
              groupData?.groups && groupData.groups.length === 1
                ? groupData?.groups.map(({ id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
          },
          tags:
            data.tags && data.tags.length > 0
              ? { connect: data.tags.map((id) => ({ id })) }
              : undefined,
          scheme: schemeId,
          vehicles: getVehicles(),
          crimeGroups: getCrimeGroups(),
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
                    primary: item.primary,
                  }))
                : undefined,
          },

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
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
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

  const onRemoveImage = (file: UploadFile) => {
    if (fileList.length === 1) {
      setFileList([]);
    } else {
      setFileList(fileList.filter(({ uid }) => uid !== file.uid));
    }
  };
  const onRemoveBan = (currentId: string | undefined) => {
    setBansData(bansData.filter((ban) => currentId !== ban.id));
  };

  const deleteConfirm = (currentId: string | undefined) => {
    confirm({
      title: 'Do you want to delete the exclusion?',
      content: 'This action cannot be undone.',
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

  const toggleEditImage = (image?: Image) => {
    setEditImage(image || null);
  };

  return {
    onSubmit,
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
    onRemoveImage,
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
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
    selectedItems,
    setSelectedItems,
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
  };
};

export default useAddOffender;
