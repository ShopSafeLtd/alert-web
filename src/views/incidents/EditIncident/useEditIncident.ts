import { useState } from 'react';
import {
  useViewIncidentQuery,
  useSchemeGroupsQuery,
  ViewIncidentQuery,
  Role,
  useTagsQuery,
  Model,
  useUpdateIncidentMutation,
  CreateTagMutation,
  TagsQuery,
  TagsDocument,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import {
  notification,
  // Modal
} from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import { Moment } from 'moment';

// const { confirm } = Modal;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  time: Moment;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  groups: string[];
  tags: string[];
  images: [{ id: string; url: string; optimised: string }];
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
  fileList: UploadFile[];

  addIncidentTag: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  // banId: string;
  // setBanId: (value: string) => void;
  // deleteConfirm: (value: string) => void;
}

const useEditIncident = (): Return => {
  console.log('a');
  const incidentId = useParams().id;
  const schemeId = useStoreState((state) => state.scheme.id);

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

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const imgChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageChange(true);
  };
  const toggleAddIncidentTag = () => {
    setAddIncidentTag(!addIncidentTag);
  };
  const errorNotification = () => {
    notification.error({
      message: 'error!',
      description: 'Whoops, there are some errors. Please try again. ',
      placement: 'bottomRight',
    });
  };

  const { data: IncidentData, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },

    onCompleted: ({ incident }) => {
      console.log(incident);
      console.log('aa');

      // setAgeCheck(incident?.dateOfBirth);
      if (incident?.images && incident.images.length > 0) {
        if (incident.images.length === 1) {
          setFileList([
            {
              uid: `${incident?.images[0].id}`,
              name: `${incident?.images[0].id}.png`,
              status: 'done',
              url: `${incident?.images[0].url}`,
            },
          ]);
        } else {
          setFileList(
            incident?.images.map((image) => ({
              uid: `${image.id}`,
              name: `${image.id}.png`,
              status: 'done',
              url: `${image.url}`,
            }))
          );

          // incident?.images.map((image) =>
          //   fileList.push({
          //     uid: `${image.id}`,
          //     name: `${image.id}.png`,
          //     status: 'done',
          //     url: `${image.url}`,
          //   })
          // );
        }
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

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'The Incident has been updated!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    if (incidentId) {
      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            subject: { set: data.subject },
            description: { set: data.description },
            date: { set: data.date },
            time: { set: data.time },
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
              set: data.groups.map((id) => ({ id })),
            },
            crimeTypes: {
              set: data.tags.map((id) => ({ id })),
            },
            images: {
              upload:
                imageChange && fileList.length > 0
                  ? fileList
                      .map((item) => ({
                        file: item.originFileObj,
                      }))
                      .filter((obj) => obj.file !== undefined)
                  : [],
              delete: imageChange
                ? IncidentData?.incident?.images
                    .filter(
                      (image) =>
                        !fileList.map((item) => item.uid).includes(image.id)
                    )
                    .map((image) => ({
                      id: image.id,
                    }))
                : [],
            },
          },
        },
      });
    }
  };
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

  // // delete
  // const [deleteBan] = useDeleteBanMutation({
  //   onCompleted: () => {
  //     setSaving(false);
  //     notification.success({
  //       message: 'Successfully Deleted',
  //       description:
  //         'The Incident has been deleted from the feed and moved to the recycle bin.',
  //       placement: 'bottomRight',
  //     });
  //   },
  //   onError: () => {
  //     setSaving(false);
  //     errorNotification();
  //   },
  //   update,
  // });
  // const openDelete = (currentId: string) => {
  //   setSaving(true);
  //   if (currentId)
  //     deleteBan({
  //       variables: {
  //         id: currentId,
  //       },
  //     });
  // };

  // const deleteConfirm = (currentId: string) => {
  //   confirm({
  //     title: 'Do you want to delete the exclusion?',
  //     content: 'This action cannot be undone.',
  //     onOk() {
  //       openDelete(currentId);
  //     },
  //   });
  // };

  return {
    onSubmit,
    data: IncidentData,
    loading,
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
    imgChange,
    fileList,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,

    // banId,
    // setBanId,
    // deleteConfirm,
  };
};

export default useEditIncident;
