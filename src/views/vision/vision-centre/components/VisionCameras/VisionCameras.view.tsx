import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAiVisionCamerasQuery } from '#/views/vision/vision-centre/components/VisionCameras/__generated__/VisionCameras.generated';
import { Col, Row, Table, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const uploadInLast24Hours = (lastUploaded: Date) => {
  const uploadedDate = new Date(lastUploaded);
  const now = new Date();
  const diffInMs = now.getTime() - uploadedDate.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return diffInHours <= 24;
};
const AiTrends = () => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { data } = useAiVisionCamerasQuery({
    variables: {
      where: {
        schemeIds: [currentScheme],
        search: '',
      },
    },
  });

  const sortedData = data?.aiVisionCameras.edges.slice().sort((a, b) => {
    const dateA = a.node.lastUploaded
      ? new Date(a.node.lastUploaded).getTime()
      : 0;
    const dateB = b.node.lastUploaded
      ? new Date(b.node.lastUploaded).getTime()
      : 0;
    return dateB - dateA;
  });
  return (
    <>
      <Row
        align="middle"
        style={{
          marginBottom: 20,
        }}
      >
        <Col flex={1}>
          <Typography.Title
            level={3}
            style={{
              marginBottom: 0,
            }}
          >
            <FormattedMessage defaultMessage="Connected Cameras" />
          </Typography.Title>
        </Col>
      </Row>

      <Table
        columns={[
          {
            dataIndex: 'status',
            key: 'status',
            render: (value) => (
              <Typography.Text type={value === 'Online' ? 'success' : 'danger'}>
                {value}
              </Typography.Text>
            ),
            title: <FormattedMessage defaultMessage="Status" />,
          },
          {
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            title: <FormattedMessage defaultMessage="Serial Number" />,
          },
          {
            dataIndex: 'business',
            key: 'business',
            title: <FormattedMessage defaultMessage="Business" />,
          },
          {
            dataIndex: 'make',
            key: 'make',
            title: <FormattedMessage defaultMessage="Make" />,
          },
          {
            dataIndex: 'model',
            key: 'model',
            title: <FormattedMessage defaultMessage="Model" />,
          },
          {
            dataIndex: 'lastUploaded',
            key: 'lastUploaded',
            title: <FormattedMessage defaultMessage="Last Uploaded" />,
          },
        ]}
        dataSource={
          sortedData?.map((edge) => ({
            business: edge.node.business.name,
            lastUploaded: edge.node.lastUploaded
              ? new Date(edge.node.lastUploaded).toLocaleString()
              : 'No uploads',
            make: edge.node.make,
            model: edge.node.model,
            serialNumber: edge.node.serialNumber,
            status:
              edge.node.lastUploaded &&
              uploadInLast24Hours(new Date(edge.node.lastUploaded))
                ? 'Online'
                : 'Offline',
          })) ?? []
        }
        pagination={false}
        size="small"
      />
    </>
  );
};

export default AiTrends;
