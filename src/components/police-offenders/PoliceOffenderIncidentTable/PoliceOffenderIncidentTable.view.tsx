import type { IncidentRow } from '#/views/police-offenders/view-police-offender/usePoliceOffenderIncidents';
import type { ColumnsType } from 'antd/es/table';

import { Table, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedNumber, useIntl } from 'react-intl';

const { Text } = Typography;

interface Props {
  currency: string;
  incidents: IncidentRow[];
  loading?: boolean;
}

const PoliceOffenderIncidentTable = ({
  currency,
  incidents,
  loading,
}: Props): JSX.Element => {
  const intl = useIntl();

  const columns: ColumnsType<IncidentRow> = [
    {
      align: 'center',
      dataIndex: 'schemeLogo',
      key: 'schemeLogo',
      render: (logo: null | string | undefined, record: IncidentRow) => {
        if (!logo && !record.schemeName)
          return intl.formatMessage({ defaultMessage: '-' });
        return (
          <Tooltip
            title={
              record.schemeName ||
              intl.formatMessage({ defaultMessage: 'Unknown Scheme' })
            }
          >
            {logo ? (
              <img
                alt={
                  record.schemeName ||
                  intl.formatMessage({ defaultMessage: 'Scheme' })
                }
                src={logo}
                style={{
                  height: '40px',
                  objectFit: 'contain',
                  width: '90px',
                }}
              />
            ) : (
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0',
                  color: '#595959',
                  display: 'flex',
                  fontSize: 12,
                  fontWeight: 500,
                  height: '40px',
                  justifyContent: 'center',
                  width: '90px',
                }}
              >
                {record.schemeName?.slice(0, 2).toUpperCase() ||
                  intl.formatMessage({ defaultMessage: '?' })}
              </div>
            )}
          </Tooltip>
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Source' }),
      width: 100,
    },
    {
      defaultSortOrder: 'descend',
      key: 'datetime',
      render: (_, record: IncidentRow) => {
        const date = record.date
          ? dayjs(record.date).format('DD/MM/YYYY')
          : '-';
        const time =
          record.dayTime ||
          (record.date ? dayjs(record.date).format('HH:mm') : '-');
        return (
          <div>
            <div style={{ fontWeight: 500 }}>{date}</div>
            <Text style={{ fontSize: 12 }} type="secondary">
              {time}
            </Text>
          </div>
        );
      },
      sorter: (a, b) => {
        const dateA = a.date ? dayjs(a.date) : dayjs(0);
        const dateB = b.date ? dayjs(b.date) : dayjs(0);
        return dateA.unix() - dateB.unix();
      },
      title: intl.formatMessage({ defaultMessage: 'Date/Time' }),
      width: 130,
    },
    {
      dataIndex: 'reference',
      key: 'reference',
      render: (reference: null | number | undefined) => reference || '-',
      title: intl.formatMessage({ defaultMessage: 'Ref' }),
      width: 80,
    },
    {
      dataIndex: 'policeRef',
      key: 'policeRef',
      render: (policeRef: null | string | undefined) => policeRef || '-',
      title: intl.formatMessage({ defaultMessage: 'Crime Ref' }),
      width: 120,
    },
    {
      align: 'right',
      dataIndex: 'netLoss',
      key: 'netLoss',
      render: (netLoss: number) => (
        <FormattedNumber
          currency={currency}
          style="currency"
          value={netLoss || 0}
        />
      ),
      title: intl.formatMessage({ defaultMessage: 'Value' }),
      width: 110,
    },
    {
      dataIndex: 'crimeTypes',
      key: 'crimeTypes',
      render: (crimeTypes: Array<{ id: string; name: string }>) => {
        if (!crimeTypes || crimeTypes.length === 0) return '-';

        // Show first tag, with +N indicator if there are more
        const firstTag = crimeTypes[0];
        const remainingCount = crimeTypes.length - 1;

        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Tag style={{ fontSize: 12, margin: 0 }}>{firstTag.name}</Tag>
            {remainingCount > 0 && (
              <Tooltip
                title={
                  <div>
                    {crimeTypes.slice(1).map((type) => (
                      <div key={type.id}>{type.name}</div>
                    ))}
                  </div>
                }
              >
                <Tag style={{ cursor: 'help', fontSize: 12, margin: 0 }}>
                  {intl.formatMessage(
                    { defaultMessage: '+{count}' },
                    { count: remainingCount }
                  )}
                </Tag>
              </Tooltip>
            )}
          </div>
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Type' }),
      width: 150,
    },
    {
      key: 'business',
      render: (_, record: IncidentRow) => {
        const schemeName = record.schemeName || '';
        const businessName = record.businessName || '';
        const fullBusinessName =
          schemeName && businessName
            ? `${schemeName} - ${businessName}`
            : businessName || schemeName || '-';

        const address = record.locationFull;

        return (
          <div>
            <div style={{ fontWeight: 500, marginBottom: address ? 4 : 0 }}>
              {fullBusinessName}
            </div>
            {address && (
              <Text style={{ fontSize: 12 }} type="secondary">
                {address}
              </Text>
            )}
          </div>
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Business' }),
      width: 200,
    },
    {
      dataIndex: 'description',
      key: 'description',
      render: (description: null | string | undefined) => {
        if (!description) return '-';
        return (
          <div
            style={{
              lineHeight: '1.5',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            }}
          >
            <Text>{description}</Text>
          </div>
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Description' }),
      width: 300,
    },
  ];

  return (
    <Table<IncidentRow>
      columns={columns}
      dataSource={incidents}
      loading={loading}
      locale={{
        emptyText: intl.formatMessage({
          defaultMessage: 'No incidents recorded',
        }),
      }}
      pagination={{
        defaultPageSize: 50,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        showTotal: (total, range) =>
          intl.formatMessage(
            { defaultMessage: '{rangeStart}-{rangeEnd} of {total} incidents' },
            {
              rangeEnd: range[1],
              rangeStart: range[0],
              total,
            }
          ),
      }}
      rowKey="id"
      scroll={{ x: 'max-content' }}
      size="small"
    />
  );
};

export default PoliceOffenderIncidentTable;
