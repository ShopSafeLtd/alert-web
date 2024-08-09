import type { ListUserNotificationsQuery } from 'graphql/userNotification/queries/__generated__/list-user-notifications.generated';

import {
  faBellOn,
  faBellSlash,
  faRotate,
  faSquareCheck,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Empty,
  List,
  Radio,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { NotificationData } from './useNotificationDrawer';

import useStyles from './NotificationDrawer.styles';

interface Props {
  data:
    | Exclude<
        ListUserNotificationsQuery['listUserNotifications'],
        null | undefined
      >
    | null
    | undefined;
  handleMarkAllRead: () => void;
  handleMarkAsRead: (value: NotificationData) => void;
  loading: boolean;
  onClose: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  saving: boolean;
  toggleTakeAllSchemes: () => void;
}

const NotificationsDrawer = ({
  data,
  handleMarkAllRead,
  handleMarkAsRead,
  loading,
  onClose,
  onRefresh,
  refreshing,
  saving,
  toggleTakeAllSchemes,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div>
      <Row className={classes.head} gutter={8} justify="end">
        <Col>
          <Link to="/app/notifications">
            <Button onClick={onClose} size="small">
              {intl.formatMessage({
                defaultMessage: 'All Notifications',
              })}
            </Button>
          </Link>
        </Col>
        <Col>
          <Radio.Group defaultValue="ALL" size="small">
            <Radio.Button onClick={toggleTakeAllSchemes} value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Schemes',
              })}
            </Radio.Button>
            <Radio.Button onClick={toggleTakeAllSchemes} value="Current">
              {intl.formatMessage({
                defaultMessage: 'Current Scheme',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faSquareCheck}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={handleMarkAllRead}
            size="small"
          >
            {intl.formatMessage({ defaultMessage: 'Clear All' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faRotate}
                size="10x"
                // style={{ marginTop: 5 }}
              />
            }
            loading={refreshing}
            onClick={onRefresh}
            size="small"
          />
        </Col>
      </Row>
      {loading && data ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div style={{ padding: 20 }}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <Skeleton key={index} />
          </div>
        ))
      ) : data?.total && data?.total > 0 ? (
        <List
          className={classes.list}
          dataSource={data?.notifications?.map((el) => ({
            body: el.notification.body,
            createdAt: el.createdAt,
            key: el.id,
            notification: el.notification,
            read: el.read,
            title: el.notification.title,
            // expireDay: calcDuration(
            //   new Date(el.createdAt),
            //   new Date(new Date().setDate(el.createdAt.getDate() - 30))
            // ),
          }))}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item
              className={item.read ? classes.item : classes.unreadItem}
              // TODO: fix this
              onClick={() =>
                handleMarkAsRead({
                  ...item.notification,
                  schemes: item.notification.schemes,
                })
              }
            >
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon
                    className={item.read ? classes.read : classes.unread}
                    icon={item.read ? faBellSlash : faBellOn}
                    size="lg"
                  />
                }
                description={item.body}
                title={
                  <Row>
                    <Col flex={1}>
                      <Typography.Text className={classes.title}>
                        {item.title}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text
                        className={classes.date}
                        type="secondary"
                      >
                        {moment(item.createdAt).format('HH:mm DD/MM/YY')}
                      </Typography.Text>
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
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
      {(data?.total || 0) > 15 && (
        <Row justify="center" style={{ marginBottom: 20, marginTop: 20 }}>
          <Col>
            <Button size="small">
              {intl.formatMessage({
                defaultMessage: 'View All Notifications',
              })}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default NotificationsDrawer;
