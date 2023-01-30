import { useEffect, useState } from 'react';
import {
  Age,
  Build,
  CreateTagMutation,
  Gender,
  IncidentUpdateInput,
  ListOffendersQuery,
  Model,
  QueryMode,
  Race,
  Role,
  SortOrder,
  TagsDocument,
  TagsQuery,
  useListOffendersQuery,
  useRecycleIncidentMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateIncidentMutation,
  useViewIncidentQuery,
  ViewIncidentQuery,
} from 'graphql/generated';
import { message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import update from 'immutability-helper';
import { UploadChangeParam } from 'antd/lib/upload';

const { confirm } = Modal;

interface Props {
  incidentId: string;
  reviewed: boolean;
}

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
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
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
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
}

interface Return {
  onSubmit: (value: FormData) => void;
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  onPreview: (value: Image) => void;
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
  onReject: () => void;
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
  selected: string;
  setSelected: (value: string) => void;
  updateOffender: (value: OffenderData) => void;
}

const useEditIncident = ({ incidentId, reviewed }: Props): Return => {
  const navigate = useNavigate();
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
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [addRecentOffender, setAddRecentOffender] = useState<Offender | null>(
    null
  );
  const [searchOffenders, setSearchOffenders] = useState<string>('');
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [newImage, setNewImage] = useState<Image | null>(null);
  const [editedOffender, setEditedOffender] = useState<
    OffenderData | undefined
  >();
  const [selected, setSelected] = useState<string>('');

  const updateOffender = (offender: OffenderData) => {
    setEditedOffender(offender);
  };

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
  // Query
  const { data: incidentData, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },

    onCompleted: ({ incident }) => {
      if (incident?.offenders && incident.offenders.length) {
        setOffendersData(incident.offenders);
      }
      // imageList
      if (incident?.images && incident.images.length) {
        setFileList(
          incident?.images.map((image) => ({
            uid: `${image.id}`,
            name: `${image.id}.png`,
            status: 'done',
            url: `${image.url}`,
            optimised: `${image.optimised}`,
          }))
        );
      }
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
  // mutation
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

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: reviewed
          ? 'The Incident has been approved!'
          : 'The Incident has been updated!',
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
  });

  // delete incident
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      navigate(`/app/incidents`);
      notification.success({
        message: 'Successfully Rejected!',
        description:
          'The incident has been deleted from the feed and moved to the recycle bin.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const onReject = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Click reject if you wish to reject the approvement of this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Reject',
      onOk() {
        recycleIncident({
          variables: {
            where: { id: incidentId },
          },
        });
      },
    });
  };

  // functions
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
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const toggleAddIncidentTag = () => {
    setAddIncidentTag(!addIncidentTag);
  };
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    setOffendersData([...offendersData, selectedOffender]);
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
      const getOffenders = (): IncidentUpdateInput['offenders'] => {
        if (
          offendersData &&
          listOffendersData?.listOffenders &&
          incidentData?.incident
        ) {
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
          const deletedOffenders = incidentData?.incident?.offenders?.filter(
            (offender) =>
              !offendersData?.map((item) => item.id).includes(offender.id)
          );

          // const newOffenderImage = newOffenders?.map((offender) =>
          //   offender.images?.filter((image) => image.new === true)
          // );

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
                  groups: data.groups.length
                    ? { connect: data.groups.map((id) => ({ id })) }
                    : undefined,
                  scheme: { connect: { id: schemeId } },
                  createdBy: { connect: { id: userId } },
                  localId: offender.id,
                  images:
                    // newOffenderImage && newOffenderImage[0]
                    //   ? {
                    //       upload: {
                    //         url: {
                    //           filename: newOffenderImage[0].fileName || '',
                    //           mimetype: newOffenderImage.type || '',
                    //           url: newOffenderImage.url || '',
                    //         },
                    //       },
                    //     }
                    //   : {},
                    // upload: offender.images
                    //     ?.filter((image) => image.new === true)
                    //        .map((image) => ({
                    //       url: {
                    //         filename: image.fileName || '',
                    //         mimetype: image.type || '',
                    //         url: image.url || '',
                    //       },
                    //     })),
                    // },
                    offender?.images &&
                    offender.images.length &&
                    offender.images?.filter((image) => image.new === true)
                      ? {
                          upload: offender.images
                            ?.filter((image) => image.new === true)
                            .map((image) => ({
                              url: {
                                filename: image.fileName || '',
                                mimetype: image.type || '',
                                url: image.url || '',
                              },
                            })),
                        }
                      : {},
                }))
              : undefined,
            disconnect: deletedOffenders.length
              ? deletedOffenders.map((offender) => ({ id: offender.id }))
              : undefined,
          };
        }

        return {
          connect: undefined,
          create: undefined,
        };
      };

      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            approved: { set: true },
            subject: { set: data.subject },
            description: { set: data.description },
            date: { set: data.date },
            time: { set: data.date },
            value: { set: data.value },
            recoveredValue: { set: data.recoveredValue },
            location: {
              update: {
                building: { set: data.building },
                street: { set: data.street },
                townCity: { set: data.townCity },
                county: { set: data.county },
                postcode: { set: data.postcode },
              },
            },
            groups: {
              set:
                groups.length > 1
                  ? data.groups.map((id) => ({ id }))
                  : groups.map(({ id }) => ({ id })),
            },
            crimeTypes: {
              set: data.tags.map((id) => ({ id })),
            },
            offenders: getOffenders(),
            images: {
              upload:
                imageChange && fileList.length
                  ? fileList
                      .filter((item) => !item.optimised)
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined)
                  : undefined,

              disconnect: incidentData?.incident?.images
                .filter(
                  (image) =>
                    !fileList.map((item) => item.uid).includes(image.id)
                )
                .map((image) => ({
                  id: image.id,
                })),
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
      const currentOffender = offendersData.find(({ id }) => id === currentId);
      if (currentOffender) {
        assignOffendersToImages({
          image: {
            ...info.file,
            url: info.file.response[0].url,
            fileName: info.file.response[0].blobName,
            type: info.file.response[0].mimetype,
            uid: info.file.uid,
            offenders: [currentOffender],
          },
          offenders: [currentOffender].map((offender) => {
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
    }
  };
  return {
    onSubmit,
    data: incidentData,
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
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffendersList,
    offendersData,
    // deleteConfirm,
    onReject,
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
    selected,
    setSelected,
    updateOffender,
  };
};

export default useEditIncident;
