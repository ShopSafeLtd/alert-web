import { useState } from 'react';
import {
  useSchemeGroupsQuery,
  Role,
  useTagsQuery,
  Model,
  CreateTagMutation,
  TagsQuery,
  TagsDocument,
  Age,
  Gender,
  Race,
  Build,
  useCreateIncidentMutation,
  CreateIncidentMutation,
  ListIncidentsDocument,
  ListIncidentsQuery,
  useListOffendersQuery,
  useAddressesQuery,
  AddressesQuery,
  SortOrder,
  ListOffendersQuery,
  QueryMode,
  CreatIncidentData,
} from 'graphql/generated';
import { LocationOptions } from 'types/enums';
import { notification, Modal, Form, FormInstance, Upload, message } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import update from 'immutability-helper';
import { UploadChangeParam } from 'antd/lib/upload';

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
  fullAddress: string;
  groups: string[];
  tags: string[];
  images?: { id: string; url: string; optimised: string }[];
}

interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

interface LocationData {
  building?: string | null;
  street: string;
  townCity: string;
  county?: string | null;
  postcode: string;
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
  updateOffendersList: (value: OffenderData) => void;
  offendersData: OffenderData[];
  deleteConfirm: (value: string | undefined) => void;
  addPreviousLocation: boolean;
  toggleAddPreviousLocation: () => void;
  updatePreviousLocation: (value: string | undefined) => void;
  addNewLocation: boolean;
  toggleAddNewLocation: () => void;
  updateNewLocation: (value: LocationData | undefined) => void;
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
}

const useEditIncident = (): Return => {
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  const [saving, setSaving] = useState(false);

  const [addIncidentTag, setAddIncidentTag] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [addRecentOffender, setAddRecentOffender] = useState<Offender | null>(
    null
  );
  const [searchOffenders, setSearchOffenders] = useState<string>('');
  const [addExistingOffender, setAddExistingOffender] = useState(false);

  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [newImage, setNewImage] = useState<Image | null>(null);
  const [option, setOption] = useState<LocationOptions>(
    LocationOptions.ACCOUNT
  );
  const [newLocation, setNewLocation] = useState<LocationData | undefined>();
  const [previousId, setPreviousId] = useState<string>('');
  const [addNewLocation, setAddNewLocation] = useState(false);
  const [addPreviousLocation, setAddPreviousLocation] = useState(false);

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

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersQuery({
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt: SortOrder.Asc,
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
  const toggleAddPreviousLocation = () => {
    setAddPreviousLocation(!addPreviousLocation);
  };
  const toggleAddNewLocation = () => {
    setAddNewLocation(!addNewLocation);
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

  const updatePreviousLocation = (value: string | undefined) => {
    if (value) {
      setOption(LocationOptions.PREVIOUS);
      setPreviousId(value);
      const previousLocation = addressData?.addresses.find(
        (location) => location.id === value
      )?.full;
      if (previousLocation) {
        form.setFieldsValue({
          fullAddress: previousLocation,
        });
      }
    }
  };

  const updateNewLocation = (value: LocationData | undefined) => {
    if (value) {
      setOption(LocationOptions.NEW);
      setNewLocation(value);
      form.setFieldsValue({
        fullAddress: `${value.building ? `${value.building}, ` : ''}  ${
          value?.street
        }, ${value?.townCity}, ${value.county ? `${value.county}, ` : ''}${
          value?.postcode
        }`,
      });
    }
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    setOffendersData([...offendersData, selectedOffender]);
  };

  const deleteConfirm = (offenderId: string | undefined) => {
    confirm({
      title: 'Are you sure?',
      content:
        'Are you sure you want to remove the offender from this incident?',
      onOk() {
        setOffendersData(
          offendersData?.filter((offender) => offender.id !== offenderId)
        );
      },
      okText: 'Remove Offender',
    });
  };

  const [createIncident] = useCreateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Added!',
        description: 'The Incident has been added!',
        placement: 'bottomRight',
      });
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
      const getLocation = (): CreatIncidentData['location'] => {
        if (option === LocationOptions.ACCOUNT) {
          const location = addressData?.addresses.find(
            ({ primary }) => primary
          );
          return {
            account: true,
            create: location
              ? {
                  building: location.building || null,
                  street: location.street,
                  townCity: location.townCity,
                  county: location.county || null,
                  postcode: location.postcode,
                }
              : undefined,
          };
        }
        if (option === LocationOptions.NEW && newLocation) {
          return {
            account: false,
            create: {
              building: newLocation.building || null,
              street: newLocation.street,
              townCity: newLocation.townCity,
              county: newLocation.county || null,
              postcode: newLocation.postcode,
            },
          };
        }

        return {
          account: false,
          previous: { id: previousId },
        };
      };
      const getOffenders = (): CreatIncidentData['offenders'] => {
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

      createIncident({
        variables: {
          data: {
            subject: data.subject,
            description: data.description,
            date: data.date,
            time: data.date,
            value: data.value || null,
            recoveredValue: data.recoveredValue || null,
            groups:
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ id }) => ({ id })),
            scheme: schemeId,
            crimeTypes: data.tags.length
              ? data.tags.map((id) => ({ id }))
              : undefined,
            location: getLocation(),
            offenders: getOffenders(),
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

  const onCancelNewImage = () => {
    setNewImage(null);
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

  const removeImage = (uid: string) => {
    setFileList(fileList.filter((image) => image.uid !== uid));
  };

  const removeOffender = (offenderId: string) => {
    setOffendersData(
      offendersData?.filter((offender) => offender.id !== offenderId)
    );
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
    updateOffendersList,
    offendersData,
    deleteConfirm,
    addPreviousLocation,
    toggleAddPreviousLocation,
    updatePreviousLocation,
    addNewLocation,
    toggleAddNewLocation,
    updateNewLocation,
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
  };
};

export default useEditIncident;
