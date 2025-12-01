/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-floating-promises,@typescript-eslint/no-unsafe-assignment */
import type { ListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';
import type { SchemeDetailsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/scheme.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload/interface';
import type { GoodsMode } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListSchemeTagsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/list-tags.generated';
import { useSchemeDetailsQuery } from '#/views/settings/schemes/SchemeDetail/graphql/__generated__/scheme.generated';
import { Upload, message, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useUpdateSchemeMutation } from 'graphql/scheme/mutation/__generated__/update_scheme.generated';
import { useUpdateTagMutation } from 'graphql/tag/mutation/__generated__/update_tag.generated';
import { Model, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export interface FormData {
  activityAssignToUser: boolean;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  autoPopulateDescription: boolean;
  defaultBulletinEmails: boolean;
  defaultBulletinPush: boolean;
  defaultIncidentEmail: boolean;
  defaultIncidentPush: boolean;
  defaultMessagePush: boolean;
  defaultOffenderEmail: boolean;
  defaultOffenderPush: boolean;
  defaultPublicOffenderDOB: boolean;
  defaultSubscribedIncidentOnly: boolean;
  defaultSubscribedOffenderOnly: boolean;
  facialDetection: boolean;
  facialRecognition: boolean;
  facialRedaction: boolean;
  goodsMode: GoodsMode;
  imagesRequiredOnOffenders: boolean;
  incidentCustomQuestionRadio: boolean;
  incidentRetention: null | number;
  incidentTypeTooltip?: null | string | undefined;
  logo?: { id: string; optimised: string; url: string };
  name: string;
  needJustification: boolean;
  offenderRetention: null | number;
  oneSelectedIncidentTypeOnly: boolean;
  reportOnly: boolean;
  requireActivityAuthorised: boolean;
  requireSiteNumberForUsers: boolean;
  restrictIncidentAccess: boolean;
  showBlankActivity: boolean;
  useBusinessGroupsOnIncident: boolean;
}

interface Return {
  beforeUpload: (value: RcFile, dark?: string) => void;
  darkFileList: UploadFile[];
  darkImgChange: UploadProps['onChange'];
  data: SchemeDetailsQuery | undefined;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  imgChange: UploadProps['onChange'];
  loading: boolean;
  onPreview: (value: UploadFile) => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  tags: ListSchemeTagsQuery | undefined;
  updateTagParent: (tagId: string, parentTagId: null | string) => void;
}

const useSchemeDetail = (): Return => {
  const intl = useIntl();

  const errorNotification = () =>
    notification.error({
      description: intl.formatMessage({
        defaultMessage:
          'This error has been reported to our team, if it continues to happen reach out to our support team.',
      }),
      message: intl.formatMessage({
        defaultMessage: 'Error',
      }),
      placement: 'bottomRight',
    });

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [darkImageChange, setDarkImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [darkFileList, setDarkFileList] = useState<UploadFile[]>([]);
  const [form] = useForm<FormData>();
  const { data: tags } = useListSchemeTagsQuery({
    variables: {
      listWhere: {
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
    },
  });

  const { data: schemeData, loading } = useSchemeDetailsQuery({
    onCompleted: ({ scheme }) => {
      if (scheme?.logo?.url) {
        setFileList([
          {
            name: 'image.png',
            status: 'done',
            uid: `${scheme?.logo?.id}`,
            url: `${scheme?.logo?.optimised || scheme?.logo?.url}`,
          },
        ]);
      }
      if (scheme?.darkLogo?.url) {
        setDarkFileList([
          {
            name: 'darkImage.png',
            status: 'done',
            uid: `${scheme?.darkLogo?.id}`,
            url: `${scheme?.darkLogo?.optimised || scheme?.darkLogo?.url}`,
          },
        ]);
      }
      console.log('useSchemeDetailsQuery', scheme.requireActivityAuthorised);
    },
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  const [updateScheme] = useUpdateSchemeMutation({
    onCompleted: (res) => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The scheme has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
      window.localStorage.setItem(
        'logo',
        res.updateScheme?.logo?.optimisedPersisted || ''
      );
      window.localStorage.setItem(
        'logo-dark',
        res.updateScheme?.darkLogo?.optimisedPersisted || ''
      );
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    void updateScheme({
      variables: {
        data: {
          activityAllowAllGroups: { set: data.activityAllowAllGroups },
          activityAssignToUser: { set: data.activityAssignToUser },
          autoApproveIncidents: { set: data.autoApproveIncidents },
          autoApproveOffenders: { set: data.autoApproveOffenders },
          autoPopulateDescription: { set: data.autoPopulateDescription },
          darkLogo: {
            ...(darkImageChange && darkFileList.length > 0
              ? {
                  upload: {
                    url: {
                      filename: darkFileList[0].fileName || '',
                      mimetype: darkFileList[0].type || '',
                      url: darkFileList[0].url || '',
                    },
                  },
                }
              : undefined),

            ...(darkImageChange && darkFileList.length === 0
              ? { delete: true }
              : {}),
          },
          defaultBulletinEmails: { set: data.defaultBulletinEmails },
          defaultBulletinPush: { set: data.defaultBulletinPush },
          defaultIncidentEmail: { set: data.defaultIncidentEmail },
          defaultIncidentPush: { set: data.defaultIncidentPush },
          defaultMessagePush: { set: data.defaultMessagePush },
          defaultOffenderEmail: { set: data.defaultOffenderEmail },
          defaultOffenderPush: { set: data.defaultOffenderPush },
          defaultPublicOffenderDOB: { set: data.defaultPublicOffenderDOB },
          defaultSubscribedIncidentOnly: {
            set: data.defaultSubscribedIncidentOnly,
          },
          defaultSubscribedOffenderOnly: {
            set: data.defaultSubscribedOffenderOnly,
          },
          facialDetection: { set: data.facialDetection },
          facialRecognition: { set: data.facialRecognition },
          facialRedaction: { set: data.facialRedaction },
          goodsMode: data.goodsMode ? { set: data.goodsMode } : undefined,
          imagesRequiredOnOffenders: { set: data.imagesRequiredOnOffenders },
          incidentCustomQuestionRadio: {
            set: data.incidentCustomQuestionRadio,
          },
          incidentRetention: { set: data.incidentRetention },
          incidentTypeTooltip: data.incidentTypeTooltip
            ? {
                set: data.incidentTypeTooltip,
              }
            : undefined,
          logo: {
            ...(imageChange && fileList.length > 0
              ? {
                  upload: {
                    url: {
                      filename: fileList[0].fileName || '',
                      mimetype: fileList[0].type || '',
                      url: fileList[0].url || '',
                    },
                  },
                }
              : undefined),

            ...(imageChange && fileList.length === 0 ? { delete: true } : {}),
          },
          name: { set: data.name },
          needJustification: { set: data.needJustification },
          offenderRetention: { set: data.offenderRetention },
          oneSelectedIncidentTypeOnly: {
            set: data.oneSelectedIncidentTypeOnly,
          },
          reportOnly: { set: data.reportOnly },
          requireActivityAuthorised: { set: data.requireActivityAuthorised },
          requireSiteNumberForUsers: { set: data.requireSiteNumberForUsers },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          restrictIncidentAccess: { set: data.restrictIncidentAccess },
          showBlankActivity: { set: data.showBlankActivity },
          // ???
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          useBusinessGroupsOnIncident: {
            set: data.useBusinessGroupsOnIncident,
          },
        },
        where: {
          id: schemeId,
        },
      },
    });
  };

  // image
  // check the size / type if image before uploading
  const beforeUpload = (file: RcFile, dark?: string) => {
    const isFileDuplicate = dark
      ? darkFileList.find((item) => item.name === file.name)
      : fileList.find((item) => item.name === file.name);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isFileDuplicate) {
      message.error('This image already exists, please choose another one.');
    }
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return !isFileDuplicate || isLt2M || Upload.LIST_IGNORE;
  };

  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
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

  const darkImgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
      setDarkFileList([
        ...darkFileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
        },
      ]);
      setDarkImageChange(true);
    } else {
      setDarkFileList(info.fileList);
      setDarkImageChange(true);
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

  const [updateTag] = useUpdateTagMutation();

  const updateTagParent = (tagId: string, parentTagId: null | string) => {
    if (parentTagId) {
      void updateTag({
        variables: {
          data: {
            parentTag: {
              connect: {
                id: parentTagId,
              },
            },
          },
          where: {
            id: tagId,
          },
        },
      });
    } else {
      void updateTag({
        variables: {
          data: {
            parentTag: {
              disconnect: true,
            },
          },
          where: {
            id: tagId,
          },
        },
      });
    }
  };

  return {
    beforeUpload,
    darkFileList,
    darkImgChange,
    data: schemeData,
    fileList,
    form,
    imgChange,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onPreview,
    onSubmit,
    saving,
    tags,
    updateTagParent,
  };
};

export default useSchemeDetail;
