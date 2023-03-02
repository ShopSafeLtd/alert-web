import { useEffect, useState } from 'react';
import {
  AddressesQuery,
  CreateIncidentData,
  CreateIncidentMutation,
  CreateTagMutation,
  ListCrimeGroupsQuery,
  ListIncidentsDocument,
  ListIncidentsQuery,
  ListOffendersQuery,
  ListVehiclesQuery,
  Model,
  QueryMode,
  Role,
  SearchBusinessesDocument,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  SortOrder,
  TagsDocument,
  TagsQuery,
  useAddressesQuery,
  useCreateIncidentMutation,
  useListCrimeGroupsQuery,
  useListOffendersQuery,
  useListVehiclesQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import { Form, FormInstance, message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn, useApolloClient } from '@apollo/client';
import update from 'immutability-helper';
import { UploadChangeParam } from 'antd/lib/upload';
import { useNavigate } from 'react-router-dom';
import { CrimeGroupData, OffenderData, VehicleData } from 'types/DataType';

const { confirm } = Modal;
const { useForm } = Form;

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];
interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  business: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tags: string[];
  images?: { id: string; url: string; optimised: string }[];
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  addressLoading: boolean;
  imgChange: UploadProps['onChange'];
  fileList: Image[];
  beforeUpload: (value: RcFile) => void;
  addIncidentTag: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffendersData: (value: OffenderData) => void;
  offendersData: OffenderData[];
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  addRecentOffender: Offender | null;
  setAddRecentOffender: (value: Offender | null) => void;
  searchOffenders: string;
  setSearchOffenders: (value: string) => void;
  newImage: Image | null;
  onCancelNewImage: () => void;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  setAssignToImage: (image: Image) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeImage: (uid: string) => void;
  removeOffender: (offenderId: string) => void;
  listOffendersData: ListOffendersQuery | undefined;
  adminRights: boolean;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  editOffenderId: string;
  setEditOffenderId: (value: string) => void;
  updateOffender: (value: OffenderData) => void;
  listVehiclesData: ListVehiclesQuery | undefined;
  listCrimeGroupsData: ListCrimeGroupsQuery | undefined;
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
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const useEditIncident = (): Return => {
  const [form] = useForm<FormData>();
  const client = useApolloClient();

  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const groups = useStoreState((state) => state.user.groups);
  const businesses = useStoreState((state) => state.user.businesses);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  const [saving, setSaving] = useState(false);

  const [addIncidentTag, setAddIncidentTag] = useState(false);
  const [addRecentOffender, setAddRecentOffender] = useState<Offender | null>(
    null
  );
  const [searchOffenders, setSearchOffenders] = useState<string>('');

  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [editOffenderId, setEditOffenderId] = useState<string>('');
  const [editedOffender, setEditedOffender] = useState<
    OffenderData | undefined
  >();

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [newImage, setNewImage] = useState<Image | null>(null);

  const [addNewCrimeGroup, setAddNewCrimeGroup] = useState(false);
  const [addExistingCrimeGroup, setAddExistingCrimeGroup] = useState(false);
  const [editCrimeGroupId, setEditCrimeGroupId] = useState<string>('');
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);

  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState<string>('');
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    if (editedOffender) {
      setOffendersData([
        ...(offendersData?.filter(({ id }) => id !== editedOffender.id) || []),
        {
          ...editedOffender,
        },
      ]);
      setEditedOffender(undefined);
    }
  }, [editedOffender]);

  useEffect(() => {
    if (businesses.length > 0)
      form.setFieldsValue({
        business: {
          label: businesses[0].name,
          value: businesses[0].id,
        },
      });
  }, [businesses]);

  const navigate = useNavigate();

  // Query
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
      setIncidentsState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map((group) => group.id),
        },
        order,
      });
    },
  });

  const { data: addressData, loading: addressLoading } = useAddressesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        user: {
          id: {
            equals: userId,
          },
        },
      },
    },
  });

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: Model.Incident,
        },
      },
    },
  });

  const { data: listOffendersData } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
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

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersQuery({
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt: SortOrder.Desc,
        },
        take: 20,
        where: searchOffenders.length
          ? {
              name: {
                contains: searchOffenders,
                mode: QueryMode.Insensitive,
              },
            }
          : undefined,
      },
    });

  // update mutation
  // update tag list after adding a new item
  const updateIncidentTag: MutationUpdaterFn<CreateTagMutation> = (
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
            equals: Model.Incident,
          },
        },
      },
    });

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
            equals: Model.Incident,
          },
        },
      },
    });
  };
  // update incident list after adding a new item
  const updateIncident: MutationUpdaterFn<CreateIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.createIncident === null || res.createIncident === undefined) return;
    // get existing group list data from Apollo store
    const existingData = store.readQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });

    if (existingData === null) return;
    if (existingData?.listIncidents?.incidents === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      data: {
        listIncidents: {
          ...existingData.listIncidents,
          incidents:
            existingData?.listIncidents?.incidents &&
            existingData.listIncidents.incidents.length
              ? existingData?.listIncidents?.incidents.concat(
                  res.createIncident
                )
              : [res.createIncident],
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

  // mutation
  const [createIncident] = useCreateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Added!',
        description: 'The Incident has been added!',
        placement: 'bottomRight',
      });
      navigate(`/app/incidents`);
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateIncident,
  });

  // functions
  const toggleAddIncidentTag = () => {
    setAddIncidentTag(!addIncidentTag);
  };

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
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
  const updateOffendersData = (offender: OffenderData) => {
    setOffendersData([...offendersData, offender]);
  };

  const updateOffender = (offender: OffenderData) => {
    setEditedOffender(offender);
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

  const removeOffender = (offenderId: string) => {
    setOffendersData(
      offendersData?.filter((offender) => offender.id !== offenderId)
    );
  };
  const removeVehicle = (vehicleId: string) => {
    setVehiclesData(
      vehiclesData?.filter((vehicle) => vehicle.id !== vehicleId)
    );
  };
  const removeCrimeGroup = (crimeGroupId: string) => {
    setCrimeGroupsData(
      crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
    );
  };
  const removeImage = (uid: string) => {
    setFileList(fileList.filter((image) => image.uid !== uid));
  };
  const setAssignToImage = (image: Image) => {
    setNewImage(image);
  };

  const isOffenderData = (
    item: OffenderData | undefined
  ): item is OffenderData => !!item;

  const assignOffendersToImages = (data: {
    image: Image;
    offenders: OffenderData[];
  }) => {
    if (offendersData) {
      const changedOffendersIds = data.offenders.map(({ id }) => id);
      const originalOffendersIds = offendersData.map(({ id }) => id);
      const originalImageOffendersIds =
        fileList
          .find(({ uid }) => uid === data.image.uid)
          ?.offenders?.map(({ id }) => id) || [];
      const updatedOffenders = offendersData
        .map((offender) => {
          if (changedOffendersIds.includes(offender.id))
            return data.offenders.find(({ id }) => id === offender.id);
          if (originalImageOffendersIds.includes(offender.id))
            return {
              ...offender,
              images: offender.images?.filter(
                ({ id }) => id !== data.image.uid
              ),
            };
          return offender;
        })
        .filter(isOffenderData);
      const newOffenders = data.offenders.filter(
        (offender) => !originalOffendersIds.includes(offender.id)
      );
      setOffendersData([...updatedOffenders, ...newOffenders]);
    }

    // find index of file in fileList array
    const fileIndex = fileList.map(({ uid }) => uid).indexOf(data.image.uid);
    // update the file object in the array with the new value, update will replace value in same place in array
    setFileList(
      update(fileList, {
        [fileIndex]: {
          $set: data.image,
        },
      })
    );
    setNewImage(null);
  };
  const offenderImgChange = (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => {
    if (info.file.response) {
      const currentOffender = offendersData.filter(
        ({ id }) => id === currentId
      );

      if (currentOffender) {
        assignOffendersToImages({
          image: {
            ...info.file,
            url: info.file.response[0].url,
            fileName: info.file.response[0].blobName,
            type: info.file.response[0].mimetype,
            uid: info.file.uid,
            offenders: currentOffender,
          },
          offenders: currentOffender.map((offender) => {
            let images: OffenderData['images'] = [];
            if (offender.images) images = offender.images;
            return {
              ...offender,
              images: [
                ...images,
                {
                  id: info.file.uid,
                  new: true,
                  optimised: info.file.response[0].url,
                  url: info.file.response[0].url,
                  fileName: info.file.response[0].blobName,
                  type: info.file.response[0].mimetype,
                },
              ],
            };
          }),
        });
      }
      setImageChange(true);
    } else {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.fileList[0].url,
          fileName: info.fileList[0].fileName,
          type: info.fileList[0].type,
        },
      ]);
      setImageChange(true);
    }
  };
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
    if (info.file.response) {
      setNewImage({
        ...info.file,
        url: info.file.response[0].url,
        fileName: info.file.response[0].blobName,
        type: info.file.response[0].mimetype,
      });
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
  };

  const onCancelNewImage = () => {
    setNewImage(null);
  };

  const removeImageFromOffender = (data: {
    image: Image;
    offenderId: string;
  }) => {
    // find index of file in fileList array
    const fileIndex = fileList.map(({ uid }) => uid).indexOf(data.image.uid);
    // update the file object in the array with the new value, update will replace value in same place in array
    setFileList(
      update(fileList, {
        [fileIndex]: {
          $set: {
            ...data.image,
            offenders: data.image.offenders?.filter(
              ({ id }) => id !== data.offenderId
            ),
          },
        },
      })
    );

    if (offendersData) {
      // find index of file in fileList array
      const offenderIndex = offendersData
        .map(({ id }) => id)
        .indexOf(data.offenderId);
      const offender = offendersData.find(({ id }) => data.offenderId === id);
      if (offender && offender.images)
        setOffendersData(
          update(offendersData, {
            [offenderIndex]: {
              $set: {
                ...offender,
                images: offender.images.filter(
                  ({ id }) => id !== data.image.uid
                ),
              },
            },
          })
        );
    }
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (!offendersData) {
      confirm({
        title: 'No Offenders',
        content: 'Please select or add at least one offender for the incident.',
        cancelText: 'Find Offenders',
        onCancel() {
          toggleAddExistingOffender();
        },
        okText: 'Add New Offender',
        onOk() {
          toggleAddOffender();
        },
      });
      setSaving(false);
    } else {
      const getOffenders = (): CreateIncidentData['offenders'] => {
        if (offendersData && listOffendersData?.listOffenders) {
          const offendersIds = listOffendersData.listOffenders.offenders.map(
            (offender) => offender.id
          );
          const existingOffenders = offendersData.filter((item) =>
            offendersIds.includes(item.id)
          );
          const existingOffendersWithImages = existingOffenders
            .filter((offender) =>
              offender.images?.map((image) => image.new).includes(true)
            )
            .map((offender) => ({
              ...offender,
              images: offender.images?.filter((image) => image.new),
            }));
          const newOffenders = offendersData.filter(
            (item) => !offendersIds.includes(item.id)
          );

          return {
            connect: existingOffenders.length
              ? existingOffenders.map((offender) => ({ id: offender.id }))
              : undefined,
            update: existingOffendersWithImages.map((offender) => ({
              where: { id: offender.id },
              data: {
                images:
                  offender.images && offender.images.length
                    ? {
                        upload: offender.images?.map((image) => ({
                          url: {
                            filename: image.fileName || '',
                            mimetype: image.type || '',
                            url: image.url || '',
                          },
                        })),
                      }
                    : {},
              },
            })),
            create: newOffenders.length
              ? newOffenders.map((offender) => ({
                  name: offender.name || 'Unidentified Offender',
                  gender: offender.gender || null,
                  race: offender.race || null,
                  build: offender.build || null,
                  hair: offender.hair || null,
                  peculiarities: offender.peculiarities || null,
                  age: offender.age || null,
                  dateSource: offender.dateSource || null,
                  dateOfBirth: offender.dateOfBirth || null,
                  groups: {
                    connect:
                      groups.length > 1
                        ? data.groups.map((id) => ({ id }))
                        : groups.map(({ id }) => ({ id })),
                  },
                  // groups.length > 1
                  //   ? { connect: data.groups.map((id) => ({ id })) }
                  //   : { connect: groups.map(({ id }) => ({ id })) },
                  scheme: { connect: { id: schemeId } },
                  createdBy: { connect: { id: userId } },
                  localId: offender.id,
                  images: {
                    // create:
                    upload: offender.images
                      ?.filter((image) => image.new === true)
                      .map((image) => ({
                        url: {
                          filename: image.fileName || '',
                          mimetype: image.type || '',
                          url: image.url || '',
                        },
                      })),
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
      const getVehicles = (): CreateIncidentData['vehicles'] => {
        if (vehiclesData && listVehiclesData?.listVehicles) {
          const vehiclesIds = listVehiclesData.listVehicles.vehicles.map(
            (vehicle) => vehicle.id
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
            connect: existingVehicles.length
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
                  vehicle.crimeGroup && vehicle.crimeGroup.length
                    ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                    : undefined,
                incidents:
                  vehicle.incidents && vehicle.incidents
                    ? { connect: vehicle.incidents.map((id) => ({ id })) }
                    : undefined,
                offenders:
                  vehicle.offenders && vehicle.offenders.length
                    ? { connect: vehicle.offenders.map((id) => ({ id })) }
                    : undefined,
              },
            })),

            create: newVehicles.length
              ? newVehicles.map((vehicle) => ({
                  make: vehicle.make,
                  model: vehicle.model,
                  colour: vehicle.colour,
                  registration: vehicle.registration,
                  crimeGroup:
                    vehicle.crimeGroup && vehicle.crimeGroup.length
                      ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                      : undefined,
                  offenders:
                    vehicle.offenders && vehicle.offenders.length
                      ? { connect: vehicle.offenders.map((id) => ({ id })) }
                      : undefined,
                }))
              : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
      const getCrimeGroups = (): CreateIncidentData['crimeGroups'] => {
        if (crimeGroupsData && listCrimeGroupsData?.listCrimeGroups) {
          const crimeGroupsIds =
            listCrimeGroupsData.listCrimeGroups.crimeGroups.map(
              (crimeGroup) => crimeGroup.id
            );

          const newCrimeGroups = crimeGroupsData.filter(
            (item) => !crimeGroupsIds.includes(item.id)
          );

          const existingCrimeGroups = crimeGroupsData.filter((item) =>
            crimeGroupsIds.includes(item.id)
          );

          return {
            connect: existingCrimeGroups.length
              ? existingCrimeGroups.map(({ id }) => ({ id }))
              : undefined,

            create: newCrimeGroups.length
              ? newCrimeGroups.map((crimeGroup) => ({
                  offenders: {
                    connect: crimeGroup.offenders?.map((id) => ({ id })),
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
      createIncident({
        variables: {
          data: {
            subject: data.subject,
            description: data.description,
            date: data.date,
            time: data.date,
            business: {
              id: data.business.value,
            },
            value: data.value || null,
            recoveredValue: data.recoveredValue || null,
            policeInvolved: data.policeInvolved,
            policeRef: data.policeRef,
            policeReported: data.policeReported,
            groups:
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ id }) => ({ id })),
            scheme: schemeId,
            crimeTypes: data.tags.length
              ? data.tags.map((id) => ({ id }))
              : undefined,
            offenders: getOffenders(),
            vehicles: getVehicles(),
            crimeGroups: getCrimeGroups(),
            images: {
              create:
                imageChange && fileList.length
                  ? fileList
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined)
                  : undefined,
            },
          },
        },
      });
    }
  };

  const onSearchBusiness = async (value: string) => {
    if (value.length < 2) {
      return [];
    }
    return client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: item?.name || '',
              value: item?.id || '',
            }))
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );
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
    primaryAddress: addressData?.addresses.find(({ primary }) => primary),
    addressLoading,
    imgChange,
    fileList,
    beforeUpload,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffendersData,
    offendersData,
    form,
    recentOffenderData,
    recentOffenderLoading,
    addRecentOffender,
    setAddRecentOffender,
    searchOffenders,
    setSearchOffenders,
    newImage,
    onCancelNewImage,
    assignOffendersToImages,
    setAssignToImage,
    removeImageFromOffender,
    removeImage,
    removeOffender,
    listOffendersData,
    adminRights: role !== Role.User,
    offenderImgChange,
    editOffenderId,
    setEditOffenderId,
    updateOffender,
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
    listCrimeGroupsData,
    onSearchBusiness,
  };
};

export default useEditIncident;
