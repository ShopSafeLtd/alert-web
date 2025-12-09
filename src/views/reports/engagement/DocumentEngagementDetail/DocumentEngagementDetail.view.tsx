import type { ColumnsType } from 'antd/es/table';
import type { DocumentEngagementQuery } from 'graphql/engagement/queries/__generated__/document-engagement.generated';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { faArrowLeft, faChartBar } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import useStyles from './DocumentEngagementDetail.styles';

const { Title } = Typography;
const { Search } = Input;

type UserEngagement = NonNullable<
  DocumentEngagementQuery['documentEngagement']['users'][0]
>;

interface DocumentEngagementDetailViewProps {
  engagementData: DocumentEngagementQuery['documentEngagement'] | null;
  filterStatus: 'all' | 'not-viewed' | 'viewed';
  filteredUsers: UserEngagement[];
  loading: boolean;
  searchText: string;
  setFilterStatus: (status: 'all' | 'not-viewed' | 'viewed') => void;
  setSearchText: (text: string) => void;
  setSortConfig: (config: { direction: 'asc' | 'desc'; key: string }) => void;
  sortConfig: { direction: 'asc' | 'desc'; key: string };
}

const DocumentEngagementDetailView: React.FC<
  DocumentEngagementDetailViewProps
> = ({
  engagementData,
  filterStatus,
  filteredUsers,
  loading,
  searchText,
  setFilterStatus,
  setSearchText,
  setSortConfig,
  sortConfig,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();

  const formatDate = (dateString: null | string | undefined): string => {
    if (!dateString) return intl.formatMessage({ defaultMessage: 'Never' });
    const date = new Date(dateString);
    return date.toLocaleDateString(intl.locale, {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleTableChange = (
    _pagination: unknown,
    _filters: unknown,
    sorter: unknown
  ) => {
    const s = sorter as { direction?: string; field?: string };
    if (s.field && s.direction) {
      setSortConfig({
        direction: s.direction === 'ascend' ? 'asc' : 'desc',
        key: s.field,
      });
    }
  };

  const columns: ColumnsType<UserEngagement> = [
    {
      dataIndex: 'userFullName',
      key: 'userFullName',
      render: (text: string) => <strong>{text}</strong>,
      sortOrder:
        sortConfig.key === 'userFullName'
          ? sortConfig.direction === 'asc'
            ? 'ascend'
            : 'descend'
          : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'User' }),
    },
    {
      dataIndex: 'userEmail',
      key: 'userEmail',
      render: (text: null | string) => text || '-',
      title: intl.formatMessage({ defaultMessage: 'Email' }),
    },
    {
      dataIndex: 'hasViewed',
      key: 'hasViewed',
      render: (hasViewed: boolean) =>
        hasViewed ? (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            <FormattedMessage defaultMessage="Viewed" />
          </Tag>
        ) : (
          <Tag color="default" icon={<CloseCircleOutlined />}>
            <FormattedMessage defaultMessage="Not Viewed" />
          </Tag>
        ),
      title: intl.formatMessage({ defaultMessage: 'Status' }),
    },
    {
      dataIndex: 'viewCount',
      key: 'viewCount',
      render: (count: null | number) => count || 0,
      sortOrder:
        sortConfig.key === 'viewCount'
          ? sortConfig.direction === 'asc'
            ? 'ascend'
            : 'descend'
          : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'View Count' }),
    },
    {
      dataIndex: 'lastViewedAt',
      key: 'lastViewedAt',
      render: (date: null | string) => formatDate(date),
      sortOrder:
        sortConfig.key === 'lastViewedAt'
          ? sortConfig.direction === 'asc'
            ? 'ascend'
            : 'descend'
          : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'Last Viewed' }),
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Button
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => navigate(-1)}
          type="text"
        >
          <FormattedMessage defaultMessage="Back" />
        </Button>
        <div className={classes.titleContainer}>
          <FontAwesomeIcon
            className={classes.titleIcon}
            icon={faChartBar}
            size="2x"
          />
          <Title level={2} style={{ margin: 0 }}>
            {engagementData?.documentName || (
              <FormattedMessage defaultMessage="Document Engagement" />
            )}
          </Title>
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={6} sm={12} xs={24}>
          <Card>
            <Statistic
              title={intl.formatMessage({ defaultMessage: 'Total Users' })}
              value={engagementData?.totalUsers || 0}
            />
          </Card>
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <Card>
            <Statistic
              title={intl.formatMessage({ defaultMessage: 'Users Viewed' })}
              value={engagementData?.viewedCount || 0}
            />
          </Card>
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <Card>
            <Statistic
              title={intl.formatMessage({ defaultMessage: 'Not Viewed' })}
              value={engagementData?.notViewedCount || 0}
            />
          </Card>
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <Card>
            <Statistic
              precision={1}
              suffix="%"
              title={intl.formatMessage({ defaultMessage: 'View Rate' })}
              value={(engagementData?.viewRate || 0) * 100}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col lg={12} sm={24} xs={24}>
            <Search
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search by name or email',
              })}
              value={searchText}
            />
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Select
              onChange={setFilterStatus}
              style={{ width: '100%' }}
              value={filterStatus}
            >
              <Select.Option value="all">
                <FormattedMessage defaultMessage="All Users" />
              </Select.Option>
              <Select.Option value="viewed">
                <FormattedMessage defaultMessage="Viewed Only" />
              </Select.Option>
              <Select.Option value="not-viewed">
                <FormattedMessage defaultMessage="Not Viewed Only" />
              </Select.Option>
            </Select>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) =>
              intl.formatMessage(
                { defaultMessage: 'Total {total} users' },
                { total }
              ),
          }}
          rowKey="userId"
        />
      </Card>
    </div>
  );
};

export default DocumentEngagementDetailView;
