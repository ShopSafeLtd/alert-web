/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListDemEvidenceQuery } from 'graphql/generated';
import { Button, Col, Image, Row, Skeleton, Table } from 'antd';

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
}: Props): JSX.Element => (
  <div className="add-existing-offender">
    <Table
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
          title: 'Url',
          dataIndex: 'url',
          key: 'url',
          render: (url: string) =>
            url ? (
              <a href={url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line react/destructuring-assignment */}
                {url.length > 50 ? `${url.substring(0, 50)}...` : url}
              </a>
            ) : (
              <> </>
            ),
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Importance',
          dataIndex: 'importance',
          key: 'importance',
        },
      ]}
      dataSource={data?.listDemEvidence.demEvidence.map((evidence) => ({
        key: evidence.id || '',
        thumbnail: evidence.thumbnailUrl || '',
        url: evidence.playbackUrl || '',
        type: evidence.type || '',
        importance: evidence.importance || '',
      }))}
      rowSelection={{
        type: 'radio',
        onSelect,
      }}
      pagination={{
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
          Cancel
        </Button>
      </Col>
      <Col>
        <Button
          loading={saving}
          disabled={saving}
          onClick={onSubmit}
          type="primary"
        >
          Import evidence
        </Button>
      </Col>
    </Row>
  </div>
);

export default LinkDemCompany;
