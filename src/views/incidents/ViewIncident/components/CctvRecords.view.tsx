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
      <FormattedMessage defaultMessage="CCTV Evidence" id="sc0r3O" />
    </Title>

    <Table
      loading={loading}
      columns={[
        {
          key: 'cameraNumber',
          title: (
            <FormattedMessage defaultMessage="Camera Number" id="nxMNaZ" />
          ),
          dataIndex: 'cameraNumber',
        },
        {
          key: 'startTime',
          title: <FormattedMessage defaultMessage="Start Time" id="5QYdPU" />,
          dataIndex: 'startTime',
          render: (value: Date) => dayjs(value).format('HH:mm DD/MM/YYYY'),
        },
        {
          key: 'endTime',
          title: <FormattedMessage defaultMessage="End Time" id="0niASN" />,
          dataIndex: 'endTime',
          render: (value: Date) => dayjs(value).format('HH:mm DD/MM/YYYY'),
        },
        {
          key: 'showFace',
          title: <FormattedMessage defaultMessage="Shows Face" id="/AS4V3" />,
          dataIndex: 'showFace',
          // eslint-disable-next-line
          render: (value: boolean) =>
            value ? (
              <FormattedMessage defaultMessage="Yes" id="a5msuh" />
            ) : (
              <FormattedMessage defaultMessage="No" id="oUWADl" />
            ),
        },
        {
          key: 'showIncident',
          title: (
            <FormattedMessage defaultMessage="Shows Incident" id="aZlFiU" />
          ),
          dataIndex: 'showIncident',
          // eslint-disable-next-line
          render: (value: boolean) =>
            value ? (
              <FormattedMessage defaultMessage="Yes" id="a5msuh" />
            ) : (
              <FormattedMessage defaultMessage="No" id="oUWADl" />
            ),
        },
      ]}
      dataSource={data}
    />
  </Card>
);

export default CctvRecords;
