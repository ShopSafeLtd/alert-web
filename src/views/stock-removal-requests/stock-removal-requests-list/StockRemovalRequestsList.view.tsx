import type { Theme } from '#/configs/ThemeConfig';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import {
  currentPermissionsAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import AddStockRemovalRequest from '#/views/stock-removal-requests/components/AddStockRemovalRequest/AddStockRemovalRequest.view';
import AddStockRemovalReturn from '#/views/stock-removal-requests/components/AddStockRemovalReturn/AddStockRemovalReturn.view';
import ApproverAvatar from '#/views/stock-removal-requests/components/ApproverAvatar/ApproverAvatar';
import EditStockRemovalRequest from '#/views/stock-removal-requests/components/EditStockRemovalRequest/EditStockRemovalRequest.view';
import MarkAsPickedModal from '#/views/stock-removal-requests/components/MarkAsPickedModal/MarkAsPickedModal';
import RestrictedEditStockRemovalRequest from '#/views/stock-removal-requests/components/RestrictedEditStockRemovalRequest/RestrictedEditStockRemovalRequest.view';
import StockRemovalRequestStatusBadge from '#/views/stock-removal-requests/components/StockRemovalRequestStatusBadge/StockRemovalRequestStatusBadge';
import ViewStockRemovalRequest from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/ViewStockRemovalRequest.view';
import { useDeleteStockRemovalRequestMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/delete-stock-removal-request.generated';
import { useStockRemovalRequestQuery } from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/graphql/__generated__/stock-removal-request.generated';
import ViewStockRemovalReturn from '#/views/stock-removal-requests/components/ViewStockRemovalReturn/ViewStockRemovalReturn.view';
import { useDeleteStockRemovalReturnMutation } from '#/views/stock-removal-requests/components/ViewStockRemovalReturn/graphql/__generated__/delete-stock-removal-return.generated';
import { useQueueStockRemovalCsvExportMutation } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/queue-stock-removal-csv-export.generated';
import { useStockRemovalRequestsQuery } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import {
  faBoxCheck,
  faEdit,
  faEye,
  faFileExport,
  faPlus,
  faRotateLeft,
  faTrash,
  faUpRightAndDownLeftFromCenter,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Input,
  Modal,
  Radio,
  Row,
  Select,
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
  StockRemovalPriority,
  StockRemovalRequestApprovalStatus,
  StockRemovalRequestStatus,
  StockRemovalRquestDestination,
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
  businessName: string | undefined;
  createdAt: Date;
  createdById: string;
  createdByName: string;
  destination: StockRemovalRquestDestination | null | undefined;
  key: string;
  picker: { fullName: string; id: string } | null | undefined;
  priority: StockRemovalPriority | null | undefined;
  reference: null | number | undefined;
  requiresMyApproval: boolean;
  requiresPicking: boolean;
  status: StockRemovalRequestStatus;
  storeOrDC: null | string | undefined;
  title: string;
}

interface StockRemovalReturnTableData {
  createdAt: Date;
  createdById: string;
  dateofReturn: Date | null | undefined;
  key: string;
  reference: null | number | undefined;
  status: StockRemovalRequestStatus;
  storeOrDC: null | string | undefined;
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
const PAP_APPROVE_CANCELLATION_GROUP_ID = 'cmotsrpl302g9o401e52ev859'; // PAP Approve Cancellation group ID

const StockRemovalRequestsList = () => {
  const intl = useIntl();
  const params = useParams();
  const classes = useStyles();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const permissions = useAtomValue(currentPermissionsAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const [viewMode, setViewMode] = useState<'REMOVALS' | 'RETURNS'>('REMOVALS');
  const [addOpen, setAddOpen] = useState(false);
  const [addReturnOpen, setAddReturnOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState<null | string>(null);
  const [viewReturnOpen, setViewReturnOpen] = useState<null | string>(null);
  const [editOpen, setEditOpen] = useState<null | string>(null);
  const [markAsPickedOpen, setMarkAsPickedOpen] = useState<null | string>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [returnStatusFilter, setReturnStatusFilter] = useState<string>('ALL');
  const [creatorFilter, setCreatorFilter] = useState<'ALL' | 'MINE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pickerFilter, setPickerFilter] = useState<string[]>([]);
  const [destinationFilter, setDestinationFilter] = useState<
    StockRemovalRquestDestination[]
  >([]);
  const [priorityFilter, setPriorityFilter] = useState<StockRemovalPriority[]>(
    []
  );
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportDateRange, setExportDateRange] = useState<[Date, Date] | null>(
    null
  );
  const [exporting, setExporting] = useState(false);

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
    currentUser?.id === createdById || hasEditPermission;

  // Check if current user is in PAP group
  const isUserInPAPGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) => group.id === PAP_GROUP_ID
      ) ?? false,
    [currentUser]
  );

  // Check if current user is in PAP Approve Cancellation group
  const isUserInPAPApproveCancellationGroup = useMemo(
    () =>
      currentUser?.groups?.some(
        (group: { id: string }) =>
          group.id === PAP_APPROVE_CANCELLATION_GROUP_ID
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

  // Check if current user is a store user (has businesses, not in PAP, PAP Cancel, or DC groups)
  const isStoreUser = useMemo(() => {
    const hasBusinesses = (currentUser?.businesses?.length ?? 0) > 0;
    const notInPAP = !isUserInPAPGroup;
    const notInPAPCancel = !isUserInPAPApproveCancellationGroup;
    const notInDC = !isUserInDCGroup;
    return hasBusinesses && notInPAP && notInPAPCancel && notInDC;
  }, [
    currentUser,
    isUserInPAPGroup,
    isUserInPAPApproveCancellationGroup,
    isUserInDCGroup,
  ]);

  // Get list of business IDs the user is assigned to
  const userBusinessIds = useMemo(
    () =>
      currentUser?.businesses?.map((business: { id: string }) => business.id) ??
      [],
    [currentUser]
  );

  const toggleAddOpen = () => setAddOpen(!addOpen);
  const toggleAddReturnOpen = () => setAddReturnOpen(!addReturnOpen);

  const [deleteStockRemovalRequest] = useDeleteStockRemovalRequestMutation();
  const [deleteStockRemovalReturn] = useDeleteStockRemovalReturnMutation();
  const [queueExport] = useQueueStockRemovalCsvExportMutation();

  const onExport = () => {
    if (!exportDateRange || !schemeId) return;
    setExporting(true);
    void queueExport({
      onCompleted: (data) => {
        setExporting(false);
        setExportModalOpen(false);
        setExportDateRange(null);
        notification.success({
          description:
            data.queueStockRemovalCsvExport.estimatedTime ?? undefined,
          duration: 0,
          message: data.queueStockRemovalCsvExport.message,
          placement: 'bottomRight',
        });
      },
      onError: () => {
        setExporting(false);
        notification.error({
          description: intl.formatMessage({
            defaultMessage: 'Something went wrong.',
          }),
          message: intl.formatMessage({ defaultMessage: 'Export Failed' }),
          placement: 'bottomRight',
        });
      },
      variables: {
        where: {
          dateRange: {
            endDate: dayjs(exportDateRange[1]).endOf('day').toDate(),
            startDate: dayjs(exportDateRange[0]).startOf('day').toDate(),
          },
          schemeId,
        },
      },
    });
  };

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

  const onDeleteReturnPress = (returnId: string) => {
    Modal.confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk: () => {
        void deleteStockRemovalReturn({
          onCompleted: () => {
            notification.success({
              description: intl.formatMessage({
                defaultMessage: 'The return request has been deleted.',
              }),
              message: intl.formatMessage({
                defaultMessage: 'Return Deleted',
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
                defaultMessage: 'Error Deleting Return',
              }),
              placement: 'bottomRight',
            });
          },
          refetchQueries: ['StockRemovalRequests'],
          variables: {
            where: {
              id: returnId,
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
      destination?: StockRemovalRquestDestination[];
      isReturn?: boolean;
      pickerIds?: string[];
      priority?: StockRemovalPriority[];
      schemeId: string;
      search?: string;
      status?: StockRemovalRequestStatus[];
    } = {
      isReturn: viewMode === 'RETURNS',
      schemeId: schemeId || '',
    };

    if (viewMode === 'RETURNS') {
      // Return status filter
      if (returnStatusFilter !== 'ALL') {
        where.status = [returnStatusFilter as StockRemovalRequestStatus];
      }
    } else if (statusFilter !== 'ALL') {
      // Filter by status
      where.status = [statusFilter as StockRemovalRequestStatus];
    }

    // Search filter
    if (searchQuery.trim()) {
      where.search = searchQuery.trim();
    }

    if (pickerFilter.length > 0) where.pickerIds = pickerFilter;
    if (destinationFilter.length > 0) where.destination = destinationFilter;
    if (priorityFilter.length > 0) where.priority = priorityFilter;

    return where;
  }, [
    schemeId,
    viewMode,
    statusFilter,
    returnStatusFilter,
    searchQuery,
    pickerFilter,
    destinationFilter,
    priorityFilter,
  ]);

  const { data, loading } = useStockRemovalRequestsQuery({
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

  // Filter data on frontend for "My Requests"
  const filteredData = useMemo(() => {
    if (!data?.stockRemovalRequests.edges) return undefined;

    let filteredEdges = data.stockRemovalRequests.edges;

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
  }, [data, creatorFilter, currentUser]);

  // Returns table data
  const returnsData = useMemo(() => {
    if (viewMode !== 'RETURNS' || !filteredData?.stockRemovalRequests.edges)
      return undefined;
    return filteredData.stockRemovalRequests.edges.map(
      ({ node }): StockRemovalReturnTableData => ({
        createdAt: node.createdAt,
        createdById: node.createdBy.id,
        dateofReturn: node.dateofReturn,
        key: node.id,
        reference: node.reference,
        status: node.status,
        storeOrDC: node.storeOrDC,
        title: node.title,
      })
    );
  }, [viewMode, filteredData]);

  return (
    <div style={{ padding: '20px' }}>
      {/* View Mode Toggle */}
      <Row align="middle" gutter={16} style={{ paddingBottom: 15 }}>
        <Col>
          <Radio.Group
            onChange={(e) => {
              setViewMode(e.target.value as 'REMOVALS' | 'RETURNS');
              setSearchQuery('');
            }}
            value={viewMode}
          >
            <Radio.Button value="REMOVALS">
              {intl.formatMessage({
                defaultMessage: 'Removals',
              })}
            </Radio.Button>
            <Radio.Button value="RETURNS">
              <Row gutter={8}>
                <Col>
                  <FontAwesomeIcon icon={faRotateLeft} />
                </Col>
                <Col>
                  {intl.formatMessage({
                    defaultMessage: 'Returns',
                  })}
                </Col>
              </Row>
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col flex={1} />
        {viewMode === 'REMOVALS' && (
          <>
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.ReadAll,
                model: PermissionModel.StockRemovalRequests,
              }}
              unauthorizedElement={<></>}
            >
              <Col>
                <Button onClick={() => setExportModalOpen(true)}>
                  <Row gutter={8}>
                    <Col>
                      <FontAwesomeIcon icon={faFileExport} />
                    </Col>
                    <Col>
                      <FormattedMessage defaultMessage="Export CSV" />
                    </Col>
                  </Row>
                </Button>
              </Col>
            </PermissionCheckWrapper>
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
          </>
        )}
        {viewMode === 'RETURNS' && (
          <Col>
            <Button onClick={toggleAddReturnOpen}>
              <Row gutter={8}>
                <Col>
                  <FontAwesomeIcon icon={faPlus} />
                </Col>
                <Col>
                  <FormattedMessage defaultMessage="New Return Request" />
                </Col>
              </Row>
            </Button>
          </Col>
        )}
      </Row>

      {/* Removals View */}
      {viewMode === 'REMOVALS' && (
        <>
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
                    <Radio.Button
                      value={StockRemovalRequestStatus.PendingApproval}
                    >
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
                <Radio.Button value={StockRemovalRequestStatus.Closed}>
                  {intl.formatMessage({
                    defaultMessage: 'Closed',
                  })}
                </Radio.Button>
                {!isUserInDCGroup && (
                  <>
                    <Radio.Button
                      value={StockRemovalRequestStatus.RequestedCancel}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Cancelling',
                      })}
                    </Radio.Button>
                    <Radio.Button value={StockRemovalRequestStatus.Cancelled}>
                      {intl.formatMessage({
                        defaultMessage: 'Cancelled',
                      })}
                    </Radio.Button>
                  </>
                )}
              </Radio.Group>
            </Col>
            <Col>
              <Select
                allowClear
                maxTagCount="responsive"
                mode="multiple"
                onChange={(values) => setPriorityFilter(values)}
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'High' }),
                    value: StockRemovalPriority.High,
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Medium' }),
                    value: StockRemovalPriority.Medium,
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Low' }),
                    value: StockRemovalPriority.Low,
                  },
                ]}
                placeholder={intl.formatMessage({ defaultMessage: 'Priority' })}
                style={{ minWidth: 130 }}
                value={priorityFilter}
              />
            </Col>
            <Col>
              <Select
                allowClear
                maxTagCount="responsive"
                mode="multiple"
                onChange={(values) => setDestinationFilter(values)}
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'International',
                    }),
                    value: StockRemovalRquestDestination.International,
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'EU' }),
                    value: StockRemovalRquestDestination.Eu,
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'UK' }),
                    value: StockRemovalRquestDestination.Uk,
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Outdoor' }),
                    value: StockRemovalRquestDestination.Outdoor,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Customer Care',
                    }),
                    value: StockRemovalRquestDestination.CustomerCare,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Head Office',
                    }),
                    value: StockRemovalRquestDestination.HeadOffice,
                  },
                ]}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Destination',
                })}
                style={{ minWidth: 140 }}
                value={destinationFilter}
              />
            </Col>
            <Col>
              <UsersSelect
                allowClear
                maxTagCount="responsive"
                mode="multiple"
                onChange={(values) => setPickerFilter(values)}
                placeholder={intl.formatMessage({ defaultMessage: 'Picker' })}
                queryVars={{
                  where: {
                    groups: {
                      some: {
                        id: {
                          in: [DC_GROUP_ID],
                        },
                      },
                    },
                    schemes: {
                      some: {
                        schemeId: {
                          equals: schemeId || '',
                        },
                      },
                    },
                  },
                }}
                style={{ minWidth: 130 }}
                value={pickerFilter}
              />
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
                dataIndex: 'picker',
                key: 'picker',
                render: (picker: StockRemovalRequestTableData['picker']) =>
                  picker ? (
                    <Tooltip title={picker.fullName}>
                      <Avatar size={36} style={{ fontSize: 15 }}>
                        {picker.fullName.split(' ').at(0)?.charAt(0)}
                        {picker.fullName.split(' ').at(1)?.charAt(0)}
                      </Avatar>
                    </Tooltip>
                  ) : null,
                title: intl.formatMessage({ defaultMessage: 'Picker' }),
                width: 80,
              },
              {
                dataIndex: 'priority',
                key: 'priority',
                render: (value: StockRemovalPriority | null | undefined) => {
                  if (!value) return null;
                  const colorMap: Record<StockRemovalPriority, string> = {
                    [StockRemovalPriority.High]: 'red',
                    [StockRemovalPriority.Low]: 'blue',
                    [StockRemovalPriority.Medium]: 'orange',
                  };
                  const labelMap: Record<StockRemovalPriority, string> = {
                    [StockRemovalPriority.High]: intl.formatMessage({
                      defaultMessage: 'High',
                    }),
                    [StockRemovalPriority.Low]: intl.formatMessage({
                      defaultMessage: 'Low',
                    }),
                    [StockRemovalPriority.Medium]: intl.formatMessage({
                      defaultMessage: 'Medium',
                    }),
                  };
                  return <Tag color={colorMap[value]}>{labelMap[value]}</Tag>;
                },
                title: intl.formatMessage({ defaultMessage: 'Priority' }),
                width: 100,
              },
              {
                dataIndex: 'createdByName',
                key: 'createdByName',
                title: intl.formatMessage({ defaultMessage: 'Requested By' }),
              },
              {
                dataIndex: 'storeOrDC',
                key: 'storeOrDC',
                render: (
                  value: null | string | undefined,
                  record: StockRemovalRequestTableData
                ) => {
                  if (!value) return null;
                  if (value === 'DC')
                    return (
                      <Tag color="blue">
                        {intl.formatMessage({ defaultMessage: 'DC' })}
                      </Tag>
                    );
                  const label = record.businessName
                    ? intl.formatMessage(
                        { defaultMessage: 'Store ({name})' },
                        { name: record.businessName }
                      )
                    : intl.formatMessage({ defaultMessage: 'Store' });
                  return <Tag color="green">{label}</Tag>;
                },
                title: intl.formatMessage({ defaultMessage: 'Location' }),
                width: 180,
              },
              {
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
                title: intl.formatMessage({
                  defaultMessage: 'Date Submitted',
                }),
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
                    ? intl.formatMessage({
                        defaultMessage: 'Review Request',
                      })
                    : intl.formatMessage({ defaultMessage: 'View Request' });
                  const viewIcon = requiresMyApproval
                    ? faEye
                    : faUpRightAndDownLeftFromCenter;
                  const canEdit = canEditRequest(createdById);

                  return (
                    <Row wrap={false}>
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
            dataSource={filteredData?.stockRemovalRequests.edges.map(
              ({ node }) => {
                const requiresMyApproval =
                  (node.status === StockRemovalRequestStatus.PendingApproval &&
                    node.approvers.some(
                      (approver) =>
                        approver.user.id === currentUser?.id &&
                        approver.status ===
                          StockRemovalRequestApprovalStatus.Open
                    )) ||
                  (node.status ===
                    StockRemovalRequestStatus.AwaitingPapApproval &&
                    isUserInPAPGroup) ||
                  (node.status === StockRemovalRequestStatus.RequestedCancel &&
                    (isUserInPAPGroup || isUserInPAPApproveCancellationGroup));

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
                  businessName: node.business?.name,
                  createdAt: node.createdAt,
                  createdById: node.createdBy.id,
                  createdByName: node.createdBy.fullName,
                  destination: node.destination,
                  key: node.id,
                  picker: node.picker,
                  priority: node.priority,
                  reference: node.reference,
                  requiresMyApproval,
                  requiresPicking,
                  status: node.status,
                  storeOrDC: node.storeOrDC,
                  title: node.title,
                };
              }
            )}
            loading={loading}
            rowClassName={(record: StockRemovalRequestTableData) =>
              record.requiresMyApproval || record.requiresPicking
                ? classes.highlightedRow
                : ''
            }
            size="small"
          />
        </>
      )}

      {/* Returns View */}
      {viewMode === 'RETURNS' && (
        <>
          <Row gutter={16} style={{ paddingBottom: 15 }}>
            <Col span={6}>
              <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a return...',
                })}
                value={searchQuery}
              />
            </Col>
            <Col>
              <Radio.Group
                onChange={(e) =>
                  setReturnStatusFilter(e.target.value as string)
                }
                value={returnStatusFilter}
              >
                <Radio.Button value="ALL">
                  {intl.formatMessage({
                    defaultMessage: 'All',
                  })}
                </Radio.Button>
                <Radio.Button value={StockRemovalRequestStatus.AwaitingReturn}>
                  {intl.formatMessage({
                    defaultMessage: 'Awaiting Return',
                  })}
                </Radio.Button>
                <Radio.Button value={StockRemovalRequestStatus.Closed}>
                  {intl.formatMessage({
                    defaultMessage: 'Closed',
                  })}
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Table
            columns={[
              {
                dataIndex: 'reference',
                key: 'reference',
                title: intl.formatMessage({ defaultMessage: 'Reference' }),
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
                width: 180,
              },
              {
                dataIndex: 'storeOrDC',
                key: 'storeOrDC',
                render: (value: string) => (
                  <Tag color={value === 'DC' ? 'blue' : 'green'}>{value}</Tag>
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Returning To',
                }),
                width: 130,
              },
              {
                dataIndex: 'dateofReturn',
                key: 'dateofReturn',
                render: (date: Date | null) =>
                  date ? dayjs(date).format('DD/MM/YYYY') : '-',
                title: intl.formatMessage({
                  defaultMessage: 'Return Date',
                }),
                width: 150,
              },
              {
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
                title: intl.formatMessage({
                  defaultMessage: 'Date Submitted',
                }),
                width: 150,
              },
              {
                key: 'actions',
                render: (_, { key }: StockRemovalReturnTableData) => (
                  <Row wrap={false}>
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'View Return',
                        })}
                      >
                        <Button
                          onClick={() => setViewReturnOpen(key)}
                          size="small"
                          style={
                            hasDeletePermission
                              ? {
                                  borderBottomRightRadius: 0,
                                  borderRightWidth: 0,
                                  borderTopRightRadius: 0,
                                }
                              : {}
                          }
                        >
                          <FontAwesomeIcon
                            icon={faUpRightAndDownLeftFromCenter}
                          />
                        </Button>
                      </Tooltip>
                    </Col>
                    {hasDeletePermission && (
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Delete Return',
                          })}
                        >
                          <Button
                            onClick={() => onDeleteReturnPress(key)}
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
                ),
                width: 150,
              },
            ]}
            dataSource={returnsData}
            loading={loading}
            size="small"
          />
        </>
      )}

      {/* Removal Drawers */}
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
        width={1300}
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

      {/* Return Drawers */}
      <Drawer
        onClose={toggleAddReturnOpen}
        open={addReturnOpen}
        title={intl.formatMessage({
          defaultMessage: 'New Return Request',
        })}
        width={1000}
      >
        {addReturnOpen && (
          <AddStockRemovalReturn onClose={toggleAddReturnOpen} />
        )}
      </Drawer>

      <Drawer
        onClose={() => setViewReturnOpen(null)}
        open={viewReturnOpen !== null}
        title={intl.formatMessage({
          defaultMessage: 'View Return Request',
        })}
        width={1000}
      >
        {viewReturnOpen && (
          <ViewStockRemovalReturn requestId={viewReturnOpen} />
        )}
      </Drawer>

      <Modal
        okButtonProps={{ disabled: !exportDateRange, loading: exporting }}
        okText={intl.formatMessage({ defaultMessage: 'Export' })}
        onCancel={() => {
          setExportModalOpen(false);
          setExportDateRange(null);
        }}
        onOk={onExport}
        open={exportModalOpen}
        title={intl.formatMessage({
          defaultMessage: 'Export Stock Removal Requests',
        })}
      >
        <p>
          <FormattedMessage defaultMessage="Select a date range. The export will be emailed to you as a CSV download link." />
        </p>
        <DatePicker.RangePicker
          disabled={exporting}
          onChange={(dates) => {
            const d = dates as [Date | null, Date | null] | null;
            if (d?.[0] && d?.[1]) {
              setExportDateRange([d[0], d[1]]);
            } else {
              setExportDateRange(null);
            }
          }}
          style={{ width: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default StockRemovalRequestsList;
