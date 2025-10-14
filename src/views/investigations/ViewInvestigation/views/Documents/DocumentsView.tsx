import {
  faDownload,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Menu,
  Popconfirm,
  Row,
  Skeleton,
  Table,
} from 'antd';
import TabContent from 'components/TabContent';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ViewProps } from './types/Documents';

const isImage = (url: string) => {
  const ext = url.split('.').pop();
  return ext === 'jpg' || ext === 'png' || ext === 'jpeg';
};
const DocumentsView = ({
  data,
  demId,
  onDeleteDocument,
  toggleAddDemDocument,
  toggleAddDocument,
}: ViewProps) => {
  const tags = new Set(
    data?.flatMap((document) => document.tags.map((tag) => tag.name)) || []
  );
  const intl = useIntl();
  // convert tags to string array
  const tagsArray = [...tags];

  return (
    <TabContent>
      <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Col>
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      key: '5',
                      label: intl.formatMessage({
                        defaultMessage: 'Add Evidence',
                      }),
                      onClick: toggleAddDocument,
                    },
                    {
                      disabled: !demId,
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      key: '6',
                      label: intl.formatMessage({
                        defaultMessage: 'Import DEM Evidence',
                      }),
                      onClick: toggleAddDemDocument,
                    },
                  ]}
                />
              }
            >
              <Button
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                key="2"
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Documents',
                })}
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Table
          columns={[
            {
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              // eslint-disable-next-line
              render: (thumbnail: string | null | undefined) =>
                thumbnail ? (
                  <Image alt="thumbnail" src={thumbnail} width={180} />
                ) : (
                  <Skeleton.Image style={{ width: 180 }} />
                ),
              title: intl.formatMessage({
                defaultMessage: 'Thumbnail',
              }),
            },
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'tags',
              filters: tagsArray.map((tag) => ({
                text: tag,
                value: tag,
              })),
              key: 'tags',
              onFilter: (
                value: boolean | number | string,
                record: { tags: { text: string }[] }
              ) => record.tags.some((tag) => tag.text === value),
              render: (origTags: { text: string; value: string }[]) =>
                origTags.map((tag) => tag.text).join(', '),

              title: intl.formatMessage({
                defaultMessage: 'Tags',
              }),
            },
            // download button
            {
              dataIndex: 'fileUrl',
              key: 'fileUrl',
              render: (fileUrl: string, item) => (
                <Row gutter={8}>
                  <Col>
                    <Button
                      onClick={() => {
                        void (async () => {
                          try {
                            // Fetch the file from Azure Blob Storage
                            const response = await fetch(fileUrl);
                            const blob = await response.blob();

                            // Create a temporary URL for the blob
                            const blobUrl = window.URL.createObjectURL(blob);

                            // Create a temporary anchor element and trigger download
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = item.name || 'download';
                            document.body.append(link);
                            link.click();

                            // Clean up
                            link.remove();
                            window.URL.revokeObjectURL(blobUrl);
                          } catch (error) {
                            console.error('Download failed:', error);
                            // Fallback to opening in new tab
                            window.open(fileUrl, '_blank');
                          }
                        })();
                      }}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </Button>
                  </Col>
                  <Col>
                    <Popconfirm
                      onConfirm={() => onDeleteDocument(item.key)}
                      overlayInnerStyle={{ padding: 10 }}
                      title={intl.formatMessage({
                        defaultMessage: 'Are you sure?',
                      })}
                    >
                      <Button>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              ),
              title: '',
            },
          ]}
          dataSource={
            data?.map((document) => ({
              fileUrl: document.url,
              key: document.id,
              name: document.name,
              tags: document.tags.map((tag) => ({
                text: tag.name,
                value: tag.name,
              })),
              thumbnail:
                // document.articles[0].previewImage ||
                document.thumbnailUrl ||
                (isImage(document.url) ? document.url : undefined),
            })) || []
          }
          size="small"
        />
      </Card>
    </TabContent>
  );
};

export default DocumentsView;
