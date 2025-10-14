import type { Theme } from '#/configs/ThemeConfig';

import { faCheck, faClose, faTimer } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Tooltip } from 'antd';
import { StockRemovalRequestApprovalStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

const getStockRemovalRequestApprovalStatusText = (
  value: StockRemovalRequestApprovalStatus
) => {
  if (value === StockRemovalRequestApprovalStatus.Approved)
    return <FormattedMessage defaultMessage="Approved" />;
  if (value === StockRemovalRequestApprovalStatus.Rejected)
    return <FormattedMessage defaultMessage="Rejected" />;
  return <FormattedMessage defaultMessage="Pending Approval" />;
};

const getStockRemovalRequestApprovalStatusColour = (
  value: StockRemovalRequestApprovalStatus
) => {
  if (value === StockRemovalRequestApprovalStatus.Approved) return '#52c41a';
  if (value === StockRemovalRequestApprovalStatus.Rejected) return '#f5222d';
  return '#8c8c8c';
};

const getStockRemovalRequestApprovalStatusIcon = (
  value: StockRemovalRequestApprovalStatus
) => {
  if (value === StockRemovalRequestApprovalStatus.Approved) return faCheck;
  if (value === StockRemovalRequestApprovalStatus.Rejected) return faClose;
  return faTimer;
};

const useStyles = createUseStyles((theme: Theme) => ({
  avatar: {
    backgroundColor: theme.colorScheme === 'dark' ? '#434343' : '#d9d9d9',
    color: theme.colorScheme === 'dark' ? '#fff' : '#262626',
  },
  container: {
    position: 'relative',
  },
  highlighted: {
    border: '3px solid #faad14',
    boxShadow: '0 0 8px rgba(250, 173, 20, 0.6)',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 100,
    bottom: -4,
    display: 'flex',
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -2,
    width: 20,
    zIndex: 3,
  },
}));

interface Props {
  data: {
    name: string;
    status: StockRemovalRequestApprovalStatus;
  };
  highlightPending?: boolean;
  isCurrentUser?: boolean;
}

const ApproverAvatar = ({
  data,
  highlightPending = false,
  isCurrentUser = false,
}: Props) => {
  const styles = useStyles();

  const shouldHighlight =
    isCurrentUser &&
    highlightPending &&
    data.status === StockRemovalRequestApprovalStatus.Open;

  return (
    <div>
      <Tooltip
        title={
          <FormattedMessage
            defaultMessage="{var1} ({var2})"
            values={{
              var1: data.name,
              var2: getStockRemovalRequestApprovalStatusText(data.status),
            }}
          />
        }
      >
        <div
          className={styles.icon}
          style={{
            backgroundColor: getStockRemovalRequestApprovalStatusColour(
              data.status
            ),
          }}
        >
          <FontAwesomeIcon
            color="white"
            icon={getStockRemovalRequestApprovalStatusIcon(data.status)}
            size="sm"
          />
        </div>
        <Avatar
          className={`${styles.container} ${styles.avatar} ${shouldHighlight ? styles.highlighted : ''}`}
          size={36}
          style={{ fontSize: 15 }}
        >
          {data.name.split(' ').at(0)?.charAt(0)}
          {data.name.split(' ').at(1)?.charAt(0)}
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default ApproverAvatar;
