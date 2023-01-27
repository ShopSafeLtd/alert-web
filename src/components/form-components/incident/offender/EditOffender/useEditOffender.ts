import { useState } from 'react';
import {
  Age,
  Build,
  CreateTagMutation,
  Gender,
  Model,
  OffenderUpdateInput,
  Race,
  Role,
  TagsDocument,
  TagsQuery,
  useRecycleOffenderMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateOffenderMutation,
  useViewOffenderQuery,
  ViewOffenderQuery,
} from 'graphql/generated';
import { Form, FormInstance, message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';

export interface OffenderData {
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
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

const { confirm } = Modal;

interface Props {
  onClose: () => void;
  offenderId: string;
  update: (value: OffenderData) => void;
}

interface BanData {
  id: string;
  title?: string | null | undefined;
  endDate: Date;
  startDate: Date;
  location: string;
  description?: string | null | undefined;
}

export interface FormData {
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
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  addOffenderTag: boolean;
  toggleAddOffenderTag: () => void;
  updateOffenderTag: MutationUpdaterFn<CreateTagMutation>;
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  updateExclusion: (value: BanData) => void;
  bansData: BanData[];
  banData: BanData | null;
  setBanData: (value: BanData | null) => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  onReject: () => void;
  deleteConfirm: (value: string) => void;
  adminRights: boolean;
  form: FormInstance<FormData>;
  selectedItems: string[];
  setSelectedItems: (value: string[]) => void;
}

const useEditOffender = ({ offenderId, onClose, update }: Props): Return => {
  const navigate = useNavigate();
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
  const [ageCheck, setAgeCheck] = useState(false);
  const [addOffenderTag, setAddOffenderTag] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addExclusion, setAddExclusion] = useState(false);
  const [editExclusion, setEditExclusion] = useState(false);
  const [bansData, setBansData] = useState<BanData[]>([]);
  const [banData, setBanData] = useState<BanData | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
            url: `${image.optimised || image.url}`,
          }))
        );
      }
      if (offender?.bans && offender.bans.length > 0) {
        setBansData(offender.bans);
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
    onCompleted: (res) => {
      update({
        id: offenderId,
        ...res.updateOffender,
      });
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'The offender has been updated!',
        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    const getBans = (): OffenderUpdateInput['bans'] => {
      if (
        offenderData?.offender?.bans &&
        offenderData?.offender?.bans.length > 0
      ) {
        const offenderBanIds = offenderData?.offender?.bans.map(
          (ban) => ban.id
        );
        const existingBans = bansData.filter(({ id }) =>
          offenderBanIds?.includes(id)
        );
        const newBans = bansData.filter(
          ({ id }) => !offenderBanIds?.includes(id)
        );
        const deleteBanIds = offenderBanIds.filter((banId) =>
          bansData.map((ban) => ban.id).includes(banId)
        );
        return {
          update:
            existingBans.length > 0
              ? existingBans.map((ban) => ({
                  where: { id: ban.id },
                  data: {
                    startDate: { set: ban.startDate },
                    endDate: { set: ban.endDate },
                    location: { set: ban.location },
                    description: { set: ban.description || null },
                  },
                }))
              : undefined,
          create:
            newBans.length > 0
              ? newBans.map((ban) => ({
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
          delete:
            deleteBanIds.length > 0
              ? deleteBanIds.map((banId) => ({ id: banId }))
              : undefined,
        };
      }
      return {
        create: undefined,
        delete: undefined,
      };
    };

    updateOffender({
      variables: {
        where: {
          id: offenderId,
        },
        data: {
          approved: { set: true },
          name: { set: data.name || 'Unidentified Offender' },
          gender: { set: data.gender || null },
          race: { set: data.race || null },
          build: { set: data.build || null },
          hair: { set: data.hair || 'Unknown' },
          peculiarities: { set: data.peculiarities || '' },
          age: { set: ageCheck ? null : data.age || null },
          dateSource: { set: ageCheck ? data.dateSource || null : null },
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          groups: {
            set:
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ id }) => ({ id })),
          },
          tags: {
            set: data.tags.map((id) => ({ id })) || undefined,
          },
          scheme: { connect: { id: schemeId } },
          bans: getBans(),
          images: {
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
            // imageChange && fileList.length > 0
            //   ? fileList
            //       .map((item) => ({
            //         file: item.originFileObj,
            //       }))
            //       .filter((obj) => obj.file !== undefined)
            //   : [],
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

  // delete incident
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      navigate(`/app/offenders`);
      notification.success({
        message: 'Successfully Rejected!',
        description:
          'The offender has been deleted from the feed and moved to the recycle bin.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onReject = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Click reject if you wish to reject the approvement of this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Reject',
      onOk() {
        recycleOffender({
          variables: {
            where: { id: offenderId },
          },
        });
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
      // ???
      // if (info.file.response && (info.file.status === 'done'||'success') {
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

  const toggleAddOffenderTag = () => {
    setAddOffenderTag(!addOffenderTag);
  };
  const toggleAddExclusion = () => {
    setAddExclusion(!addExclusion);
  };
  const toggleEditExclusion = () => {
    setEditExclusion(!editExclusion);
  };
  const openDelete = (currentId: string | undefined) => {
    setBansData(bansData.filter((ban) => currentId !== ban.id));
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
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    imgChange,
    onPreview,
    beforeUpload,
    fileList,
    addOffenderTag,
    toggleAddOffenderTag,
    updateOffenderTag,
    addExclusion,
    toggleAddExclusion,
    editExclusion,
    toggleEditExclusion,
    updateExclusion,
    banData,
    setBanData,
    bansData,
    deleteConfirm,
    ageCheck,
    setAgeCheck,
    onReject,
    selectedItems,
    setSelectedItems,
    adminRights: role !== Role.User,
    form,
  };
};

export default useEditOffender;
