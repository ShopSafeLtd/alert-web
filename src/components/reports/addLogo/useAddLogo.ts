/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import type { UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { getCustomUrls } from '#/providers/ApolloProvider';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface OnSubmitValues {
  url: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (value: string) => void;
}

interface Return {
  documentUploadProps: UploadProps;
  onFinish: (values: OnSubmitValues) => void;
  saving: boolean;
}

const useAddLogo = ({ onClose, onSubmit }: Props): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const currentUserId = useAtomValue(userIdAtom);
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
  const { imageUpload } = getCustomUrls();

  const documentUploadProps: UploadProps = {
    accept: 'image/*',
    action: imageUpload,
    headers: {
      schemeId: currentScheme,
      type: 'logo',
      uploadedById: currentUserId,
    },
    multiple: false,
    onChange: handleChange,
  };

  return {
    documentUploadProps,
    onFinish,
    saving,
  };
};

export default useAddLogo;
