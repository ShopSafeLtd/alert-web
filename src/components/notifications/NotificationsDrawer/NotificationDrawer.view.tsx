import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCheck,
  faRotate,
  faBellOn,
  faBellSlash,
} from '@fortawesome/pro-light-svg-icons';
import type { ListUserNotificationsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import useStyles from './NotificationDrawer.styles';
import type { NotificationData } from './useNotificationDrawer';

interface Props {
  data:
    | Exclude<
        ListUserNotificationsQuery['listUserNotifications'],
        undefined | null
      >
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: NotificationData) => void;
  handleMarkAllRead: () => void;
  toggleTakeAllSchemes: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  onClose: () => void;
}

const NotificationsDrawer = ({
  data,
  loading,
  saving,
  toggleTakeAllSchemes,
  handleMarkAsRead,
  handleMarkAllRead,
  onRefresh,
  refreshing,
  onClose,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div>
      <Row justify="end" gutter={8} className={classes.head}>
        <Col>
          <Link to="/app/notifications">
            <Button onClick={onClose} size="small">
              {intl.formatMessage({
                defaultMessage: 'All Notifications',
                id: '9GcvKL',
              })}
            </Button>
          </Link>
        </Col>
        <Col>
          <Radio.Group size="small" defaultValue="ALL">
            <Radio.Button onClick={toggleTakeAllSchemes} value="ALL">
              {intl.formatMessage({
                defaultMessage: 'All Schemes',
                id: '4zN3gE',
              })}
            </Radio.Button>
            <Radio.Button onClick={toggleTakeAllSchemes} value="Current">
              {intl.formatMessage({
                defaultMessage: 'Current Scheme',
                id: 'qWFImB',
              })}
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Button
            onClick={handleMarkAllRead}
            disabled={saving}
            size="small"
            icon={
              <FontAwesomeIcon
                icon={faSquareCheck}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({ defaultMessage: 'Clear All', id: 'cqlObT' })}
          </Button>
        </Col>
        <Col>
          <Button
            size="small"
            onClick={onRefresh}
            disabled={saving}
            loading={refreshing}
            icon={
              <FontAwesomeIcon
                icon={faRotate}
                size="10x"
                // style={{ marginTop: 5 }}
              />
            }
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
          itemLayout="horizontal"
          className={classes.list}
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
          renderItem={(item) => (
            <List.Item
              className={item.read ? classes.item : classes.unreadItem}
              onClick={() => handleMarkAsRead(item.notification)}
            >
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon
                    icon={item.read ? faBellSlash : faBellOn}
                    size="lg"
                    className={item.read ? classes.read : classes.unread}
                  />
                }
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
                description={item.body}
              />
            </List.Item>
          )}
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
      {(data?.total || 0) > 15 && (
        <Row justify="center" style={{ marginBottom: 20, marginTop: 20 }}>
          <Col>
            <Button size="small">
              {intl.formatMessage({
                defaultMessage: 'View All Notifications',
                id: 'HTKZYW',
              })}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default NotificationsDrawer;
