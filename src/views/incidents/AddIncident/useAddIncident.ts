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
  useUpdateOffenderMutation,
} from 'graphql/generated';
import { LocationOptions } from 'utils/enums/LocationOptions';
import { notification, Modal, Form, FormInstance, Upload, message } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import { Moment } from 'moment';

const { confirm } = Modal;
const { useForm } = Form;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  time: Moment;
  fullAddress: string;
  groups: string[];
  tags: string[];
  images: { id: string; url: string; optimised: string }[];
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
  fileList: UploadFile[];
  beforeUpload: (value: RcFile) => void;
  addIncidentTag: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: OffenderData[] | undefined) => void;
  offendersData: OffenderData[] | undefined;
  deleteConfirm: (value: string | undefined) => void;
  addPreviousLocation: boolean;
  toggleAddPreviousLocation: () => void;
  updatePreviousLocation: (value: string | undefined) => void;
  addNewLocation: boolean;
  toggleAddNewLocation: () => void;
  updateNewLocation: (value: LocationData | undefined) => void;
  assignImage: boolean;
  toggleAssignImage: () => void;
  updateAssignImage: (value: string[] | undefined) => void;
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
  const [addExistingOffender, setAddExistingOffender] = useState(false);

  const [offendersData, setOffendersData] = useState<
    OffenderData[] | undefined
  >([]);

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileUid, setFileUid] = useState<string | undefined>();

  const [option, setOption] = useState<LocationOptions>(
    LocationOptions.ACCOUNT
  );
  const [newLocation, setNewLocation] = useState<LocationData | undefined>();
  const [previousId, setPreviousId] = useState<string>('');
  const [addNewLocation, setAddNewLocation] = useState(false);
  const [addPreviousLocation, setAddPreviousLocation] = useState(false);
  const [assignImage, setAssignImage] = useState(false);

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
  const { data: ListOffendersData } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
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
  const toggleAssignImage = () => {
    setAssignImage(!assignImage);
  };
  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      message.error(
        'This image has already existed, please choose another one.'
      );
    }
    if (offendersData && offendersData.length > 0) {
      confirm({
        title: 'Assign Offenders',
        content:
          'Do you Want to assign this image to any offenders shown in them?',
        okText: 'Yes',
        onOk() {
          setFileUid(file.uid);
          toggleAssignImage();
        },
      });
    }
    return !isFileDuplicate || Upload.LIST_IGNORE;
  };

  const imgChange: UploadProps['onChange'] = (info) => {
    setFileList([...info.fileList]);
    setImageChange(true);
  };

  // const onPreview = ()
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
        fullAddress: `${value.building && value.building}, ${value?.street},${
          value?.townCity
        },${value?.county && value?.county},${value?.postcode}`,
      });
    }
  };
  const updateOffenderList = (filterOffenders: OffenderData[] | undefined) => {
    if (filterOffenders) {
      if (offendersData && offendersData.length > 0) {
        setOffendersData(
          offendersData.concat(
            filterOffenders.filter(
              (item) =>
                !offendersData?.map((offender) => offender.id).includes(item.id)
            )
          )
        );
      } else setOffendersData(filterOffenders);
    }
  };
  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Assigned!',
        description: 'The image has been assigned to the offenders !',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const updateAssignImage = (value: string[] | undefined) => {
    if (value && value.length > 0 && fileUid && fileList) {
      value
        .filter((item) =>
          ListOffendersData?.listOffenders?.offenders
            ?.map((offender) => offender.id)
            .includes(item)
        )
        .map((id) =>
          updateOffender({
            variables: {
              where: {
                id,
              },
              data: {
                images: {
                  upload: [
                    {
                      file: fileList.find((file) => file.uid === fileUid)
                        ?.originFileObj,
                    },
                  ],
                },
              },
            },
          })
        );
      value
        .filter(
          (item) =>
            !ListOffendersData?.listOffenders?.offenders
              ?.map((offender) => offender.id)
              .includes(item)
        )
        .map((newOffenderId) =>
          setOffendersData(
            offendersData?.map((offender) => {
              if (offender.id === newOffenderId) {
                return {
                  ...offender,
                  imageUid:
                    offender.imageUid && offender.imageUid.length > 0
                      ? offender.imageUid.concat(fileUid)
                      : [fileUid],
                };
              }
              return offender;
            })
          )
        );
    }
  };

  const deleteConfirm = (offenderId: string | undefined) => {
    confirm({
      title: 'Do you want to delete the exclusion?',
      content: 'This action cannot be undone.',
      onOk() {
        setOffendersData(
          offendersData?.filter((offender) => offender.id !== offenderId)
        );
      },
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
      createIncident({
        variables: {
          data: {
            subject: data.subject,
            description: data.description,
            date: data.date,
            time: data.time,
            groups: data.groups.map((id) => ({ id })),
            scheme: schemeId,
            crimeTypes:
              data.tags.length > 0
                ? data.tags.map((id) => ({ id }))
                : undefined,
            location: {
              account: option === LocationOptions.ACCOUNT,
              create:
                newLocation && option === LocationOptions.NEW
                  ? {
                      building: newLocation.building || null,
                      street: newLocation.street,
                      townCity: newLocation.townCity,
                      county: newLocation.county || null,
                      postcode: newLocation.postcode,
                    }
                  : undefined,
              previous:
                previousId && option === LocationOptions.PREVIOUS
                  ? { id: previousId }
                  : undefined,
            },
            offenders: {
              connect:
                offendersData && offendersData.length > 0
                  ? offendersData
                      .filter((item) =>
                        ListOffendersData?.listOffenders?.offenders
                          ?.map((offender) => offender.id)
                          .includes(item.id)
                      )
                      .map((offender) => ({ id: offender.id }))
                  : undefined,
              create:
                offendersData && offendersData.length > 0
                  ? offendersData
                      .filter(
                        (item) =>
                          !ListOffendersData?.listOffenders?.offenders
                            ?.map((offender) => offender.id)
                            .includes(item.id)
                      )
                      .map((offender) => ({
                        name: offender.name || 'Unidentified Offender' || null,
                        gender: offender.gender || null,
                        race: offender.race || null,
                        build: offender.build || null,
                        hair: offender.hair || null,
                        peculiarities: offender.peculiarities || null,
                        age: offender.age || null,
                        dateSource: offender.dateSource || null,
                        dateOfBirth: offender.dateOfBirth || null,
                        groups:
                          offender.groups && offender.groups.length > 0
                            ? {
                                connect: offender.groups.map(({ id }) => ({
                                  id,
                                })),
                              }
                            : undefined,
                        scheme: { connect: { id: schemeId } },
                        createdBy: { connect: { id: userId } },
                        localId: offender.id,
                        images: {
                          // create:
                          upload: offender.imageUid?.map((uid) => ({
                            file: fileList.find((file) => file.uid === uid)
                              ?.originFileObj,
                          })),
                        },
                      }))
                  : undefined,
            },
            images: {
              create:
                imageChange && fileList.length > 0
                  ? fileList
                      .map((item) => ({
                        file: item.originFileObj,
                      }))
                      .filter((obj) => obj.file !== undefined)
                  : undefined,
            },
          },
        },
      });
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
        : groups
            .filter((group) => group.id === schemeId)
            .map((group) => ({ value: group.id, label: group.name })),
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
    updateOffenderList,
    offendersData,
    deleteConfirm,
    addPreviousLocation,
    toggleAddPreviousLocation,
    updatePreviousLocation,
    addNewLocation,
    toggleAddNewLocation,
    updateNewLocation,
    form,
    assignImage,
    toggleAssignImage,
    updateAssignImage,
  };
};

export default useEditIncident;
