/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { DocumentsQuery } from '#/views/evidence/grapqhl/queries/__generated__/documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { TableProps } from 'antd';

import AddDocuments from '#/components/form-components/documents/AddDocuments';
import {
  faFileArrowDown,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Input,
  Popconfirm,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from '../EvidenceList/ListEvidence.styles';

interface TableItem {
  fileUrl: string;
  key: string;
  name: string;
  tags: { id: string; name: string }[];
}

interface Props {
  addEvidence: boolean;
  createRights: boolean;
  data: DocumentsQuery | null | undefined;
  deleteRights: boolean;
  downloadRights: boolean;
  loading: boolean;
  onDelete: (value: string) => void;
  onTableChange: TableProps<TableItem>['onChange'];
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddEvidence: () => void;
  updateNewEvidenceList: MutationUpdaterFn<CreateDocumentsMutation>;
}

const EvidenceList = ({
  addEvidence,
  createRights,
  data,
  deleteRights,
  downloadRights,
  loading,
  onDelete,
  onTableChange,
  saving,
  search,
  setSearch,
  toggleAddEvidence,
  updateNewEvidenceList,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const tagIds = new Set(
    data?.documents.edges.flatMap(({ node: el }) => el.tags.map(({ id }) => id))
  );
  const tagData = data?.documents.edges.flatMap(({ node: el }) => ({
    text: el?.name || '',
    value: el?.id || '',
  }));
  const tagFilter = [...tagIds]
    .map((id) => tagData?.find(({ value: el }) => el === id))
    .map((el) => ({ text: el?.text || '', value: el?.value || '' }));

  return (
    // <div className="list-view">
    <div className={classes.page}>
      <Row className={classes.headerRow} gutter={8}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Evidence...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        {createRights && (
          <Col>
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleAddEvidence}
              type="primary"
            >
              <FormattedMessage defaultMessage="Add Evidence" />
            </Button>
          </Col>
        )}
      </Row>
      <Table<TableItem>
        columns={
          [
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              // width: 200,
            },
            {
              dataIndex: 'tags',
              filters: tagFilter.length > 0 ? tagFilter : undefined,
              key: 'tags',
              onFilter: (
                value: boolean | number | string,
                record: { tags: { id: string; name: string }[] }
              ) => record.tags.some(({ id }) => id === value),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              render: (value: { id: string; name: string }[]) =>
                value.map(({ id, name }, index) => (
                  <Link
                    key={id}
                    to={`/app/scheme-settings/tags/view/${id || ''}`}
                  >
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Tag color="red"> {index === 0 ? name : ` ${name}`}</Tag>
                  </Link>
                )),
              title: intl.formatMessage({
                defaultMessage: 'Tags',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },

            {
              dataIndex: 'fileUrl',
              key: 'fileUrl',
              render: (_, record) => (
                <Row gutter={8}>
                  {downloadRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Download',
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
                  )}
                  {deleteRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Remove Evidence',
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
                            defaultMessage: 'Remove the evidence?',
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
              width: 100,
            },
          ]
          //   .filter(
          //   (item) =>
          //     !(item.key === 'fileUrl' && (deleteRights || downloadRights))
          // )
        }
        dataSource={data?.documents.edges.map(({ node: evidence }) => ({
          fileUrl: evidence.url,
          key: evidence.id || '',
          name: evidence.name || 'File',
          tags: evidence.tags,
        }))}
        loading={loading}
        onChange={onTableChange}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          total: data?.documents.totalCount,
        }}
        size="small"
      />

      <Drawer
        destroyOnClose
        onClose={toggleAddEvidence}
        open={addEvidence}
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        width="600"
      >
        <AddDocuments
          isEvidence
          onClose={toggleAddEvidence}
          update={updateNewEvidenceList}
        />
      </Drawer>
    </div>
  );
};

export default EvidenceList;
