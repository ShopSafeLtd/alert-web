import { Tag } from 'antd';
import { StockRemovalRequestStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  status: StockRemovalRequestStatus;
}

const getStatusColor = (status: StockRemovalRequestStatus): string => {
  switch (status) {
    case StockRemovalRequestStatus.PendingApproval: {
      return 'warning';
    } // yellow
    case StockRemovalRequestStatus.AwaitingPapApproval: {
      return 'orange';
    }
    case StockRemovalRequestStatus.Picking: {
      return 'blue';
    }
    case StockRemovalRequestStatus.Picked: {
      return 'cyan';
    } // light blue
    case StockRemovalRequestStatus.Collected: {
      return 'purple';
    }
    case StockRemovalRequestStatus.AwaitingReturn: {
      return 'gold';
    } // amber
    case StockRemovalRequestStatus.Returned: {
      return 'success';
    } // green
    case StockRemovalRequestStatus.Closed: {
      return 'default';
    } // gray
    case StockRemovalRequestStatus.Open: {
      return 'success';
    } // green - legacy status
    case StockRemovalRequestStatus.RequestedCancel: {
      return 'volcano';
    } // red-orange - pending cancellation
    case StockRemovalRequestStatus.Cancelled: {
      return 'red';
    } // terminal negative state
    default: {
      return 'default';
    }
  }
};

const getStatusText = (status: StockRemovalRequestStatus) => {
  switch (status) {
    case StockRemovalRequestStatus.PendingApproval: {
      return <FormattedMessage defaultMessage="Pending Approval" />;
    }
    case StockRemovalRequestStatus.AwaitingPapApproval: {
      return <FormattedMessage defaultMessage="Awaiting PAP Approval" />;
    }
    case StockRemovalRequestStatus.Picking: {
      return <FormattedMessage defaultMessage="Picking" />;
    }
    case StockRemovalRequestStatus.Picked: {
      return <FormattedMessage defaultMessage="Picked" />;
    }
    case StockRemovalRequestStatus.Collected: {
      return <FormattedMessage defaultMessage="Collected" />;
    }
    case StockRemovalRequestStatus.AwaitingReturn: {
      return <FormattedMessage defaultMessage="Awaiting Return" />;
    }
    case StockRemovalRequestStatus.Returned: {
      return <FormattedMessage defaultMessage="Returned" />;
    }
    case StockRemovalRequestStatus.Closed: {
      return <FormattedMessage defaultMessage="Closed" />;
    }
    case StockRemovalRequestStatus.Open: {
      return <FormattedMessage defaultMessage="Open" />;
    }
    case StockRemovalRequestStatus.RequestedCancel: {
      return <FormattedMessage defaultMessage="Cancellation Requested" />;
    }
    case StockRemovalRequestStatus.Cancelled: {
      return <FormattedMessage defaultMessage="Cancelled" />;
    }
    default: {
      return status;
    }
  }
};

const StockRemovalRequestStatusBadge = ({ status }: Props) => (
  <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
);

export default StockRemovalRequestStatusBadge;
