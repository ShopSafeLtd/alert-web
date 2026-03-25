import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  selected: string | undefined;
  setSearch: (value: string) => void;
}

const LinkCrimeGroup = ({
  data,
  loading,
  onClose,
  onPaginationChange,
  onSelect,
  onSubmit,
  saving,
  search,
  selected,
  setSearch,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Row className="search-offender" gutter={8}>
        <Col span={18}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Crime Groups...',
            })}
            value={search}
          />
        </Col>
      </Row>

      <Table
        columns={[
          {
            dataIndex: 'reference',
            key: 'reference',
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
          },
          {
            dataIndex: 'alias',
            key: 'alias',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
          },
          {
            dataIndex: 'offenders',
            key: 'offenders',
            render: (
              offenders: Array<{
                id: string;
                images: Array<{ optimised?: null | string }>;
                name?: null | string;
              }>
            ) => (
              <div style={{ display: 'flex', gap: 4 }}>
                {offenders?.map((offender) => {
                  const imageUrl = offender.images?.[0]?.optimised;
                  return imageUrl ? (
                    <img
                      alt={offender.name || ''}
                      key={offender.id}
                      src={imageUrl}
                      style={{
                        borderRadius: '50%',
                        height: 28,
                        objectFit: 'cover',
                        width: 28,
                      }}
                    />
                  ) : (
                    <div
                      key={offender.id}
                      style={{
                        alignItems: 'center',
                        background: '#f0f0f0',
                        borderRadius: '50%',
                        color: '#999',
                        display: 'flex',
                        fontSize: 10,
                        height: 28,
                        justifyContent: 'center',
                        width: 28,
                      }}
                    >
                      {offender.name?.slice(0, 2).toUpperCase() ||
                        intl.formatMessage({ defaultMessage: '?' })}
                    </div>
                  );
                })}
              </div>
            ),
            title: intl.formatMessage({ defaultMessage: 'Members' }),
          },
          {
            dataIndex: 'totalIncidents',
            key: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
            }),
          },
        ]}
        dataSource={data?.listCrimeGroups?.crimeGroups.map((crimeGroup) => ({
          alias: crimeGroup.alias,
          key: crimeGroup.id,
          offenders: crimeGroup.offenders,
          reference: crimeGroup.reference,
          totalIncidents: crimeGroup.totalIncidents,
        }))}
        loading={loading}
        onRow={(record) => ({
          onClick: () => onSelect({ key: record.key }),
          style: { cursor: 'pointer' },
        })}
        pagination={{
          hideOnSinglePage: true,
          onChange: onPaginationChange,
          pageSize: 24,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: data?.listCrimeGroups?.total,
        }}
        rowClassName={(record) =>
          record.key === selected ? 'ant-table-row-selected' : ''
        }
        rowSelection={{
          onSelect,
          selectedRowKeys: selected ? [selected] : [],
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
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
              defaultMessage: 'Link Crime Group',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkCrimeGroup;
