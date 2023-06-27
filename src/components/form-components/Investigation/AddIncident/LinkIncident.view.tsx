/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useIntl } from 'react-intl';
import type { ListIncidentsQuery } from 'graphql/generated';
import { Row, Col, Input, Table, Button } from 'antd';

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
              id: 'gvqTQ8',
              defaultMessage: 'Search Incidents...',
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
              id: 'k8ZNgH',
              defaultMessage: 'Alert ID',
            }),
          },
          {
            key: 'subject',
            dataIndex: 'subject',
            title: intl.formatMessage({
              id: 'LLtKhp',
              defaultMessage: 'Subject',
            }),
          },
          {
            key: 'date',
            dataIndex: 'date',
            title: intl.formatMessage({
              id: 'P7PLVj',
              defaultMessage: 'Date',
            }),
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: intl.formatMessage({
              id: 'rvirM2',
              defaultMessage: 'Location',
            }),
          },
          {
            key: 'offenders',
            dataIndex: 'offenders',
            title: intl.formatMessage({
              id: 'xb54TN',
              defaultMessage: 'Offenders',
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
            {intl.formatMessage({
              id: '47FYwb',
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
              id: '4sHDoC',
              defaultMessage: 'Link Incident',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkIncident;
