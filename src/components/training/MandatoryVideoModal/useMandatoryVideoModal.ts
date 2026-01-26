import { gql, useMutation } from '@apollo/client';
import { notification } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import type { PendingVideo, VideoCompletionStatus } from './types';

import { useDismissTrainingVideoPromptMutation } from '../../../graphql/mutations/__generated__/dismiss-training-video-prompt.generated';

const MARK_TRAINING_VIDEO_COMPLETE = gql`
  mutation MarkTrainingVideoComplete($trainingVideoId: String!) {
    markTrainingVideoComplete(trainingVideoId: $trainingVideoId) {
      id
      trainingVideoId
      userId
      completedAt
    }
  }
`;

interface UseMandatoryVideoModalProps {
  onComplete: () => void;
  videos: PendingVideo[];
}

interface UseMandatoryVideoModalReturn {
  allMandatoryComplete: boolean;
  canProceed: boolean;
  completionStatus: Record<string, VideoCompletionStatus>;
  currentVideo: PendingVideo | null;
  handleContinue: () => void;
  handleDismiss: (videoId: string) => void;
  handleMarkComplete: (videoId: string) => void;
  handleProgress: (state: { played: number }) => void;
  handleVideoSelect: (videoId: string) => void;
  isCurrentVideoComplete: boolean;
  isMarking: boolean;
}

const useMandatoryVideoModal = ({
  onComplete,
  videos,
}: UseMandatoryVideoModalProps): UseMandatoryVideoModalReturn => {
  const intl = useIntl();
  const [currentVideoId, setCurrentVideoId] = useState<null | string>(null);
  const [completionStatus, setCompletionStatus] = useState<
    Record<string, VideoCompletionStatus>
  >({});
  const onCompleteCalledRef = useRef(false);

  // Initialize first video
  useEffect(() => {
    if (videos.length > 0 && !currentVideoId) {
      setCurrentVideoId(videos[0].id);
    }
  }, [videos, currentVideoId]);

  // Initialize completion status for all videos
  useEffect(() => {
    const initialStatus: Record<string, VideoCompletionStatus> = {};
    for (const video of videos) {
      initialStatus[video.id] = {
        hasWatched: false,
        progress: 0,
        videoId: video.id,
      };
    }
    setCompletionStatus(initialStatus);
  }, [videos]);

  // Reset the onComplete guard when videos change
  useEffect(() => {
    onCompleteCalledRef.current = false;
  }, [videos]);

  const [markComplete, { loading: isMarking }] = useMutation(
    MARK_TRAINING_VIDEO_COMPLETE,
    {
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Video marked as complete',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Success',
          }),
          placement: 'bottomRight',
        });
      },
      onError: () => {
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Failed to mark video as complete',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Error',
          }),
          placement: 'bottomRight',
        });
      },
    }
  );

  const [dismissPrompt] = useDismissTrainingVideoPromptMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Video dismissed',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Success',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Failed to dismiss video',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const currentVideo = useMemo(
    () => videos.find((v) => v.id === currentVideoId) || null,
    [videos, currentVideoId]
  );

  const isCurrentVideoComplete = useMemo(() => {
    if (!currentVideoId) return false;
    return completionStatus[currentVideoId]?.hasWatched || false;
  }, [currentVideoId, completionStatus]);

  const allMandatoryComplete = useMemo(() => {
    const mandatoryVideos = videos.filter((v) => v.mandatory);
    return mandatoryVideos.every(
      (v) => completionStatus[v.id]?.hasWatched || false
    );
  }, [videos, completionStatus]);

  const canProceed = useMemo(
    () =>
      // Can only proceed when all mandatory videos are completed
      allMandatoryComplete,
    [allMandatoryComplete]
  );

  const handleProgress = useCallback(
    (state: { played: number }) => {
      if (!currentVideoId) return;

      setCompletionStatus((prev) => {
        const currentStatus = prev[currentVideoId];

        if (currentStatus && !currentStatus.hasWatched && state.played >= 0.9) {
          // Mark as watched and trigger backend call
          void markComplete({
            variables: { trainingVideoId: currentVideoId },
          });

          return {
            ...prev,
            [currentVideoId]: {
              ...currentStatus,
              hasWatched: true,
              progress: 1,
            },
          };
        } else if (currentStatus) {
          // Update progress
          return {
            ...prev,
            [currentVideoId]: {
              ...currentStatus,
              progress: state.played,
            },
          };
        }

        return prev;
      });
    },
    [currentVideoId, markComplete]
  );

  const handleMarkComplete = useCallback(
    (videoId: string) => {
      setCompletionStatus((prev) => ({
        ...prev,
        [videoId]: {
          ...prev[videoId],
          hasWatched: true,
          progress: 1,
        },
      }));

      void markComplete({
        variables: { trainingVideoId: videoId },
      });
    },
    [markComplete]
  );

  const handleDismiss = useCallback(
    (videoId: string) => {
      const video = videos.find((v) => v.id === videoId);
      if (video?.mandatory) {
        notification.warning({
          description: intl.formatMessage({
            defaultMessage: 'This video is mandatory and cannot be dismissed',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Cannot dismiss',
          }),
          placement: 'bottomRight',
        });
        return;
      }

      setCompletionStatus((prev) => ({
        ...prev,
        [videoId]: {
          ...prev[videoId],
          hasWatched: true,
          progress: 1,
        },
      }));

      void dismissPrompt({
        variables: { trainingVideoId: videoId },
      });
    },
    [videos, dismissPrompt, intl]
  );

  const handleVideoSelect = useCallback((videoId: string) => {
    setCurrentVideoId(videoId);
  }, []);

  const handleContinue = useCallback(() => {
    if (canProceed) {
      onComplete();
    }
  }, [canProceed, onComplete]);

  // Automatically continue when all mandatory videos are complete
  useEffect(() => {
    if (allMandatoryComplete && !onCompleteCalledRef.current) {
      onCompleteCalledRef.current = true;
      onComplete();
    }
  }, [allMandatoryComplete, onComplete]);

  return {
    allMandatoryComplete,
    canProceed,
    completionStatus,
    currentVideo,
    handleContinue,
    handleDismiss,
    handleMarkComplete,
    handleProgress,
    handleVideoSelect,
    isCurrentVideoComplete,
    isMarking,
  };
};

export default useMandatoryVideoModal;
