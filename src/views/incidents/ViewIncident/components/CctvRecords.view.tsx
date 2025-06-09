import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import { Card, Table, Typography } from 'antd';
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
        ]}
        dataSource={data.incident.cctvRecords.map((item) => ({
          cameraNumber: item.cameraNumber,
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
