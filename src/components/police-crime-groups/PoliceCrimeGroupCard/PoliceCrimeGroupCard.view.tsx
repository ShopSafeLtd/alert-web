import { currencySymbolAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faBuilding,
  faEllipsisV,
  faEye,
  faMoneyBill,
  faPeopleGroup,
  faShirt,
  faUserShield,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { PoliceCrimeGroupCardFragment } from './__generated__/PoliceCrimeGroupCard.fragment.generated';

import useStyles from './PoliceCrimeGroupCard.styles';
import usePoliceCrimeGroupCard from './usePoliceCrimeGroupCard';

const { Paragraph, Text, Title } = Typography;

interface Props {
  compactView?: boolean;
  sharedCrimeGroup: PoliceCrimeGroupCardFragment;
}

const PoliceCrimeGroupCard = ({
  compactView = false,
  sharedCrimeGroup,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const { prefix: currency } = useAtomValue(currencySymbolAtom);

  const { mappedData, onNavigate } = usePoliceCrimeGroupCard({
    sharedCrimeGroup,
  });

  const getSophisticationBadge = (level?: 'HIGH' | 'LOW' | 'MEDIUM' | null) => {
    if (!level) return null;

    const configs = {
      HIGH: { color: 'red', emoji: '⚠️', label: 'Highly Organized' },
      LOW: { color: 'gold', emoji: '👤', label: 'Loosely Organized' },
      MEDIUM: { color: 'orange', emoji: '👥', label: 'Organized' },
    };

    const config = configs[level];

    return (
      <Tag color={config.color}>
        {config.emoji} {config.label}
      </Tag>
    );
  };

  const displayName = mappedData.alias || mappedData.ref;

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faEye} />,
      key: 0,
      label: intl.formatMessage({
        defaultMessage: 'View Intelligence',
      }),
      onClick: () =>
        onNavigate(`/app/police-crime-groups/view/${mappedData.id}`),
    },
    {
      icon: <FontAwesomeIcon icon={faBuilding} />,
      key: 1,
      label: intl.formatMessage({
        defaultMessage: 'View Schemes',
      }),
      onClick: () => {
        console.log('View schemes', mappedData.schemes);
      },
    },
  ];

  return (
    <div style={{ height: '100%' }}>
      {compactView ? (
        <Card
          bodyStyle={{
            borderRadius: 10,
            height: 150,
            overflow: 'hidden',
            padding: 0,
          }}
          key={mappedData.id}
          style={{ borderRadius: 10, cursor: 'pointer', height: 150 }}
        >
          <Row
            className={classes.compactCard}
            onClick={() =>
              onNavigate(`/app/police-crime-groups/view/${mappedData.id}`)
            }
          >
            {/* Icon Placeholder */}
            <div className={classes.imageContainer}>
              <div
                style={{
                  alignItems: 'center',
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  height: 150,
                  justifyContent: 'center',
                  width: 120,
                }}
              >
                <FontAwesomeIcon
                  color="#ffffff"
                  icon={faPeopleGroup}
                  size="4x"
                />
              </div>
            </div>

            {/* Content */}
            <div className={classes.cardContent}>
              <Row align="middle" justify="space-between">
                <Col flex="auto">
                  <Title level={5} style={{ margin: 0 }}>
                    {displayName}
                  </Title>
                  {mappedData.reference && (
                    <Text className={classes.alertId} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: 'Alert ID: {id}' },
                        { id: mappedData.reference }
                      )}
                    </Text>
                  )}
                </Col>
                <Col>
                  <Dropdown
                    menu={{ items: menuItems }}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button
                      className={classes.menuButton}
                      icon={<FontAwesomeIcon icon={faEllipsisV} />}
                      onClick={(e) => e.stopPropagation()}
                      type="text"
                    />
                  </Dropdown>
                </Col>
              </Row>

              {/* Priority & Quality Badges */}
              <Row className={classes.descriptionRow} gutter={4}>
                {mappedData.policePriorityScore !== null && (
                  <Col>
                    <Tag color="red">
                      {intl.formatMessage(
                        { defaultMessage: 'Priority: {score}' },
                        { score: mappedData.policePriorityScore }
                      )}
                    </Tag>
                  </Col>
                )}
                {mappedData.aiQualityScore !== null && (
                  <Col>
                    <Tag color="green">
                      {intl.formatMessage(
                        { defaultMessage: 'Quality: {score}' },
                        { score: mappedData.aiQualityScore }
                      )}
                    </Tag>
                  </Col>
                )}
              </Row>

              {/* Sophistication Badge */}
              {mappedData.aiSophisticationLevel && (
                <Row className={classes.descriptionRow}>
                  <Col>
                    {getSophisticationBadge(
                      mappedData.aiSophisticationLevel as
                        | 'HIGH'
                        | 'LOW'
                        | 'MEDIUM'
                    )}
                  </Col>
                </Row>
              )}

              {/* Offenders */}
              <Row className={classes.descriptionRow}>
                <Col>
                  <FontAwesomeIcon
                    className={classes.cardIcon}
                    icon={faUserShield}
                  />
                  <Text style={{ marginLeft: 8 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: '{count} Offenders' },
                      { count: mappedData.totalOffenders || 0 }
                    )}
                  </Text>
                </Col>
              </Row>

              {/* Incidents */}
              <Row className={classes.descriptionRow}>
                <Col>
                  <FontAwesomeIcon
                    className={classes.cardIcon}
                    icon={faShirt}
                  />
                  <Text style={{ marginLeft: 8 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: '{count} Incidents' },
                      { count: mappedData.totalIncidents || 0 }
                    )}
                  </Text>
                </Col>
              </Row>

              {/* Schemes Indicator */}
              {mappedData.schemes.length > 0 && (
                <Row className={classes.schemesIndicator}>
                  <Tooltip
                    title={mappedData.schemes.map((s) => s.name).join(', ')}
                  >
                    <Tag
                      color="blue"
                      icon={<FontAwesomeIcon icon={faBuilding} />}
                    >
                      {intl.formatMessage(
                        {
                          defaultMessage:
                            '{count} {count, plural, one {Scheme} other {Schemes}}',
                        },
                        { count: mappedData.schemes.length }
                      )}
                    </Tag>
                  </Tooltip>
                </Row>
              )}
            </div>
          </Row>
        </Card>
      ) : (
        /* Normal Card View */
        <Card
          bodyStyle={{ borderRadius: 10, padding: 10 }}
          hoverable
          key={mappedData.id}
          style={{ borderRadius: 10, cursor: 'pointer' }}
        >
          {/* Menu Button */}
          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: 8 }}
          >
            <Col>
              {/* Priority Badges */}
              {mappedData.policePriorityScore !== null && (
                <Tag className={classes.priorityBadge} color="red">
                  {intl.formatMessage(
                    { defaultMessage: 'Priority: {score}' },
                    { score: mappedData.policePriorityScore }
                  )}
                </Tag>
              )}
              {mappedData.aiQualityScore !== null && (
                <Tag className={classes.priorityBadge} color="green">
                  {intl.formatMessage(
                    { defaultMessage: 'Quality: {score}' },
                    { score: mappedData.aiQualityScore }
                  )}
                </Tag>
              )}
              {mappedData.aiSophisticationLevel &&
                getSophisticationBadge(
                  mappedData.aiSophisticationLevel as 'HIGH' | 'LOW' | 'MEDIUM'
                )}
            </Col>
            <Col>
              <Dropdown
                menu={{ items: menuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button
                  icon={<FontAwesomeIcon icon={faEllipsisV} />}
                  type="text"
                />
              </Dropdown>
            </Col>
          </Row>

          {/* Icon Placeholder */}
          <div
            onClick={() =>
              onNavigate(`/app/police-crime-groups/view/${mappedData.id}`)
            }
            style={{ position: 'relative' }}
          >
            <div
              style={{
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                display: 'flex',
                height: 150,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <FontAwesomeIcon color="#ffffff" icon={faPeopleGroup} size="5x" />
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '10px 5px' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={5} style={{ margin: 0 }}>
                  {displayName}
                </Title>
              </Col>
            </Row>

            {mappedData.reference && (
              <Text type="secondary">
                {intl.formatMessage(
                  { defaultMessage: 'Alert ID: {id}' },
                  { id: mappedData.reference }
                )}
              </Text>
            )}

            {/* Stats Row */}
            <Row className={classes.descriptionRow} gutter={16}>
              <Col>
                <FontAwesomeIcon
                  className={classes.cardIcon}
                  icon={faUserShield}
                />
                <Text style={{ marginLeft: 8 }} type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: '{count} Offenders' },
                    { count: mappedData.totalOffenders || 0 }
                  )}
                </Text>
              </Col>
              <Col>
                <FontAwesomeIcon className={classes.cardIcon} icon={faShirt} />
                <Text style={{ marginLeft: 8 }} type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: '{count} Incidents' },
                    { count: mappedData.totalIncidents || 0 }
                  )}
                </Text>
              </Col>
            </Row>

            {/* Value Row */}
            <Row className={classes.descriptionRow} gutter={16}>
              <Col>
                <FontAwesomeIcon
                  className={classes.cardIcon}
                  icon={faMoneyBill}
                />
                <Text style={{ marginLeft: 8 }} type="secondary">
                  {currency}
                  {mappedData.totalValue || 0}
                </Text>
              </Col>
              {mappedData.totalRecoveredValue !== null && (
                <Col>
                  <Text style={{ marginLeft: 8 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: 'Recovered: {currency}{value}' },
                      { currency, value: mappedData.totalRecoveredValue || 0 }
                    )}
                  </Text>
                </Col>
              )}
            </Row>

            {/* Success Rate */}
            {mappedData.totalTheftSuccess !== null && (
              <Row className={classes.descriptionRow}>
                <Text type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: 'Success Rate: {rate}%' },
                    { rate: mappedData.totalTheftSuccess }
                  )}
                </Text>
              </Row>
            )}

            {/* AI Summary */}
            {mappedData.aiSummary && (
              <Row className={classes.descriptionRow}>
                <Paragraph ellipsis={{ rows: 3 }} style={{ margin: 0 }}>
                  <Text strong>
                    {intl.formatMessage({ defaultMessage: 'AI Summary:' })}
                  </Text>
                  <Text style={{ marginLeft: 4 }} type="secondary">
                    {mappedData.aiSummary}
                  </Text>
                </Paragraph>
              </Row>
            )}

            {/* Activity Patterns */}
            {mappedData.aiActivityPatterns && (
              <Row className={classes.descriptionRow}>
                <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                  <Text strong>
                    {intl.formatMessage({ defaultMessage: 'Activity:' })}
                  </Text>
                  <Text style={{ marginLeft: 4 }} type="secondary">
                    {mappedData.aiActivityPatterns}
                  </Text>
                </Paragraph>
              </Row>
            )}

            {/* Schemes Indicator */}
            {mappedData.schemes.length > 0 && (
              <Row className={classes.schemesIndicator}>
                <Tooltip
                  title={mappedData.schemes.map((s) => s.name).join(', ')}
                >
                  <Tag
                    color="blue"
                    icon={<FontAwesomeIcon icon={faBuilding} />}
                  >
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Shared across {count} {count, plural, one {scheme} other {schemes}}',
                      },
                      { count: mappedData.schemes.length }
                    )}
                  </Tag>
                </Tooltip>
              </Row>
            )}

            {/* View Full Button */}
            <Row justify="center" style={{ marginTop: 10 }}>
              <Link to={`/app/police-crime-groups/view/${mappedData.id}`}>
                <Button block type="primary">
                  {intl.formatMessage({
                    defaultMessage: 'View Intelligence',
                  })}
                </Button>
              </Link>
            </Row>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PoliceCrimeGroupCard;
