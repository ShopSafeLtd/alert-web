/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
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

import type { CreateDocumentMutation } from 'graphql/generated';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowDown,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import type { MutationUpdaterFn } from '@apollo/client';
import { Link } from 'react-router-dom';
import AddDocument from '#/components/form-components/documents/AddDocument';
import useStyles from '../EvidenceList/ListEvidence.styles';

interface Props {
  data:
    | {
        node: {
          id: string;
          name: string;
          url: string;
          description?: string | null;
          fileType?: string | null;
          tags: Array<{
            __typename?: 'Tag';
            id: string;
            name: string;
          }>;
        };
      }[]
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addEvidence: boolean;
  toggleAddEvidence: () => void;
  saving: boolean;
  onDelete: (value: string) => void;
  updateNewEvidenceList: MutationUpdaterFn<CreateDocumentMutation>;
  deleteRights: boolean;
  createRights: boolean;
  downloadRights: boolean;
}

const EvidenceList = ({
  data,
  loading,
  search,
  setSearch,
  addEvidence,
  toggleAddEvidence,
  updateNewEvidenceList,
  saving,
  onDelete,
  deleteRights,
  createRights,
  downloadRights,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const tagIds = new Set(
    data?.flatMap(({ node: el }) => el.tags.map(({ id }) => id))
  );
  const tagData = data?.flatMap(({ node: el }) => ({
    text: el?.name || '',
    value: el?.id || '',
  }));
  const tagFilter = [...tagIds]
    .map((id) => tagData?.find(({ value: el }) => el === id))
    .map((el) => ({ text: el?.text || '', value: el?.value || '' }));

  return (
    // <div className="list-view">
    <div className={classes.page}>
      <Row gutter={8} className={classes.headerRow}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Evidences...',
              id: 'UWCkbC',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        {createRights && (
          <Col>
            <Button
              type="primary"
              onClick={toggleAddEvidence}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              <FormattedMessage defaultMessage="Add Evidence" id="vgVasT" />
            </Button>
          </Col>
        )}
      </Row>
      <Table
        size="small"
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={
          [
            {
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              }),
              dataIndex: 'name',
              // width: 200,
            },
            {
              key: 'tags',
              title: intl.formatMessage({
                defaultMessage: 'Tags',
                id: '1EYCdR',
              }),
              dataIndex: 'tags',
              filters: tagFilter.length > 0 ? tagFilter : undefined,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onFilter: (
                value: string | number | boolean,
                record: { tags: { id: string; name: string }[] }
              ) => record.tags.some(({ id }) => id === value),
              render: (value: { id: string; name: string }[]) =>
                value.map(({ id, name }, index) => (
                  <Link to={`/app/scheme-settings/tags/view/${id || ''}`}>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Tag color="red"> {index === 0 ? name : ` ${name}`}</Tag>
                  </Link>
                )),
            },
            {
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
                id: 'Q8Qw5B',
              }),
              dataIndex: 'description',
              ellipsis: true,
            },

            {
              title: '',
              dataIndex: 'fileUrl',
              key: 'fileUrl',
              width: 100,
              render: (_, record) => (
                <Row gutter={8}>
                  {downloadRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Download',
                          id: '5q3qC0',
                        })}
                      >
                        <Button
                          size="small"
                          disabled={saving}
                          onClick={() => {
                            window.open(record.fileUrl);
                          }}
                          icon={<FontAwesomeIcon icon={faFileArrowDown} />}
                        />
                      </Tooltip>
                    </Col>
                  )}
                  {deleteRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Remove Evidence',
                          id: 'K9MTKE',
                        })}
                      >
                        <Popconfirm
                          placement="topLeft"
                          title={intl.formatMessage({
                            defaultMessage: 'Remove the evidence?',
                            id: 'IW8b3z',
                          })}
                          onConfirm={() => {
                            onDelete(record.key);
                          }}
                          okText={intl.formatMessage({
                            defaultMessage: 'Yes',
                            id: 'a5msuh',
                          })}
                          cancelText={intl.formatMessage({
                            defaultMessage: 'No',
                            id: 'oUWADl',
                          })}
                          overlayInnerStyle={{ padding: 10 }}
                        >
                          <Button
                            size="small"
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Popconfirm>
                      </Tooltip>
                    </Col>
                  )}
                </Row>
              ),
            },
          ]
          //   .filter(
          //   (item) =>
          //     !(item.key === 'fileUrl' && (deleteRights || downloadRights))
          // )
        }
        dataSource={data?.map(({ node: evidence }) => ({
          key: evidence.id || '',
          name: evidence.name || 'File',
          fileUrl: evidence.url,
          tags: evidence.tags,
        }))}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
          id: 'vgVasT',
        })}
        open={addEvidence}
        width="600"
        onClose={toggleAddEvidence}
      >
        {addEvidence ? (
          <AddDocument
            update={updateNewEvidenceList}
            onClose={toggleAddEvidence}
            isEvidence
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default EvidenceList;
