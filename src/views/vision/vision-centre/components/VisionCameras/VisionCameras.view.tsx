import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAiVisionCamerasQuery } from '#/views/vision/vision-centre/components/VisionCameras/__generated__/VisionCameras.generated';
import { Button, Col, Row, Table, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
        <Col>
          <Button type="text">
            <FormattedMessage defaultMessage="Manage Cameras" />
          </Button>
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
        ]}
        dataSource={
          data?.aiVisionCameras.edges.map((edge) => ({
            business: edge.node.business.name,
            make: edge.node.make,
            model: edge.node.model,
            serialNumber: edge.node.serialNumber,
            status:
              edge.node.serialNumber === 'B8A44FA96B70' ? 'Online' : 'Offline',
          })) ?? []
        }
        pagination={false}
        size="small"
      />
    </>
  );
};

export default AiTrends;
