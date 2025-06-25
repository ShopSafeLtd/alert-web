import type { Theme } from 'configs/ThemeConfig';
import type { IncidentPriority } from 'graphql/types';

import {
  faCalendarDay,
  faExclamationTriangle,
  faExternalLink,
  faMapMarkerAlt,
  faPoundSign,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, List, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

const { Text, Title } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  cardHeader: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    color: theme.headerColor,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.3,
    margin: 0,
  },
  closeButton: {
    '&:hover': {
      backgroundColor: 'rgba(255, 77, 79, 0.1)',
      borderColor: '#ff4d4f',
      color: '#ff4d4f',
    },
    borderRadius: 6,
    height: 32,
    width: 32,
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '0 20px 20px',
  },
  description: {
    color: theme.secondaryText,
    fontSize: 13,
    lineHeight: 1.4,
    marginBottom: 8,
  },
  emptyState: {
    color: theme.secondaryText,
    fontSize: 14,
    padding: '40px 20px',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.04)',
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between',
    padding: '16px 20px',
  },
  incidentCard: {
    '&.active': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(24, 144, 255, 0.08)'
          : 'rgba(24, 144, 255, 0.04)',
      borderColor: theme.primary,
      boxShadow: `0 0 0 2px ${theme.primary}20`,
    },
    '&:hover': {
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 6px 20px rgba(0, 0, 0, 0.4)'
          : '0 6px 20px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.03)'
        : 'rgba(0, 0, 0, 0.02)',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 12,
    cursor: 'pointer',
    marginBottom: 16,

    transition: 'all 0.2s ease',
  },
  metaInfo: {
    '& > div': {
      '& svg': {
        color: theme.primary,
        marginRight: 6,
        width: 12,
      },
      alignItems: 'center',
      display: 'flex',

      marginBottom: 6,
    },
    color: theme.secondaryText,
    fontSize: 12,

    lineHeight: 1.3,
  },
  reference: {
    color: theme.secondaryText,
    fontSize: 11,
    marginTop: 2,
  },
  sidebar: {
    '&.open': {
      transform: 'translateX(0)',
    },
    backgroundColor: theme.componentBackground,
    borderLeft: `1px solid ${theme.borderColor}`,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '-4px 0 20px rgba(0, 0, 0, 0.3)'
        : '-4px 0 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: 450,
    minWidth: 400,
    overflow: 'hidden',
    position: 'fixed',
    right: 0,
    top: 0,
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    zIndex: 1000,
  },
  title: {
    color: theme.headerColor,
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
  },
  viewButton: {
    '&:hover': {
      borderColor: theme.primary,
      color: theme.primary,
    },
    fontSize: 11,
    height: 24,
    padding: '0 8px',
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
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onSelectIncident: (index: number) => void;
}

const IncidentSidebar: React.FC<Props> = ({
  currentIndex,
  incidents,
  isOpen,
  onClose,
  onSelectIncident,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  if (incidents.length === 0) {
    return (
      <div className={`${classes.sidebar} ${isOpen ? 'open' : ''}`}>
        <div className={classes.header}>
          <Title className={classes.title} level={4}>
            <FormattedMessage defaultMessage="Incidents" />
          </Title>
          <Button
            className={classes.closeButton}
            icon={<FontAwesomeIcon icon={faTimes} />}
            onClick={onClose}
            size="small"
            type="text"
          />
        </div>
        <div className={classes.emptyState}>
          <FormattedMessage defaultMessage="No incidents selected" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${classes.sidebar} ${isOpen ? 'open' : ''}`}>
      <div className={classes.header}>
        <Title className={classes.title} level={4}>
          <FormattedMessage
            defaultMessage="Incidents {var}"
            values={{ var: incidents.length }}
          />
        </Title>
        <Button
          className={classes.closeButton}
          icon={<FontAwesomeIcon icon={faTimes} />}
          onClick={onClose}
          size="small"
          type="text"
        />
      </div>

      <div className={classes.content}>
        <List
          dataSource={incidents}
          renderItem={(
            incident: {
              business: { name: string };
              dayTime: string;
              description: string;
              id: string;
              priority: IncidentPriority;
              reference: string;
              subject: string;
              totalValue: number;
            },
            index
          ) => (
            <List.Item key={incident.id} style={{ border: 'none', padding: 0 }}>
              <Card
                className={`${classes.incidentCard} ${index === currentIndex ? 'active' : ''}`}
                onClick={() => onSelectIncident(index)}
                size="small"
              >
                <div className={classes.cardHeader}>
                  <div style={{ flex: 1 }}>
                    <Title className={classes.cardTitle} level={5}>
                      {incident.subject ||
                        intl.formatMessage({
                          defaultMessage: 'Untitled Incident',
                        })}
                    </Title>
                    {incident.reference && (
                      <Text className={classes.reference}>
                        <FormattedMessage
                          defaultMessage="Ref: {var}"
                          values={{ var: incident.reference }}
                        />
                      </Text>
                    )}
                  </div>
                  <Link to={`/app/incidents/${incident.id}`}>
                    <Button
                      className={classes.viewButton}
                      icon={<FontAwesomeIcon icon={faExternalLink} />}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                      type="text"
                    />
                  </Link>
                </div>

                {incident.description && (
                  <Text className={classes.description}>
                    {incident.description.length > 100
                      ? // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                        `${incident.description.slice(0, 100)}...`
                      : incident.description}
                  </Text>
                )}

                <div className={classes.metaInfo}>
                  {incident.business?.name && (
                    <div>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {incident.business.name}
                    </div>
                  )}
                  {incident.dayTime && (
                    <div>
                      <FontAwesomeIcon icon={faCalendarDay} />
                      {(() => {
                        try {
                          const date = new Date(incident.dayTime);
                          return Number.isNaN(date.getTime())
                            ? 'Invalid date'
                            : formatDate(date);
                        } catch {
                          return 'Invalid date';
                        }
                      })()}
                    </div>
                  )}
                  {incident.priority && (
                    <div>
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      <FormattedMessage
                        defaultMessage="{var} Priority"
                        values={{ var: incident.priority }}
                      />
                    </div>
                  )}
                  {incident.totalValue && incident.totalValue > 0 && (
                    <div>
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      <FontAwesomeIcon icon={faPoundSign} />£
                      {incident.totalValue.toLocaleString()}
                    </div>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default IncidentSidebar;
