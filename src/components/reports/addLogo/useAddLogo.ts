import type { UploadProps } from 'antd';
import { useState } from 'react';
import { useStoreState } from 'state';
import type { UploadFile } from 'antd/es/upload/interface';

interface OnSubmitValues {
  url: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (value: string) => void;
}

interface Return {
  onFinish: (values: OnSubmitValues) => void;
  saving: boolean;
  documentUploadProps: UploadProps;
}

const useAddLogo = ({ onClose, onSubmit }: Props): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  const currentUserId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = (values: OnSubmitValues) => {
    setSaving(true);
    if (fileList[0].url) {
      onSubmit(fileList[0].url);
      console.log('onFinish', values, currentScheme);
      onClose();
    }
    setSaving(false);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign
        file.url = file.response[0].url;
        // eslint-disable-next-line no-param-reassign
        file.fileName = file.response[0].blobName;
      }
      return file;
    });

    setFileList(newFileList);
  };
  console.log({
    schemeId: currentScheme,
    type: 'logo',
    uploadedById: currentUserId,
  });
  const documentUploadProps: UploadProps = {
    action: import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT,
    onChange: handleChange,
    multiple: false,
    accept: 'image/*',
    headers: {
      schemeId: currentScheme,
      type: 'logo',
      uploadedById: currentUserId,
    },
  };

  return {
    onFinish,
    saving,
    documentUploadProps,
  };
};

export default useAddLogo;
