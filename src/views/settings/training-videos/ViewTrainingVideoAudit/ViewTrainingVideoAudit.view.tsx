import type { ColumnsType, TableProps } from 'antd/es/table';

import {
  faArrowLeft,
  faCheck,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Spin,
  Table,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { TrainingVideoAuditQuery } from '../graphql/queries/__generated__/training-video-audit.generated';
import type {
  CompletionFilter,
  SortField,
  SortOrder,
} from './useViewTrainingVideoAudit';

import useStyles from './ViewTrainingVideoAudit.styles';

const { Title } = Typography;
const { Search } = Input;

type UserCompletion = NonNullable<
  TrainingVideoAuditQuery['trainingVideoAudit']['users'][0]
>;

interface ViewTrainingVideoAuditViewProps {
  auditData: TrainingVideoAuditQuery['trainingVideoAudit'] | null;
  completionFilter: CompletionFilter;
  filteredUsers: UserCompletion[];
  handleCompletionFilterChange: (value: CompletionFilter) => void;
  handleSearch: (value: string) => void;
  handleTableChange: (sorter: { field?: SortField; order?: SortOrder }) => void;
  loading: boolean;
  searchQuery: string;
  sortField: SortField | null;
  sortOrder: SortOrder;
}

const ViewTrainingVideoAuditView: React.FC<ViewTrainingVideoAuditViewProps> = ({
  auditData,
  completionFilter,
  filteredUsers,
  handleCompletionFilterChange,
  handleSearch,
  handleTableChange,
  loading,
  searchQuery,
  sortField,
  sortOrder,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    navigate('/app/scheme-settings/training-videos');
  };

  const formatDate = (date?: Date | null): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString(intl.locale, {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const columns: ColumnsType<UserCompletion> = [
    {
      dataIndex: 'userFullName',
      key: 'name',
      render: (name: string) => <strong>{name}</strong>,
      sortOrder: sortField === 'name' ? sortOrder || undefined : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'Name' }),
    },
    {
      dataIndex: 'userEmail',
      key: 'email',
      render: (email?: null | string) => email || '-',
      sortOrder: sortField === 'email' ? sortOrder || undefined : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'Email' }),
    },
    {
      dataIndex: 'hasCompleted',
      key: 'status',
      render: (hasCompleted: boolean) =>
        hasCompleted ? (
          <span className={classes.completedBadge}>
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '6px' }} />
            <FormattedMessage defaultMessage="Completed" />
          </span>
        ) : (
          <span className={classes.notCompletedBadge}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '6px' }} />
            <FormattedMessage defaultMessage="Not Completed" />
          </span>
        ),
      sortOrder: sortField === 'status' ? sortOrder || undefined : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'Status' }),
    },
    {
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (completedAt?: Date | null) => formatDate(completedAt),
      sortOrder:
        sortField === 'completedAt' ? sortOrder || undefined : undefined,
      sorter: true,
      title: intl.formatMessage({ defaultMessage: 'Completed Date' }),
    },
  ];

  const handleTableChangeInternal: TableProps<UserCompletion>['onChange'] = (
    _pagination,
    _filters,
    sorter
  ) => {
    if (!Array.isArray(sorter)) {
      handleTableChange({
        field: sorter.field as SortField | undefined,
        order: sorter.order as SortOrder | undefined,
      });
    }
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!auditData) {
    return (
      <div className={classes.container}>
        <Button
          className={classes.backButton}
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={handleBackClick}
        >
          <FormattedMessage defaultMessage="Back to Videos" />
        </Button>
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <Typography.Text type="secondary">
            <FormattedMessage defaultMessage="Unable to load audit data" />
          </Typography.Text>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Button
        className={classes.backButton}
        icon={<FontAwesomeIcon icon={faArrowLeft} />}
        onClick={handleBackClick}
      >
        <FormattedMessage defaultMessage="Back to Videos" />
      </Button>

      <div className={classes.header}>
        <Title className={classes.title}>{auditData.trainingVideoTitle}</Title>
        <p className={classes.subtitle}>
          <FormattedMessage defaultMessage="Video Completion Audit" />
        </p>
      </div>

      <Row className={classes.statsGrid} gutter={[16, 16]}>
        <Col lg={6} md={12} xs={24}>
          <Card className={classes.statCard}>
            <div className={classes.statLabel}>
              <FormattedMessage defaultMessage="Total Users" />
            </div>
            <div className={classes.statValue}>{auditData.totalUsers}</div>
          </Card>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <Card className={classes.statCard}>
            <div className={classes.statLabel}>
              <FormattedMessage defaultMessage="Completed" />
            </div>
            <div className={classes.statValue} style={{ color: '#52c41a' }}>
              {auditData.completedCount}
            </div>
          </Card>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <Card className={classes.statCard}>
            <div className={classes.statLabel}>
              <FormattedMessage defaultMessage="Not Completed" />
            </div>
            <div className={classes.statValue} style={{ color: '#8c8c8c' }}>
              {auditData.notCompletedCount}
            </div>
          </Card>
        </Col>
        <Col lg={6} md={12} xs={24}>
          <Card className={classes.statCard}>
            <div className={classes.statLabel}>
              <FormattedMessage defaultMessage="Completion Rate" />
            </div>
            <div className={classes.statValue} style={{ color: '#1890ff' }}>
              <FormattedMessage
                defaultMessage="{rate}%"
                values={{ rate: auditData.completionRate.toFixed(0) }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <div className={classes.controls}>
        <Search
          allowClear
          className={classes.searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search by name or email...',
          })}
          value={searchQuery}
        />
        <Select
          onChange={handleCompletionFilterChange}
          style={{ width: 200 }}
          value={completionFilter}
        >
          <Select.Option value="all">
            <FormattedMessage defaultMessage="All Users" />
          </Select.Option>
          <Select.Option value="completed">
            <FormattedMessage defaultMessage="Completed Only" />
          </Select.Option>
          <Select.Option value="notCompleted">
            <FormattedMessage defaultMessage="Not Completed Only" />
          </Select.Option>
        </Select>
      </div>

      <Table
        className={classes.table}
        columns={columns}
        dataSource={filteredUsers}
        onChange={handleTableChangeInternal}
        pagination={{
          pageSize: 50,
          showSizeChanger: true,
          showTotal: (total) =>
            intl.formatMessage(
              { defaultMessage: 'Total {total} users' },
              { total }
            ),
        }}
        rowKey="userId"
      />
    </div>
  );
};

export default ViewTrainingVideoAuditView;
