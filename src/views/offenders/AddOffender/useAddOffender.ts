import { useState } from 'react';
import {
  Age,
  Build,
  CreateOffenderMutation,
  CreateTagMutation,
  Gender,
  ListOffendersDocument,
  ListOffendersQuery,
  Model,
  Race,
  Role,
  TagsDocument,
  TagsQuery,
  useCreateOffenderMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import { message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

interface FormData {
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
  bans?: {
    endDate: Date;
    startDate: Date;
    location: string;
    description: string;
  }[];
}

interface BanData {
  id: string;
  title?: string | null | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description?: string | null | undefined;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  removeImage: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  banData: BanData | null;
  setBanData: (value: BanData | null) => void;
  deleteConfirm: (value: string | undefined) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  bansData: BanData[];
  updateExclusion: (value: BanData) => void;
  adminRights: boolean;
}

const useAddOffender = (): Return => {
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

  const [ageCheck, setAgeCheck] = useState(false);
  const [addOffenderTag, setAddOffenderTag] = useState(false);

  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [addExclusion, setAddExclusion] = useState(false);
  const [editExclusion, setEditExclusion] = useState(false);
  const [bansData, setBansData] = useState<BanData[]>([]);
  const [banData, setBanData] = useState<BanData | null>(null);
  const navigate = useNavigate();
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
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
    fetchPolicy: 'cache-and-network',
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
              ? existingData?.listOffenders?.offenders.concat(
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
    onCompleted: () => {
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
    createOffender({
      variables: {
        data: {
          name: data.name || 'Unidentified Offender',
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
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ id }) => ({ id })),
          },
          tags:
            data.tags && data.tags.length > 0
              ? { connect: data.tags.map((id) => ({ id })) }
              : undefined,
          scheme: schemeId,
          // images:
          //   imageChange && fileList.length > 0
          //     ? fileList
          //         .map((item) => ({
          //           file: item.originFileObj,
          //         }))
          //         .filter((obj) => obj.file !== undefined)
          //     : undefined,
          // images: {
          //   create:
          //     imageChange && fileList.length > 0
          //       ? fileList
          //           .map((item) => ({
          //             url: {
          //               filename: item.fileName || '',
          //               mimetype: item.type || '',
          //               url: item.url || '',
          //             },
          //           }))
          //           .filter((obj) => obj.url !== undefined)
          //       : undefined,
          // },
          image: {
            upload:
              imageChange && fileList.length > 0
                ? fileList.map((item) => ({
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
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
                  scheme: {
                    connect: {
                      id: schemeId,
                    },
                  },
                  createdBy: { connect: { id: userId } },
                }))
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

  const removeImage = (file: UploadFile) => {
    if (fileList.length === 1) {
      setFileList([]);
    } else {
      setFileList(fileList.filter(({ uid }) => uid !== file.uid));
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
      if (bansData.find(({ id }) => id === value.id)) {
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
    } else if (bansData) {
      setBansData([value]);
    }
  };

  const openDelete = (currentId: string | undefined) => {
    setBansData(bansData.filter((ban) => currentId !== ban.id));
  };

  const deleteConfirm = (currentId: string | undefined) => {
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
    removeImage,
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
  };
};

export default useAddOffender;
