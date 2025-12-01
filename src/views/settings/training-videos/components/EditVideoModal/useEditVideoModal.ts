import type { FormInstance } from 'antd';

import { gql, useMutation } from '@apollo/client';
import { Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import type { TrainingVideo } from '../../types';

const UPDATE_TRAINING_VIDEO_MUTATION = gql`
  mutation UpdateTrainingVideo($input: UpdateTrainingVideoInput!) {
    updateTrainingVideo(input: $input) {
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
      createdAt
      updatedAt
    }
  }
`;

interface FormData {
  description?: string;
  groups: string[];
  tags?: string[];
  title: string;
}

interface UseEditVideoModalProps {
  onClose: () => void;
  onSuccess: () => void;
  video: TrainingVideo;
}

interface UseEditVideoModalReturn {
  form: FormInstance<FormData>;
  handleSubmit: (values: FormData) => void;
  saving: boolean;
}

const useEditVideoModal = ({
  onClose,
  onSuccess,
  video,
}: UseEditVideoModalProps): UseEditVideoModalReturn => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const [saving, setSaving] = useState(false);

  const [updateVideo] = useMutation(UPDATE_TRAINING_VIDEO_MUTATION, {
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Training video updated successfully',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Success',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
      onSuccess();
      onClose();
    },
    onError: (error) => {
      notification.error({
        description:
          error.message ||
          intl.formatMessage({
            defaultMessage: 'Failed to update training video',
          }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      description: video.description,
      groups: video.groups?.map((group) => group.id) || [],
      tags: video.tags?.map((tag) => tag.name),
      title: video.title,
    });
  }, [video, form]);

  const handleSubmit = (values: FormData): void => {
    setSaving(true);
    void updateVideo({
      variables: {
        input: {
          description: values.description,
          groupIds: values.groups,
          id: video.id,
          tags: values.tags,
          title: values.title,
        },
      },
    });
  };

  return {
    form,
    handleSubmit,
    saving,
  };
};

export default useEditVideoModal;
