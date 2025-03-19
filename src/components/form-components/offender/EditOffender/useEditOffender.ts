/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import type { TagData } from '#/types/DataType';
import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { ViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import type {
  Age,
  BanType,
  Build,
  Gender,
  OffenderUpdateInput,
  Race,
} from 'graphql/types';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useStoreActions, useStoreState } from '#/state';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { Form, Modal, Upload, message, notification } from 'antd';
import { useRecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import { useUpdateOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-offender.generated';
import { useViewOffenderQuery } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

export interface OffenderData {
  age?: Age | null;
  approved?: boolean | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  hair?: null | string;
  id: string;
  imageUid?: string[] | undefined;
  images?: {
    id: string;
    new?: boolean;
    optimised?: null | string;
    url?: null | string;
  }[];
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
}

const { confirm } = Modal;

interface Props {
  offenderId: string;
  onClose: () => void;
  update: (value: OffenderData) => void;
}

interface BanData {
  description?: null | string | undefined;
  endDate?: Date;
  fineValue?: null | number | undefined;
  id: string;
  location?: string;
  months?: null | number | undefined;
  startDate?: Date;
  type?: BanType | null;
}

export interface FormData {
  age: Age;
  bans?: {
    description: string;
    endDate: Date;
    location: string;
    startDate: Date;
  }[];
  build: Build;
  dateOfBirth?: Date;
  dateSource?: string;
  gender: Gender;
  groups: string[];
  hair: string;
  images?: { id: string; optimised: string; url: string }[];
  name: string;
  peculiarities: string;
  race: Race;
  tags: string[];
}

interface Return {
  addExclusion: boolean;
  addOffenderTag: boolean;
  ageCheck: boolean;
  banData: BanData | null;
  bansData: BanData[];
  beforeUpload: (value: RcFile) => void;
  data: ViewOffenderQuery | undefined;
  deleteConfirm: (value: string) => void;
  editExclusion: boolean;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  loading: boolean;
  onReject: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedItems: string[];
  setAgeCheck: (value: boolean) => void;
  setBanData: (value: BanData | null) => void;
  setSelectedItems: (value: string[]) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddExclusion: () => void;
  toggleAddOffenderTag: () => void;
  toggleEditExclusion: () => void;
  updateExclusion: (value: BanData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
}

const useEditOffender = ({ offenderId, onClose, update }: Props): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormData>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userId = useAtomValue(userIdAtom);

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
    onCompleted: ({ offender }) => {
      setAgeCheck(!!offender?.dateOfBirth);
      if (offender?.images && offender.images.length > 0) {
        setFileList(
          offender?.images.map((image) => ({
            name: `${image.id}.png`,
            status: 'done',
            uid: `${image.id}`,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            url: `${image.optimised || image.url}`,
          }))
        );
      }
      if (offender?.bans && offender.bans.length > 0) {
        setBansData(offender.bans);
      }
    },

    variables: {
      where: {
        id: offenderId,
      },
    },
  });

  const { groups, groupsLoading } = useGroupsContext();
  const userGroups = groups;
  useEffect(() => {
    if (groups) {
      setOffendersState({
        order,
        pagination,
        variables: {
          ...variables,
          groups: groups.map((group) => group.value),
        },
      });
    }
  }, [groups]);

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        dataType: {
          equals: Model.Offender,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
      },
    },
  });

  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: (res) => {
      update({
        ...res.updateOffender,
        id: offenderId,
      });
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
        }),
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
          create:
            newBans.length > 0
              ? newBans.map((ban) => ({
                  createdBy: { connect: { id: userId } },
                  description: ban?.description || null,
                  endDate: ban?.endDate || new Date(),
                  location: ban?.location || '',
                  scheme: {
                    connect: {
                      id: schemeId,
                    },
                  },
                  startDate: ban?.startDate || new Date(),
                }))
              : undefined,
          delete:
            deleteBanIds.length > 0
              ? deleteBanIds.map((banId) => ({ id: banId }))
              : undefined,
          update:
            existingBans.length > 0
              ? existingBans.map((ban) => ({
                  data: {
                    description: { set: ban.description || null },
                    endDate: { set: ban.endDate },
                    location: { set: ban.location },
                    startDate: { set: ban.startDate },
                  },
                  where: { id: ban.id },
                }))
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
        data: {
          age: { set: ageCheck ? null : data.age || null },
          approved: { set: true },
          bans: getBans(),
          build: { set: data.build || null },
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          dateSource: { set: ageCheck ? data.dateSource || null : null },
          gender: { set: data.gender || null },
          groups: {
            set:
              userGroups.length > 1
                ? data.groups.map((id) => ({ id }))
                : userGroups.map(({ value: id }) => ({ id })),
          },
          hair: { set: data.hair || 'Unknown' },
          images: {
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
            // imageChange && fileList.length > 0
            //   ? fileList
            //       .map((item) => ({
            //         file: item.originFileObj,
            //       }))
            //       .filter((obj) => obj.file !== undefined)
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
          name: { set: data.name },
          peculiarities: { set: data.peculiarities || '' },
          race: { set: data.race || null },
          scheme: { connect: { id: schemeId } },
          tags: {
            set: data.tags.map((id) => ({ id })) || undefined,
          },
        },
        where: {
          id: offenderId,
        },
      },
    });
  };

  // delete incident
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      navigate('/app/offenders');
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onReject = () => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click reject if you wish to reject the approving of this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Reject',
      }),
      onOk() {
        void recycleOffender({
          variables: {
            where: { id: offenderId },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure you want to delete this article?',
      }),
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
      // if (info.file.response && (info.file.status === 'done'||'success') {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
        },
      ]);

      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
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
  const openDelete = (currentId: string | undefined) => {
    setBansData(bansData.filter((ban) => currentId !== ban.id));
  };
  const deleteConfirm = (currentId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        openDelete(currentId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the exclusion?',
      }),
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
      tags: [...selectedOffenderTag, { label: values.name, value: values.id }],
    });
    setOffenderTagsData([...offenderTagsData, { ...values, isNew: true }]);
  };

  return {
    addExclusion,
    addOffenderTag,
    ageCheck,
    banData,
    bansData,
    beforeUpload,
    data: offenderData,
    deleteConfirm,
    editExclusion,
    fileList,
    form,
    groups,
    groupsLoading,
    imgChange,
    loading,
    onReject,
    onSubmit,
    saving,
    selectedItems,
    setAgeCheck,
    setBanData,
    setSelectedItems,
    tags:
      tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id })) || [],
    tagsLoading,
    toggleAddExclusion,
    toggleAddOffenderTag,
    toggleEditExclusion,
    updateExclusion,
    updateNewOffenderTagData,
  };
};

export default useEditOffender;
