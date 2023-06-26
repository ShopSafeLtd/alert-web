/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  OffenderUpdateInput,
  Race,
  ViewOffenderQuery,
} from 'graphql/generated';
import {
  Model,
  Role,
  useRecycleOffenderMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateOffenderMutation,
  useViewOffenderQuery,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form, message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useNavigate } from 'react-router';
import errorNotification from 'types/error_notification';
import type { TagData } from 'types/DataType';

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
  updateNewOffenderTagData: (values: TagData) => void;

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
  const [offenderTagsData, setOffenderTagsData] = useState<TagData[]>([]);

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
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
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

    void updateOffender({
      variables: {
        where: {
          id: offenderId,
        },
        data: {
          approved: { set: true },
          name: { set: data.name },
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
        void recycleOffender({
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
      void message.error(
        'This image already exists, please choose another one.'
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
        reader.addEventListener('load', () => resolve(reader.result as string));
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
      if (bansData.some(({ id }) => id === value.id)) {
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
  const updateNewOffenderTagData = (values: TagData) => {
    setAddOffenderTag(false);
    const selectedOffenderTag = form.getFieldValue('tags');
    form.setFieldsValue({
      tags: [...selectedOffenderTag, { value: values.id, label: values.name }],
    });
    setOffenderTagsData([...offenderTagsData, { ...values, isNew: true }]);
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
    updateNewOffenderTagData,
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
