/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ListDemUsersQuery } from 'graphql/generated';
import { Button, Col, Row, Table } from 'antd';
import { useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListDemUsersQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
}

const LinkDemUser = ({
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
            title: intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }),
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Email',
              id: 'sy+pv5',
            }),
            dataIndex: 'email',
            key: 'email',
          },
        ]}
        dataSource={data?.listDemUsers?.demUsers?.map((user) => ({
          name: user.name || '',
          id: user.id || '',
          email: user.email || '',

          key: user.id || '',
        }))}
        rowSelection={{
          type: 'radio',
          onSelect,
        }}
        pagination={{
          hideOnSinglePage: true,
          total: data?.listDemUsers?.total,
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
            {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
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
              defaultMessage: 'Link DEM User',
              id: 'avzlc+',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkDemUser;
