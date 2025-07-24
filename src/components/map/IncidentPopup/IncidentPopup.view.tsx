import type { Theme } from 'configs/ThemeConfig';

import {
  faCalendarAlt,
  faMapPin,
  faTag,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Tag, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Text, Title } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  content: {
    padding: '16px 20px',
  },
  description: {
    color: theme.headerColor,
    fontSize: 14,
    lineHeight: 1.4,
    marginBottom: 12,
  },
  footer: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.02)',
    borderTop: `1px solid ${theme.borderColor}`,
    padding: '12px 20px',
    textAlign: 'center',
  },
  header: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.02)',
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '16px 20px',
  },
  infoRow: {
    '& svg': {
      marginRight: 8,
      width: 14,
    },
    alignItems: 'center',
    color: theme.secondaryText,
    display: 'flex',
    fontSize: 13,

    marginBottom: 8,
  },
  popupContainer: {
    // Override Mapbox popup styles
    '& .mapboxgl-popup-content': {
      backgroundColor: `${theme.componentBackground} !important`,
      borderRadius: '12px !important',
      padding: '0 !important',
    },
    backgroundColor: `${theme.componentBackground} !important`,
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 8px 30px rgba(0, 0, 0, 0.4)'
        : '0 8px 30px rgba(0, 0, 0, 0.12)',
    maxWidth: 350,
    overflow: 'hidden',

    padding: 0,
  },
  priorityBadge: {
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  reference: {
    color: theme.secondaryText,
    fontSize: 12,
    marginTop: 4,
  },
  tag: {
    borderRadius: 6,
    fontSize: 11,
    margin: 0,
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8,
  },
  title: {
    color: theme.headerColor,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.3,
    margin: 0,
  },
  viewButton: {
    '&:hover': {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      transform: 'translateY(-1px)',
    },
    borderRadius: 8,
    fontWeight: 500,
    transition: 'all 0.2s ease',
    width: '100%',
  },
}));

interface Props {
  incident: {
    approved?: boolean | null;
    business?: {
      name?: null | string;
    } | null;
    createdBy?: {
      fullName?: null | string;
    } | null;
    crimeTypes?: Array<{
      id: string;
      name: string;
    }> | null;
    customerRef?: null | string;
    dayTime?: null | string;
    description?: null | string;
    groups?: Array<{
      id: string;
      name: string;
    }> | null;
    id: string;
    location?: {
      full?: null | string;
    } | null;
    offenders?: Array<{
      id: string;
      name?: null | string;
    }> | null;
    policeRef?: null | string;
    priority?: null | string;
    reference?: null | number | string;
    subject: string;
    totalValue?: null | number;
  };
}

const getPriorityColor = (priority?: null | string) => {
  switch (priority?.toLowerCase()) {
    case 'high': {
      return '#ff4d4f';
    }
    case 'medium': {
      return '#faad14';
    }
    default: {
      return '#52c41a';
    }
  }
};

const IncidentPopup: React.FC<Props> = ({ incident }) => {
  const classes = useStyles();
  const intl = useIntl();

  // Debug logging to see what we're getting
  console.log('IncidentPopup received incident:', {
    dayTime: incident.dayTime,
    fullIncident: incident,
    id: incident.id,
    subject: incident.subject,
    totalValue: incident.totalValue,
  });

  const location =
    incident.business?.name ||
    incident.location?.full ||
    'Location not specified';
  const references = [
    incident.reference,
    incident.policeRef,
    incident.customerRef,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <div className={classes.popupContainer}>
      <div className={classes.header}>
        <Title className={classes.title} level={5}>
          {incident.subject ||
            intl.formatMessage({ defaultMessage: 'Untitled Incident' })}
        </Title>
        {references && <Text className={classes.reference}>{references}</Text>}
        {incident.priority && (
          <div style={{ marginTop: 8 }}>
            <Badge
              className={classes.priorityBadge}
              color={getPriorityColor(incident.priority)}
              text={`${incident.priority} Priority`}
            />
          </div>
        )}
      </div>

      <div className={classes.content}>
        {incident.description && (
          <Text className={classes.description}>
            {incident.description.length > 120
              ? // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                `${incident.description.slice(0, 120)}...`
              : incident.description}
          </Text>
        )}

        <div className={classes.infoRow}>
          <FontAwesomeIcon icon={faMapPin} />
          <Text>{location}</Text>
        </div>

        {incident.dayTime && (
          <div className={classes.infoRow}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <Text>
              {(() => {
                try {
                  return incident.dayTime ?? 'Invalid date';
                } catch (error) {
                  console.error('Date parsing error:', error, incident.dayTime);
                  return 'Invalid date';
                }
              })()}
            </Text>
          </div>
        )}

        {incident.createdBy?.fullName && (
          <div className={classes.infoRow}>
            <FontAwesomeIcon icon={faUser} />
            <Text>
              <FormattedMessage
                defaultMessage="Created by {var1}"
                values={{ var1: incident.createdBy.fullName }}
              />
            </Text>
          </div>
        )}

        {incident.totalValue && incident.totalValue > 0 ? (
          <div className={classes.infoRow}>
            <FontAwesomeIcon icon={faTag} />
            <Text>
              <FormattedMessage
                defaultMessage="Loss Value: £{var1}"
                values={{ var1: incident.totalValue.toLocaleString() }}
              />
            </Text>
          </div>
        ) : null}

        {(incident.crimeTypes?.length ||
          incident.groups?.length ||
          incident.offenders?.length) && (
          <div className={classes.tagsList}>
            {incident.crimeTypes?.map((type) => (
              <Tag className={classes.tag} color="blue" key={type.id}>
                {type.name}
              </Tag>
            ))}
            {incident.groups?.map((group) => (
              <Tag className={classes.tag} color="green" key={group.id}>
                {group.name}
              </Tag>
            ))}
            {incident.offenders?.map((offender) => (
              <Tag className={classes.tag} color="red" key={offender.id}>
                {offender.name}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentPopup;
