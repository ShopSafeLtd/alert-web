/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-floating-promises,@typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import type { SchemeQuery, ViewTagQuery } from 'graphql/generated';
import {
  Model,
  TagType,
  useListSchemeTagsQuery,
  useSchemeQuery,
  useUpdateSchemeMutation,
  useUpdateTagMutation,
} from 'graphql/generated';
import { message, notification, Upload } from 'antd';
import { useStoreState } from 'state';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

export interface FormData {
  name: string;
  logo?: { id: string; url: string; optimised: string };
  restrictIncidentAccess: boolean;
  autoApproveOffenders: boolean;
  reportOnly: boolean;
  autoApproveIncidents: boolean;
  defaultIncidentEmail: boolean;
  defaultIncidentPush: boolean;
  defaultSubscribedIncidentOnly: boolean;
  defaultSubscribedOffenderOnly: boolean;
  defaultMessagePush: boolean;
  defaultOffenderEmail: boolean;
  defaultOffenderPush: boolean;
  autoPopulateDescription: boolean;
  defaultPublicOffenderDOB: boolean;
  incidentRetention: number | null;
  offenderRetention: number | null;
  facialRecognition: boolean;
  imagesRequiredOnOffenders: boolean;
}

interface Return {
  data: SchemeQuery | undefined;
  loading: boolean;
  saving: boolean;
  onSubmit: (value: FormData) => void;
  onPreview: (value: UploadFile) => void;
  fileList: UploadFile[];
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile, dark?: string) => void;
  darkFileList: UploadFile[];
  darkImgChange: UploadProps['onChange'];
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
  tags: ViewTagQuery | undefined;
}

const useSchemeDetail = (): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [darkImageChange, setDarkImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [darkFileList, setDarkFileList] = useState<UploadFile[]>([]);

  const { data: tags } = useListSchemeTagsQuery({
    variables: {
      listWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
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
      },
    },
  });

  const { data: schemeData, loading } = useSchemeQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: schemeId,
      },
    },
    onCompleted: ({ scheme }) => {
      if (scheme?.logo?.url) {
        setFileList([
          {
            uid: `${scheme?.logo?.id}`,
            name: 'image.png',
            status: 'done',
            url: `${scheme?.logo?.optimised || scheme?.logo?.url}`,
          },
        ]);
      } else {
        setFileList([]);
      }
      if (scheme?.darkLogo?.url) {
        setDarkFileList([
          {
            uid: `${scheme?.darkLogo?.id}`,
            name: 'darkImage.png',
            status: 'done',
            url: `${scheme?.darkLogo?.optimised || scheme?.darkLogo?.url}`,
          },
        ]);
      } else {
        setDarkFileList([]);
      }
    },
  });

  const [updateScheme] = useUpdateSchemeMutation({
    onCompleted: (res) => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The scheme has been updated.',
          id: 'uAmnXX',
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

    updateScheme({
      variables: {
        where: {
          id: schemeId,
        },
        data: {
          name: { set: data.name },
          autoPopulateDescription: { set: data.autoPopulateDescription },
          restrictIncidentAccess: { set: data.restrictIncidentAccess },
          reportOnly: { set: data.reportOnly },
          autoApproveIncidents: { set: data.autoApproveOffenders },
          autoApproveOffenders: { set: data.autoApproveIncidents },
          incidentRetention: { set: data.incidentRetention },
          offenderRetention: { set: data.offenderRetention },
          defaultIncidentEmail: { set: data.defaultIncidentEmail },
          defaultIncidentPush: { set: data.defaultIncidentPush },
          defaultSubscribedIncidentOnly: {
            set: data.defaultSubscribedIncidentOnly,
          },
          defaultSubscribedOffenderOnly: {
            set: data.defaultSubscribedOffenderOnly,
          },
          defaultMessagePush: { set: data.defaultMessagePush },
          defaultOffenderEmail: { set: data.defaultOffenderEmail },
          defaultOffenderPush: { set: data.defaultOffenderPush },
          defaultPublicOffenderDOB: { set: data.defaultPublicOffenderDOB },
          facialRecognition: { set: data.facialRecognition },
          imagesRequiredOnOffenders: { set: data.imagesRequiredOnOffenders },
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

  const darkImgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
      setDarkFileList([
        ...darkFileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
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

  const updateTagParent = (tagId: string, parentTagId: string | null) => {
    if (parentTagId) {
      void updateTag({
        variables: {
          where: {
            id: tagId,
          },
          data: {
            parentTag: {
              connect: {
                id: parentTagId,
              },
            },
          },
        },
      });
    } else {
      void updateTag({
        variables: {
          where: {
            id: tagId,
          },
          data: {
            parentTag: {
              disconnect: true,
            },
          },
        },
      });
    }
  };

  return {
    updateTagParent,
    data: schemeData,
    loading,
    saving,
    onSubmit,
    beforeUpload,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onPreview,
    imgChange,
    fileList,
    darkFileList,
    darkImgChange,
    tags,
  };
};

export default useSchemeDetail;
