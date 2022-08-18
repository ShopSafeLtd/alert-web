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
  onPreview: (value: UploadFile) => void;
  fileList: UploadFile[];
  imgChange: UploadProps['onChange'];
}

const useSchemeDetail = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // check the size/type if image before uploading
  const imgChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageChange(true);
  };

  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
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
      notification.success({
        message: 'Success Updated!',
        description: 'The Scheme has been updated!',
        placement: 'bottomRight',
      });
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
    onPreview,
    imgChange,
    fileList,
  };
};

export default useSchemeDetail;
