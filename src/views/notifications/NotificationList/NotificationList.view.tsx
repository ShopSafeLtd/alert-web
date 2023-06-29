import React from 'react';
import { Button, Card, Col, Empty, Input, Row, Skeleton, Table } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBellOn,
  faBellSlash,
  faRotate,
  faSquareCheck,
} from '@fortawesome/pro-light-svg-icons';
import type { UserNotificationsQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
import useStyles from './NotificationList.styles';
import type { NotificationData } from './useNotificationList';

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
          <Input
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a notification...',
              id: '38B8Z+',
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
              id: 'qWFImB',
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
              id: '4zN3gE',
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
              id: 'OIe97A',
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
              onClick: () => handleMarkAsRead(record.notification),
            })}
            columns={[
              {
                title: intl.formatMessage({
                  defaultMessage: 'Read',
                  id: 'filwqD',
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
                  id: '9a9+ww',
                }),
              },
              {
                key: 'body',
                dataIndex: 'body',
                title: intl.formatMessage({
                  defaultMessage: 'Description',
                  id: 'Q8Qw5B',
                }),
                ellipsis: true,
              },
              {
                key: 'createdAt',
                dataIndex: 'createdAt',
                title: intl.formatMessage({
                  defaultMessage: 'Created At',
                  id: 'wittYy',
                }),
                width: 120,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                render: (value) => moment(value).calendar('dd/mm/yyyy'),
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
                id: '7cQ0NO',
              })}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationLists;
