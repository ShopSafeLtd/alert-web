import type { FileType } from '#/graphql/types';

import { faArrowDown, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Modal, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import useStyles from './MediaViewer.styles';

const { Text, Title } = Typography;

interface Props {
  data: {
    createdAt: Date;
    fileType?: FileType | null;
    id: string;
    name: string;
    tags: Array<{ id: string; name: string }>;
    url: string;
  };
  onClose: () => void;
  visible: boolean;
}

const MediaViewer = ({ data, onClose, visible }: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  const isVideo =
    data.fileType === 'VIDEO' ||
    !!/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/.test(data.name.toLowerCase());

  const handleDownload = async () => {
    try {
      const response = await fetch(data.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = data.name || 'download';
      document.body.append(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(data.url, '_blank');
    }
  };

  const handleOpenInNewTab = () => {
    window.open(data.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      className={classes.modal}
      footer={null}
      onCancel={onClose}
      open={visible}
      title={null}
      width="70%"
    >
      <Row gutter={16}>
        <Col lg={6} md={24} sm={24} xs={24}>
          <div className={classes.metadata}>
            <Title level={4}>{data.name}</Title>

            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>
                  {intl.formatMessage({ defaultMessage: 'Type' })}
                </Text>
                <br />
                <Text type="secondary">
                  {isVideo
                    ? intl.formatMessage({ defaultMessage: 'Video' })
                    : intl.formatMessage({ defaultMessage: 'Audio' })}
                </Text>
              </div>

              <div>
                <Text strong>
                  {intl.formatMessage({ defaultMessage: 'Created' })}
                </Text>
                <br />
                <Text type="secondary">
                  {new Date(data.createdAt).toLocaleDateString()}
                </Text>
              </div>

              {data.tags && data.tags.length > 0 && (
                <div>
                  <Text strong>
                    {intl.formatMessage({ defaultMessage: 'Tags' })}
                  </Text>
                  <br />
                  <Space size="small" style={{ marginTop: 8 }} wrap>
                    {data.tags.map((tag) => (
                      <Tag key={tag.id}>{tag.name}</Tag>
                    ))}
                  </Space>
                </div>
              )}

              <div className={classes.actions}>
                <Button
                  block
                  icon={<FontAwesomeIcon icon={faArrowDown} />}
                  onClick={() => {
                    void handleDownload();
                  }}
                  type="primary"
                >
                  {intl.formatMessage({ defaultMessage: 'Download' })}
                </Button>

                <Button
                  block
                  icon={<FontAwesomeIcon icon={faExternalLink} />}
                  onClick={handleOpenInNewTab}
                >
                  {intl.formatMessage({ defaultMessage: 'Open in New Tab' })}
                </Button>
              </div>
            </Space>
          </div>
        </Col>

        <Col lg={18} md={24} sm={24} xs={24}>
          <div className={classes.playerContainer}>
            <ReactPlayer
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                  forceVideo: isVideo,
                },
              }}
              controls
              height={isVideo ? '100%' : '60px'}
              url={data.url}
              width="100%"
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default MediaViewer;
