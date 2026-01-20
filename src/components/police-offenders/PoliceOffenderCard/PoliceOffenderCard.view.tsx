import {
  currencySymbolAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCalendar,
  faExclamationCircle,
  faExclamationTriangle,
  faReceipt,
  faShoppingBag,
  faUser,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Card, Col, Row, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { PoliceOffenderCardFragment } from './__generated__/PoliceOffenderCard.fragment.generated';

import useStyles from './PoliceOffenderCard.styles';
import usePoliceOffenderCard from './usePoliceOffenderCard';

const { Title } = Typography;

type ImagePosition =
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'CENTER'
  | 'TOP_LEFT'
  | 'TOP_RIGHT';

const getLevel = (value: number): 'high' | 'low' | 'medium' => {
  if (value >= 70) return 'high';
  if (value >= 40) return 'medium';
  return 'low';
};

const formatLastIncidentDate = (date?: Date | null): string => {
  if (!date) return 'Unknown';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

const formatActualDate = (date?: Date | null): string => {
  if (!date) return 'Unknown';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const PriorityBadge = ({ score }: { score: number }): JSX.Element | null => {
  const intl = useIntl();
  const level = getLevel(score);

  // Hide low priority badges completely
  if (level === 'low') return null;

  const config = {
    high: {
      backgroundColor: 'rgba(255, 77, 79, 0.15)',
      color: '#ff4d4f',
      icon: faExclamationCircle,
      text: 'High',
    },
    medium: {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
      color: '#faad14',
      icon: faExclamationTriangle,
      text: 'Medium',
    },
  };

  const { backgroundColor, color, icon, text } = config[level];

  return (
    <Tooltip
      title={intl.formatMessage(
        { defaultMessage: 'Priority: {text} ({score}/100)' },
        { score, text }
      )}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor,
          borderRadius: 12,
          display: 'inline-flex',
          fontSize: 12,
          fontWeight: 500,
          gap: 6,
          padding: '4px 10px',
        }}
      >
        <span style={{ color }}>
          <FontAwesomeIcon icon={icon} style={{ fontSize: 14 }} />
        </span>
        <span style={{ color, opacity: 0.85 }}>{text}</span>
      </div>
    </Tooltip>
  );
};

interface PoliceHubAvatarsProps {
  policeHubs: Array<{
    id: string;
    logo?: {
      optimised?: null | string;
      url?: null | string;
    } | null;
    name: string;
  }>;
}

const PoliceHubAvatars = ({
  policeHubs,
}: PoliceHubAvatarsProps): JSX.Element | null => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  // Filter out the current scheme
  const filteredHubs = policeHubs.filter((hub) => hub.id !== currentSchemeId);

  if (filteredHubs.length === 0) {
    return null;
  }

  return (
    <Avatar.Group maxCount={4} size={40}>
      {filteredHubs.map((hub) => {
        const logoUrl = hub.logo?.optimised || hub.logo?.url;

        if (logoUrl) {
          return (
            <Tooltip
              key={hub.id}
              title={intl.formatMessage(
                { defaultMessage: 'Also shared with {name}' },
                { name: hub.name }
              )}
            >
              <Avatar
                alt={hub.name}
                size={40}
                src={logoUrl}
                style={{ backgroundColor: '#f0f0f0' }}
              />
            </Tooltip>
          );
        }

        // Fallback to initials if no logo
        const initials = hub.name
          .split(' ')
          .map((word) => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <Tooltip
            key={hub.id}
            title={intl.formatMessage(
              { defaultMessage: 'Also shared with {name}' },
              { name: hub.name }
            )}
          >
            <Avatar size={40} style={{ backgroundColor: '#1890ff' }}>
              {initials}
            </Avatar>
          </Tooltip>
        );
      })}
    </Avatar.Group>
  );
};

interface SourceSchemesProps {
  sources: Array<{
    id: string;
    logo?: {
      optimised?: null | string;
      url?: null | string;
    } | null;
    name: string;
  }>;
}

const SourceSchemes = ({ sources }: SourceSchemesProps): JSX.Element | null => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 6 }}>
      {sources.slice(0, 4).map((source) => {
        const logoUrl = source.logo?.optimised || source.logo?.url;

        if (logoUrl) {
          return (
            <Tooltip key={source.id} title={source.name}>
              <img
                alt={source.name}
                src={logoUrl}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 4,
                  height: 'auto',
                  maxHeight: 40,
                  objectFit: 'contain',
                  padding: 2,
                  width: 90,
                }}
              />
            </Tooltip>
          );
        }

        // Fallback to text badge if no logo
        return (
          <Tooltip key={source.id} title={source.name}>
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: 4,
                display: 'flex',
                fontSize: 12,
                fontWeight: 600,
                height: 40,
                justifyContent: 'center',
                width: 90,
              }}
            >
              {source.name.slice(0, 3).toUpperCase()}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

interface Props {
  sharedOffender: PoliceOffenderCardFragment;
}

const PoliceOffenderCard = ({ sharedOffender }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const { prefix: currency } = useAtomValue(currencySymbolAtom);

  const { mappedData, onNavigate } = usePoliceOffenderCard({ sharedOffender });

  return (
    <div style={{ height: '100%' }}>
      <Card
        bodyStyle={{
          borderRadius: 10,
          height: 230,
          overflow: 'hidden',
          padding: 0,
        }}
        key={mappedData.id}
        style={{
          borderRadius: 10,
          cursor: 'pointer',
          height: 230,
          marginBottom: 0,
        }}
      >
        <Row
          className={classes.compactCard}
          onClick={() =>
            onNavigate(`/app/police-offenders/view/${mappedData.id}`)
          }
          wrap={false}
        >
          {/* Image Container */}
          <div className={classes.imageContainer}>
            {mappedData.images.length > 0 ? (
              <WatermarkImage
                position={mappedData.images[0].position as ImagePosition}
                positionX={mappedData.images[0].positionX}
                positionY={mappedData.images[0].positionY}
                rotation={mappedData.images[0].rotation}
                style={{ height: 230, width: 160 }}
                url={mappedData.images[0].optimised}
              />
            ) : (
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  height: 230,
                  justifyContent: 'center',
                  width: 160,
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    color: 'rgba(0, 0, 0, 0.25)',
                    fontSize: 48,
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className={classes.cardContent}>
            <Row
              align="middle"
              justify="space-between"
              style={{ marginBottom: 4 }}
            >
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  {mappedData.name}
                </Title>
              </Col>
              <Col>
                {/* Priority Score */}
                {mappedData.policePriorityScore !== null &&
                  mappedData.policePriorityScore !== undefined && (
                    <PriorityBadge score={mappedData.policePriorityScore} />
                  )}
              </Col>
            </Row>

            {/* Incident Stats */}
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 16,
                marginBottom: 4,
              }}
            >
              {/* Incident Count */}
              {mappedData.totalIncidents !== null &&
                mappedData.totalIncidents !== undefined && (
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 6,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faReceipt}
                      style={{ color: '#8c8c8c', fontSize: 14 }}
                    />
                    <span
                      style={{ fontSize: 12, fontWeight: 500, opacity: 0.85 }}
                    >
                      {intl.formatMessage(
                        {
                          defaultMessage:
                            '{count} {count, plural, one {incident} other {incidents}}',
                        },
                        { count: mappedData.totalIncidents }
                      )}
                    </span>
                  </div>
                )}

              {/* Total Value */}
              {mappedData.totalValue !== null &&
                mappedData.totalValue !== undefined && (
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 6,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      style={{ color: '#8c8c8c', fontSize: 14 }}
                    />
                    <span
                      style={{ fontSize: 12, fontWeight: 500, opacity: 0.85 }}
                    >
                      {currency}
                      {mappedData.totalValue.toLocaleString()}
                    </span>
                  </div>
                )}

              {/* Last Incident Date */}
              {mappedData.lastIncidentAt && (
                <Tooltip title={formatActualDate(mappedData.lastIncidentAt)}>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 6,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ color: '#8c8c8c', fontSize: 14 }}
                    />
                    <span
                      style={{ fontSize: 12, fontWeight: 500, opacity: 0.85 }}
                    >
                      {formatLastIncidentDate(mappedData.lastIncidentAt)}
                    </span>
                  </div>
                </Tooltip>
              )}
            </div>

            {/* Known For / Tags */}
            {mappedData.tags.length > 0 && (
              <div
                style={{
                  marginBottom: 8,
                  marginTop: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.65 }}>
                  {intl.formatMessage({ defaultMessage: 'Known for:' })}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    marginLeft: 4,
                    opacity: 0.85,
                  }}
                >
                  {mappedData.tags.map((tag) => tag.name).join(', ')}
                </span>
              </div>
            )}

            {/* AI Summary */}
            {mappedData.aiSummary && (
              <div
                style={{
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 4,
                  display: '-webkit-box',
                  flex: 1,
                  fontSize: 13,
                  lineHeight: 1.5,
                  maxHeight: '78px',
                  minHeight: 0,
                  opacity: 0.75,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {mappedData.aiSummary}
              </div>
            )}

            {/* Source Schemes & Police Hub Avatars */}
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
                marginTop: 8,
              }}
            >
              <SourceSchemes sources={mappedData.sources} />
              <PoliceHubAvatars policeHubs={mappedData.policeHubs} />
            </div>
          </div>
        </Row>
      </Card>
    </div>
  );
};

export default PoliceOffenderCard;
