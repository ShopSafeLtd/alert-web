import type { FormInstance, UploadFile, UploadProps } from 'antd';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import customRequest from '#/utils/custom-request';
import { Form, notification } from 'antd';
import { useCentralCoopImportDataMutation } from 'graphql/imports/__generated__/central-coop-import.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface FormData {
  centralCoopData: UploadFile[];
  groups: string[];
}

interface Return {
  documentUploadProps: UploadProps;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  onSubmit: (data: FormData) => void;
  saving: boolean;
}

const useCentralCoopImport = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<FormData>();
  const [importData] = useCentralCoopImportDataMutation({
    onCompleted: () => {
      notification.success({
        description: 'Import has been completed successfully',
        message: 'Import Completed',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        description: 'Import could not be completed for data.',
        message: 'Import Failed',
        placement: 'bottomRight',
      });
    },
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = async ({ groups }: FormData) => {
    try {
      setSaving(true);
      const fileUrl = fileList[0].url || '';

      await importData({
        variables: {
          data: {
            fileUrl,
            groups: groups.map((id) => ({ id })) || [],
            scheme: {
              id: schemeId,
            },
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
      type: 'csv',
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

export default useCentralCoopImport;
