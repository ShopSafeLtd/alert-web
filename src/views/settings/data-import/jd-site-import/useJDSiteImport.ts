import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { JdSiteSchemeSelection } from 'graphql/types';

import customRequest from '#/utils/custom-request';
import { Form, notification } from 'antd';
import { useJdSiteImportMutation } from 'graphql/imports/__generated__/jd-site-import.generated';
import { useState } from 'react';

interface FormData {
  jdSiteFile: UploadFile[];
  schemeSelection: JdSiteSchemeSelection;
}

interface Return {
  documentUploadProps: UploadProps;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  onSubmit: (data: FormData) => void;
  saving: boolean;
}

const useJDSiteImport = (): Return => {
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<FormData>();
  const [importData] = useJdSiteImportMutation({
    onCompleted: () => {
      notification.success({
        description: 'JD Site import has been completed successfully',
        message: 'Import Completed',
        placement: 'bottomRight',
      });
      form.resetFields();
      setFileList([]);
    },
    onError: () => {
      notification.error({
        description: 'JD Site import could not be completed.',
        message: 'Import Failed',
        placement: 'bottomRight',
      });
    },
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = async (formData: FormData) => {
    try {
      setSaving(true);
      const url = fileList[0].url || '';

      await importData({
        variables: {
          data: {
            fileUrl: url,
            schemeSelection: formData.schemeSelection,
          },
        },
      });
      setSaving(false);
    } catch {
      setSaving(false);
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        file.url = file.response[0].url;
        // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        file.fileName = file.response[0].blobName;
      }
      return file;
    });

    setFileList(newFileList);
  };
  const documentUploadProps: UploadProps = {
    customRequest,
    headers: {
      type: 'json',
    },
    multiple: false,
    onChange: handleChange,
  };

  return {
    documentUploadProps,
    fileList,
    form,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
  };
};

export default useJDSiteImport;
