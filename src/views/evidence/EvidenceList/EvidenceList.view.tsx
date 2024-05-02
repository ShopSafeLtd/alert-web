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
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio } from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import Loading from 'components/shared-components/AntD/Loading';
import type { ListDemEvidenceExtendedWithoutUserQuery } from '../../../graphql/generated';

import useStyles from '../../profiles/crime-groups/list-crime-groups/ListCrimeGroups.styles';

interface ViewEvidenceListProps {
  data: ListDemEvidenceExtendedWithoutUserQuery | undefined;
  loading: boolean;
  selectedData: TableItem | undefined;
  setSelectedData: React.Dispatch<React.SetStateAction<TableItem | undefined>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  demIds: { id: string; name: string }[];
  onPaginationChange: (page: number, pageSize: number) => void;
}

export type TableItem = {
  key: string;
  date: Date | null | undefined;
  name: string;
  playbackUrl: string;
  type: string;
  duration: string | null | undefined;
  importance: string | null | undefined;
  thumbnail: {
    id: string;
    url: string;
  };
};

const EvidenceList: React.FC<ViewEvidenceListProps> = ({
  data,
  loading,
  selectedData,
  setSelectedData,
  demIds,
  setSelectedId,
  onPaginationChange,
}): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Row className={classes.headerRow}>
        <Col span={8}>
          <Input
            // value={search}
            // onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Evidences...',
              id: 'UWCkbC',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Select
            options={demIds.map((id) => ({
              label: id.name,
              value: id.id,
            }))}
            onChange={(value) => {
              setSelectedId(value);
              onPaginationChange(1, 12);
            }}
            defaultValue={demIds[0].id}
          />
        </Col>
      </Row>
      <Table<TableItem>
        size="small"
        loading={loading}
        onRow={(record: TableItem) => ({
          onClick: () => {
            setSelectedData(record);
          },
        })}
        rowClassName="clickable-row"
        columns={[
          {
            title: '',
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
                  onClick={() => {
                    setSelectedData(item);
                  }}
                  style={{
                    width: '180px',
                    height: '105px',
                  }}
                  icon={faFileAudio}
                />
              ) : (
                <Image
                  onClick={() => {
                    setSelectedData(item);
                  }}
                  style={{ height: '105px' }}
                  placeholder={<Loading />}
                  width={180}
                  fallback="/img/placeholder-image.png"
                  preview={false}
                  src={thumbnail.url}
                />
              ),
            width: '20%',
          },
          {
            title: <FormattedMessage id="q4mEG7" defaultMessage="Officer" />,
            dataIndex: 'name',
            key: 'name',
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
            title: <FormattedMessage id="IuFETn" defaultMessage="Duration" />,
            dataIndex: 'duration',
            key: 'duration',
            width: '10%',
          },
          {
            title: (
              <FormattedMessage id="voXuR/" defaultMessage="Recorded At" />
            ),
            dataIndex: 'date',
            key: 'date',
            // sort by date
            // sorter: (a: TableItem, b: TableItem) =>
            //   a.date.getTime() - b.date.getTime(),
            // sortDirections: ['descend', 'ascend'] as ('descend' | 'ascend')[],
            // defaultSortOrder: 'descend' as const,

            render: (date: Date) =>
              new Date(date)
                .toLocaleString('en-GB', {
                  timeZone: 'UTC',
                })
                .split(',')
                .reverse()
                .join(' - ') || 'No date',
            width: '15%',
          },
        ]}
        pagination={{
          onChange: onPaginationChange,
          pageSize: 12,
          showSizeChanger: false,
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          total: data?.listDemEvidenceExtendedWithoutUser?.total || 0,
        }}
        dataSource={
          data &&
          data.listDemEvidenceExtendedWithoutUser &&
          data.listDemEvidenceExtendedWithoutUser.demEvidence
            ? data.listDemEvidenceExtendedWithoutUser.demEvidence.map(
                (evidenceList) =>
                  evidenceList
                    ? {
                        key: evidenceList.id || '',
                        type: evidenceList.type || '',
                        thumbnail: {
                          id: evidenceList.id || '',
                          url: evidenceList.thumbnailUrl || '',
                        },
                        name:
                          evidenceList.officerName ??
                          intl.formatMessage({
                            defaultMessage: 'No name provided',
                            id: 'Qadyhn',
                          }),
                        playbackUrl:
                          evidenceList.playbackUrl ?? 'No playbackUrl provided',
                        date: evidenceList.recordedAt,
                        importance: evidenceList.importance,
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
                      }
                    : {
                        key: '',
                        thumbnail: {
                          id: '',
                          url: '',
                        },
                        importance: '',
                        playbackUrl: 'No playbackUrl provided',

                        name: 'No name provided',

                        type: 'OTHER',
                        date: new Date(),
                        duration: '',
                      }
              )
            : []
        }
      />
      <Modal
        open={!!selectedData}
        title={intl.formatMessage({
          defaultMessage: 'View Evidence',
          id: '0jDp2T',
        })}
        width="80%"
        onCancel={() => setSelectedData(undefined)}
        footer={[
          <Button
            key="submit"
            type="ghost"
            loading={loading}
            onClick={() => setSelectedData(undefined)}
          >
            {intl.formatMessage({
              defaultMessage: 'Close',
              id: 'rbrahO',
            })}
          </Button>,
          <Button key="download" type="primary" loading={loading}>
            <a href={selectedData?.playbackUrl} download>
              {intl.formatMessage({
                defaultMessage: 'Download',
                id: '5q3qC0',
              })}
            </a>
          </Button>,
        ]}
      >
        <div>
          <Row gutter={16}>
            <Col span={10}>
              <Descriptions column={1} bordered>
                <Descriptions.Item
                  label={intl.formatMessage({
                    id: 'q4mEG7',
                    defaultMessage: 'Officer',
                  })}
                >
                  {selectedData?.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label={intl.formatMessage({
                    id: 'IuFETn',
                    defaultMessage: 'Duration',
                  })}
                >
                  {selectedData?.duration}
                </Descriptions.Item>
                <Descriptions.Item
                  label={intl.formatMessage({
                    id: 'DBZGY7',
                    defaultMessage: 'Importance',
                  })}
                >
                  {selectedData?.importance}
                </Descriptions.Item>
                <Descriptions.Item
                  label={intl.formatMessage({
                    id: '+U6ozc',
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
                  width="100%"
                  height="100%"
                  alt={intl.formatMessage({
                    id: 'EqkwlK',
                    defaultMessage: 'evidence',
                  })}
                  src={selectedData?.playbackUrl || ' '}
                />
              ) : (
                <div>
                  {selectedData?.type === 'AUDIO' ? (
                    <ReactPlayer
                      url={selectedData?.playbackUrl || ' '}
                      config={{
                        file: {
                          forceVideo: true,
                        },
                      }}
                      controls
                    />
                  ) : (
                    <ReactPlayer
                      config={{
                        file: {
                          forceVideo: true,
                        },
                      }}
                      width="100%"
                      url={selectedData?.playbackUrl || ' '}
                      controls
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
