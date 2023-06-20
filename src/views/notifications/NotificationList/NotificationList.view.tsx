import React from 'react';
import {
  Button,
  Card,
  // Checkbox,
  Col,
  Empty,
  Input,
  Row,
  Skeleton,
  Table,
} from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCheck,
  faRotate,
  faBellOn,
  faBellSlash,
} from '@fortawesome/pro-light-svg-icons';
import type { UserNotificationsQuery } from 'graphql/generated';
// import { calcDuration } from 'utils';

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

  return (
    <div className="list-view">
      <Row gutter={8} className={classes.head}>
        <Col span={8}>
          <Input
            // value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a notification..."
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type={takeAllSchemes ? 'default' : 'primary'}
            onClick={toggleTakeAllSchemes}
            disabled={saving}
            // icon={
            //   <FontAwesomeIcon
            //     icon={faPlus}
            //     size="lg"
            //     style={{ marginRight: 5 }}
            //   />
            // }
          >
            Current Scheme
          </Button>
        </Col>
        <Col>
          <Button
            type="text"
            onClick={toggleTakeAllSchemes}
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faRotate}
                size="10x"
                // style={{ marginTop: 5 }}
              />
            }
          />
        </Col>
        <Col>
          <Button
            type={takeAllSchemes ? 'primary' : 'default'}
            onClick={toggleTakeAllSchemes}
            disabled={saving}
            // icon={
            //   <FontAwesomeIcon
            //     icon={faPlus}
            //     size="lg"
            //     style={{ marginRight: 5 }}
            //   />
            // }
          >
            All Schemes
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
            View ALL
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
              body: el.notification.body,
              createdAt: el.createdAt,
              read: el.read,
              notification: el.notification,
              // expireDay: calcDuration(
              //   new Date(el.createdAt),
              //   new Date(new Date().setDate(el.createdAt.getDate() - 30))
              // ),
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
                title: 'Read',
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
                title: 'Title',
              },
              {
                key: 'body',
                dataIndex: 'body',
                title: 'Description',
                ellipsis: true,
              },

              {
                key: 'createdAt',
                dataIndex: 'createdAt',
                title: 'Created At',
                width: 120,
                render: (value) => moment(value).calendar('dd/mm/yyyy'),
              },
              // {
              //   key: 'expireDay',
              //   dataIndex: 'expireDay',
              //   title: 'Expire In',
              //   width: 120,
              // },
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
              description="There's no new notification"
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationLists;
