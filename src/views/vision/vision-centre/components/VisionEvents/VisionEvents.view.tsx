import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAiVisionEventsQuery } from '#/views/vision/vision-centre/components/VisionEvents/__generated__/VisionEvents.generated';
import { Col, Row, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const formatCameraEventType = () => (
  <FormattedMessage defaultMessage="Face Detected" />
);

const AiTrends = () => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, loading, previousData } = useAiVisionEventsQuery({
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        schemeIds: [currentScheme],
      },
    },
  });

  const dataFormatted = data ?? previousData;

  return (
    <>
      <Row
        align="middle"
        style={{
          marginBottom: 20,
          marginTop: 40,
        }}
      >
        <Col flex={1}>
          <Typography.Title
            level={3}
            style={{
              marginBottom: 0,
            }}
          >
            <FormattedMessage defaultMessage="Camera Events" />
          </Typography.Title>
        </Col>
        {/* <Col>*/}
        {/*  <Button type="text">*/}
        {/*    <FormattedMessage defaultMessage="View All Events" />*/}
        {/*  </Button>*/}
        {/* </Col>*/}
      </Row>

      <Table
        loading={loading}
        columns={[
          {
            dataIndex: 'type',
            key: 'type',
            title: <FormattedMessage defaultMessage="Event type" />,
          },
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string) =>
              dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
            title: <FormattedMessage defaultMessage="Time" />,
          },
          {
            dataIndex: 'camera',
            key: 'camera',
            title: <FormattedMessage defaultMessage="Camera" />,
          },
          {
            dataIndex: 'business',
            key: 'business',
            title: <FormattedMessage defaultMessage="Business" />,
          },
          {
            dataIndex: 'matchDetected',
            key: 'matchDetected',
            title: <FormattedMessage defaultMessage="Match Found" />,
          },
        ]}
        dataSource={
          dataFormatted?.aiVisionEvents.edges.map((edge) => ({
            business: edge.node.business.name,
            camera: edge.node.camera.serialNumber,
            createdAt: edge.node.createdAt,
            matchDetected: edge.node.matchFound ? 'Yes' : 'No',
            type: formatCameraEventType(),
          })) ?? []
        }
        pagination={{
          current: page,
          pageSize,
          total: data?.aiVisionEvents.totalCount ?? 0,
          onChange: (newPage) => setPage(newPage),
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total, range) => (
            <FormattedMessage
              defaultMessage="{start}-{end} of {total} events"
              values={{
                start: range[0],
                end: range[1],
                total,
              }}
            />
          ),
        }}
        size="small"
      />
    </>
  );
};

export default AiTrends;
