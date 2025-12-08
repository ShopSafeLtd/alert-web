import { CheckCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Progress, Tag, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import type { PendingVideo, VideoCompletionStatus } from './types';

import useStyles from './MandatoryVideoModal.styles';

const { Paragraph, Text, Title } = Typography;

interface MandatoryVideoModalProps {
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
  videos: PendingVideo[];
  visible: boolean;
}

const MandatoryVideoModal: React.FC<MandatoryVideoModalProps> = ({
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
  videos,
  visible,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  if (!visible || videos.length === 0) return null;

  const mandatoryVideos = videos.filter((v) => v.mandatory);
  const optionalVideos = videos.filter((v) => !v.mandatory);

  const formatDuration = (duration?: null | number): string => {
    if (!duration) return '';
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      closable={false}
      footer={null}
      keyboard={false}
      maskClosable={false}
      open={visible}
      title={
        <div className={classes.header}>
          <span>
            <FormattedMessage defaultMessage="Training Videos" />
          </span>
          <Badge
            color={allMandatoryComplete ? 'green' : 'orange'}
            count={
              allMandatoryComplete
                ? intl.formatMessage({ defaultMessage: 'All Complete' })
                : intl.formatMessage(
                    {
                      defaultMessage: '{count} Required',
                    },
                    {
                      count: mandatoryVideos.filter(
                        (v) => !completionStatus[v.id]?.hasWatched
                      ).length,
                    }
                  )
            }
          />
        </div>
      }
      width="90%"
    >
      <div className={classes.container}>
        <div className={classes.content}>
          {/* Video Player Section */}
          <div className={classes.player}>
            {currentVideo && (
              <>
                <div className={classes.playerContainer}>
                  <div className={classes.playerWrapper}>
                    <ReactPlayer
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                          },
                          forceVideo: true,
                        },
                      }}
                      controls
                      height="100%"
                      onProgress={handleProgress}
                      url={currentVideo.videoUrl}
                      width="100%"
                    />
                  </div>
                </div>

                <div className={classes.videoInfo}>
                  <Title className={classes.playerTitle} level={4}>
                    {currentVideo.title}
                    {currentVideo.mandatory && (
                      <Tag className={classes.mandatoryBadge} color="red">
                        <FormattedMessage defaultMessage="Required" />
                      </Tag>
                    )}
                  </Title>

                  {currentVideo.description && (
                    <Paragraph className={classes.playerDescription}>
                      {currentVideo.description}
                    </Paragraph>
                  )}

                  {!isCurrentVideoComplete && (
                    <Progress
                      className={classes.progressBar}
                      percent={Math.round(
                        (completionStatus[currentVideo.id]?.progress || 0) * 100
                      )}
                      status="active"
                    />
                  )}

                  <div className={classes.videoActions}>
                    {currentVideo.mandatory ? (
                      <Button
                        disabled={!isCurrentVideoComplete}
                        loading={isMarking}
                        onClick={() => handleMarkComplete(currentVideo.id)}
                        type="primary"
                      >
                        <FormattedMessage defaultMessage="Mark Complete" />
                      </Button>
                    ) : (
                      <>
                        <Button
                          loading={isMarking}
                          onClick={() => handleMarkComplete(currentVideo.id)}
                          type="primary"
                        >
                          <FormattedMessage defaultMessage="Mark Complete" />
                        </Button>
                        <Button onClick={() => handleDismiss(currentVideo.id)}>
                          <FormattedMessage defaultMessage="Skip" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Video List Section */}
          <div className={classes.videoList}>
            <div className={classes.videoListHeader}>
              <FormattedMessage defaultMessage="Videos" />
            </div>

            {mandatoryVideos.length > 0 && (
              <>
                <Text className={classes.videoTitle} type="secondary">
                  <FormattedMessage defaultMessage="Required Videos" />
                </Text>
                {mandatoryVideos.map((video) => {
                  const isComplete = completionStatus[video.id]?.hasWatched;
                  const isActive = currentVideo?.id === video.id;

                  return (
                    <div
                      className={`${classes.listItem} ${
                        isActive ? classes.listItemActive : ''
                      }`}
                      key={video.id}
                      onClick={() => handleVideoSelect(video.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleVideoSelect(video.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={classes.videoListItemContent}>
                        <div className={classes.videoListItemIcon}>
                          {isComplete ? (
                            <CheckCircleOutlined
                              className={classes.completedIcon}
                            />
                          ) : (
                            <PlayCircleOutlined />
                          )}
                        </div>
                        <div className={classes.videoListItemText}>
                          <div className={classes.videoListItemTitle}>
                            {video.title}
                          </div>
                          {video.duration && (
                            <Text type="secondary">
                              {formatDuration(video.duration)}
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {optionalVideos.length > 0 && (
              <>
                <Text
                  className={classes.videoTitle}
                  style={{ marginTop: '16px' }}
                  type="secondary"
                >
                  <FormattedMessage defaultMessage="Optional Videos" />
                </Text>
                {optionalVideos.map((video) => {
                  const isComplete = completionStatus[video.id]?.hasWatched;
                  const isActive = currentVideo?.id === video.id;

                  return (
                    <div
                      className={`${classes.listItem} ${
                        isActive ? classes.listItemActive : ''
                      }`}
                      key={video.id}
                      onClick={() => handleVideoSelect(video.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleVideoSelect(video.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={classes.videoListItemContent}>
                        <div className={classes.videoListItemIcon}>
                          {isComplete ? (
                            <CheckCircleOutlined
                              className={classes.completedIcon}
                            />
                          ) : (
                            <PlayCircleOutlined />
                          )}
                        </div>
                        <div className={classes.videoListItemText}>
                          <div className={classes.videoListItemTitle}>
                            {video.title}
                          </div>
                          {video.duration && (
                            <Text type="secondary">
                              {formatDuration(video.duration)}
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={classes.footer}>
          <Text type="secondary">
            {allMandatoryComplete ? (
              <FormattedMessage defaultMessage="All required videos completed. You may continue to the application." />
            ) : (
              <FormattedMessage
                defaultMessage="{count} required {count, plural, one {video} other {videos}} remaining. Watch to 90% completion to proceed."
                values={{
                  count: mandatoryVideos.filter(
                    (v) => !completionStatus[v.id]?.hasWatched
                  ).length,
                }}
              />
            )}
          </Text>
          <Button
            className={classes.continueButton}
            disabled={!canProceed}
            onClick={handleContinue}
            size="large"
            type="primary"
          >
            <FormattedMessage defaultMessage="Continue to Application" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MandatoryVideoModal;
