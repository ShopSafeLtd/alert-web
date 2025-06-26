import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useApproveStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/approve-stock-request.generated';
import { useRejectStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/reject-stock-request.generated';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { faClose } from '@fortawesome/pro-light-svg-icons';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Descriptions,
  Popconfirm,
  Row,
  Table,
  Typography,
} from 'antd';
import {
  StockRemovalRequestApprovalStatus,
  StockRemovalRequestStatus,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  requestId: string;
}

const getStockRemovalRequestlStatusText = (
  value: StockRemovalRequestStatus
) => {
  if (value === StockRemovalRequestStatus.Open)
    return <FormattedMessage defaultMessage="Processing Request" />;
  if (value === StockRemovalRequestStatus.Closed)
    return <FormattedMessage defaultMessage="Completed" />;
  return <FormattedMessage defaultMessage="Pending Approval" />;
};

const getStockRemovalRequestApprovalStatusText = (
  value: StockRemovalRequestApprovalStatus
) => {
  if (value === StockRemovalRequestApprovalStatus.Approved)
    return <FormattedMessage defaultMessage="Approved" />;
  if (value === StockRemovalRequestApprovalStatus.Rejected)
    return <FormattedMessage defaultMessage="Rejected" />;
  return <FormattedMessage defaultMessage="Pending Approval" />;
};

const getStockRemovalRequestApprovalStatusColour = (
  value: StockRemovalRequestApprovalStatus
) => {
  if (value === StockRemovalRequestApprovalStatus.Approved) return 'success';
  if (value === StockRemovalRequestApprovalStatus.Rejected) return 'danger';
  return undefined;
};

const ViewStockRemovalRequest = ({ requestId }: Props) => {
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);

  const { data } = useStockRemovalRequestQuery({
    variables: {
      where: {
        id: requestId,
      },
    },
  });
  const [acceptRequestMutation] = useApproveStockRequestMutation();
  const [rejectRequestMutation] = useRejectStockRequestMutation();

  const acceptRequest = (item: {
    id: string;
    user: { fullName: string; id: string };
  }) => {
    void acceptRequestMutation({
      optimisticResponse: {
        approveStockRemovalRequest: {
          id: item.id,
          status: StockRemovalRequestApprovalStatus.Approved,
          user: item.user,
        },
      },
      variables: {
        where: {
          id: item.id,
        },
      },
    });
  };
  const rejectRequest = (item: {
    id: string;
    user: { fullName: string; id: string };
  }) => {
    void rejectRequestMutation({
      optimisticResponse: {
        rejectStockRemovalRequest: {
          id: item.id,
          status: StockRemovalRequestApprovalStatus.Rejected,
          user: item.user,
        },
      },
      variables: {
        where: {
          id: item.id,
        },
      },
    });
  };

  return (
    <div>
      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Request Details" />
      </Typography.Title>
      <Descriptions column={1}>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Subject' })}
        >
          {data?.stockRemovalRequest.title}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Description' })}
        >
          {data?.stockRemovalRequest.description}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Status' })}
        >
          {data &&
            getStockRemovalRequestlStatusText(data.stockRemovalRequest.status)}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({ defaultMessage: 'Reason For Removal' })}
        >
          {data?.stockRemovalRequest.reason}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Store or DC?',
          })}
        >
          {data?.stockRemovalRequest.storeOrDC}
        </Descriptions.Item>
        {data?.stockRemovalRequest.storeOrDC === 'DC' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Shipping Address',
            })}
          >
            {data?.stockRemovalRequest.storeOrDC}
          </Descriptions.Item>
        )}
        {data?.stockRemovalRequest.storeOrDC === 'Store' && (
          <Descriptions.Item
            label={intl.formatMessage({ defaultMessage: 'Business' })}
          >
            {data?.stockRemovalRequest.business?.name}
          </Descriptions.Item>
        )}
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Recharged to Brand?',
          })}
        >
          {data?.stockRemovalRequest.storeOrDC}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Is this being recharged to Brand?',
          })}
        >
          {data?.stockRemovalRequest.rechargeBrand}
        </Descriptions.Item>
        {data?.stockRemovalRequest.rechargeBrand === 'Yes' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Brand Recharge Reference',
            })}
          >
            {data?.stockRemovalRequest.rechargeReference}
          </Descriptions.Item>
        )}
        {data?.stockRemovalRequest.rechargeBrand === 'No' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Cost Centre / Nominal Budget code',
            })}
          >
            {data?.stockRemovalRequest.costCentreCode}
          </Descriptions.Item>
        )}
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Will the stock be returned?',
          })}
        >
          {data?.stockRemovalRequest.willStockBeReturned}
        </Descriptions.Item>
        {data?.stockRemovalRequest.willStockBeReturned === 'Yes' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'SMQ Account Number',
            })}
          >
            {data?.stockRemovalRequest.smqAccountNumber}
          </Descriptions.Item>
        )}
        {data?.stockRemovalRequest.willStockBeReturned === 'Yes' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Estimated Return Date',
            })}
          >
            {data?.stockRemovalRequest.returnDate}
          </Descriptions.Item>
        )}
        {data?.stockRemovalRequest.willStockBeReturned === 'No' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Reason for the stock not being returned',
            })}
          >
            {data?.stockRemovalRequest.reasonForNonReturn}
          </Descriptions.Item>
        )}
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Does this involve personality influences?',
          })}
        >
          {data?.stockRemovalRequest.personalityInfluences}
        </Descriptions.Item>
        {data?.stockRemovalRequest.personalityInfluences === 'Yes' && (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Social Handles',
            })}
          >
            {data?.stockRemovalRequest.socialHandles}
          </Descriptions.Item>
        )}
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Fascia',
          })}
        >
          {data?.stockRemovalRequest.fascia}
        </Descriptions.Item>
      </Descriptions>
      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Requested Items" />
      </Typography.Title>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
          },
          {
            dataIndex: 'requestedQuantity',
            key: 'requestedQuantity',
            title: intl.formatMessage({ defaultMessage: 'Requested Quantity' }),
            width: 200,
          },
          {
            dataIndex: 'pickedQuantity',
            key: 'pickedQuantity',
            title: intl.formatMessage({ defaultMessage: 'Picked Quantity' }),
            width: 200,
          },
        ]}
        dataSource={data?.stockRemovalRequest.items.map((item) => ({
          name: item.name,
          pickedQuantity: item.pickedQuantity ?? 0,
          requestedQuantity: item.requestedQuantity,
        }))}
        size="small"
      />
      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Approvals" />
      </Typography.Title>
      {data?.stockRemovalRequest.approvers.map((approver) => (
        <Row align="middle" key={approver.id} style={{ marginBottom: 14 }}>
          <Col span={4}>
            <Typography.Paragraph strong style={{ marginBottom: 0 }}>
              {approver.user.fullName}
            </Typography.Paragraph>
          </Col>
          {currentUser?.id !== approver.user.id && (
            <Col>
              <Typography.Paragraph
                style={{ marginBottom: 0 }}
                type={getStockRemovalRequestApprovalStatusColour(
                  approver.status
                )}
              >
                {getStockRemovalRequestApprovalStatusText(approver.status)}
              </Typography.Paragraph>
            </Col>
          )}
          {currentUser?.id === approver.user.id &&
            approver.status === StockRemovalRequestApprovalStatus.Approved && (
              <Col>
                <Typography.Paragraph
                  type={getStockRemovalRequestApprovalStatusColour(
                    approver.status
                  )}
                >
                  {getStockRemovalRequestApprovalStatusText(approver.status)}
                </Typography.Paragraph>
              </Col>
            )}
          {currentUser?.id === approver.user.id &&
            approver.status !== StockRemovalRequestApprovalStatus.Approved && (
              <Col>
                <Row>
                  <Col>
                    <Button
                      onClick={() => acceptRequest(approver)}
                      style={{
                        borderBottomRightRadius: 0,
                        borderRightWidth: 0,
                        borderTopRightRadius: 0,
                      }}
                    >
                      <Row gutter={8}>
                        <Col>
                          <FontAwesomeIcon icon={faCheck} />
                        </Col>
                        <Col>
                          <FormattedMessage defaultMessage="Approve" />
                        </Col>
                      </Row>
                    </Button>
                  </Col>
                  <Col>
                    <Popconfirm
                      onConfirm={() => rejectRequest(approver)}
                      overlayInnerStyle={{ padding: 10 }}
                      title={intl.formatMessage({
                        defaultMessage: 'Are you sure?',
                      })}
                    >
                      <Button
                        style={{
                          borderBottomLeftRadius: 0,
                          borderTopLeftRadius: 0,
                        }}
                      >
                        <Row gutter={8}>
                          <Col>
                            <FontAwesomeIcon icon={faClose} />
                          </Col>
                          <Col>
                            <FormattedMessage defaultMessage="Reject" />
                          </Col>
                        </Row>
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </Col>
            )}
        </Row>
      ))}
    </div>
  );
};

export default ViewStockRemovalRequest;
