import Loading from '#/components/shared-components/AntD/Loading';
import ViewEvidenceModal from '#/views/evidence/EvidenceList/ViewEvidenceModal';
import { faFileAudio, faTrashUndo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Image, Table, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ListDemEvidenceRecycleQuery } from '../graphql/queries/__generated__/list-dem-evidence-recycle.generated';
import type { EvidenceType } from './useRecycleEvidence';

interface Props {
  data: ListDemEvidenceRecycleQuery | undefined;
  loading: boolean;
  onRestore: (value: string) => void;
  saving: boolean;
  selectedData: EvidenceType | undefined;
  setSelectedData: React.Dispatch<
    React.SetStateAction<EvidenceType | undefined>
  >;
}

const RecycleEvidence = ({
  data,
  loading,
  onRestore,
  saving,
  selectedData,
  setSelectedData,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="list-view">
      {/* <Row style={{ margin: 10 }}>
        <Col>
          <Typography.Text>
            {intl.formatMessage({
              defaultMessage:
                'Deleted items will be stored here for 30 days, then permanently deleted. Items can be restored at any point before that.',
            })}
          </Typography.Text>
        </Col>
      </Row> */}
      <div style={{ margin: 12 }} />

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
              record: EvidenceType
            ) =>
              record.type === 'AUDIO' ? (
                <FontAwesomeIcon
                  icon={faFileAudio}
                  onClick={() => {
                    setSelectedData(record);
                  }}
                  style={{
                    height: '80px',
                    width: '80px',
                  }}
                />
              ) : (
                <Image
                  fallback="/img/placeholder-image.png"
                  onClick={() => {
                    setSelectedData(record);
                  }}
                  placeholder={<Loading />}
                  preview={false}
                  src={thumbnail.url}
                  style={{ height: '80px' }}
                  width={100}
                />
              ),
            title: '',
            width: '20%',
          },

          {
            dataIndex: 'duration',
            key: 'duration',
            title: intl.formatMessage({
              defaultMessage: 'Duration',
            }),
            width: '15%',
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
            title: intl.formatMessage({
              defaultMessage: 'Recorded At',
            }),
            width: '25%',
          },
          {
            dataIndex: 'fileUrl',
            key: 'fileUrl',
            render: (_, record) => (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Restore Evidence',
                })}
              >
                <Button
                  disabled={saving}
                  icon={<FontAwesomeIcon icon={faTrashUndo} />}
                  onClick={() => {
                    setSelectedData(record);
                  }}
                  size="small"
                />
              </Tooltip>
            ),

            title: '',
            width: '25%',
          },
        ]}
        dataSource={
          data && data.listDemEvidenceRecycle.totalCount > 0
            ? data.listDemEvidenceRecycle.edges.map(({ node: evidenceList }) =>
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
        // rowClassName={classes.row}
        loading={loading}
        onRow={(record: EvidenceType) => ({
          onClick: () => {
            setSelectedData(record);
          },
        })}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
        }}
        size="small"
      />
      <ViewEvidenceModal
        onRestore={onRestore}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

export default RecycleEvidence;
