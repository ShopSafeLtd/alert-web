import { useStoreState } from '#/state';
import { Tag } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface ThreatBadgeProps {
  level: 'HIGH' | 'LOW' | 'MEDIUM' | null | undefined;
}

const ThreatBadge: React.FC<ThreatBadgeProps> = ({ level }) => {
  const intl = useIntl();
  const darkMode =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  const getColor = () => {
    if (!level) return darkMode ? '#434343' : '#d9d9d9';

    const colors = {
      HIGH: darkMode ? '#ff4d4f' : '#f5222d',
      LOW: darkMode ? '#ffc53d' : '#faad14',
      MEDIUM: darkMode ? '#ffa940' : '#fa8c16',
    };

    return colors[level];
  };

  const getEmoji = () => {
    if (!level) return '';
    const emojis = {
      HIGH: '🔴',
      LOW: '🟡',
      MEDIUM: '🟠',
    };
    return emojis[level];
  };

  return (
    <Tag
      color={getColor()}
      style={{
        color: level === 'LOW' && !darkMode ? '#000' : '#fff',
        fontWeight: 600,
      }}
    >
      {getEmoji()} {level || intl.formatMessage({ defaultMessage: 'Unknown' })}
    </Tag>
  );
};

export default ThreatBadge;
