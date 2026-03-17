import { Tag } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface BanCountdownProps {
  daysRemaining: number;
  showLabel?: boolean;
}

const BanCountdown: React.FC<BanCountdownProps> = ({
  daysRemaining,
  showLabel = true,
}) => {
  const intl = useIntl();

  const color =
    daysRemaining <= 7 ? 'red' : daysRemaining <= 30 ? 'orange' : 'green';

  const label = showLabel
    ? daysRemaining === 0
      ? intl.formatMessage({ defaultMessage: 'Expires today' })
      : intl.formatMessage(
          { defaultMessage: '{days}d remaining' },
          { days: daysRemaining }
        )
    : daysRemaining === 0
      ? intl.formatMessage({ defaultMessage: 'Today' })
      : `${daysRemaining}d`;

  return <Tag color={color}>{label}</Tag>;
};

export default BanCountdown;
