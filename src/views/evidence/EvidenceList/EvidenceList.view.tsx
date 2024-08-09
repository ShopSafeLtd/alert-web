import type { ListDemEvidenceExtendedWithoutUserQuery } from '#/views/evidence/grapqhl/queries/__generated__/list-evidence.generated';

import { faFileAudio } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Descriptions,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import Loading from 'components/shared-components/AntD/Loading';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import useStyles from '../../profiles/crime-groups/list-crime-groups/ListCrimeGroups.styles';

interface ViewEvidenceListProps {
  data: ListDemEvidenceExtendedWithoutUserQuery | undefined;
  demIds: { id: string; name: string }[];
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  selectedData: TableItem | undefined;
  setSelectedData: React.Dispatch<React.SetStateAction<TableItem | undefined>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

export type TableItem = {
  date: Date | null | undefined;
  duration: null | string | undefined;
  importance: null | string | undefined;
  key: string;
  name: string;
  playbackUrl: string;
  thumbnail: {
    id: string;
    url: string;
  };
  type: string;
};

const EvidenceList: React.FC<ViewEvidenceListProps> = ({
  data,
  demIds,
  loading,
  onPaginationChange,
  selectedData,
  setSelectedData,
  setSelectedId,
}): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col span={8}>
          <Input
            // value={search}
            allowClear
            // onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Evidence...',
            })}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Select
            defaultValue={demIds[0].id}
            onChange={(value) => {
              setSelectedId(value);
              onPaginationChange(1, 12);
            }}
            options={demIds.map((id) => ({
              label: id.name,
              value: id.id,
            }))}
          />
        </Col>
      </Row>
      <Table<TableItem>
        columns={[
          {
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (
              thumbnail: {
                id: string;
                url: string;
              },
              item: TableItem
            ) =>
              item.type === 'AUDIO' ? (
                <FontAwesomeIcon
                  icon={faFileAudio}
                  onClick={() => {
                    setSelectedData(item);
                  }}
                  style={{
                    height: '105px',
                    width: '180px',
                  }}
                />
              ) : (
                <Image
                  fallback="/img/placeholder-image.png"
                  onClick={() => {
                    setSelectedData(item);
                  }}
                  placeholder={<Loading />}
                  preview={false}
                  src={thumbnail.url}
                  style={{ height: '105px' }}
                  width={180}
                />
              ),
            title: '',
            width: '20%',
          },
          {
            dataIndex: 'name',
            key: 'name',
            title: <FormattedMessage defaultMessage="Officer" />,
            // filters: [...new Map(officerNames.map((v) => [v.value, v])).values()],
            // onFilter: (value: string | number | boolean, record: TableItem) => record.officer.name.includes(value as string),
            // render: (name: string, item: TableItem) =>
            //   isAdmin ? (
            //     <Link to={`/app/officer/${item.companyId}/${item.officer.id}`}>
            //       {name}
            //     </Link>
            //   ) : (
            //     name
            //   ),
            width: '30%',
          },
          {
            dataIndex: 'duration',
            key: 'duration',
            title: <FormattedMessage defaultMessage="Duration" />,
            width: '10%',
          },
          {
            dataIndex: 'date',
            key: 'date',
            render: (date: Date) =>
              new Date(date)
                .toLocaleString('en-GB', {
                  timeZone: 'UTC',
                })
                .split(',')
                .reverse()
                .join(' - ') || 'No date',
            // sort by date
            // sorter: (a: TableItem, b: TableItem) =>
            //   a.date.getTime() - b.date.getTime(),
            // sortDirections: ['descend', 'ascend'] as ('descend' | 'ascend')[],
            // defaultSortOrder: 'descend' as const,

            title: <FormattedMessage defaultMessage="Recorded At" />,
            width: '15%',
          },
        ]}
        dataSource={
          data?.listDemEvidenceExtendedWithoutUser?.demEvidence
            ? data.listDemEvidenceExtendedWithoutUser.demEvidence.map(
                (evidenceList) =>
                  evidenceList
                    ? {
                        date: evidenceList.recordedAt,
                        duration:
                          evidenceList.type === 'VIDEO'
                            ? evidenceList.duration
                            : (evidenceList.type || '')
                                .toLowerCase()
                                .split(' ')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' '),
                        importance: evidenceList.importance,
                        key: evidenceList.id || '',
                        name:
                          evidenceList.officerName ??
                          intl.formatMessage({
                            defaultMessage: 'No name provided',
                          }),
                        playbackUrl:
                          evidenceList.playbackUrl ?? 'No playbackUrl provided',
                        thumbnail: {
                          id: evidenceList.id || '',
                          url: evidenceList.thumbnailUrl || '',
                        },
                        type: evidenceList.type || '',
                      }
                    : {
                        date: new Date(),
                        duration: '',
                        importance: '',
                        key: '',

                        name: 'No name provided',

                        playbackUrl: 'No playbackUrl provided',
                        thumbnail: {
                          id: '',
                          url: '',
                        },
                        type: 'OTHER',
                      }
              )
            : []
        }
        loading={loading}
        onRow={(record: TableItem) => ({
          onClick: () => {
            setSelectedData(record);
          },
        })}
        pagination={{
          hideOnSinglePage: true,
          onChange: onPaginationChange,
          pageSize: 12,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: data?.listDemEvidenceExtendedWithoutUser?.total || 0,
        }}
        rowClassName="clickable-row"
        size="small"
      />
      <Modal
        footer={[
          <Button
            key="submit"
            loading={loading}
            onClick={() => setSelectedData(undefined)}
            type="ghost"
          >
            {intl.formatMessage({
              defaultMessage: 'Close',
            })}
          </Button>,
          <Button key="download" loading={loading} type="primary">
            <a download href={selectedData?.playbackUrl}>
              {intl.formatMessage({
                defaultMessage: 'Download',
              })}
            </a>
          </Button>,
        ]}
        onCancel={() => setSelectedData(undefined)}
        open={!!selectedData}
        title={intl.formatMessage({
          defaultMessage: 'View Evidence',
        })}
        width="80%"
      >
        <div>
          <Row gutter={16}>
            <Col span={10}>
              <Descriptions bordered column={1}>
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Officer',
                  })}
                >
                  {selectedData?.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Duration',
                  })}
                >
                  {selectedData?.duration}
                </Descriptions.Item>
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Importance',
                  })}
                >
                  {selectedData?.importance}
                </Descriptions.Item>
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Type',
                  })}
                >
                  {selectedData?.type}
                </Descriptions.Item>
              </Descriptions>
            </Col>

            <Col>
              {selectedData && selectedData.type === 'IMAGE' ? (
                <Image
                  alt={intl.formatMessage({
                    defaultMessage: 'evidence',
                  })}
                  height="100%"
                  src={selectedData?.playbackUrl || ' '}
                  width="100%"
                />
              ) : (
                <div>
                  {selectedData?.type === 'AUDIO' ? (
                    <ReactPlayer
                      config={{
                        file: {
                          forceVideo: true,
                        },
                      }}
                      controls
                      url={selectedData?.playbackUrl || ' '}
                    />
                  ) : (
                    <ReactPlayer
                      config={{
                        file: {
                          forceVideo: true,
                        },
                      }}
                      controls
                      url={selectedData?.playbackUrl || ' '}
                      width="100%"
                    />
                  )}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};
export default EvidenceList;
