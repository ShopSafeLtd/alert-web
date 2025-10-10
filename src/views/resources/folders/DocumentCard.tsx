import {
  faArrowDown,
  faArrowsMaximize,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Divider,
  Modal,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import useStyles from './DocumentCard.styles';
const { Paragraph } = Typography;
const { confirm } = Modal;

const isImage = (url: string | undefined) => {
  if (url) {
    const ext = url.split('.').pop();
    return ext === 'jpg' || ext === 'png' || ext === 'jpeg';
  }
  return false;
};

interface Props {
  data: {
    createdAt: Date;
    id: string;
    name: string;
    tags: Array<{ id: string; name: string }>;
    thumbnailUrl?: null | string;
    url: string;
  };

  onDelete?: () => void;
}
const DocumentCard = ({ data, onDelete }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [lightboxElement, setLightboxElement] = useState<string | undefined>(
    undefined
  );

  return (
    <div className={classes.card}>
      <div className={classes.expandBtn}>
        <FontAwesomeIcon
          className={classes.imageExpand}
          icon={faArrowsMaximize}
          onClick={() =>
            setLightboxElement(
              data?.thumbnailUrl || isImage(data?.url) ? data?.url : undefined
            )
          }
          // size="lg"
        />
      </div>
      <div className={classes.image}>
        <WatermarkImage
          url={data?.thumbnailUrl || isImage(data?.url) ? data?.url : undefined}
        />
      </div>

      <div className={classes.content}>
        <Paragraph className={classes.title} ellipsis={{ rows: 2 }}>
          {data?.name}
        </Paragraph>
        {data?.tags && data.tags.length > 0 ? (
          <Row wrap={false}>
            {data.tags.slice(0, 2).map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
            {data.tags.length > 1 && (
              <Tag>
                {intl.formatMessage(
                  {
                    defaultMessage: '+ {num} more',
                  },
                  {
                    num: data.tags.length - 2,
                  }
                )}
              </Tag>
            )}
          </Row>
        ) : (
          <div />
        )}
      </div>
      <Row className={classes.btnRow} gutter={10} justify="space-evenly">
        <Col>
          <Tooltip
            placement="top"
            title={intl.formatMessage({
              defaultMessage: 'Download Document',
            })}
          >
            <Button
              onClick={() => {
                void (async () => {
                  try {
                    // Fetch the file from Azure Blob Storage
                    const response = await fetch(data?.url);
                    const blob = await response.blob();

                    // Create a temporary URL for the blob
                    const blobUrl = window.URL.createObjectURL(blob);

                    // Create a temporary anchor element and trigger download
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = data?.name || 'download';
                    document.body.append(link);
                    link.click();

                    // Clean up
                    link.remove();
                    window.URL.revokeObjectURL(blobUrl);
                  } catch (error) {
                    console.error('Download failed:', error);
                    // Fallback to opening in new tab
                    window.open(data?.url, '_blank');
                  }
                })();
              }}
              type="text"
            >
              <FontAwesomeIcon icon={faArrowDown} size="lg" />
            </Button>
          </Tooltip>
        </Col>

        {onDelete && (
          <>
            <Divider style={{ height: 25, margin: 8 }} type="vertical" />
            <Col>
              <Tooltip
                placement="top"
                title={intl.formatMessage({
                  defaultMessage: 'Delete Document',
                })}
              >
                <Button
                  onClick={() => {
                    confirm({
                      content: intl.formatMessage({
                        defaultMessage:
                          'Click delete if you wish to delete this document.',
                      }),
                      okText: intl.formatMessage({
                        defaultMessage: 'Delete',
                      }),
                      onOk: () => onDelete(),
                      title: intl.formatMessage({
                        defaultMessage: 'Are you sure?',
                      }),
                    });
                  }}
                  type="text"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="lg"
                    style={{ color: 'red' }}
                  />
                </Button>
              </Tooltip>
            </Col>
          </>
        )}
      </Row>
      {lightboxElement && (
        <Lightbox
          close={() => setLightboxElement(undefined)}
          controller={{
            closeOnBackdropClick: true,
          }}
          index={0}
          open={!!lightboxElement}
          plugins={[Zoom]}
          slides={[{ src: lightboxElement }]}
        />
      )}
    </div>
  );
};

export default DocumentCard;
