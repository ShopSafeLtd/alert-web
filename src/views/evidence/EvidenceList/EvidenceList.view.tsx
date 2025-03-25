import type { ListDemEvidenceExtendedWithoutUserQuery } from '#/views/evidence/grapqhl/queries/__generated__/list-evidence.generated';

import { faFileAudio } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Image, Input, Row, Select, Table } from 'antd';
import Loading from 'components/shared-components/AntD/Loading';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from '../../profiles/crime-groups/list-crime-groups/ListCrimeGroups.styles';
import ViewEvidenceModal from './ViewEvidenceModal';
interface ViewEvidenceListProps {
  data: ListDemEvidenceExtendedWithoutUserQuery | undefined;
  demIds: { id: null | string | undefined; name: string }[];
  loading: boolean;
  onDelete: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  selectedData: EvidenceType | undefined;
  setSelectedData: React.Dispatch<
    React.SetStateAction<EvidenceType | undefined>
  >;
  setSelectedId: React.Dispatch<
    React.SetStateAction<null | string | undefined>
  >;
}

export type EvidenceType = {
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
  onDelete,
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
      <Table<EvidenceType>
        columns={[
          {
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (
              thumbnail: {
                id: string;
                url: string;
              },
              item: EvidenceType
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
            // onFilter: (value: string | number | boolean, record: EvidenceType) => record.officer.name.includes(value as string),
            // render: (name: string, item: EvidenceType) =>
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
            // sorter: (a: EvidenceType, b: EvidenceType) =>
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
        onRow={(record: EvidenceType) => ({
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
      <ViewEvidenceModal
        loading={loading}
        onDelete={onDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};
export default EvidenceList;
