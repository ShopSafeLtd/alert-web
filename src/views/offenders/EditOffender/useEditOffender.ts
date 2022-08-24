import { useState } from 'react';
import {
  useViewOffenderQuery,
  useSchemeGroupsQuery,
  ViewOffenderQuery,
  Role,
  useTagsQuery,
  Model,
  useUpdateOffenderMutation,
  Age,
  Gender,
  Race,
  Build,
  ViewOffenderDocument,
  CreateBanMutation,
  useDeleteBanMutation,
  DeleteBanMutation,
  CreateTagMutation,
  TagsQuery,
  TagsDocument,
} from 'graphql/generated';
import { notification, Modal } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';

const { confirm } = Modal;

interface FormData {
  name: string;
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  tags: string[];
  images: [{ id: string; url: string; optimised: string }];
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
  fileList: UploadFile[];

  addExclusion: boolean;
  toggleAddExclusion: () => void;
  updateExclusion: MutationUpdaterFn<CreateBanMutation>;
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  banId: string;
  setBanId: (value: string) => void;
  deleteConfirm: (value: string) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
}

const useEditOffender = (offenderId: string): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [addOffenderTag, setAddOffenderTag] = useState(false);
  const [banId, setBanId] = useState('');
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addExclusion, setAddExclusion] = useState(false);
  const [editExclusion, setEditExclusion] = useState(false);

  const errorNotification = () => {
    notification.error({
      message: 'error!',
      description: 'Whoops, there are some errors. Please try again. ',
      placement: 'bottomRight',
    });
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
            url: `${image.url}`,
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
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: Model.Offender,
        },
      },
    },
  });

  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'The offender has been updated!',
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

    if (offenderId) {
      updateOffender({
        variables: {
          where: {
            id: offenderId,
          },
          data: {
            name: { set: data.name || '' },
            gender: { set: data.gender || null },
            race: { set: data.race || null },
            build: { set: data.build || null },
            hair: { set: data.hair || '' },
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
                ? offenderData?.offender?.images
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
  // update Exclusion list after adding a new item
  const updateExclusion: MutationUpdaterFn<CreateBanMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables: {
        where: {
          id: offenderId || '',
        },
      },
    });

    if (existingData === null) return;
    if (existingData?.offender?.id === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          bans:
            existingData?.offender?.bans &&
            existingData.offender.bans.length > 0
              ? existingData?.offender?.bans.concat(res.createBan)
              : [res.createBan],
        },
        __typename: 'Query',
      },
      variables: {
        where: {
          id: offenderId || '',
        },
      },
    });
  };

  // update Exclusion list after deleting an item
  const update: MutationUpdaterFn<DeleteBanMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables: {
        where: {
          id: offenderId,
        },
      },
    });

    if (existingData === null) return;
    if (existingData?.offender?.id === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          bans: existingData.offender?.bans?.filter(
            (ban) => ban.id !== res?.deleteBan?.id
          ),
        },
        // existingData.offender?.bans?.filter((ban) => ban.id !== res?.deleteBan?.id),
        __typename: 'Query',
      },
      variables: {
        where: {
          id: offenderId,
        },
      },
    });
  };

  // delete
  const [deleteBan] = useDeleteBanMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Deleted!',
        description:
          'The offender has been deleted from the feed and moved to the recycle bin.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });
  const openDelete = (currentId: string) => {
    setSaving(true);
    if (currentId)
      deleteBan({
        variables: {
          id: currentId,
        },
      });
  };
  // function
  const imgChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageChange(true);
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
  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the exclusion?',
      content: 'This action cannot be undone.',
      onOk() {
        openDelete(currentId);
      },
    });
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
        : groups
            .filter((group) => group.id === schemeId)
            .map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    imgChange,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    updateExclusion,
    banId,
    setBanId,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
  };
};

export default useEditOffender;
