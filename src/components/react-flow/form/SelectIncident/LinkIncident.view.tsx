import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';

import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

export interface IncidentTable {
  date?: null | string | undefined;
  key?: null | string | undefined;
  location?: null | string | undefined;
  offenders?: null | string | undefined;
  reference?: null | number | undefined;
  subject?: null | string | undefined;
}

const LinkIncident = ({
  data,
  loading,
  onClose,
  onPaginationChange,
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
              defaultMessage: 'Search Incidents...',
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
            dataIndex: 'subject',
            key: 'subject',
            title: intl.formatMessage({
              defaultMessage: 'Subject',
            }),
          },
          {
            dataIndex: 'date',
            key: 'date',
            title: intl.formatMessage({ defaultMessage: 'Date' }),
          },
          {
            dataIndex: 'location',
            key: 'location',
            title: intl.formatMessage({
              defaultMessage: 'Location',
            }),
          },
          {
            dataIndex: 'offenders',
            key: 'offenders',
            title: intl.formatMessage({
              defaultMessage: 'Offenders',
            }),
          },
        ]}
        dataSource={data?.listIncidents?.incidents.map((incident) => ({
          date: incident.dayTime,
          key: incident.id,
          location: incident.createdBy.businesses[0]?.name,
          offenders: incident.offenders
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
            .toString(),
          reference: incident.reference,
          subject: incident.subject,
          type: incident.crimeTypes
            .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
            .toString(),
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          onChange: onPaginationChange,
          pageSize: 24,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: data?.listIncidents?.total,
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
              defaultMessage: 'Add Incidents',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkIncident;
