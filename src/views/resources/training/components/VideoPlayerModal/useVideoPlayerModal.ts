import { gql, useMutation } from '@apollo/client';
import { notification } from 'antd';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import type { TrainingVideo } from '../../ListVideos/useListVideos';

const MARK_VIDEO_COMPLETE_MUTATION = gql`
  mutation MarkTrainingVideoComplete($trainingVideoId: String!) {
    markTrainingVideoComplete(trainingVideoId: $trainingVideoId) {
      id
      trainingVideoId
      userId
      completedAt
    }
  }
`;

interface UseVideoPlayerModalProps {
  video: TrainingVideo | null;
}

interface UseVideoPlayerModalReturn {
  completed: boolean;
  handleProgress: (state: { played: number }) => void;
}

const useVideoPlayerModal = ({
  video,
}: UseVideoPlayerModalProps): UseVideoPlayerModalReturn => {
  const intl = useIntl();
  const [completed, setCompleted] = useState(false);
  const [hasMarked90Percent, setHasMarked90Percent] = useState(false);

  const [markVideoComplete] = useMutation(MARK_VIDEO_COMPLETE_MUTATION, {
    onCompleted: () => {
      setCompleted(true);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Training video completion recorded',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Progress Saved',
        }),
        placement: 'bottomRight',
      });
    },
    onError: (error) => {
      console.error('Failed to mark video complete:', error);
      // Silent fail - don't disrupt user experience
    },
  });

  const handleProgress = useCallback(
    (state: { played: number }) => {
      // Mark as complete when user reaches 90% of video
      if (state.played >= 0.9 && !hasMarked90Percent && video?.id) {
        setHasMarked90Percent(true);
        void markVideoComplete({
          variables: {
            trainingVideoId: video.id,
          },
        });
      }
    },
    [video?.id, hasMarked90Percent, markVideoComplete]
  );

  return {
    completed,
    handleProgress,
  };
};

export default useVideoPlayerModal;
