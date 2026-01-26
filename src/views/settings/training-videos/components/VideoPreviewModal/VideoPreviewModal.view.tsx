import { Modal, Space, Tag, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import type { TrainingVideo } from '../../types';

const { Paragraph, Text, Title } = Typography;

interface VideoPreviewModalViewProps {
  onClose: () => void;
  video: TrainingVideo;
  visible: boolean;
}

const VideoPreviewModalView: React.FC<VideoPreviewModalViewProps> = ({
  onClose,
  video,
  visible,
}) => {
  const intl = useIntl();

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

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      open={visible}
      title={<FormattedMessage defaultMessage="Video Preview" />}
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

export default VideoPreviewModalView;
