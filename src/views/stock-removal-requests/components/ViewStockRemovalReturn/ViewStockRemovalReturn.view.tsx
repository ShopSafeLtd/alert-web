import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import StockRemovalComments from '#/views/stock-removal-requests/components/StockRemovalComments';
import StockRemovalRequestStatusBadge from '#/views/stock-removal-requests/components/StockRemovalRequestStatusBadge/StockRemovalRequestStatusBadge';
import { useMarkStockRemovalRequestAsReturnedMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/mark-returned.generated';
import { useStockRemovalReturnQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalReturn/graphql/__generated__/stock-removal-return.generated';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import { StockRemovalRequestStatus } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  requestId: string;
}

const DC_GROUP_ID = 'cmgfd4l4r0000it3n4u2eckmf';

const ViewStockRemovalReturn = ({ requestId }: Props) => {
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);

  const { data } = useStockRemovalReturnQuery({
    variables: {
      where: {
        id: requestId,
      },
    },
  });

  const [markAsReturnedMutation] =
    useMarkStockRemovalRequestAsReturnedMutation();

  const isInDCGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === DC_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  const isStoreUser = useMemo(() => {
    const hasBusinesses = (currentUser?.businesses?.length ?? 0) > 0;
    return hasBusinesses && !isInDCGroup;
  }, [currentUser, isInDCGroup]);

  const canMarkAsReturned =
    data?.stockRemovalRequest.status ===
      StockRemovalRequestStatus.AwaitingReturn &&
    (isInDCGroup || isStoreUser);

  const handleMarkAsReturned = () => {
    void markAsReturnedMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage:
              'Return has been confirmed. The requestor will be notified.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Return Confirmed',
          }),
          placement: 'bottomRight',
        });
      },
      onError: () => {
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Something went wrong.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Error',
          }),
          placement: 'bottomRight',
        });
      },
      refetchQueries: ['stockRemovalReturn', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const request = data?.stockRemovalRequest;

  const itemColumns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Name' }),
    },
    {
      dataIndex: 'brand',
      key: 'brand',
      title: intl.formatMessage({ defaultMessage: 'Brand' }),
      width: 150,
    },
    {
      dataIndex: 'sku',
      key: 'sku',
      title: intl.formatMessage({ defaultMessage: 'SKU' }),
      width: 120,
    },
    {
      dataIndex: 'requestedQuantity',
      key: 'requestedQuantity',
      title: intl.formatMessage({ defaultMessage: 'Quantity' }),
      width: 100,
    },
    {
      dataIndex: 'damaged',
      key: 'damaged',
      render: (val: boolean | null | undefined) =>
        val ? (
          <Tag color="error">
            <FormattedMessage defaultMessage="Damaged" />
          </Tag>
        ) : (
          <Tag color="success">
            <FormattedMessage defaultMessage="OK" />
          </Tag>
        ),
      title: intl.formatMessage({ defaultMessage: 'Condition' }),
      width: 120,
    },
  ];

  return (
    <div>
      <Row align="middle" justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            <FormattedMessage defaultMessage="Return Request Details" />
          </Typography.Title>
        </Col>
        <Col>
          {request && (
            <StockRemovalRequestStatusBadge status={request.status} />
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col lg={12} xs={24}>
          <Card
            size="small"
            style={{ height: '100%' }}
            title={
              <Typography.Text strong>
                <FormattedMessage defaultMessage="Overview" />
              </Typography.Text>
            }
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Reference' })}
              >
                <Typography.Text strong>
                  <FormattedMessage
                    defaultMessage="#{reference}"
                    values={{ reference: request?.reference }}
                  />
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Created By' })}
              >
                {request?.createdBy.fullName}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Date Submitted',
                })}
              >
                {request?.createdAt
                  ? dayjs(request.createdAt).format('DD/MM/YYYY')
                  : intl.formatMessage({ defaultMessage: '-' })}
              </Descriptions.Item>
              {request?.returnOrignalId && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Original Alert ID',
                  })}
                >
                  {request.returnOrignalId}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        <Col lg={12} xs={24}>
          <Card
            size="small"
            style={{ height: '100%' }}
            title={
              <Typography.Text strong>
                <FormattedMessage defaultMessage="Return Details" />
              </Typography.Text>
            }
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Returning To',
                })}
              >
                <Tag color={request?.storeOrDC === 'DC' ? 'blue' : 'green'}>
                  {request?.storeOrDC}
                </Tag>
              </Descriptions.Item>
              {request?.storeOrDC === 'STORE' && request?.business && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Store',
                  })}
                >
                  {request.business.name}
                </Descriptions.Item>
              )}
              {request?.rechargeReference && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Brand Recharge Reference',
                  })}
                >
                  {request.rechargeReference}
                </Descriptions.Item>
              )}
              {request?.costCentreCode && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Cost Centre',
                  })}
                >
                  {request.costCentreCode}
                </Descriptions.Item>
              )}
              {request?.nominalCode && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Nominal Code',
                  })}
                >
                  {request.nominalCode}
                </Descriptions.Item>
              )}
              {request?.tracking && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Tracking Numbers',
                  })}
                >
                  {request.tracking}
                </Descriptions.Item>
              )}
              {request?.dateofReturn && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Return',
                  })}
                >
                  {dayjs(request.dateofReturn).format('DD/MM/YYYY')}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Mark as Returned action */}
      {canMarkAsReturned && (
        <>
          <Row justify="center" style={{ marginBottom: 24 }}>
            <Col>
              <Space size="middle">
                <Button onClick={handleMarkAsReturned} type="primary">
                  <FormattedMessage defaultMessage="Confirm Stock Received — Mark as Returned" />
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider />
        </>
      )}

      {/* Return Images */}
      {request?.returnImages && request.returnImages.length > 0 && (
        <>
          <Typography.Title level={4}>
            <FormattedMessage defaultMessage="Return Photos" />
          </Typography.Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {request.returnImages.map((img) => (
              <Col key={img.id}>
                <Image
                  height={150}
                  src={img.url ?? ''}
                  style={{ borderRadius: 4, objectFit: 'cover' }}
                  width={150}
                />
              </Col>
            ))}
          </Row>
          <Divider />
        </>
      )}

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Items Being Returned" />
      </Typography.Title>
      <Table
        columns={itemColumns}
        dataSource={request?.items}
        pagination={false}
        rowKey="id"
        size="small"
      />

      <Divider />

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Comments" />
      </Typography.Title>
      <StockRemovalComments
        requestId={requestId}
        updates={data?.stockRemovalRequest.updates}
      />
    </div>
  );
};

export default ViewStockRemovalReturn;
