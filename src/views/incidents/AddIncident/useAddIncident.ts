import { useEffect, useState } from 'react';
import {
  AddressesQuery,
  CreateIncidentData,
  CreateIncidentMutation,
  CreateTagMutation,
  CrimeType,
  ListGoodsTypesQuery,
  ListIncidentsDocument,
  ListIncidentsQuery,
  ListOffendersQuery,
  Model,
  QueryMode,
  Role,
  SearchBusinessesDocument,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  SortOrder,
  TagsDocument,
  TagsQuery,
  TagType,
  useAddressesQuery,
  useCreateIncidentMutation,
  useListCrimeGroupsQuery,
  useListGoodsTypesQuery,
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
import moment from 'moment';

const { confirm } = Modal;
const { useForm } = Form;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  policeNo?: string;
  business: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tags: string[];
  images?: { id: string; url: string; optimised: string }[];
  goods: {
    goodsType?: string;
    value?: number;
    recoveredValue: number;
  }[];
  profiles: OffenderData[];
  involvedTags: [];
  fellingTags: [];
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}

interface Return {
  addIncidentTag: boolean;
  addressLoading: boolean;
  adminRights: boolean;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  fileList: Image[];
  form: FormInstance<FormData>;
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  isTheft: boolean;
  newImage: Image | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeCrimeGroup: (crimeGroupId: string) => void;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAssignToImage: (image: Image) => void;
  setSearchOffenders: (value: string) => void;
  tags: { value: string; label: string; tooltip: string; type: TagType }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  updateOffender: (value: OffenderData) => void;
  updateOffendersData: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
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

  const [addIncidentTag, setAddIncidentTag] = useState(false);

  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);

  const [editedOffender, setEditedOffender] = useState<
    OffenderData | undefined
  >();
  const [formStages, setFormStages] = useState({
    crimeTypes: true,
    where: false,
    goods: false,
    profiles: false,
    images: false,
    police: false,
    details: false,
    groups: false,
  });
  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [isTheft, setIsTheft] = useState(false);
  const [newImage, setNewImage] = useState<Image | null>(null);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [saving, setSaving] = useState(false);
  const [searchOffenders, setSearchOffenders] = useState<string>('');
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

  const { data: goodsTypesData } = useListGoodsTypesQuery({
    fetchPolicy: 'cache-and-network',
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

  const updateOffendersData = (offender: OffenderData) => {
    setOffendersData([...offendersData, offender]);
    if (offender.id.length === 3 && offender.images) {
      setFileList([
        ...fileList,
        ...offender.images.map(
          (image): Image => ({
            ...image,
            uid: image.id,
            name: image.fileName || '',
            fileName: image.fileName || '',
            url: image.url || '',
            type: image.type || '',
            offenders: [offender],
          })
        ),
      ]);
    }
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
        okText: 'Add New Offender',
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
            items: data.goods
              ?.filter((item) => item.goodsType !== undefined)
              .map((item) => ({
                goodsType: {
                  id: item.goodsType,
                },
                name:
                  goodsTypesData?.listGoodsTypes.goodsTypes.find(
                    ({ id }) => id === item.goodsType
                  )?.name || '',
                value: item.value || 0,
                recoveredValue: item.recoveredValue || 0,
              })),
            policeInvolved: data.policeInvolved,
            policeRef: data.policeRef,
            policeNo: data.policeNo,
            policeReported: data.policeReported,
            groups:
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ id }) => ({ id })),
            scheme: schemeId,
            crimeTypes: [
              ...data.tags.map((id) => ({ id })),
              ...data.involvedTags.map((id) => ({ id })),
              ...data.fellingTags.map((id) => ({ id })),
            ],
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

  const onValuesChange = (changedValues: FormData, values: FormData) => {
    // when tags are set enable the next form steps
    if (changedValues.tags) {
      const tags = changedValues.tags
        .map((id) => tagsData?.tags.find((tag) => tag.id === id))
        .map((tag) => tag?.crimeType || CrimeType.Other);
      const theft = tags.includes(CrimeType.TheftHandling);

      // enable goods if type is theft
      if (theft && !values.goods) {
        setIsTheft(true);
        form.setFieldsValue({
          goods: [
            {
              goodsType: undefined,
              recoveredValue: 0,
              value: undefined,
            },
            {
              goodsType: undefined,
              recoveredValue: 0,
              value: undefined,
            },
          ],
        });
      }

      setFormStages({
        ...formStages,
        where: true,
        goods: true,
        profiles: formStages.profiles ? true : !theft,
      });
    }

    // add new line to goods table if all have a goodsType
    if (changedValues.goods) {
      if (
        changedValues.goods
          .map((item) => item?.goodsType !== undefined)
          .includes(true) &&
        !values.goods
          .map((item) => item?.goodsType !== undefined)
          .includes(false)
      ) {
        form.setFieldsValue({
          goods: [
            ...form.getFieldValue('goods'),
            {
              goodsType: undefined,
              recoveredValue: 0,
              value: undefined,
            },
          ],
        });
      }
    }

    // enable profiles when goods is completed
    if (changedValues.goods)
      if (
        values.goods
          .map((item) => {
            if (
              item.goodsType !== undefined &&
              item.recoveredValue !== undefined &&
              item.value !== undefined
            )
              return true;
            return false;
          })
          .includes(true) &&
        !formStages.profiles
      ) {
        setFormStages({
          ...formStages,
          profiles: true,
        });
      }

    // enable fields when profile is added
    if (changedValues.profiles && !formStages.images) {
      setFormStages({
        ...formStages,
        images: true,
        police: true,
        details: true,
        groups: true,
      });
    }

    // build description as data is completed
    const tags = values.tags
      .map((id) => tagsData?.tags.find((tag) => tag.id === id))
      .map((tag) => tag?.name || '');
    const offenders = values.profiles || [];
    const unknownOffenders =
      (values.profiles &&
        values.profiles.filter(
          (item) => item.name === 'Unidentified Offender'
        )) ||
      [];
    const knownOffenders =
      (values.profiles &&
        values.profiles.filter(
          (item) => item.name !== 'Unidentified Offender'
        )) ||
      [];

    form.setFieldsValue({
      description: `An incident of ${tags
        .map((tag, index) => `${index > 0 ? ' ' : ''}${tag}`)
        .toString()} occurred at ${values.business.label} at ${moment(
        values.date
      ).format('HH:mm')} on ${moment(values.date).format(
        'dddd Do MMMM YYYY'
      )}. ${
        tags.includes('Theft & Handling')
          ? `The goods lost in this incident total £${
              values.goods
                .filter((item) => {
                  if (
                    item.goodsType !== undefined &&
                    item.recoveredValue !== undefined &&
                    item.value !== undefined
                  )
                    return true;
                  return false;
                })
                .map((item) => item.value)
                .reduce((a, b) => (a || 0) + (b || 0))
                ?.toFixed(2) || 0
            } of which a value of £${values.goods
              .filter((item) => {
                if (
                  item.goodsType !== undefined &&
                  item.recoveredValue !== undefined &&
                  item.value !== undefined
                )
                  return true;
                return false;
              })
              .map((item) => item.recoveredValue)
              .reduce((a, b) => (a || 0) + (b || 0))
              .toFixed(2)} was recovered.`
          : ''
      } ${
        offenders.length > 0
          ? `The incident involved ${
              offenders.length > 1
                ? `${offenders.length} offenders`
                : `${offenders.length} offender`
            }, ${
              knownOffenders.length > 0
                ? ` ${knownOffenders.map(
                    (item, index) => `${index > 1 ? ' ' : ''}${item.name}`
                  )}${unknownOffenders.length > 0 ? ' and' : '.'}`
                : ''
            } ${
              unknownOffenders.length > 0
                ? `${unknownOffenders.length} unidentified offender${
                    unknownOffenders.length > 1 ? 's.' : '.'
                  }`
                : ''
            }`
          : ''
      }`,
    });
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
      tagsData?.tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
        tooltip: tag.description,
        type: tag.type,
      })) || [],
    tagsLoading,
    primaryAddress: addressData?.addresses.find(({ primary }) => primary),
    addressLoading,
    imgChange,
    fileList,
    beforeUpload,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    updateOffendersData,
    offendersData,
    form,
    recentOffenderData,
    recentOffenderLoading,
    searchOffenders,
    setSearchOffenders,
    newImage,
    onCancelNewImage,
    assignOffendersToImages,
    setAssignToImage,
    removeImageFromOffender,
    removeImage,
    removeOffender,
    adminRights: role !== Role.User,
    offenderImgChange,
    updateOffender,
    vehiclesData,
    updateVehiclesData,
    removeVehicle,
    crimeGroupsData,
    updateCrimeGroupsData,
    removeCrimeGroup,
    onSearchBusiness,
    formStages,
    onValuesChange,
    isTheft,
    goodsTypesData,
  };
};

export default useEditIncident;
