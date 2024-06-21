import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faMagnifyingGlass,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import type { ViewProps } from './types/Documents';

const isImage = (url: string) => {
  const ext = url.split('.').pop();
  return ext === 'jpg' || ext === 'png' || ext === 'jpeg';
};
const DocumentsView = ({
  data,
  toggleAddDemDocument,
  toggleAddDocument,
  demId,
  onDeleteDocument,
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
                      label: intl.formatMessage({
                        defaultMessage: 'Add Evidence',
                      }),
                      key: '5',
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      onClick: toggleAddDocument,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Import DEM Evidence',
                      }),
                      key: '6',
                      disabled: !demId,
                      icon: (
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          style={{ marginRight: 5 }}
                        />
                      ),
                      onClick: toggleAddDemDocument,
                    },
                  ]}
                />
              }
            >
              <Button
                key="2"
                type="primary"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
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
              title: intl.formatMessage({
                defaultMessage: 'Thumbnail',
              }),
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              // eslint-disable-next-line
              render: (thumbnail: string | null | undefined) =>
                thumbnail ? (
                  <Image src={thumbnail} width={180} alt="thumbnail" />
                ) : (
                  <Skeleton.Image style={{ width: 180 }} />
                ),
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'Tags',
              }),
              dataIndex: 'tags',
              key: 'tags',
              filters: tagsArray.map((tag) => ({
                text: tag,
                value: tag,
              })),
              onFilter: (
                value: string | number | boolean,
                record: { tags: { text: string }[] }
              ) => record.tags.some((tag) => tag.text === value),

              render: (origTags: { text: string; value: string }[]) =>
                origTags.map((tag) => tag.text).join(', '),
            },
            // download button
            {
              title: '',
              dataIndex: 'fileUrl',
              key: 'fileUrl',
              render: (fileUrl: string, item) => (
                <Row gutter={8}>
                  <Col>
                    <Button
                      onClick={() => {
                        window.open(fileUrl);
                      }}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </Button>
                  </Col>
                  <Col>
                    <Popconfirm
                      title={intl.formatMessage({
                        defaultMessage: 'Are you sure?',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                      onConfirm={() => onDeleteDocument(item.key)}
                    >
                      <Button>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              ),
            },
          ]}
          size="small"
          dataSource={
            data?.map((document) => ({
              key: document.id,
              thumbnail:
                document.thumbnailUrl ||
                (isImage(document.url) ? document.url : undefined),
              fileUrl: document.url,
              name: document.name,
              tags: document.tags.map((tag) => ({
                text: tag.name,
                value: tag.name,
              })),
            })) || []
          }
        />
      </Card>
    </TabContent>
  );
};

export default DocumentsView;
