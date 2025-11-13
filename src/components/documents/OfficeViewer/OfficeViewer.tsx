import type { FileType } from '#/graphql/types';

import { getMicrosoftViewerUrl } from '#/utils/preview-document';
import { faArrowDown, faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Modal, Row, Space, Spin, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useStyles from './OfficeViewer.styles';

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

const OfficeViewer = ({ data, onClose, visible }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const viewerUrl = getMicrosoftViewerUrl(data.url);

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
      width="80%"
    >
      <Row gutter={16}>
        <Col lg={6} md={24} sm={24} xs={24}>
          <div className={classes.metadata}>
            <Title level={4}>{data.name}</Title>

            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
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
          <div className={classes.viewerContainer}>
            {loading && (
              <div className={classes.loadingContainer}>
                <Spin size="large" />
                <Text style={{ marginTop: 16 }} type="secondary">
                  {intl.formatMessage({ defaultMessage: 'Loading preview...' })}
                </Text>
              </div>
            )}
            <iframe
              className={classes.iframe}
              onLoad={() => setLoading(false)}
              src={viewerUrl}
              style={{ display: loading ? 'none' : 'block' }}
              title={data.name}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default OfficeViewer;
