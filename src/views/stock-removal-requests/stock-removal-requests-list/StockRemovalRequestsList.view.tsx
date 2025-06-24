import type { StockRemovalRequestApprovalStatus } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import AddStockRemovalRequest from '#/views/stock-removal-requests/components/AddStockRemovalRequest/AddStockRemovalRequest.view';
import ApproverAvatar from '#/views/stock-removal-requests/components/ApproverAvatar/ApproverAvatar';
import ViewStockRemovalRequest from '#/views/stock-removal-requests/components/ViewStockRemovalRequest/ViewStockRemovalRequest.view';
import { useStockRemovalRequestsQuery } from '#/views/stock-removal-requests/stock-removal-requests-list/graphql/__generated__/stock-removal-requests.generated';
import {
  faEdit,
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
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { SortOrder, StockRemovalRequestStatus } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

const getStockRemovalRequestlStatusText = (
  value: StockRemovalRequestStatus
) => {
  if (value === StockRemovalRequestStatus.Open)
    return <FormattedMessage defaultMessage="Processing Request" />;
  if (value === StockRemovalRequestStatus.Closed)
    return <FormattedMessage defaultMessage="Completed" />;
  return <FormattedMessage defaultMessage="Pending Approval" />;
};

const StockRemovalRequestsList = () => {
  const intl = useIntl();
  const params = useParams();

  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState<null | string>(null);
  const [editOpen, setEditOpen] = useState<null | string>(null);

  const toggleAddOpen = () => setAddOpen(!addOpen);
  const onDeletePress = () => {
    Modal.confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      title: intl.formatMessage({ defaultMessage: 'Are you sure?' }),
    });
  };

  useEffect(() => {
    if (params.id) {
      setViewOpen(params.id);
    }
  }, [params]);

  const { data } = useStockRemovalRequestsQuery({
    variables: {
      orderBy: [
        {
          createdAt: SortOrder.Desc,
        },
      ],
      where: {
        schemeId,
      },
    },
  });

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} style={{ paddingBottom: 15 }}>
        <Col span={6}>
          <Input
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a request...',
            })}
          />
        </Col>
        <Col>
          <Radio.Group defaultValue="MINE">
            <Radio.Button value="MINE">
              {intl.formatMessage({
                defaultMessage: 'My Requests',
              })}
            </Radio.Button>
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Requests',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Radio.Group defaultValue="ALL">
            <Radio.Button value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All',
              })}
            </Radio.Button>
            <Radio.Button value="PENDING_APPROVAL">
              {intl.formatMessage({
                defaultMessage: 'Pending Approval',
              })}
            </Radio.Button>
            <Radio.Button value={StockRemovalRequestStatus.Open}>
              {intl.formatMessage({
                defaultMessage: 'Open',
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
            render: (value: StockRemovalRequestStatus) =>
              getStockRemovalRequestlStatusText(value),
            title: intl.formatMessage({ defaultMessage: 'Status' }),
            width: 300,
          },
          {
            dataIndex: 'approvers',
            key: 'approvers',
            render: (
              values: {
                name: string;
                status: StockRemovalRequestApprovalStatus;
              }[]
            ) => (
              <Row gutter={16}>
                {values.map((item) => (
                  <Col>
                    <ApproverAvatar data={item} />
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
            render: (_, { key }) => (
              <Row>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Request',
                    })}
                  >
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
                    >
                      <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                    </Button>
                  </Tooltip>
                </Col>
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
                      style={{ borderRadius: 0 }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Delete Request',
                    })}
                  >
                    <Button
                      onClick={onDeletePress}
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
              </Row>
            ),
            width: 160,
          },
        ]}
        dataSource={data?.stockRemovalRequests.edges.map(({ node }) => ({
          approvers: node.approvers.map((approver) => ({
            name: approver.user.fullName,
            status: approver.status,
          })),
          createdAt: node.createdAt,
          key: node.id,
          reference: node.reference,
          status: node.status,
          title: node.title,
        }))}
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
      />
    </div>
  );
};

export default StockRemovalRequestsList;
