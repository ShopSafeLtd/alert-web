import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import MarkAsPickedModal from '#/views/stock-removal-requests/components/MarkAsPickedModal/MarkAsPickedModal';
import StockRemovalComments from '#/views/stock-removal-requests/components/StockRemovalComments';
import StockRemovalRequestStatusBadge from '#/views/stock-removal-requests/components/StockRemovalRequestStatusBadge/StockRemovalRequestStatusBadge';
import PickingListPrint from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/PickingListPrint';
import { useApproveCancelStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/approve-cancel-stock-request.generated';
import { useApprovePapStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/approve-pap-stock-request.generated';
import { useApproveStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/approve-stock-request.generated';
import { useMarkStockRemovalRequestAsCollectedMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/mark-collected.generated';
import { useMarkStockRemovalRequestAsReturnedMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/mark-returned.generated';
import { useRejectPapStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/reject-pap-stock-request.generated';
import { useRejectStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/reject-stock-request.generated';
import { useRequestCancelStockRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/request-cancel-stock-request.generated';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { faClose, faPrint } from '@fortawesome/pro-light-svg-icons';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from 'antd';
import {
  PermissionMethod,
  PermissionModel,
  StockRemovalPriority,
  StockRemovalRequestApprovalStatus,
  StockRemovalRequestStatus,
  StockRemovalRquestDestination,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  requestId: string;
}

const PAP_GROUP_ID = 'cmg9ni6h70018ityamnewhbvq'; // PAP group ID
const DC_GROUP_ID = 'cmgfd4l4r0000it3n4u2eckmf'; // DC group ID
const PAP_APPROVE_CANCELLATION_GROUP_ID = 'cmotsrpl302g9o401e52ev859'; // PAP Approve Cancellation group ID

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

const PRIORITY_TAG_COLOR: Record<StockRemovalPriority, string> = {
  [StockRemovalPriority.High]: 'red',
  [StockRemovalPriority.Low]: 'green',
  [StockRemovalPriority.Medium]: 'orange',
};

const PRIORITY_LABEL: Record<StockRemovalPriority, string> = {
  [StockRemovalPriority.High]: 'High',
  [StockRemovalPriority.Low]: 'Low',
  [StockRemovalPriority.Medium]: 'Medium',
};

const DESTINATION_LABEL: Record<StockRemovalRquestDestination, string> = {
  [StockRemovalRquestDestination.CustomerCare]: 'Customer Care',
  [StockRemovalRquestDestination.Eu]: 'EU',
  [StockRemovalRquestDestination.HeadOffice]: 'Head Office',
  [StockRemovalRquestDestination.International]: 'International',
  [StockRemovalRquestDestination.Outdoor]: 'Outdoor',
  [StockRemovalRquestDestination.Uk]: 'UK',
};

const ViewStockRemovalRequest = ({ requestId }: Props) => {
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);
  const permissions = useAtomValue(currentPermissionsAtom);

  const [showPickedModal, setShowPickedModal] = useState(false);
  const { componentRef, handlePrint, isPrinting } = useReportPrint();

  const { data } = useStockRemovalRequestQuery({
    variables: {
      where: {
        id: requestId,
      },
    },
  });

  const [acceptRequestMutation] = useApproveStockRequestMutation();
  const [rejectRequestMutation] = useRejectStockRequestMutation();
  const [acceptPAPRequestMutation] = useApprovePapStockRequestMutation();
  const [rejectPAPRequestMutation] = useRejectPapStockRequestMutation();
  const [markAsCollectedMutation] =
    useMarkStockRemovalRequestAsCollectedMutation();
  const [markAsReturnedMutation] =
    useMarkStockRemovalRequestAsReturnedMutation();
  const [requestCancelMutation] = useRequestCancelStockRequestMutation();
  const [approveCancelMutation] = useApproveCancelStockRequestMutation();

  // eslint-disable-next-line no-underscore-dangle
  const _hasEditPermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Edit,
          model: PermissionModel.StockRemovalRequests,
        },
        permissions,
      }),
    [permissions]
  );

  const hasViewPermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Read,
          model: PermissionModel.StockRemovalRequests,
        },
        permissions,
      }),
    [permissions]
  );

  // Check if current user is in PAP group
  const isInPAPGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === PAP_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check if current user is in PAP Approve Cancellation group
  const isInPAPApproveCancellationGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) =>
          group.id === PAP_APPROVE_CANCELLATION_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check if current user is in DC group
  const isInDCGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === DC_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  const isStoreUser = useMemo(() => {
    const hasBusinesses = (currentUser?.businesses?.length ?? 0) > 0;
    return hasBusinesses && !isInPAPGroup && !isInDCGroup;
  }, [currentUser, isInPAPGroup, isInDCGroup]);

  const userBusinessIds = useMemo(
    () =>
      currentUser?.businesses?.map((business: { id: string }) => business.id) ??
      [],
    [currentUser]
  );

  // Check if current user needs to approve this request
  const requiresMyApproval = useMemo(() => {
    if (!data || !currentUser) return false;

    return (
      data.stockRemovalRequest.status ===
        StockRemovalRequestStatus.PendingApproval &&
      data.stockRemovalRequest.approvers.some(
        (approver) =>
          approver.user.id === currentUser.id &&
          approver.status === StockRemovalRequestApprovalStatus.Open
      )
    );
  }, [data, currentUser]);

  // Get current user's approver record if they are an approver
  const myApproverRecord = useMemo(() => {
    if (!data || !currentUser) return null;

    return data.stockRemovalRequest.approvers.find(
      (approver) => approver.user.id === currentUser.id
    );
  }, [data, currentUser]);

  const acceptRequest = (item: {
    id: string;
    user: { fullName: string; id: string };
  }) => {
    void acceptRequestMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request approved successfully.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Approved',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
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
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request rejected.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Rejected',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: item.id,
        },
      },
    });
  };

  const handlePAPApprove = () => {
    void acceptPAPRequestMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'PAP approval completed.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Approved',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const handlePAPReject = () => {
    void rejectPAPRequestMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request rejected by PAP.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Rejected',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const handleMarkAsCollected = () => {
    void markAsCollectedMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request marked as collected.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Collected',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const handleMarkAsReturned = () => {
    void markAsReturnedMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request marked as returned and closed.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Returned',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const handleRequestCancel = () => {
    void requestCancelMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage:
              'Cancellation request submitted. The PAP group will be notified.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Cancellation Requested',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const handleApproveCancel = () => {
    void approveCancelMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request has been cancelled.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Cancelled',
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
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: {
        where: {
          id: requestId,
        },
      },
    });
  };

  const isDC = data?.stockRemovalRequest.storeOrDC === 'DC';

  const isCreator = currentUser?.id === data?.stockRemovalRequest.createdBy.id;

  // Determine which action buttons to show
  const showPAPApprovalButtons =
    data?.stockRemovalRequest.status ===
      StockRemovalRequestStatus.AwaitingPapApproval &&
    isInPAPGroup &&
    !isCreator;

  const showPickingButton =
    data?.stockRemovalRequest.status === StockRemovalRequestStatus.Picking &&
    ((isInDCGroup && isDC) ||
      (isStoreUser &&
        !!data?.stockRemovalRequest.business?.id &&
        userBusinessIds.includes(data.stockRemovalRequest.business.id)));

  const showCollectedButton =
    data?.stockRemovalRequest.status === StockRemovalRequestStatus.Picked &&
    !isDC &&
    hasViewPermission;

  const showReturnedButton =
    data?.stockRemovalRequest.status ===
      StockRemovalRequestStatus.AwaitingReturn && hasViewPermission;

  const showRequestCancelButton =
    data?.stockRemovalRequest.status !== undefined &&
    [
      StockRemovalRequestStatus.AwaitingPapApproval,
      StockRemovalRequestStatus.PendingApproval,
      StockRemovalRequestStatus.Picked,
      StockRemovalRequestStatus.Picking,
    ].includes(data.stockRemovalRequest.status) &&
    isCreator;

  const showApproveCancelButton =
    data?.stockRemovalRequest.status ===
      StockRemovalRequestStatus.RequestedCancel &&
    (isInPAPGroup || isInPAPApproveCancellationGroup);

  const itemColumns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: intl.formatMessage({ defaultMessage: 'Name' }),
    },
    ...(isDC
      ? [
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
        ]
      : []),
    {
      dataIndex: 'requestedQuantity',
      key: 'requestedQuantity',
      title: intl.formatMessage({ defaultMessage: 'Requested Quantity' }),
      width: 150,
    },
    {
      dataIndex: 'pickedQuantity',
      key: 'pickedQuantity',
      title: intl.formatMessage({ defaultMessage: 'Picked Quantity' }),
      width: 150,
    },
    ...(isDC
      ? [
          {
            dataIndex: 'tmid',
            key: 'tmid',
            render: (val: null | string) => val ?? '-',
            title: intl.formatMessage({ defaultMessage: 'TMID' }),
            width: 120,
          },
          {
            dataIndex: 'tracking',
            key: 'tracking',
            render: (val: null | string) => val ?? '-',
            title: intl.formatMessage({ defaultMessage: 'Tracking' }),
            width: 120,
          },
        ]
      : []),
  ];

  return (
    <div>
      {/* Action Required Alert - shown when current user needs to approve */}
      {requiresMyApproval && myApproverRecord && (
        <Alert
          description={
            <Typography.Paragraph strong style={{ marginBottom: 0 }}>
              <FormattedMessage defaultMessage="This request requires your approval to proceed. Please review the details below and scroll to the Approvals section to approve or reject this request." />
            </Typography.Paragraph>
          }
          message={
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              <FormattedMessage defaultMessage="⚠️ Your Approval Required" />
            </Typography.Title>
          }
          showIcon={false}
          style={{
            border: '2px solid #faad14',
            marginBottom: 24,
          }}
          type="warning"
        />
      )}

      {data?.stockRemovalRequest.status ===
        StockRemovalRequestStatus.RequestedCancel && (
        <Alert
          description={
            <Typography.Paragraph strong style={{ marginBottom: 0 }}>
              {isInPAPGroup || isInPAPApproveCancellationGroup ? (
                <FormattedMessage defaultMessage="The creator has requested cancellation of this request. Please review and approve or deny the cancellation below." />
              ) : (
                <FormattedMessage defaultMessage="Cancellation has been requested for this request and is awaiting approval." />
              )}
            </Typography.Paragraph>
          }
          message={
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              <FormattedMessage defaultMessage="Cancellation Requested" />
            </Typography.Title>
          }
          showIcon={false}
          style={{
            border: '2px solid #ff4d4f',
            marginBottom: 24,
          }}
          type="error"
        />
      )}

      <Row align="middle" justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            <FormattedMessage defaultMessage="Request Details" />
          </Typography.Title>
        </Col>
        <Col>
          {data && (
            <StockRemovalRequestStatusBadge
              status={data.stockRemovalRequest.status}
            />
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* Overview Card */}
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
                    values={{ reference: data?.stockRemovalRequest.reference }}
                  />
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Created By' })}
              >
                {data?.stockRemovalRequest.createdBy.fullName}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Subject' })}
              >
                {data?.stockRemovalRequest.title}
              </Descriptions.Item>
              {data?.stockRemovalRequest.priority && (
                <Descriptions.Item
                  label={intl.formatMessage({ defaultMessage: 'Priority' })}
                >
                  <Tag
                    color={
                      PRIORITY_TAG_COLOR[data.stockRemovalRequest.priority]
                    }
                  >
                    {PRIORITY_LABEL[data.stockRemovalRequest.priority]}
                  </Tag>
                </Descriptions.Item>
              )}
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Description' })}
              >
                {data?.stockRemovalRequest.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Removal Details Card */}
        <Col lg={12} xs={24}>
          <Card
            size="small"
            style={{ height: '100%' }}
            title={
              <Typography.Text strong>
                <FormattedMessage defaultMessage="Removal Details" />
              </Typography.Text>
            }
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Reason For Removal',
                })}
              >
                {data?.stockRemovalRequest.reason}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Store or DC?',
                })}
              >
                <Tag
                  color={
                    data?.stockRemovalRequest.storeOrDC === 'DC'
                      ? 'blue'
                      : 'green'
                  }
                >
                  {data?.stockRemovalRequest.storeOrDC}
                </Tag>
              </Descriptions.Item>
              {data?.stockRemovalRequest.storeOrDC === 'DC' && (
                <>
                  {data?.stockRemovalRequest.recipientName && (
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Recipient Name',
                      })}
                    >
                      {data?.stockRemovalRequest.recipientName}
                    </Descriptions.Item>
                  )}
                  {data?.stockRemovalRequest.recipientPhone && (
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Recipient Phone',
                      })}
                    >
                      {data?.stockRemovalRequest.recipientPhone}
                    </Descriptions.Item>
                  )}
                  {data?.stockRemovalRequest.recipientEmail && (
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Recipient Email',
                      })}
                    >
                      {data?.stockRemovalRequest.recipientEmail}
                    </Descriptions.Item>
                  )}
                  {data?.stockRemovalRequest.shippingAddressLine1 ? (
                    <>
                      <Descriptions.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Address Line 1',
                        })}
                      >
                        {data.stockRemovalRequest.shippingAddressLine1}
                      </Descriptions.Item>
                      {data.stockRemovalRequest.shippingAddressLine2 && (
                        <Descriptions.Item
                          label={intl.formatMessage({
                            defaultMessage: 'Address Line 2',
                          })}
                        >
                          {data.stockRemovalRequest.shippingAddressLine2}
                        </Descriptions.Item>
                      )}
                      {data.stockRemovalRequest.shippingCity && (
                        <Descriptions.Item
                          label={intl.formatMessage({
                            defaultMessage: 'City',
                          })}
                        >
                          {data.stockRemovalRequest.shippingCity}
                        </Descriptions.Item>
                      )}
                      {data.stockRemovalRequest.shippingCounty && (
                        <Descriptions.Item
                          label={intl.formatMessage({
                            defaultMessage: 'County',
                          })}
                        >
                          {data.stockRemovalRequest.shippingCounty}
                        </Descriptions.Item>
                      )}
                      {data.stockRemovalRequest.shippingPostcode && (
                        <Descriptions.Item
                          label={intl.formatMessage({
                            defaultMessage: 'Postcode',
                          })}
                        >
                          {data.stockRemovalRequest.shippingPostcode}
                        </Descriptions.Item>
                      )}
                      {data.stockRemovalRequest.shippingCountry && (
                        <Descriptions.Item
                          label={intl.formatMessage({
                            defaultMessage: 'Country',
                          })}
                        >
                          {data.stockRemovalRequest.shippingCountry}
                        </Descriptions.Item>
                      )}
                    </>
                  ) : (
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Shipping Address',
                      })}
                    >
                      {data?.stockRemovalRequest.shippingAddress}
                    </Descriptions.Item>
                  )}
                </>
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
                  defaultMessage: 'Fascia',
                })}
              >
                {data?.stockRemovalRequest.fascia}
              </Descriptions.Item>
              {data?.stockRemovalRequest.destination && (
                <Descriptions.Item
                  label={intl.formatMessage({ defaultMessage: 'Destination' })}
                >
                  {DESTINATION_LABEL[data.stockRemovalRequest.destination]}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* Financial Information Card */}
        <Col lg={12} xs={24}>
          <Card
            size="small"
            style={{ height: '100%' }}
            title={
              <Typography.Text strong>
                <FormattedMessage defaultMessage="Financial Information" />
              </Typography.Text>
            }
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Recharged to Brand?',
                })}
              >
                <Tag
                  color={
                    data?.stockRemovalRequest.rechargeBrand === 'Yes'
                      ? 'green'
                      : 'default'
                  }
                >
                  {data?.stockRemovalRequest.rechargeBrand}
                </Tag>
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
                <>
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Cost Centre',
                    })}
                  >
                    {data?.stockRemovalRequest.costCentreCode}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Nominal Code',
                    })}
                  >
                    {data?.stockRemovalRequest.nominalCode}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* Return Information Card */}
        <Col lg={12} xs={24}>
          <Card
            size="small"
            style={{ height: '100%' }}
            title={
              <Typography.Text strong>
                <FormattedMessage defaultMessage="Return Information" />
              </Typography.Text>
            }
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Will stock be returned?',
                })}
              >
                <Tag
                  color={
                    data?.stockRemovalRequest.willStockBeReturned === 'Yes'
                      ? 'green'
                      : 'default'
                  }
                >
                  {data?.stockRemovalRequest.willStockBeReturned}
                </Tag>
              </Descriptions.Item>
              {data?.stockRemovalRequest.willStockBeReturned === 'Yes' && (
                <>
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'SMQ Account Number',
                    })}
                  >
                    {data?.stockRemovalRequest.smqAccountNumber}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Estimated Return Date',
                    })}
                  >
                    {data?.stockRemovalRequest.returnDate}
                  </Descriptions.Item>
                </>
              )}
              {data?.stockRemovalRequest.willStockBeReturned === 'No' && (
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Reason for Non-Return',
                  })}
                >
                  {data?.stockRemovalRequest.reasonForNonReturn}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* Additional Information Card */}
        {(data?.stockRemovalRequest.personalityInfluences === 'Yes' ||
          data?.stockRemovalRequest.socialHandles) && (
          <Col lg={12} xs={24}>
            <Card
              size="small"
              style={{ height: '100%' }}
              title={
                <Typography.Text strong>
                  <FormattedMessage defaultMessage="Additional Information" />
                </Typography.Text>
              }
            >
              <Descriptions bordered column={1} size="small">
                <Descriptions.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Personality Influences?',
                  })}
                >
                  <Tag
                    color={
                      data?.stockRemovalRequest.personalityInfluences === 'Yes'
                        ? 'orange'
                        : 'default'
                    }
                  >
                    {data?.stockRemovalRequest.personalityInfluences}
                  </Tag>
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
              </Descriptions>
            </Card>
          </Col>
        )}

        {/* Tracking Details Card */}
        {(data?.stockRemovalRequest.tracking ||
          data?.stockRemovalRequest.tmid ||
          data?.stockRemovalRequest.picker) && (
          <Col lg={12} xs={24}>
            <Card
              size="small"
              style={{ height: '100%' }}
              title={
                <Typography.Text strong>
                  <FormattedMessage defaultMessage="Tracking Details" />
                </Typography.Text>
              }
            >
              <Descriptions bordered column={1} size="small">
                {data?.stockRemovalRequest.picker && (
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Picker' })}
                  >
                    {data.stockRemovalRequest.picker.fullName}
                  </Descriptions.Item>
                )}
                {data?.stockRemovalRequest.tmid && (
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'TMID' })}
                  >
                    {data.stockRemovalRequest.tmid}
                  </Descriptions.Item>
                )}
                {data?.stockRemovalRequest.tracking && (
                  <Descriptions.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Tracking Number',
                    })}
                  >
                    {data.stockRemovalRequest.tracking}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
        )}
      </Row>

      <Divider />

      {/* Workflow Action Buttons */}
      {(showPAPApprovalButtons ||
        showPickingButton ||
        showCollectedButton ||
        showReturnedButton ||
        showRequestCancelButton ||
        showApproveCancelButton) && (
        <>
          <Row justify="center" style={{ marginBottom: 24 }}>
            <Col>
              <Space size="middle">
                {showPAPApprovalButtons && (
                  <>
                    <Button onClick={handlePAPApprove} type="primary">
                      <FormattedMessage defaultMessage="Approve (PAP)" />
                    </Button>
                    <Popconfirm
                      onConfirm={handlePAPReject}
                      title={intl.formatMessage({
                        defaultMessage:
                          'Are you sure you want to reject this request?',
                      })}
                    >
                      <Button danger>
                        <FormattedMessage defaultMessage="Reject (PAP)" />
                      </Button>
                    </Popconfirm>
                  </>
                )}
                {showPickingButton && (
                  <>
                    <Button
                      icon={<FontAwesomeIcon icon={faPrint} />}
                      loading={isPrinting}
                      onClick={handlePrint}
                    >
                      <FormattedMessage defaultMessage="Print Picking List" />
                    </Button>
                    <Button
                      onClick={() => setShowPickedModal(true)}
                      type="primary"
                    >
                      <FormattedMessage defaultMessage="Mark as Picked" />
                    </Button>
                  </>
                )}
                {showCollectedButton && (
                  <Button onClick={handleMarkAsCollected} type="primary">
                    <FormattedMessage defaultMessage="Mark as Collected" />
                  </Button>
                )}
                {showReturnedButton && (
                  <Button onClick={handleMarkAsReturned} type="primary">
                    <FormattedMessage defaultMessage="Mark as Returned" />
                  </Button>
                )}
                {showRequestCancelButton && (
                  <Popconfirm
                    onConfirm={handleRequestCancel}
                    title={intl.formatMessage({
                      defaultMessage:
                        'Are you sure you want to request cancellation of this request?',
                    })}
                  >
                    <Button danger>
                      <FormattedMessage defaultMessage="Request Cancellation" />
                    </Button>
                  </Popconfirm>
                )}
                {showApproveCancelButton && (
                  <Popconfirm
                    onConfirm={handleApproveCancel}
                    title={intl.formatMessage({
                      defaultMessage:
                        'Are you sure you want to approve the cancellation of this request?',
                    })}
                  >
                    <Button danger type="primary">
                      <FormattedMessage defaultMessage="Approve Cancellation" />
                    </Button>
                  </Popconfirm>
                )}
              </Space>
            </Col>
          </Row>
          <Divider />
        </>
      )}

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Requested Items" />
      </Typography.Title>
      <Table
        columns={itemColumns}
        dataSource={data?.stockRemovalRequest.items}
        pagination={false}
        rowKey="id"
        scroll={{ x: isDC ? 900 : 500 }}
        size="small"
      />

      <Divider />

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Approvals" />
      </Typography.Title>
      {data?.stockRemovalRequest.approvers.map((approver) => {
        const isCurrentUser = currentUser?.id === approver.user.id;
        const isPending =
          approver.status === StockRemovalRequestApprovalStatus.Open;
        const needsAction = isCurrentUser && isPending && requiresMyApproval;

        return (
          <div
            key={approver.id}
            style={{
              backgroundColor: needsAction
                ? 'rgba(250, 173, 20, 0.08)'
                : 'transparent',
              border: needsAction
                ? '1px solid rgba(250, 173, 20, 0.3)'
                : 'none',
              borderRadius: needsAction ? 8 : 0,
              marginBottom: 14,
              padding: needsAction ? 12 : 0,
            }}
          >
            <Row align="middle">
              <Col span={4}>
                <Typography.Paragraph strong style={{ marginBottom: 0 }}>
                  {isCurrentUser && <FormattedMessage defaultMessage="➤ " />}
                  {approver.user.fullName}
                  {isCurrentUser && (
                    <FormattedMessage defaultMessage=" (You)" />
                  )}
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
                approver.status ===
                  StockRemovalRequestApprovalStatus.Approved && (
                  <Col>
                    <Typography.Paragraph
                      type={getStockRemovalRequestApprovalStatusColour(
                        approver.status
                      )}
                    >
                      {getStockRemovalRequestApprovalStatusText(
                        approver.status
                      )}
                    </Typography.Paragraph>
                  </Col>
                )}
              {currentUser?.id === approver.user.id &&
                !isCreator &&
                approver.status !==
                  StockRemovalRequestApprovalStatus.Approved &&
                data.stockRemovalRequest.status ===
                  StockRemovalRequestStatus.PendingApproval && (
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
          </div>
        );
      })}

      <Divider />

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Comments" />
      </Typography.Title>
      <StockRemovalComments
        requestId={requestId}
        updates={data?.stockRemovalRequest.updates}
      />

      {/* Mark as Picked Modal */}
      {data && (
        <MarkAsPickedModal
          isDC={isDC}
          items={data.stockRemovalRequest.items}
          onClose={() => setShowPickedModal(false)}
          requestId={requestId}
          visible={showPickedModal}
        />
      )}

      {/* Hidden printable component */}
      {data && (
        <div style={{ display: 'none' }}>
          <div ref={componentRef}>
            <PickingListPrint
              createdAt={data.stockRemovalRequest.createdAt}
              createdBy={data.stockRemovalRequest.createdBy.fullName ?? ''}
              items={data.stockRemovalRequest.items ?? []}
              recipientInfo={{
                address: isDC
                  ? (data.stockRemovalRequest.shippingAddress ?? '')
                  : undefined,
                name: isDC
                  ? 'Distribution Center'
                  : (data.stockRemovalRequest.business?.name ?? ''),
                recipientName: isDC
                  ? (data.stockRemovalRequest.recipientName ?? undefined)
                  : undefined,
                recipientPhone: isDC
                  ? (data.stockRemovalRequest.recipientPhone ?? undefined)
                  : undefined,
                type: isDC ? 'DC' : 'Store',
              }}
              reference={data.stockRemovalRequest.reference ?? 0}
              title={data.stockRemovalRequest.title ?? ''}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStockRemovalRequest;
