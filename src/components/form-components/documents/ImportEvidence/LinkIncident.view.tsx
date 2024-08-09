import type { ListDemEvidenceQuery } from 'graphql/dem/queries/__generated__/list-evidence.generated';

import { Button, Col, Row, Skeleton, Table } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListDemEvidenceQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  s;
  saving: boolean;
}

const LinkDemCompany = ({
  data,
  loading,
  onClose,
  onSelect,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Table
        columns={[
          {
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail: null | string | undefined) =>
              thumbnail ? (
                <div style={{ height: 180, width: 180 }}>
                  <WatermarkImage url={thumbnail} />
                </div>
              ) : (
                <Skeleton.Image style={{ width: 180 }} />
              ),
            title: intl.formatMessage({
              defaultMessage: 'Thumbnail',
            }),
          },
          {
            dataIndex: 'type',
            key: 'type',
            title: intl.formatMessage({
              defaultMessage: 'Type',
            }),
          },
          {
            dataIndex: 'importance',
            key: 'importance',
            title: intl.formatMessage({
              defaultMessage: 'Importance',
            }),
          },
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            render: (value) => moment(value).format('DD/MM/YYYY'),
            title: intl.formatMessage({
              defaultMessage: 'Recorded On',
            }),
          },
        ]}
        dataSource={data?.listDemEvidence.demEvidence.map((evidence) => ({
          createdAt: evidence.createdAt,
          importance: evidence.importance || '',
          key: evidence.id || '',
          thumbnail: evidence.thumbnailUrl || '',
          type: evidence.type || '',
          url: evidence.playbackUrl || '',
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 24,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: data?.listDemEvidence?.total,
        }}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
            {intl.formatMessage({
              defaultMessage: 'Cancel',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
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
