import type { Theme } from '#/configs/ThemeConfig';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import {
  currentPermissionsAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import AddStockRemovalRequest from '#/views/stock-removal-requests/components/AddStockRemovalRequest/AddStockRemovalRequest.view';
import ApproverAvatar from '#/views/stock-removal-requests/components/ApproverAvatar/ApproverAvatar';
import EditStockRemovalRequest from '#/views/stock-removal-requests/components/EditStockRemovalRequest/EditStockRemovalRequest.view';
import MarkAsPickedModal from '#/views/stock-removal-requests/components/MarkAsPickedModal/MarkAsPickedModal';
import RestrictedEditStockRemovalRequest from '#/views/stock-removal-requests/components/RestrictedEditStockRemovalRequest/RestrictedEditStockRemovalRequest.view';
import StockRemovalRequestStatusBadge from '#/views/stock-removal-requests/components/StockRemovalRequestStatusBadge/StockRemovalRequestStatusBadge';
import ViewStockRemovalRequest from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/ViewStockRemovalRequest.view';
import { useDeleteStockRemovalRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/delete-stock-removal-request.generated';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import { useStockRemovalRequestsQuery } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import {
  faBoxCheck,
  faEdit,
  faEye,
  faPlus,
  faTrash,
  faUpRightAndDownLeftFromCenter,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Input,
  Modal,
  Radio,
  Row,
  Table,
  Tag,
  Tooltip,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import {
  PermissionMethod,
  PermissionModel,
  SortOrder,
  StockRemovalRequestApprovalStatus,
  StockRemovalRequestStatus,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';

interface StockRemovalRequestTableData {
  approvers: {
    name: string;
    status: StockRemovalRequestApprovalStatus;
    userId: string;
  }[];
  businessId: string | undefined;
  createdAt: Date;
  createdById: string;
  key: string;
  reference: null | number | undefined;
  requiresMyApproval: boolean;
  requiresPicking: boolean;
  status: StockRemovalRequestStatus;
  title: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  highlightedRow: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(250, 173, 20, 0.15) !important'
        : 'rgba(250, 173, 20, 0.1) !important',
  },
}));

const PAP_GROUP_ID = 'cmg9ni6h70018ityamnewhbvq'; // PAP group ID
const DC_GROUP_ID = 'cmgfd4l4r0000it3n4u2eckmf'; // DC group ID

const StockRemovalRequestsList = () => {
  const intl = useIntl();
  const params = useParams();
  const classes = useStyles();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const permissions = useAtomValue(currentPermissionsAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState<null | string>(null);
  const [editOpen, setEditOpen] = useState<null | string>(null);
  const [markAsPickedOpen, setMarkAsPickedOpen] = useState<null | string>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [creatorFilter, setCreatorFilter] = useState<'ALL' | 'MINE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const hasEditPermission = useMemo(
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

  const hasDeletePermission = useMemo(
    () =>
      hasPermission({
        permission: {
          method: PermissionMethod.Delete,
          model: PermissionModel.StockRemovalRequests,
        },
        permissions,
      }),
    [permissions]
  );

  // Helper function to check if user can edit a request
  const canEditRequest = (createdById: string) =>
    // User can edit if they created the request OR have delete permission
    currentUser?.id === createdById || hasDeletePermission;

  // Check if current user is in PAP group
  const isUserInPAPGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === PAP_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check if current user is in DC group
  const isUserInDCGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === DC_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Reset status filter if DC user has it set to a non-approved status
  useEffect(() => {
    if (isUserInDCGroup) {
      const approvedStatuses = [
        'ALL',
        StockRemovalRequestStatus.Picking,
        StockRemovalRequestStatus.Picked,
        StockRemovalRequestStatus.Collected,
        StockRemovalRequestStatus.AwaitingReturn,
        StockRemovalRequestStatus.Returned,
        StockRemovalRequestStatus.Closed,
      ];
      if (!approvedStatuses.includes(statusFilter)) {
        setStatusFilter('ALL');
      }
    }
  }, [isUserInDCGroup, statusFilter]);

  // Check if current user is a store user (has businesses, not in PAP or DC groups)
  const isStoreUser = useMemo(() => {
    const hasBusinesses = (currentUser?.businesses?.length ?? 0) > 0;
    const notInPAP = !isUserInPAPGroup;
    const notInDC = !isUserInDCGroup;
    return hasBusinesses && notInPAP && notInDC;
  }, [currentUser, isUserInPAPGroup, isUserInDCGroup]);

  // Get list of business IDs the user is assigned to
  const userBusinessIds = useMemo(
    () =>
      currentUser?.businesses?.map((business: { id: string }) => business.id) ??
      [],
    [currentUser]
  );

  const toggleAddOpen = () => setAddOpen(!addOpen);

  const [deleteStockRemovalRequest] = useDeleteStockRemovalRequestMutation();

  const onDeletePress = (requestId: string) => {
    Modal.confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk: () => {
        void deleteStockRemovalRequest({
          onCompleted: () => {
            notification.success({
              description: intl.formatMessage({
                defaultMessage: 'The stock removal request has been deleted.',
              }),
              message: intl.formatMessage({
                defaultMessage: 'Request Deleted',
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
                defaultMessage: 'Error Deleting Request',
              }),
              placement: 'bottomRight',
            });
          },
          refetchQueries: ['StockRemovalRequests'],
          variables: {
            where: {
              id: requestId,
            },
          },
        });
      },
      title: intl.formatMessage({ defaultMessage: 'Are you sure?' }),
    });
  };

  useEffect(() => {
    if (params.id) {
      setViewOpen(params.id);
    }
  }, [params]);

  // Build query filters
  const queryWhere = useMemo(() => {
    const where: {
      schemeId: string;
      search?: string;
      status?: StockRemovalRequestStatus[];
    } = {
      schemeId: schemeId || '',
    };

    // Filter by status
    if (statusFilter !== 'ALL') {
      where.status = [statusFilter as StockRemovalRequestStatus];
    } else if (isUserInDCGroup) {
      // DC users should only see approved statuses
      where.status = [
        StockRemovalRequestStatus.Picking,
        StockRemovalRequestStatus.Picked,
        StockRemovalRequestStatus.Collected,
        StockRemovalRequestStatus.AwaitingReturn,
        StockRemovalRequestStatus.Returned,
        StockRemovalRequestStatus.Closed,
      ];
    }

    // Search filter
    if (searchQuery.trim()) {
      where.search = searchQuery.trim();
    }

    return where;
  }, [schemeId, statusFilter, searchQuery, isUserInDCGroup]);

  const { data } = useStockRemovalRequestsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      where: queryWhere,
    },
  });

  // Fetch data for mark as picked modal
  const { data: markAsPickedData } = useStockRemovalRequestQuery({
    skip: !markAsPickedOpen,
    variables: {
      where: {
        id: markAsPickedOpen ?? '',
      },
    },
  });

  // Filter data on frontend for "My Requests" and DC users
  const filteredData = useMemo(() => {
    if (!data?.stockRemovalRequests.edges) return undefined;

    let filteredEdges = data.stockRemovalRequests.edges;

    // DC users should ONLY see DC-type requests in approved statuses
    if (isUserInDCGroup) {
      const approvedStatuses = new Set([
        StockRemovalRequestStatus.Picking,
        StockRemovalRequestStatus.Picked,
        StockRemovalRequestStatus.Collected,
        StockRemovalRequestStatus.AwaitingReturn,
        StockRemovalRequestStatus.Returned,
        StockRemovalRequestStatus.Closed,
      ]);

      filteredEdges = filteredEdges.filter(({ node }) => {
        const isDCType = node.storeOrDC === 'DC';
        const isApprovedStatus = approvedStatuses.has(node.status);
        return isDCType && isApprovedStatus;
      });
    }

    // If "My Requests" filter is active, filter to only show:
    // 1. Requests created by the current user
    // 2. Requests where the current user is an approver
    if (creatorFilter === 'MINE' && currentUser?.id) {
      filteredEdges = filteredEdges.filter(({ node }) => {
        const isCreator = node.createdBy.id === currentUser.id;
        const isApprover = node.approvers.some(
          (approver) => approver.user.id === currentUser.id
        );
        return isCreator || isApprover;
      });
    }

    return {
      stockRemovalRequests: {
        ...data.stockRemovalRequests,
        edges: filteredEdges,
        totalCount: filteredEdges.length,
      },
    };
  }, [data, creatorFilter, currentUser, isUserInDCGroup]);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} style={{ paddingBottom: 15 }}>
        <Col span={6}>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a request...',
            })}
            value={searchQuery}
          />
        </Col>
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.ReadAll,
            model: PermissionModel.StockRemovalRequests,
          }}
          unauthorizedElement={<div />}
        >
          <Col>
            <Radio.Group
              onChange={(e) =>
                setCreatorFilter(e.target.value as 'ALL' | 'MINE')
              }
              value={creatorFilter}
            >
              <Radio.Button value="ALL">
                {intl.formatMessage({
                  defaultMessage: 'All Requests',
                })}
              </Radio.Button>
              <Radio.Button value="MINE">
                {intl.formatMessage({
                  defaultMessage: 'My Requests',
                })}
              </Radio.Button>
            </Radio.Group>
          </Col>
        </PermissionCheckWrapper>
        <Col>
          <Radio.Group
            onChange={(e) => setStatusFilter(e.target.value as string)}
            value={statusFilter}
          >
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All',
              })}
            </Radio.Button>
            {!isUserInDCGroup && (
              <>
                <Radio.Button value={StockRemovalRequestStatus.PendingApproval}>
                  {intl.formatMessage({
                    defaultMessage: 'Pending',
                  })}
                </Radio.Button>
                <Radio.Button
                  value={StockRemovalRequestStatus.AwaitingPapApproval}
                >
                  {intl.formatMessage({
                    defaultMessage: 'PAP',
                  })}
                </Radio.Button>
              </>
            )}
            <Radio.Button value={StockRemovalRequestStatus.Picking}>
              {intl.formatMessage({
                defaultMessage: 'Picking',
              })}
            </Radio.Button>
            <Radio.Button value={StockRemovalRequestStatus.Picked}>
              {intl.formatMessage({
                defaultMessage: 'Picked',
              })}
            </Radio.Button>
            <Radio.Button value={StockRemovalRequestStatus.Collected}>
              {intl.formatMessage({
                defaultMessage: 'Collected',
              })}
            </Radio.Button>
            <Radio.Button value={StockRemovalRequestStatus.AwaitingReturn}>
              {intl.formatMessage({
                defaultMessage: 'Returning',
              })}
            </Radio.Button>
            <Radio.Button value={StockRemovalRequestStatus.Returned}>
              {intl.formatMessage({
                defaultMessage: 'Returned',
              })}
            </Radio.Button>
            <Radio.Button value={StockRemovalRequestStatus.Closed}>
              {intl.formatMessage({
                defaultMessage: 'Closed',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col flex={1} />
        <Col>
          <Button onClick={toggleAddOpen}>
            <Row gutter={8}>
              <Col>
                <FontAwesomeIcon icon={faPlus} />
              </Col>
              <Col>
                <FormattedMessage defaultMessage="New Request" />
              </Col>
            </Row>
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'requiresMyApproval',
            key: 'requiresMyApproval',
            render: (value: boolean) =>
              value ? (
                <Tag color="warning">
                  <FormattedMessage defaultMessage="Action Required" />
                </Tag>
              ) : null,
            title: '',
            width: 150,
          },
          {
            dataIndex: 'reference',
            key: 'reference',
            title: intl.formatMessage({ defaultMessage: 'Alert ID' }),
          },
          {
            dataIndex: 'title',
            key: 'title',
            title: intl.formatMessage({ defaultMessage: 'Subject' }),
          },
          {
            dataIndex: 'status',
            key: 'status',
            render: (value: StockRemovalRequestStatus) => (
              <StockRemovalRequestStatusBadge status={value} />
            ),
            title: intl.formatMessage({ defaultMessage: 'Status' }),
            width: 200,
          },
          {
            dataIndex: 'approvers',
            key: 'approvers',
            render: (
              values: StockRemovalRequestTableData['approvers'],
              record: StockRemovalRequestTableData
            ) => (
              <Row gutter={16}>
                {values.map((item) => (
                  <Col key={item.userId}>
                    <ApproverAvatar
                      data={item}
                      highlightPending={record.requiresMyApproval}
                      isCurrentUser={item.userId === currentUser?.id}
                    />
                  </Col>
                ))}
              </Row>
            ),
            title: intl.formatMessage({ defaultMessage: 'Approvers' }),
          },
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
            title: intl.formatMessage({ defaultMessage: 'Date Submitted' }),
            width: 200,
          },
          {
            key: 'actions',
            render: (
              _,
              {
                createdById,
                key,
                requiresMyApproval,
                requiresPicking,
              }: StockRemovalRequestTableData
            ) => {
              const viewTooltip = requiresMyApproval
                ? intl.formatMessage({ defaultMessage: 'Review Request' })
                : intl.formatMessage({ defaultMessage: 'View Request' });
              const viewIcon = requiresMyApproval
                ? faEye
                : faUpRightAndDownLeftFromCenter;
              const canEdit = canEditRequest(createdById);

              return (
                <Row>
                  <Col>
                    <Tooltip title={viewTooltip}>
                      <Button
                        onClick={() => {
                          setViewOpen(key);
                        }}
                        size="small"
                        style={{
                          borderBottomRightRadius: 0,
                          borderRightWidth: 0,
                          borderTopRightRadius: 0,
                        }}
                        type={requiresMyApproval ? 'primary' : 'default'}
                      >
                        <FontAwesomeIcon icon={viewIcon} />
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
                          onClick={() => {
                            setMarkAsPickedOpen(key);
                          }}
                          size="small"
                          style={{ borderRadius: 0 }}
                          type="primary"
                        >
                          <FontAwesomeIcon icon={faBoxCheck} />
                        </Button>
                      </Tooltip>
                    </Col>
                  )}
                  {canEdit && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Edit Request',
                        })}
                      >
                        <Button
                          onClick={() => {
                            setEditOpen(key);
                          }}
                          size="small"
                          style={
                            hasDeletePermission
                              ? { borderRadius: 0 }
                              : {
                                  borderBottomLeftRadius: 0,
                                  borderTopLeftRadius: 0,
                                }
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </Tooltip>
                    </Col>
                  )}
                  {hasDeletePermission && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Delete Request',
                        })}
                      >
                        <Button
                          onClick={() => onDeletePress(key)}
                          size="small"
                          style={{
                            borderBottomLeftRadius: 0,
                            borderLeftWidth: 0,
                            borderTopLeftRadius: 0,
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Tooltip>
                    </Col>
                  )}
                </Row>
              );
            },
            width: 200,
          },
        ]}
        dataSource={filteredData?.stockRemovalRequests.edges.map(({ node }) => {
          // Check if current user needs to approve this request
          // This includes both regular approvers AND PAP approvers
          const requiresMyApproval =
            // Regular approver needs to approve
            (node.status === StockRemovalRequestStatus.PendingApproval &&
              node.approvers.some(
                (approver) =>
                  approver.user.id === currentUser?.id &&
                  approver.status === StockRemovalRequestApprovalStatus.Open
              )) ||
            // OR PAP approver needs to approve
            (node.status === StockRemovalRequestStatus.AwaitingPapApproval &&
              isUserInPAPGroup);

          // Check if this request requires picking
          // - DC users can pick DC-type requests with status "Picking"
          // - Store users can pick requests for their assigned businesses with status "Picking"
          const requiresPicking = Boolean(
            node.status === StockRemovalRequestStatus.Picking &&
              ((isUserInDCGroup && node.storeOrDC === 'DC') ||
                (isStoreUser &&
                  node.business &&
                  userBusinessIds.includes(node.business.id)))
          );

          return {
            approvers: node.approvers.map((approver) => ({
              name: approver.user.fullName,
              status: approver.status,
              userId: approver.user.id,
            })),
            businessId: node.business?.id,
            createdAt: node.createdAt,
            createdById: node.createdBy.id,
            key: node.id,
            reference: node.reference,
            requiresMyApproval,
            requiresPicking,
            status: node.status,
            title: node.title,
          };
        })}
        rowClassName={(record: StockRemovalRequestTableData) =>
          record.requiresMyApproval || record.requiresPicking
            ? classes.highlightedRow
            : ''
        }
        size="small"
      />

      <Drawer
        onClose={toggleAddOpen}
        open={addOpen}
        title={intl.formatMessage({ defaultMessage: 'New Request' })}
        width={1000}
      >
        {addOpen && <AddStockRemovalRequest onClose={toggleAddOpen} />}
      </Drawer>

      <Drawer
        onClose={() => setViewOpen(null)}
        open={viewOpen !== null}
        title={intl.formatMessage({ defaultMessage: 'View Request' })}
        width={1000}
      >
        {viewOpen && <ViewStockRemovalRequest requestId={viewOpen} />}
      </Drawer>

      <Drawer
        onClose={() => setEditOpen(null)}
        open={editOpen !== null}
        title={intl.formatMessage({ defaultMessage: 'Edit Request' })}
        width={1000}
      >
        {editOpen && hasEditPermission && (
          <EditStockRemovalRequest
            onClose={() => setEditOpen(null)}
            requestId={editOpen}
          />
        )}
        {editOpen && !hasEditPermission && (
          <RestrictedEditStockRemovalRequest
            onClose={() => setEditOpen(null)}
            requestId={editOpen}
          />
        )}
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
    </div>
  );
};

export default StockRemovalRequestsList;
