import type { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'rc-upload/lib/interface';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { gql, useMutation } from '@apollo/client';
import { Form, notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import {
  getFileExtension,
  uploadVideoToAzure,
} from '../../utils/uploadVideoToAzure';

const GENERATE_UPLOAD_URL_MUTATION = gql`
  mutation GenerateTrainingVideoUploadUrl(
    $schemeId: String!
    $filename: String!
  ) {
    generateTrainingVideoUploadUrl(schemeId: $schemeId, filename: $filename)
  }
`;

const CREATE_TRAINING_VIDEO_MUTATION = gql`
  mutation CreateTrainingVideo($input: CreateTrainingVideoInput!) {
    createTrainingVideo(input: $input) {
      id
      title
      description
      videoUrl
      thumbnailUrl
      thumbnailStatus
      viewCount
      tags {
        id
        name
      }
      groups {
        id
        name
      }
      loginPrompt
      mandatory
      createdAt
      updatedAt
    }
  }
`;

interface FormData {
  description?: string;
  groups: string[];
  loginPrompt?: boolean;
  mandatory?: boolean;
  tags?: string[];
  title: string;
}

interface UseUploadVideoModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface UseUploadVideoModalReturn {
  beforeUpload: (file: RcFile) => boolean;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  handleFileChange: (info: { fileList: UploadFile[] }) => void;
  handleSubmit: (values: FormData) => Promise<void>;
  uploadProgress: number;
  uploading: boolean;
}

const useUploadVideoModal = ({
  onClose,
  onSuccess,
}: UseUploadVideoModalProps): UseUploadVideoModalReturn => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const currentScheme = useAtomValue(currentSchemeAtom);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Set initial form values
  form.setFieldsValue({
    loginPrompt: false,
    mandatory: false,
  });

  const [generateUploadUrl] = useMutation<{
    generateTrainingVideoUploadUrl: string;
  }>(GENERATE_UPLOAD_URL_MUTATION);

  const [createTrainingVideo] = useMutation(CREATE_TRAINING_VIDEO_MUTATION, {
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Training video uploaded successfully',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Success',
        }),
        placement: 'bottomRight',
      });
      form.resetFields();
      setFileList([]);
      setUploadProgress(0);
      onSuccess();
      onClose();
    },
    onError: (error) => {
      notification.error({
        description:
          error.message ||
          intl.formatMessage({
            defaultMessage: 'Failed to create training video record',
          }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
      setUploading(false);
    },
  });

  const beforeUpload = (file: RcFile): boolean => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'You can only upload video files',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Invalid file type',
        }),
        placement: 'bottomRight',
      });
      return false;
    }

    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Video file must be smaller than 500MB',
        }),
        message: intl.formatMessage({
          defaultMessage: 'File too large',
        }),
        placement: 'bottomRight',
      });
      return false;
    }

    return false; // Prevent automatic upload
  };

  const handleFileChange = (info: { fileList: UploadFile[] }): void => {
    setFileList(info.fileList);
  };

  const handleSubmit = async (values: FormData): Promise<void> => {
    if (!currentScheme?.id) {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'No scheme selected',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
      return;
    }

    if (fileList.length === 0) {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Please select a video file',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
      return;
    }

    const file = fileList[0].originFileObj as RcFile;
    setUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Generate upload URL
      const extension = getFileExtension(file.name);
      const filename = `${uuidv4()}.${extension}`;

      const { data: urlData } = await generateUploadUrl({
        variables: {
          filename,
          schemeId: currentScheme.id,
        },
      });

      if (!urlData?.generateTrainingVideoUploadUrl) {
        throw new Error('Failed to get upload URL');
      }

      const sasUrl = urlData.generateTrainingVideoUploadUrl;

      // Step 2: Upload video to Azure
      const blobUrl = await uploadVideoToAzure(sasUrl, file, (percent) => {
        setUploadProgress(percent);
      });

      // Step 3: Create training video record
      await createTrainingVideo({
        variables: {
          input: {
            description: values.description,
            groupIds: values.groups,
            loginPrompt: values.loginPrompt || false,
            mandatory: values.mandatory || false,
            schemeId: currentScheme.id,
            tags: values.tags,
            title: values.title,
            videoUrl: blobUrl,
          },
        },
      });
    } catch (error) {
      notification.error({
        description:
          error instanceof Error
            ? error.message
            : intl.formatMessage({
                defaultMessage: 'An error occurred during video upload',
              }),
        message: intl.formatMessage({
          defaultMessage: 'Upload failed',
        }),
        placement: 'bottomRight',
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    beforeUpload,
    fileList,
    form,
    handleFileChange,
    handleSubmit,
    uploadProgress,
    uploading,
  };
};

export default useUploadVideoModal;
