import React from 'react';
import { Button, Card, Col, Empty, Row, Skeleton, Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBellOn,
  faBellSlash,
  faRotate,
  faSquareCheck,
} from '@fortawesome/pro-light-svg-icons';

import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import DebouncedInput from '#/utils/debounced-input';
import useStyles from './NotificationList.styles';
import type { NotificationData } from './useNotificationList';
import type { UserNotificationsQuery } from 'graphql/userNotification/queries/user_notifications.generated';

interface Props {
  data:
    | Exclude<UserNotificationsQuery['user'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: NotificationData) => void;
  handleMarkAllRead: () => void;
  takeAllSchemes: boolean;
  toggleTakeAllSchemes: () => void;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
}

const NotificationLists = ({
  data,
  loading,
  saving,
  takeAllSchemes,
  toggleTakeAllSchemes,
  setSearch,
  onPaginationChange,
  currentPage,
  currentPageSize,
  handleMarkAsRead,
  handleMarkAllRead,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} className={classes.head}>
        <Col span={8}>
          <DebouncedInput
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a notification...',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type={takeAllSchemes ? 'default' : 'primary'}
            onClick={toggleTakeAllSchemes}
            disabled={saving}
          >
            {intl.formatMessage({
              defaultMessage: 'Current Scheme',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            type="text"
            onClick={toggleTakeAllSchemes}
            disabled={saving}
            icon={<FontAwesomeIcon icon={faRotate} size="10x" />}
          />
        </Col>
        <Col>
          <Button
            type={takeAllSchemes ? 'primary' : 'default'}
            onClick={toggleTakeAllSchemes}
            disabled={saving}
          >
            {intl.formatMessage({
              defaultMessage: 'All Schemes',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            type="text"
            danger
            onClick={handleMarkAllRead}
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faSquareCheck}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
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
            dataSource={data?.notifications?.map((el) => ({
              key: el.id,
              title: el.notification.title,
              body: el.notification.body || '',
              createdAt: el.createdAt,
              read: el.read,
              notification: el.notification,
            }))}
            loading={loading}
            style={{ cursor: 'pointer' }}
            size="small"
            pagination={{
              hideOnSinglePage: true,
              total: data?.totalNotifications,
              onChange: onPaginationChange,
              pageSize: currentPageSize,
              current: currentPage,
              showSizeChanger: false,
              position: ['bottomCenter'],
            }}
            onRow={(record) => ({
              // TODO fix this
              onClick: () =>
                handleMarkAsRead({
                  ...record.notification,
                  read: record.read,
                  schemes: record.notification.schemes,
                }),
            })}
            columns={[
              {
                title: intl.formatMessage({
                  defaultMessage: 'Read',
                }),
                dataIndex: 'actions',
                key: 'actions',
                width: 80,
                render: (_, record) => (
                  <FontAwesomeIcon
                    icon={record.read ? faBellSlash : faBellOn}
                    size="lg"
                    className={record.read ? classes.read : classes.unread}
                  />
                ),
              },
              {
                key: 'title',
                dataIndex: 'title',
                title: intl.formatMessage({
                  defaultMessage: 'Title',
                }),
              },
              {
                key: 'body',
                dataIndex: 'body',
                title: intl.formatMessage({
                  defaultMessage: 'Description',
                }),
                ellipsis: true,
              },
              {
                key: 'createdAt',
                dataIndex: 'createdAt',
                title: intl.formatMessage({
                  defaultMessage: 'Created At',
                }),
                width: 120,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                render: (value) => FormatCalendar(value),
              },
            ]}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={intl.formatMessage({
                defaultMessage: "There's no new notification",
              })}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationLists;
