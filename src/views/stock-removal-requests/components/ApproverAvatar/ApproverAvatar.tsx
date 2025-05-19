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
  if (value === StockRemovalRequestApprovalStatus.Approved) return 'green';
  if (value === StockRemovalRequestApprovalStatus.Rejected) return 'red';
  return 'grey';
};

const getStockRemovalRequestApprovalStatusIcon = (
  value: StockRemovalRequestApprovalStatus
) => {
  if (value === StockRemovalRequestApprovalStatus.Approved) return faCheck;
  if (value === StockRemovalRequestApprovalStatus.Rejected) return faClose;
  return faTimer;
};

const useStyles = createUseStyles(() => ({
  container: {
    position: 'relative',
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
}

const ApproverAvatar = ({ data }: Props) => {
  const styles = useStyles();

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
        <Avatar className={styles.container} size={36} style={{ fontSize: 15 }}>
          {data.name.split(' ').at(0)?.charAt(0)}
          {data.name.split(' ').at(1)?.charAt(0)}
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default ApproverAvatar;
