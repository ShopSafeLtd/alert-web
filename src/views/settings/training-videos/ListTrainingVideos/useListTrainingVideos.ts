import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Modal, notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import type { TrainingVideo } from '../types';

// GraphQL Documents
const TRAINING_VIDEOS_QUERY = gql`
  query TrainingVideos(
    $schemeId: String!
    $where: TrainingVideoWhereInput
    $take: Int
    $skip: Int
  ) {
    trainingVideos(
      schemeId: $schemeId
      where: $where
      take: $take
      skip: $skip
    ) {
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

const DELETE_TRAINING_VIDEO_MUTATION = gql`
  mutation DeleteTrainingVideo($id: String!) {
    deleteTrainingVideo(id: $id)
  }
`;

interface UseListTrainingVideosReturn {
  editModalOpen: boolean;
  handleCloseEditModal: () => void;
  handleClosePreviewModal: () => void;
  handleCloseUploadModal: () => void;
  handleDelete: (video: TrainingVideo) => void;
  handleOpenEditModal: (video: TrainingVideo) => void;
  handleOpenPreviewModal: (video: TrainingVideo) => void;
  handleOpenUploadModal: () => void;
  loading: boolean;
  previewModalOpen: boolean;
  refetch: () => void;
  selectedVideo: TrainingVideo | null;
  uploadModalOpen: boolean;
  videos: TrainingVideo[];
}

const useListTrainingVideos = (): UseListTrainingVideosReturn => {
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeAtom);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(
    null
  );

  const [fetchVideos, { data, loading, refetch: refetchQuery }] = useLazyQuery<{
    trainingVideos: TrainingVideo[];
  }>(TRAINING_VIDEOS_QUERY, {
    fetchPolicy: 'network-only',
  });

  const [deleteVideo] = useMutation(DELETE_TRAINING_VIDEO_MUTATION, {
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Training video deleted successfully',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Success',
        }),
        placement: 'bottomRight',
      });
      void refetchQuery?.();
    },
    onError: () => {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Failed to delete training video',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
    },
  });

  useEffect(() => {
    if (currentScheme?.id) {
      void fetchVideos({
        variables: {
          schemeId: currentScheme.id,
        },
      });
    }
  }, [currentScheme?.id, fetchVideos]);

  const handleOpenUploadModal = (): void => {
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = (): void => {
    setUploadModalOpen(false);
  };

  const handleOpenEditModal = (video: TrainingVideo): void => {
    setSelectedVideo(video);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = (): void => {
    setSelectedVideo(null);
    setEditModalOpen(false);
  };

  const handleOpenPreviewModal = (video: TrainingVideo): void => {
    setSelectedVideo(video);
    setPreviewModalOpen(true);
  };

  const handleClosePreviewModal = (): void => {
    setSelectedVideo(null);
    setPreviewModalOpen(false);
  };

  const handleDelete = (video: TrainingVideo): void => {
    Modal.confirm({
      cancelText: intl.formatMessage({
        defaultMessage: 'Cancel',
      }),
      content: intl.formatMessage(
        {
          defaultMessage:
            'Are you sure you want to delete "{title}"? This action cannot be undone.',
        },
        { title: video.title }
      ),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
      }),
      okType: 'danger',
      onOk: () => {
        void deleteVideo({
          variables: { id: video.id },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Delete Training Video',
      }),
    });
  };

  const refetch = (): void => {
    void refetchQuery?.();
  };

  return {
    editModalOpen,
    handleCloseEditModal,
    handleClosePreviewModal,
    handleCloseUploadModal,
    handleDelete,
    handleOpenEditModal,
    handleOpenPreviewModal,
    handleOpenUploadModal,
    loading,
    previewModalOpen,
    refetch,
    selectedVideo,
    uploadModalOpen,
    videos: data?.trainingVideos || [],
  };
};

export default useListTrainingVideos;
