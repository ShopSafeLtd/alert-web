import type { MutationUpdaterFn } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, message, Modal, notification, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import type {
  AddressesQuery,
  CreateIncidentData,
  CreateIncidentMutation,
  CreateTagMutation,
  ListGoodsTypesQuery,
  ListIncidentsQuery,
  ListOffendersQuery,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  TagsQuery,
  TagType,
} from 'graphql/generated';
import {
  CrimeType,
  ListIncidentsDocument,
  Model,
  QueryMode,
  Role,
  SearchBusinessesDocument,
  SortOrder,
  TagsDocument,
  useAddressesQuery,
  useCreateIncidentMutation,
  useListGoodsTypesQuery,
  useListOffendersQuery,
  useListVehiclesQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import update from 'immutability-helper';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import type {
  LocationData,
  OffenderData as GlobalOffenderData,
  VehicleData,
} from 'types/DataType';

const { confirm } = Modal;
const { useForm } = Form;

interface OffenderData extends GlobalOffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
}

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
    new?: boolean;
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
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  onAddOffender: (value: GlobalOffenderData, existing: boolean) => void;
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
  addNewAddress: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
  newAddressData: LocationData | undefined;
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
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
  const [goodsVisible, setGoodsVisible] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [newAddressData, setNewAddressData] = useState<LocationData>();

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
  const [descriptionPristine, setDescriptionPristine] = useState(true);
  const [newImage, setNewImage] = useState<Image | null>(null);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [saving, setSaving] = useState(false);
  const [searchOffenders, setSearchOffenders] = useState<string>('');
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    if (businesses.length > 0) {
      form.setFieldsValue({
        business: {
          label: businesses[0].name,
          value: businesses[0].id,
        },
      });
    }
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
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        dataType: {
          equals: Model.Incident,
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
        where:
          searchOffenders.length > 0
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
            existingData.listIncidents.incidents.length > 0
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                [...existingData?.listIncidents?.incidents, res.createIncident]
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
      navigate('/app/incidents');
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
  const toggleAddNewAddress = () => {
    setAddNewAddress(!addNewAddress);
  };
  const toggleAddIncidentTag = () => {
    setAddIncidentTag(!addIncidentTag);
  };
  const updateNewAddressData = (address: LocationData | undefined) =>
    setNewAddressData(address);

  const onAddOffender = (offender: GlobalOffenderData, existing: boolean) => {
    setOffendersData([
      ...offendersData,
      {
        ...offender,
        edited: false,
        existing,
        new: !existing,
      },
    ]);
    if (offender.id.length === 3 && offender.images) {
      setImageChange(true);
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
            offenders: [
              {
                id: offender.id,
                name: offender.name,
                new: true,
              },
            ],
          })
        ),
      ]);
    }
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
      const changedOffendersIds = new Set(data.offenders.map(({ id }) => id));
      const originalOffendersIds = new Set(offendersData.map(({ id }) => id));
      const originalImageOffendersIds =
        fileList
          .find(({ uid }) => uid === data.image.uid)
          ?.offenders?.map(({ id }) => id) || [];
      const updatedOffenders = offendersData
        .map((offender) => {
          if (changedOffendersIds.has(offender.id))
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
        (offender) => !originalOffendersIds.has(offender.id)
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
    if (offendersData) {
      const getOffenders = (): CreateIncidentData['offenders'] => {
        if (offendersData) {
          const existingOffenders = offendersData.filter(
            (item) => item.existing
          );
          const newOffenders = offendersData.filter((item) => item.new);

          return {
            connect:
              existingOffenders.length > 0
                ? existingOffenders.map((offender) => ({ id: offender.id }))
                : undefined,
            create:
              newOffenders.length > 0
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
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups.map((id) => ({ id })),
                    },
                    scheme: { connect: { id: schemeId } },
                    createdBy: { connect: { id: userId } },
                    localId: offender.id,
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
        const vehiclesIds = new Set(
          listVehiclesData?.listVehicles.vehicles.map((vehicle) => vehicle.id)
        );

        const newVehicles = vehiclesData.filter(
          (item) => !vehiclesIds.has(item.id)
        );

        const existingVehicles = vehiclesData.filter((item) =>
          vehiclesIds.has(item.id)
        );
        const editedVehicles = existingVehicles.filter(
          ({ edited }) => edited === true
        );
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
                  offenders:
                    vehicle.offenders && vehicle.offenders.length > 0
                      ? { connect: vehicle.offenders.map((id) => ({ id })) }
                      : undefined,
                }))
              : undefined,
        };
      };
      const getLocation = (): CreateIncidentData['location'] => {
        if (newAddressData) {
          return {
            create: {
              building: newAddressData.building,
              county: newAddressData.county,
              postcode: newAddressData.postcode,
              street: newAddressData.street,
              townCity: newAddressData.townCity,
            },
          };
        }
        return {
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
              groupData?.groups && groupData.groups.length === 1
                ? groupData?.groups.map(({ id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
            scheme: schemeId,
            crimeTypes: [
              ...data.tags.map((id) => ({ id })),
              ...data.involvedTags.map((id) => ({ id })),
              ...data.fellingTags.map((id) => ({ id })),
            ],
            offenders: getOffenders(),
            vehicles: getVehicles(),
            crimeGroups: {},
            images: {
              create:
                imageChange && fileList.length > 0
                  ? fileList
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                        offenders: item.offenders?.map((offender) => ({
                          id: offender.id,
                          new: offender.new || false,
                        })),
                      }))
                      .filter((object) => object.url !== undefined)
                  : undefined,
            },
            location: getLocation(),
          },
        },
      });
    } else {
      confirm({
        title: 'No Offenders',
        content: 'Please select or add at least one offender for the incident.',
        cancelText: 'Find Offenders',
        okText: 'Add New Offender',
      });
      setSaving(false);
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
        response.data.listBusinesses.businesses.length > 0
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
              goodsType:
                goodsTypesData?.listGoodsTypes.goodsTypes.find(
                  (item) => item.name === 'Unknown'
                )?.id || undefined,
              recoveredValue: 0,
              value: 0,
            },
          ],
        });
      }
    }

    if (
      values.fellingTags &&
      values.tags &&
      values.tags.length > 0 &&
      values.involvedTags &&
      values.involvedTags.length > 0
    ) {
      const tags = values.tags
        .map((id) => tagsData?.tags.find((tag) => tag.id === id))
        .map((tag) => tag?.crimeType || CrimeType.Other);
      const theft = tags.includes(CrimeType.TheftHandling);
      setFormStages({
        ...formStages,
        where: true,
        goods: true,
        profiles: formStages.profiles ? true : !theft,
      });
    }

    // add new line to goods table if all have a goodsType
    if (
      changedValues.goods &&
      changedValues.goods
        .map((item) => item?.goodsType !== undefined)
        .includes(true) &&
      !values.goods.map((item) => item?.goodsType !== undefined).includes(false)
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

    // enable profiles when goods is completed
    if (
      changedValues.goods &&
      values.goods
        .map(
          (item) =>
            item.goodsType !== undefined &&
            item.recoveredValue !== undefined &&
            item.value !== undefined
        )
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

    if (changedValues.description) {
      setDescriptionPristine(false);
    }

    if (descriptionPristine) {
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
                  .filter(
                    (item) =>
                      item.goodsType !== undefined &&
                      item.recoveredValue !== undefined &&
                      item.value !== undefined
                  )
                  .map((item) => item.value)
                  .reduce((a, b) => (a || 0) + (b || 0))
                  ?.toFixed(2) || 0
              } of which a value of £${values.goods
                .filter(
                  (item) =>
                    item.goodsType !== undefined &&
                    item.recoveredValue !== undefined &&
                    item.value !== undefined
                )
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
    }
  };

  const dontKnowGoods = () => {
    setGoodsVisible(true);
    setFormStages({
      ...formStages,
      profiles: true,
    });
  };

  const knowGoods = () => {
    setGoodsVisible(true);
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
    onAddOffender,
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
    vehiclesData,
    updateVehiclesData,
    removeVehicle,
    onSearchBusiness,
    formStages,
    onValuesChange,
    isTheft,
    goodsTypesData,
    addNewAddress,
    toggleAddNewAddress,
    updateNewAddressData,
    newAddressData,
    dontKnowGoods,
    goodsVisible,
    knowGoods,
  };
};

export default useEditIncident;
