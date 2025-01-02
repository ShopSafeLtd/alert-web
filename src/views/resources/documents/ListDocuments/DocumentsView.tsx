import {
  faFileArrowDown,
  faMagnifyingGlass,
  faPage,
  faPlus,
  faTrash,
  faUpload,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Image,
  Menu,
  Popconfirm,
  Row,
  Skeleton,
  Table,
  Tooltip,
} from 'antd';
import TabContent from 'components/TabContent';
import AddDocument from 'components/form-components/documents/AddDocument';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { Props } from './types/Documents';
interface TableItem {
  fileUrl: string;
  key: string;
  name: string;
  tags: { text: string; value: string }[];
  thumbnail: string | undefined;
}
const isImage = (url: string) => {
  const ext = url.split('.').pop();
  return ext === 'jpg' || ext === 'png' || ext === 'jpeg';
};
const DocumentsView = ({
  addDocument,
  addRights,
  data,
  deleteRights,
  loading,
  onDelete,
  saving,
  toggleAddDocument,
}: Props) => {
  const tags = new Set(
    data?.scheme?.documents?.flatMap((document) =>
      document.tags.map((tag) => tag.name)
    ) || []
  );
  // convert tags to string array
  const tagsArray = [...tags];
  const intl = useIntl();
  const navigate = useNavigate();
  const dropdownItems = [
    {
      icon: (
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: 5 }} />
      ),
      key: '5',
      label: intl.formatMessage({
        defaultMessage: 'Add Document',
      }),
      // disabled: !listVehiclesData?.listVehicles.total,
      onClick: () => toggleAddDocument(),
    },

    {
      icon: (
        <FontAwesomeIcon icon={faUpload} size="1x" style={{ marginRight: 8 }} />
      ),
      key: '3',
      label: intl.formatMessage({
        defaultMessage: 'Upload',
      }),
      // disabled: !listVehiclesData?.listVehicles.total,
      onClick: () => toggleAddDocument(),
    },
  ];
  const mg11Button = {
    icon: (
      <FontAwesomeIcon icon={faPage} size="1x" style={{ marginRight: 8 }} />
    ),
    key: '1',
    label: intl.formatMessage({
      defaultMessage: 'Create MG11',
    }),

    // disabled: !listVehiclesData?.listVehicles.total,
    onClick: () => navigate('/app/mg11/create/'),
  };

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
            {addRights && (
              <Dropdown
                overlay={
                  <Menu
                    items={
                      data?.scheme.mg11Available
                        ? [...dropdownItems, mg11Button]
                        : dropdownItems
                    }
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
                    defaultMessage: 'Add Document',
                  })}
                </Button>
              </Dropdown>
            )}
          </Col>
        </Row>
        <Table<TableItem>
          columns={[
            {
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              render: (thumbnail: null | string | undefined) =>
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
              onFilter: (value: boolean | number | string, record: TableItem) =>
                record.tags.some((tag) => tag.text === value),
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
              render: (_, record: TableItem) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Download Document',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faFileArrowDown} />}
                        onClick={() => {
                          window.open(record.fileUrl);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>

                  {deleteRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Delete Document',
                        })}
                      >
                        <Popconfirm
                          cancelText={intl.formatMessage({
                            defaultMessage: 'No',
                          })}
                          okText={intl.formatMessage({
                            defaultMessage: 'Yes',
                          })}
                          onConfirm={() => {
                            onDelete(record.key);
                          }}
                          overlayInnerStyle={{ padding: 10 }}
                          placement="topLeft"
                          title={intl.formatMessage({
                            defaultMessage: 'Delete the document?',
                          })}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            size="small"
                          />
                        </Popconfirm>
                      </Tooltip>
                    </Col>
                  )}
                </Row>
              ),
              title: '',
            },
          ]}
          dataSource={
            data?.scheme?.documents?.map((document) => ({
              fileUrl: document.url,
              key: document.id,
              name: document.name,
              tags: document.tags.map((tag) => ({
                text: tag.name,
                value: tag.name,
              })),
              thumbnail:
                document.thumbnailUrl ||
                (isImage(document.url) ? document.url : undefined),
            })) || []
          }
          loading={loading}
          size="small"
        />
      </Card>
      <Drawer
        onClose={toggleAddDocument}
        open={addDocument}
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        width="800"
        zIndex={1001}
      >
        {addDocument ? <AddDocument onClose={toggleAddDocument} /> : <div />}
      </Drawer>
    </TabContent>
  );
};

export default DocumentsView;
