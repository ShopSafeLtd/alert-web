import React from 'react';
import { useIntl } from 'react-intl';
import type { ListIncidentsQuery } from 'graphql/generated';
import { Button, Col, Input, Row, Table } from 'antd';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
}

export interface IncidentTable {
  key?: string | undefined | null;
  reference?: number | undefined | null;
  subject?: string | undefined | null;
  date?: string | undefined | null;
  location?: string | undefined | null;
  offenders?: string | undefined | null;
}

const LinkIncident = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
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
              defaultMessage: 'Search Incidents...',
              id: 'gvqTQ8',
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
              id: 'k8ZNgH',
            }),
          },
          {
            key: 'subject',
            dataIndex: 'subject',
            title: intl.formatMessage({
              defaultMessage: 'Subject',
              id: 'LLtKhp',
            }),
          },
          {
            key: 'date',
            dataIndex: 'date',
            title: intl.formatMessage({ defaultMessage: 'Date', id: 'P7PLVj' }),
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: intl.formatMessage({
              defaultMessage: 'Location',
              id: 'rvirM2',
            }),
          },
          {
            key: 'offenders',
            dataIndex: 'offenders',
            title: intl.formatMessage({
              defaultMessage: 'Offenders',
              id: 'xb54TN',
            }),
          },
        ]}
        dataSource={data?.listIncidents?.incidents.map((incident) => ({
          subject: incident.subject,
          reference: incident.reference,
          type: incident.crimeTypes
            .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
            .toString(),
          date: incident.dayTime,
          location: incident.createdBy.businesses[0]?.name,
          offenders: incident.offenders
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
            .toString(),
          key: incident.id,
        }))}
        rowSelection={{
          type: 'radio',
          onSelect,
        }}
        pagination={{
          hideOnSinglePage: true,
          total: data?.listIncidents?.total,
          onChange: onPaginationChange,
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
              defaultMessage: 'Add Incidents',
              id: 'kKj7sq',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkIncident;
