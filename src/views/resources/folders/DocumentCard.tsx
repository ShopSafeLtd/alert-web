import type { FileType } from '#/graphql/types';

import { getFileTypeIcon } from '#/utils/get-file-type-icon';
import { getPreviewStrategy, openInNewTab } from '#/utils/preview-document';
import {
  faArrowDown,
  faArrowsMaximize,
  faEye,
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
import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { useMarkDocumentViewedMutation } from '../../../graphql/engagement/mutations/__generated__/mark-document-viewed.generated';
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
    fileType?: FileType | null;
    id: string;
    name: string;
    tags: Array<{ id: string; name: string }>;
    thumbnailUrl?: null | string;
    url: string;
  };

  onDelete?: () => void;
  onPreview?: (data: Props['data']) => void;
}
const DocumentCard = ({ data, onDelete, onPreview }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [lightboxElement, setLightboxElement] = useState<string | undefined>(
    undefined
  );
  const hasTrackedPreview = useRef(false);
  const hasTrackedDownload = useRef(false);

  // Track document view silently
  const [markDocumentViewed] = useMarkDocumentViewedMutation({
    onError: () => {
      // Silent failure - don't block UI if tracking fails
    },
  });

  // Determine if this document has an image preview
  const hasImagePreview = !!(data?.thumbnailUrl || isImage(data?.url));

  // Get the appropriate icon for non-image documents
  const fileIcon = getFileTypeIcon(data?.name || '', data?.fileType);

  // Handle preview action
  const handlePreview = (event: React.MouseEvent) => {
    event.stopPropagation();

    // Track preview view
    if (data.id && !hasTrackedPreview.current) {
      hasTrackedPreview.current = true;
      void markDocumentViewed({
        variables: {
          documentId: data.id,
        },
      });
    }

    const strategy = getPreviewStrategy(data.name, data.url, data.fileType);

    if (strategy.method === 'lightbox') {
      // Open lightbox for images
      setLightboxElement(data.url);
    } else if (strategy.method === 'newTab') {
      // Open PDFs and unknown types in new tab
      openInNewTab(data.url);
    } else if (onPreview) {
      // Use parent's preview handler for office and media files
      onPreview(data);
    }
  };

  return (
    <div
      className={classes.card}
      onClick={handlePreview}
      role="button"
      tabIndex={0}
    >
      {hasImagePreview && (
        <div className={classes.expandBtn}>
          <FontAwesomeIcon
            className={classes.imageExpand}
            icon={faArrowsMaximize}
            onClick={() => setLightboxElement(data?.url)}
            // size="lg"
          />
        </div>
      )}
      {hasImagePreview ? (
        <div className={classes.image}>
          <WatermarkImage url={data?.url} />
        </div>
      ) : (
        <div className={classes.iconContainer}>
          <FontAwesomeIcon
            className={classes.fileIcon}
            icon={fileIcon}
            size="4x"
          />
        </div>
      )}

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
              defaultMessage: 'Preview Document',
            })}
          >
            <Button onClick={handlePreview} type="text">
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </Tooltip>
        </Col>

        <Divider style={{ height: 25, margin: 8 }} type="vertical" />

        <Col>
          <Tooltip
            placement="top"
            title={intl.formatMessage({
              defaultMessage: 'Download Document',
            })}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();

                // Track download view
                if (data.id && !hasTrackedDownload.current) {
                  hasTrackedDownload.current = true;
                  void markDocumentViewed({
                    variables: {
                      documentId: data.id,
                    },
                  });
                }

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
                  onClick={(e) => {
                    e.stopPropagation();
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
