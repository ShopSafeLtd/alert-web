import {
  faArrowDown,
  faArrowUp,
  faCircleInfo,
  faMinus,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Skeleton, Statistic, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface KpiStatCardProps {
  icon?: React.ReactNode;
  invertTrend?: boolean;
  loading: boolean;
  suffix?: string;
  title: string;
  tooltip?: string;
  trend?: null | number;
  value: null | number | string | undefined;
}

const KpiStatCard: React.FC<KpiStatCardProps> = ({
  icon,
  invertTrend = false,
  loading,
  suffix,
  title,
  tooltip,
  trend,
  value,
}) => {
  const intl = useIntl();
  if (loading) {
    return (
      <Card size="small">
        <Skeleton active paragraph={{ rows: 1 }} title />
      </Card>
    );
  }

  const trendIcon =
    trend === null || trend === undefined ? (
      <FontAwesomeIcon icon={faMinus} style={{ color: '#8c8c8c' }} />
    ) : trend > 0 ? (
      <FontAwesomeIcon
        icon={faArrowUp}
        style={{ color: invertTrend ? '#f5222d' : '#52c41a' }}
      />
    ) : trend < 0 ? (
      <FontAwesomeIcon
        icon={faArrowDown}
        style={{ color: invertTrend ? '#52c41a' : '#f5222d' }}
      />
    ) : (
      <FontAwesomeIcon icon={faMinus} style={{ color: '#8c8c8c' }} />
    );

  const titleNode = tooltip ? (
    <span>
      {title}
      <Tooltip title={tooltip}>
        <FontAwesomeIcon
          icon={faCircleInfo}
          style={{ color: '#8c8c8c', cursor: 'help', marginLeft: 6 }}
        />
      </Tooltip>
    </span>
  ) : (
    title
  );

  return (
    <Card size="small">
      <Statistic
        prefix={icon}
        suffix={suffix}
        title={titleNode}
        value={value ?? '—'}
      />
      <div style={{ fontSize: 14, marginTop: 4, minHeight: 22 }}>
        {trend !== undefined && (
          <>
            {trendIcon}
            {trend !== null && trend !== 0 && (
              <span style={{ marginLeft: 4 }}>
                {intl.formatMessage(
                  { defaultMessage: '{value}%' },
                  {
                    value: Math.abs(trend)
                      .toFixed(2)
                      .replace(/\.?0+$/, ''),
                  }
                )}
              </span>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default KpiStatCard;
