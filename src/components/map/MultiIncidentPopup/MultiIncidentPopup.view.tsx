import type { Theme } from 'configs/ThemeConfig';
import type { IncidentPriority } from 'graphql/types';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import IncidentPopup from '../IncidentPopup/IncidentPopup.view';

const { Text } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    maxWidth: 350,
  },
  counter: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    color: '#fff',
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 8px',
  },
  header: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.04)',
    borderBottom: `1px solid ${theme.borderColor}`,
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
  },
  incidentContainer: {
    '& > div': {
      borderRadius: '0 0 12px 12px !important',
    },
  },
  navButton: {
    '&:hover:not(:disabled)': {
      borderColor: theme.primary,
      color: theme.primary,
      transform: 'scale(1.05)',
    },
    borderRadius: 6,
    height: 28,
    transition: 'all 0.2s ease',
    width: 28,
  },
  navigation: {
    gap: 4,
  },
}));

interface Props {
  currentIndex: number;
  incidents: {
    business: { name: string };
    dayTime: string;
    description: string;
    id: string;
    priority: IncidentPriority;
    reference: string;
    subject: string;
    totalValue: number;
  }[];
  onNavigate: (index: number) => void;
}

const MultiIncidentPopup: React.FC<Props> = ({
  currentIndex,
  incidents,
  onNavigate,
}) => {
  const classes = useStyles();

  if (incidents.length === 0) return null;

  const currentIncident = incidents[currentIndex];
  const isMultiple = incidents.length > 1;

  return (
    <div className={classes.container}>
      {isMultiple && (
        <div className={classes.header}>
          <Text className={classes.counter}>
            <FormattedMessage
              defaultMessage="{var1} of {var2} incidents"
              values={{ var1: currentIndex + 1, var2: incidents.length }}
            />
          </Text>
          <Space className={classes.navigation}>
            <Button
              className={classes.navButton}
              disabled={currentIndex === 0}
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              onClick={() => onNavigate(Math.max(0, currentIndex - 1))}
              size="small"
              type="text"
            />
            <Button
              className={classes.navButton}
              disabled={currentIndex === incidents.length - 1}
              icon={<FontAwesomeIcon icon={faChevronRight} />}
              onClick={() =>
                onNavigate(Math.min(incidents.length - 1, currentIndex + 1))
              }
              size="small"
              type="text"
            />
          </Space>
        </div>
      )}
      <div className={classes.incidentContainer}>
        <IncidentPopup incident={currentIncident} />
      </div>
    </div>
  );
};

export default MultiIncidentPopup;
