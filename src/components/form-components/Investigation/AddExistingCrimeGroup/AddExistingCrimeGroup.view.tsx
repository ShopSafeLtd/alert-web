/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access */
import React from 'react';

import { Button, Col, Input, Row, Table } from 'antd';
import { useIntl } from 'react-intl';
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/list-crime-groups.generated';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSelect: (item: { key: string }) => void;
}

const AddExistingCrimeGroup = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  onSelect,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="add-existing-offender">
      <Row gutter={8} className="search-offender">
        <Col span={18}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Crime Groups...',
            })}
            allowClear
          />
        </Col>
      </Row>

      <Table
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
          },
          {
            key: 'alias',
            dataIndex: 'alias',
            title: intl.formatMessage({
              defaultMessage: 'Alias',
            }),
          },
          {
            key: 'totalOffenders',
            dataIndex: 'totalOffenders',
            title: intl.formatMessage({
              defaultMessage: 'Members',
            }),
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
            }),
          },
          {
            key: 'totalValue',
            dataIndex: 'totalValue',
            title: intl.formatMessage({
              defaultMessage: 'Lost Value',
            }),
            render: (value) => `£${value || 0}`,
          },
          {
            key: 'totalRecoveredValue',
            dataIndex: 'totalRecoveredValue',
            title: intl.formatMessage({
              defaultMessage: 'Recovered Value',
            }),
            render: (value) => `£${value || 0}`,
          },
          {
            key: 'totalTheftSuccess',
            dataIndex: 'totalTheftSuccess',
            title: intl.formatMessage({
              defaultMessage: 'Loss Rate',
            }),
            render: (value) => `${value?.toFixed(0) || 0}%`,
          },
        ]}
        dataSource={data?.listCrimeGroups?.crimeGroups.map((crimeGroup) => ({
          key: crimeGroup.id,
          reference: crimeGroup.reference,
          alias: crimeGroup.alias,
          totalOffenders: crimeGroup.totalOffenders,
          totalIncidents: crimeGroup.totalIncidents,
          totalValue: crimeGroup.totalValue,
          totalRecoveredValue: crimeGroup.totalRecoveredValue,
          totalTheftSuccess: crimeGroup.totalTheftSuccess,
        }))}
        rowSelection={{
          type: 'radio',
          onSelect,
        }}
        loading={loading}
        size="small"
      />
      <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
        <Col>
          <Button onClick={onClose} disabled={saving} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
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
              defaultMessage: 'Add Crime Group',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddExistingCrimeGroup;
