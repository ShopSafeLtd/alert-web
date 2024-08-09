/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access */
import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const AddExistingCrimeGroup = ({
  data,
  loading,
  onClose,
  onSelect,
  onSubmit,
  saving,
  search,
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
            title: intl.formatMessage({
              defaultMessage: 'Alias',
            }),
          },
          {
            dataIndex: 'totalOffenders',
            key: 'totalOffenders',
            title: intl.formatMessage({
              defaultMessage: 'Members',
            }),
          },
          {
            dataIndex: 'totalIncidents',
            key: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
            }),
          },
          {
            dataIndex: 'totalValue',
            key: 'totalValue',
            render: (value) => `£${value || 0}`,
            title: intl.formatMessage({
              defaultMessage: 'Lost Value',
            }),
          },
          {
            dataIndex: 'totalRecoveredValue',
            key: 'totalRecoveredValue',
            render: (value) => `£${value || 0}`,
            title: intl.formatMessage({
              defaultMessage: 'Recovered Value',
            }),
          },
          {
            dataIndex: 'totalTheftSuccess',
            key: 'totalTheftSuccess',
            render: (value) => `${value?.toFixed(0) || 0}%`,
            title: intl.formatMessage({
              defaultMessage: 'Loss Rate',
            }),
          },
        ]}
        dataSource={data?.listCrimeGroups?.crimeGroups.map((crimeGroup) => ({
          alias: crimeGroup.alias,
          key: crimeGroup.id,
          reference: crimeGroup.reference,
          totalIncidents: crimeGroup.totalIncidents,
          totalOffenders: crimeGroup.totalOffenders,
          totalRecoveredValue: crimeGroup.totalRecoveredValue,
          totalTheftSuccess: crimeGroup.totalTheftSuccess,
          totalValue: crimeGroup.totalValue,
        }))}
        loading={loading}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
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
              defaultMessage: 'Add Crime Group',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddExistingCrimeGroup;
