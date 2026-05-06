import type { StockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import type { StockRemovalRequestsQuery } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import MarkAsPickedModal from '#/views/stock-removal-requests/components/MarkAsPickedModal/MarkAsPickedModal';
import StockRemovalRequestStatusBadge from '#/views/stock-removal-requests/components/StockRemovalRequestStatusBadge/StockRemovalRequestStatusBadge';
import ViewStockRemovalRequest from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/ViewStockRemovalRequest.view';
import { useMarkStockRemovalRequestAsCollectedMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/mark-collected.generated';
import { faBoxCheck, faBoxOpen, faEye } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Popconfirm,
  Row,
  Skeleton,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import {
  StockRemovalRequestApprovalStatus,
  StockRemovalRequestStatus,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from './MyStockRequests.styles';

const { Text, Title } = Typography;

interface Props {
  data: StockRemovalRequestsQuery | undefined;
  isStoreUser: boolean;
  isUserInDCGroup: boolean;
  isUserInPAPGroup: boolean;
  loading: boolean;
  markAsPickedData: StockRemovalRequestQuery | undefined;
  markAsPickedOpen: null | string;
  setMarkAsPickedOpen: (id: null | string) => void;
  setViewOpen: (id: null | string) => void;
  userBusinessIds: string[];
  viewOpen: null | string;
}

const MyStockRequests = ({
  data,
  isStoreUser,
  isUserInDCGroup,
  isUserInPAPGroup,
  loading,
  markAsPickedData,
  markAsPickedOpen,
  setMarkAsPickedOpen,
  setViewOpen,
  userBusinessIds,
  viewOpen,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const currentUser = useAtomValue(currentUserAtom);

  const [markAsCollectedMutation] =
    useMarkStockRemovalRequestAsCollectedMutation();

  const handleMarkAsCollected = (requestId: string) => {
    void markAsCollectedMutation({
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'Request marked as collected.',
          }),
          message: intl.formatMessage({ defaultMessage: 'Collected' }),
          placement: 'bottomRight',
        });
      },
      onError: () => {
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Something went wrong.',
          }),
          message: intl.formatMessage({ defaultMessage: 'Error' }),
          placement: 'bottomRight',
        });
      },
      refetchQueries: ['stockRemovalRequest', 'StockRemovalRequests'],
      variables: { where: { id: requestId } },
    });
  };

  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{ margin: 0 }}
      >
        <Row
          align="middle"
          gutter={8}
          style={{ margin: '10px 0 10px 5px' }}
          wrap={false}
        >
          <Col style={{ minWidth: 'min-content' }}>
            <Title className={classes.title} style={{ fontSize: 16 }}>
              {intl.formatMessage({
                defaultMessage: 'My Stock Requests',
              })}
            </Title>
          </Col>
          <Col flex={1} />
        </Row>
      </Card>
      {loading ? (
        <Row
          align="stretch"
          gutter={[8, 8]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))}
        </Row>
      ) : (
        <DashboardInfiniteScroll
          dataLength={data?.stockRemovalRequests?.edges?.length ?? 0}
          hasMore={false}
          id="scroll-stock-requests"
          next={() => {}}
        >
          <Row className={classes.header} wrap={false}>
            <Col style={{ width: 80 }}>
              {intl.formatMessage({
                defaultMessage: 'Alert ID',
              })}
            </Col>
            <Col flex={1}>
              {intl.formatMessage({
                defaultMessage: 'Subject',
              })}
            </Col>
            <Col style={{ width: 120 }}>
              {intl.formatMessage({
                defaultMessage: 'Status',
              })}
            </Col>
            <Col style={{ width: 80 }}>
              {intl.formatMessage({
                defaultMessage: 'Actions',
              })}
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <div>
            {data?.stockRemovalRequests?.edges?.map(({ node: request }) => {
              // Check if current user needs to approve this request
              const requiresMyApproval =
                (request.status === StockRemovalRequestStatus.PendingApproval &&
                  request.approvers.some(
                    (approver) =>
                      approver.user.id === currentUser?.id &&
                      approver.status === StockRemovalRequestApprovalStatus.Open
                  )) ||
                (request.status ===
                  StockRemovalRequestStatus.AwaitingPapApproval &&
                  isUserInPAPGroup);

              // Check if this request requires picking
              const requiresPicking =
                request.status === StockRemovalRequestStatus.Picking &&
                (isUserInDCGroup ||
                  (isStoreUser &&
                    request.business &&
                    userBusinessIds.includes(request.business.id)));

              const requiresCollection =
                request.status === StockRemovalRequestStatus.Picked &&
                request.storeOrDC !== 'DC' &&
                isStoreUser &&
                request.business !== null &&
                userBusinessIds.includes(request.business.id);

              const isHighlighted =
                requiresMyApproval || requiresPicking || requiresCollection;

              return (
                <>
                  <Row
                    align="middle"
                    className={
                      isHighlighted
                        ? classes.highlightedRow
                        : classes.contentRow
                    }
                    wrap={false}
                  >
                    <Col style={{ width: 80 }}>
                      <Text style={{ fontSize: 14 }}>
                        {request.reference || (
                          <FormattedMessage defaultMessage="-" />
                        )}
                      </Text>
                    </Col>
                    <Col flex={1}>
                      <Text style={{ fontSize: 14 }}>
                        {request.title.length > 40 ? (
                          <>
                            {request.title.slice(0, 40)}
                            <FormattedMessage defaultMessage="..." />
                          </>
                        ) : (
                          request.title
                        )}
                      </Text>
                    </Col>
                    <Col style={{ width: 120 }}>
                      <StockRemovalRequestStatusBadge status={request.status} />
                    </Col>
                    <Col style={{ width: 80 }}>
                      <Row gutter={4}>
                        <Col>
                          <Tooltip
                            title={intl.formatMessage({
                              defaultMessage: 'View Request',
                            })}
                          >
                            <Button
                              onClick={() => setViewOpen(request.id)}
                              size="small"
                              type={requiresMyApproval ? 'primary' : 'default'}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Button>
                          </Tooltip>
                        </Col>
                        {requiresPicking && (
                          <Col>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Mark as Picked',
                              })}
                            >
                              <Button
                                onClick={() => setMarkAsPickedOpen(request.id)}
                                size="small"
                                type="primary"
                              >
                                <FontAwesomeIcon icon={faBoxCheck} />
                              </Button>
                            </Tooltip>
                          </Col>
                        )}
                        {requiresCollection && (
                          <Col>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Mark as Collected',
                              })}
                            >
                              <Popconfirm
                                onConfirm={() =>
                                  handleMarkAsCollected(request.id)
                                }
                                title={intl.formatMessage({
                                  defaultMessage:
                                    'Mark this request as collected?',
                                })}
                              >
                                <Button size="small" type="primary">
                                  <FontAwesomeIcon icon={faBoxOpen} />
                                </Button>
                              </Popconfirm>
                            </Tooltip>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </Row>
                  <Divider style={{ margin: 0 }} />
                </>
              );
            })}
          </div>
        </DashboardInfiniteScroll>
      )}

      <Drawer
        onClose={() => setViewOpen(null)}
        open={viewOpen !== null}
        title={intl.formatMessage({ defaultMessage: 'View Request' })}
        width={1000}
      >
        {viewOpen && <ViewStockRemovalRequest requestId={viewOpen} />}
      </Drawer>

      {markAsPickedOpen && markAsPickedData?.stockRemovalRequest && (
        <MarkAsPickedModal
          isDC={isUserInDCGroup}
          items={markAsPickedData.stockRemovalRequest.items}
          onClose={() => setMarkAsPickedOpen(null)}
          requestId={markAsPickedOpen}
          visible={markAsPickedOpen !== null}
        />
      )}
    </Col>
  );
};

export default MyStockRequests;
