import React from 'react';
import { Card, Typography, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: {
    cameraNumber: string;
    endTime: Date;
    key: string;
    showFace: boolean;
    showIncident: boolean;
    startTime: Date;
  }[];
}

const CctvRecords = ({ loading, data }: Props) => (
  <Card loading={loading}>
    <Title level={4}>
      <FormattedMessage defaultMessage="CCTV Evidence" />
    </Title>

    <Table
      loading={loading}
      columns={[
        {
          key: 'cameraNumber',
          title: <FormattedMessage defaultMessage="Camera Number" />,
          dataIndex: 'cameraNumber',
        },
        {
          key: 'startTime',
          title: <FormattedMessage defaultMessage="Start Time" />,
          dataIndex: 'startTime',
          render: (value: Date) => dayjs(value).format('HH:mm DD/MM/YYYY'),
        },
        {
          key: 'endTime',
          title: <FormattedMessage defaultMessage="End Time" />,
          dataIndex: 'endTime',
          render: (value: Date) => dayjs(value).format('HH:mm DD/MM/YYYY'),
        },
        {
          key: 'showFace',
          title: <FormattedMessage defaultMessage="Shows Face" />,
          dataIndex: 'showFace',
          // eslint-disable-next-line
          render: (value: boolean) =>
            value ? (
              <FormattedMessage defaultMessage="Yes" />
            ) : (
              <FormattedMessage defaultMessage="No" />
            ),
        },
        {
          key: 'showIncident',
          title: <FormattedMessage defaultMessage="Shows Incident" />,
          dataIndex: 'showIncident',
          // eslint-disable-next-line
          render: (value: boolean) =>
            value ? (
              <FormattedMessage defaultMessage="Yes" />
            ) : (
              <FormattedMessage defaultMessage="No" />
            ),
        },
      ]}
      dataSource={data}
    />
  </Card>
);

export default CctvRecords;
