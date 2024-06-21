import React from 'react';

import { Button, Col, Row, Skeleton, Table } from 'antd';
import moment from 'moment';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import type { ListDemEvidenceQuery } from '#/graphql/dem/queries/list-evidence.generated';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListDemEvidenceQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
}

const LinkDemCompany = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  onSelect,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Table
        columns={[
          {
            title: intl.formatMessage({
              defaultMessage: 'Thumbnail',
            }),
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail: string | null | undefined) =>
              thumbnail ? (
                <div style={{ width: 180, height: 180 }}>
                  <WatermarkImage url={thumbnail} />
                </div>
              ) : (
                <Skeleton.Image style={{ width: 180 }} />
              ),
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Type',
            }),
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Importance',
            }),
            dataIndex: 'importance',
            key: 'importance',
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Recorded On',
            }),
            dataIndex: 'createdAt',
            key: 'createdAt',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            render: (value) => moment(value).format('DD/MM/YYYY'),
          },
        ]}
        dataSource={data?.listDemEvidence.demEvidence.map((evidence) => ({
          key: evidence.id || '',
          thumbnail: evidence.thumbnailUrl || '',
          url: evidence.playbackUrl || '',
          type: evidence.type || '',
          importance: evidence.importance || '',
          createdAt: evidence.createdAt,
        }))}
        rowSelection={{
          type: 'radio',
          onSelect,
        }}
        pagination={{
          hideOnSinglePage: true,
          total: data?.listDemEvidence?.total,
          pageSize: 24,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
        loading={loading}
        size="small"
      />
      <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
        <Col>
          <Button onClick={onClose} disabled={saving} type="text">
            {intl.formatMessage({
              defaultMessage: 'Cancel',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            loading={saving}
            disabled={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Import Evidence',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkDemCompany;
