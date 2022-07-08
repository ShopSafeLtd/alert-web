import { useState } from 'react';
import {
  useSchemeQuery,
  SchemeQuery,
  useUpdateSchemeMutation,
} from 'graphql/generated';
import { notification, message } from 'antd';
import { useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface FormData {
  name: string;
  logo: { id: string; url: string; optimised: string };
  autoApproveOffenders: boolean;
  autoApproveIncidents: boolean;
  incidentRetention: number | null;
  offenderRetention: number | null;
}
interface Return {
  data: SchemeQuery | undefined;
  loading: boolean;
  saving: boolean;
  onSubmit: (value: FormData) => void;

  beforeUpload: (value: RcFile) => void;
  handlePreview: (value: UploadFile) => void;
  fileList: UploadFile[];
  imgChange: UploadProps['onChange'];
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useSchemeDetail = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const imgChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageChange(true);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handlePreview = async (file: UploadFile) => {
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

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The Scheme has been updated!',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
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
            url: `${scheme?.logo?.url}`,
          },
        ]);
      }
    },
  });
  const [updateScheme] = useUpdateSchemeMutation({
    onCompleted: () => {
      setSaving(false);
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
      setSaving(false);
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    if (schemeId)
      updateScheme({
        variables: {
          where: {
            id: schemeId,
          },
          data: {
            name: { set: data.name },
            autoApproveIncidents: { set: data.autoApproveOffenders },
            autoApproveOffenders: { set: data.autoApproveIncidents },
            incidentRetention: { set: data.incidentRetention },
            offenderRetention: { set: data.offenderRetention },
            logo: {
              ...(imageChange && fileList.length > 0
                ? { upload: { file: fileList[0]?.originFileObj } }
                : {}),
              ...(imageChange && fileList.length === 0 ? { delete: true } : {}),
            },
          },
        },
      });
  };

  return {
    data: schemeData,
    loading,
    saving,
    onSubmit,

    beforeUpload,
    handlePreview,
    imgChange,
    fileList,
  };
};

export default useSchemeDetail;
