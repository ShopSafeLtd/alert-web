import type { UserNotificationsQuery } from 'graphql/userNotification/queries/__generated__/user_notifications.generated';

import DebouncedInput from '#/utils/debounced-input';
import {
  faBellOn,
  faBellSlash,
  faRotate,
  faSquareCheck,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Empty, Row, Skeleton, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

import type { NotificationData } from './useNotificationList';

import useStyles from './NotificationList.styles';

interface Props {
  currentPage: number;
  currentPageSize: number;
  data:
    | Exclude<UserNotificationsQuery['user'], null | undefined>
    | null
    | undefined;
  handleMarkAllRead: () => void;
  handleMarkAsRead: (value: NotificationData) => void;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  saving: boolean;
  setSearch: (value: string) => void;
  takeAllSchemes: boolean;
  toggleTakeAllSchemes: () => void;
}

const NotificationLists = ({
  currentPage,
  currentPageSize,
  data,
  handleMarkAllRead,
  handleMarkAsRead,
  loading,
  onPaginationChange,
  saving,
  setSearch,
  takeAllSchemes,
  toggleTakeAllSchemes,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row className={classes.head} gutter={8}>
        <Col span={8}>
          <DebouncedInput
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a notification...',
            })}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            disabled={saving}
            onClick={toggleTakeAllSchemes}
            type={takeAllSchemes ? 'default' : 'primary'}
          >
            {intl.formatMessage({
              defaultMessage: 'Current Scheme',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            icon={<FontAwesomeIcon icon={faRotate} size="10x" />}
            onClick={toggleTakeAllSchemes}
            type="text"
          />
        </Col>
        <Col>
          <Button
            disabled={saving}
            onClick={toggleTakeAllSchemes}
            type={takeAllSchemes ? 'primary' : 'default'}
          >
            {intl.formatMessage({
              defaultMessage: 'All Schemes',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            danger
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faSquareCheck}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={handleMarkAllRead}
            type="text"
          >
            {intl.formatMessage({
              defaultMessage: 'View ALL',
            })}
          </Button>
        </Col>
      </Row>
      <Card loading={loading}>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))
        ) : data?.totalNotifications && data?.totalNotifications > 0 ? (
          <Table
            columns={[
              {
                dataIndex: 'actions',
                key: 'actions',
                render: (_, record) => (
                  <FontAwesomeIcon
                    className={record.read ? classes.read : classes.unread}
                    icon={record.read ? faBellSlash : faBellOn}
                    size="lg"
                  />
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Read',
                }),
                width: 80,
              },
              {
                dataIndex: 'title',
                key: 'title',
                title: intl.formatMessage({
                  defaultMessage: 'Title',
                }),
              },
              {
                dataIndex: 'body',
                ellipsis: true,
                key: 'body',
                title: intl.formatMessage({
                  defaultMessage: 'Description',
                }),
              },
              {
                dataIndex: 'createdAt',
                key: 'createdAt',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                render: (value) => FormatCalendar(value),
                title: intl.formatMessage({
                  defaultMessage: 'Created At',
                }),
                width: 120,
              },
            ]}
            dataSource={data?.notifications?.map((el) => ({
              body: el.notification.body || '',
              createdAt: el.createdAt,
              key: el.id,
              notification: el.notification,
              read: el.read,
              title: el.notification.title,
            }))}
            loading={loading}
            onRow={(record) => ({
              // TODO fix this
              onClick: () =>
                handleMarkAsRead({
                  ...record.notification,
                  read: record.read,
                  schemes: record.notification.schemes,
                }),
            })}
            pagination={{
              current: currentPage,
              hideOnSinglePage: true,
              onChange: onPaginationChange,
              pageSize: currentPageSize,
              position: ['bottomCenter'],
              showSizeChanger: false,
              total: data?.totalNotifications,
            }}
            size="small"
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Empty
              description={intl.formatMessage({
                defaultMessage: "There's no new notification",
              })}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationLists;
