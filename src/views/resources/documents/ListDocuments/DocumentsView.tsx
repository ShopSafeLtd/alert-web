import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Image,
  Menu,
  Row,
  Skeleton,
  Table,
} from 'antd';
import AddDocument from 'components/form-components/documents/AddDocument';

import TabContent from 'components/TabContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';
import type { Props } from './types/Documents';

const isImage = (url: string) => {
  const ext = url.split('.').pop();
  return ext === 'jpg' || ext === 'png' || ext === 'jpeg';
};
const DocumentsView = ({
  data,
  toggleAddDocument,
  addDocument,
  loading,
  isAdmin,
}: Props) => {
  const tags = new Set(
    data?.scheme?.documents?.flatMap((document) =>
      document.tags.map((tag) => tag.name)
    ) || []
  );
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
            {isAdmin && (
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        label: 'Add Document',
                        key: '5',
                        icon: (
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ marginRight: 5 }}
                          />
                        ),
                        // disabled: !listVehiclesData?.listVehicles.total,
                        onClick: () => toggleAddDocument(),
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
                  Documents
                </Button>
              </Dropdown>
            )}
          </Col>
        </Row>
        <Table
          loading={loading}
          columns={[
            {
              title: 'Thumbnail',
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              render: (thumbnail: string | null | undefined) =>
                thumbnail ? (
                  <Image src={thumbnail} width={180} alt="thumbnail" />
                ) : (
                  <Skeleton.Image style={{ width: 180 }} />
                ),
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Tags',
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
              render: (fileUrl: string) => (
                <Button
                  type="link"
                  onClick={() => {
                    window.open(fileUrl);
                  }}
                >
                  Download
                </Button>
              ),
            },
          ]}
          size="small"
          dataSource={
            data?.scheme?.documents?.map((document) => ({
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
      <Drawer
        title="Add Evidence"
        visible={addDocument}
        width="800"
        onClose={toggleAddDocument}
        zIndex={1001}
      >
        {addDocument ? <AddDocument onClose={toggleAddDocument} /> : <div />}
      </Drawer>
    </TabContent>
  );
};

export default DocumentsView;
