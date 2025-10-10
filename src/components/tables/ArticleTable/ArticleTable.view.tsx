import { faEye } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Col, Row, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { ArticlePriority, CompleteStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});

interface Article {
  __typename?: string;
  createdAt: Date | string;
  createdBy: {
    __typename?: string;
    fullName: string;
    id: string;
  };
  id: string;
  previewImage?: null | string;
  previewText?: null | string;
  priority: ArticlePriority;
  status: CompleteStatus;
  title: string;
  updatedAt: Date | string;
}

interface Props {
  articles: Article[] | undefined;
  hasNavigation?: boolean;
}

const getPriorityColor = (priority: ArticlePriority) => {
  switch (priority) {
    case ArticlePriority.High: {
      return 'red';
    }
    case ArticlePriority.Medium: {
      return 'orange';
    }
    case ArticlePriority.Normal: {
      return 'blue';
    }
    default: {
      return 'default';
    }
  }
};

const getStatusColor = (status: CompleteStatus) => {
  switch (status) {
    case CompleteStatus.Completed: {
      return 'green';
    }
    case CompleteStatus.InProgress: {
      return 'orange';
    }
    default: {
      return 'default';
    }
  }
};

const ArticleTable = ({ articles, hasNavigation }: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Table
      columns={[
        {
          dataIndex: 'title',
          key: 'title',
          render: (title: string, record) => {
            if (hasNavigation) {
              return (
                <Link to={`/app/article/view/${record.key}`}>{title}</Link>
              );
            }
            return <Typography.Text>{title}</Typography.Text>;
          },
          title: <FormattedMessage defaultMessage="Title" />,
        },
        {
          dataIndex: 'priority',
          key: 'priority',
          render: (priority: ArticlePriority) => (
            <Badge color={getPriorityColor(priority)} text={priority} />
          ),
          title: <FormattedMessage defaultMessage="Priority" />,
          width: 120,
        },
        {
          dataIndex: 'status',
          key: 'status',
          render: (status: CompleteStatus) => (
            <Badge color={getStatusColor(status)} text={status} />
          ),
          title: <FormattedMessage defaultMessage="Status" />,
          width: 120,
        },
        {
          dataIndex: 'createdBy',
          key: 'createdBy',
          title: <FormattedMessage defaultMessage="Created By" />,
          width: 150,
        },
        {
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (date: string) => {
            if (!date) return '-';
            return dayjs(date).format('DD/MM/YYYY');
          },
          title: <FormattedMessage defaultMessage="Created" />,
          width: 120,
        },
        {
          dataIndex: 'Options',
          key: 'Options',
          render: (
            _,
            record: {
              key: string;
            }
          ) => (
            <Row className="no-print" gutter={8}>
              {hasNavigation && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Bulletin',
                    })}
                  >
                    <Link to={`/app/article/view/${record.key}`}>
                      <Button
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>
              )}
            </Row>
          ),
          title: '',
          width: 60,
        },
      ]}
      dataSource={
        articles?.map((article) => ({
          createdAt: article.createdAt,
          createdBy: article.createdBy.fullName || '-',
          key: article.id,
          priority: article.priority,
          status: article.status,
          title: article.title,
          updatedAt: article.updatedAt,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      size="small"
    />
  );
};

export default ArticleTable;
