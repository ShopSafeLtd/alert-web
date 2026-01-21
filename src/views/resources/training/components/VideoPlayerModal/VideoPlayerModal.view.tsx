import { CheckCircleOutlined } from '@ant-design/icons';
import { faLink } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Space, Tag, Tooltip, Typography, message } from 'antd';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import type { TrainingVideo } from '../../ListVideos/useListVideos';

import useVideoPlayerModal from './useVideoPlayerModal';

const { Paragraph, Text, Title } = Typography;

interface VideoPlayerModalProps {
  onClose: () => void;
  video: TrainingVideo | null;
  visible: boolean;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  onClose,
  video,
  visible,
}) => {
  const intl = useIntl();
  const { completed, handleProgress } = useVideoPlayerModal({ video });

  if (!video) return null;

  const formatDate = (dateString: Date | string): string => {
    if (dateString instanceof Date) {
      dateString = dateString.toLocaleDateString(intl.locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }

    const date = new Date(dateString);
    return date.toLocaleDateString(intl.locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const generateShareLink = (): string =>
    `${window.location.origin}/app/resources/training?videoId=${video.id}`;

  const handleCopyLink = (): void => {
    void message.success(
      intl.formatMessage({ defaultMessage: 'Link copied to clipboard!' })
    );
  };

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      open={visible}
      title={
        <Space>
          <FormattedMessage defaultMessage="Training Video" />
          {completed && (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              <FormattedMessage defaultMessage="Completed" />
            </Tag>
          )}
          <CopyToClipboard onCopy={handleCopyLink} text={generateShareLink()}>
            <Tooltip
              title={intl.formatMessage({ defaultMessage: 'Copy link' })}
            >
              <Button
                icon={<FontAwesomeIcon icon={faLink} />}
                size="small"
                type="text"
              />
            </Tooltip>
          </CopyToClipboard>
        </Space>
      }
      width="80%"
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div
          style={{
            backgroundColor: '#000',
            paddingTop: '56.25%',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
          >
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
              url={video.videoUrl}
              width="100%"
            />
          </div>
        </div>

        <div>
          <Title level={3} style={{ marginBottom: '8px' }}>
            {video.title}
          </Title>

          {video.description && (
            <Paragraph style={{ marginBottom: '16px' }}>
              {video.description}
            </Paragraph>
          )}

          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div>
              <Text type="secondary">
                <FormattedMessage
                  defaultMessage="{count} views"
                  values={{ count: video.viewCount }}
                />
              </Text>
            </div>

            <div>
              <Text type="secondary">
                <FormattedMessage
                  defaultMessage="Uploaded on {date}"
                  values={{ date: formatDate(video.createdAt) }}
                />
              </Text>
            </div>

            {video.tags && video.tags.length > 0 && (
              <div
                style={{ alignItems: 'center', display: 'flex', gap: '8px' }}
              >
                <Text type="secondary">
                  <FormattedMessage defaultMessage="Tags:" />
                </Text>
                {video.tags.map((tag) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </div>
            )}
          </Space>
        </div>
      </Space>
    </Modal>
  );
};

export default VideoPlayerModal;
