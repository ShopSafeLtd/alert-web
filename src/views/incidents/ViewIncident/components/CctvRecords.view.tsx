import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import { Card, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
}

// eslint-disable-next-line no-confusing-arrow
const CctvRecords = ({ data, loading }: Props) =>
  data?.incident && data.incident.cctvRecords.length > 0 ? (
    <Card loading={loading}>
      <Title level={4}>
        <FormattedMessage defaultMessage="CCTV Evidence" />
      </Title>

      <Table
        columns={[
          {
            dataIndex: 'cameraNumber',
            key: 'cameraNumber',
            title: <FormattedMessage defaultMessage="Camera Number" />,
          },
          {
            dataIndex: 'startTime',
            key: 'startTime',
            render: (value: Date) => dayjs(value).format('HH:mm:ss DD/MM/YYYY'),
            title: <FormattedMessage defaultMessage="Start Time" />,
          },
          {
            dataIndex: 'endTime',
            key: 'endTime',
            render: (value: Date) => dayjs(value).format('HH:mm:ss DD/MM/YYYY'),
            title: <FormattedMessage defaultMessage="End Time" />,
          },
          {
            dataIndex: 'showFace',
            key: 'showFace',
            // eslint-disable-next-line
            render: (value: boolean) =>
              value ? (
                <FormattedMessage defaultMessage="Yes" />
              ) : (
                <FormattedMessage defaultMessage="No" />
              ),
            title: <FormattedMessage defaultMessage="Shows Face" />,
          },
          {
            dataIndex: 'showIncident',
            key: 'showIncident',
            // eslint-disable-next-line
            render: (value: boolean) =>
              value ? (
                <FormattedMessage defaultMessage="Yes" />
              ) : (
                <FormattedMessage defaultMessage="No" />
              ),
            title: <FormattedMessage defaultMessage="Shows Incident" />,
          },
          {
            dataIndex: 'description',
            ellipsis: true,
            key: 'description',
            render: (value: string) => <Tooltip title={value}>{value}</Tooltip>,
            title: <FormattedMessage defaultMessage="Description" />,
          },
        ]}
        dataSource={data.incident.cctvRecords.map((item) => ({
          cameraNumber: item.cameraNumber,
          description: item.description,
          endTime: item.endTime,
          key: item.id,
          showFace: item.showFace,
          showIncident: item.showIncident,
          startTime: item.startTime,
        }))}
        loading={loading}
      />
    </Card>
  ) : (
    <div />
  );

export default CctvRecords;
