import type { ListUserNotificationsQuery } from 'graphql/userNotification/queries/__generated__/list-user-notifications.generated';

import {
  faBellOn,
  faBellSlash,
  faRotate,
  faSquareCheck,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Empty, Radio, Row, Skeleton, Typography } from 'antd';
import dayjs from 'dayjs';
import { Model } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { NotificationData } from './useNotificationDrawer';

import useStyles from './NotificationDrawer.styles';

const getNotificationUrl = (notification: NotificationData): string => {
  switch (notification.type) {
    case Model.Article: {
      return `/app/article/view/${notification.articleId}`;
    }
    case Model.Incident: {
      return `/app/incidents/view/${notification.incidentId}`;
    }
    case Model.Offender: {
      return `/app/offenders/view/${notification.offenderId}`;
    }
    case Model.Vehicle: {
      return `/app/vehicles/view/${notification.vehicleId}`;
    }
    case Model.Investigation: {
      return `/app/investigation/view/${notification.investigationId}`;
    }
    case Model.Ban: {
      return `/app/offenders/view/${notification.ban?.offender?.id}`;
    }
    case Model.CrimeGroup: {
      return `/app/crime-groups/view/${notification.crimeGroupId}`;
    }
    case Model.User: {
      return `/app/admin/user/${notification.userId}`;
    }
    case Model.Chat: {
      return `/app/chat`;
    }
    default: {
      return '#';
    }
  }
};

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

  const handleNotificationClick = (notification: NotificationData) => {
    handleMarkAsRead(notification);
  };
  return (
    <div>
      <Row className={classes.head} gutter={8} justify="end">
        <Col>
          <Link to="/app/notifications">
            <Button onClick={onClose} size="small" type="link">
              {intl.formatMessage({
                defaultMessage: 'View All',
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
            icon={<FontAwesomeIcon icon={faSquareCheck} size="sm" />}
            onClick={handleMarkAllRead}
            size="small"
          >
            {intl.formatMessage({ defaultMessage: 'Clear All' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            icon={<FontAwesomeIcon icon={faRotate} size="sm" />}
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
      ) : (data?.total ?? 0) > 0 ? (
        <div className={classes.notificationsList}>
          {data?.notifications?.map((el) => {
            const item = {
              body: el.notification.body,
              createdAt: el.createdAt,
              key: el.id,
              notification: el.notification,
              read: el.read,
              title: el.notification.title,
            };
            const notificationData = {
              ...item.notification,
              schemes: item.notification.schemes,
            };
            const url = getNotificationUrl(notificationData);

            return (
              <div className={classes.cardWrapper} key={item.key}>
                <Link
                  onClick={() => handleNotificationClick(notificationData)}
                  style={{ display: 'block', textDecoration: 'none' }}
                  to={url}
                >
                  <div
                    className={item.read ? classes.card : classes.unreadCard}
                  >
                    <Row align="middle" gutter={16}>
                      <Col>
                        <div
                          className={`${classes.iconWrapper} ${item.read ? '' : classes.unreadIconWrapper}`}
                        >
                          <FontAwesomeIcon
                            className={
                              item.read ? classes.read : classes.unread
                            }
                            icon={item.read ? faBellSlash : faBellOn}
                            size="lg"
                          />
                        </div>
                      </Col>
                      <Col flex={1}>
                        <Row>
                          <Col span={24}>
                            <Typography.Text className={classes.title}>
                              {item.title}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Typography.Text className={classes.description}>
                              {item.body}
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text
                          className={classes.date}
                          type="secondary"
                        >
                          {dayjs(item.createdAt).format('HH:mm DD/MM/YY')}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
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
