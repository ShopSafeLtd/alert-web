import type { CarouselRef } from 'antd/lib/carousel';

import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
  faBuilding,
  faCar,
  faEllipsisV,
  faEye,
  faPalette,
  faShirt,
  faUserShield,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Carousel,
  Col,
  Dropdown,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import SkeletonImage from 'components/images/SkeletonImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { PoliceVehicleCardFragment } from './__generated__/PoliceVehicleCard.fragment.generated';

import useStyles from './PoliceVehicleCard.styles';
import usePoliceVehicleCard from './usePoliceVehicleCard';

const { Paragraph, Text, Title } = Typography;

interface Props {
  compactView?: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  sharedVehicle: PoliceVehicleCardFragment;
}

const PoliceVehicleCard = ({
  compactView = false,
  openLightbox,
  sharedVehicle,
}: Props): JSX.Element => {
  const classes = useStyles();
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();

  const { mappedData, onNavigate } = usePoliceVehicleCard({ sharedVehicle });

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faEye} />,
      key: 0,
      label: intl.formatMessage({
        defaultMessage: 'View Intelligence',
      }),
      onClick: () => onNavigate(`/app/police-vehicles/view/${mappedData.id}`),
    },
    {
      icon: <FontAwesomeIcon icon={faBuilding} />,
      key: 1,
      label: intl.formatMessage({
        defaultMessage: 'View Schemes',
      }),
      onClick: () => {
        // Open schemes drawer or modal
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
              onNavigate(`/app/police-vehicles/view/${mappedData.id}`)
            }
          >
            {/* Image Container */}
            <div className={classes.imageContainer}>
              {mappedData.images.length > 0 ? (
                <WatermarkImage
                  position={mappedData.images[0].position as string}
                  positionX={mappedData.images[0].positionX}
                  positionY={mappedData.images[0].positionY}
                  rotation={mappedData.images[0].rotation}
                  style={{ height: 150, width: 120 }}
                  url={mappedData.images[0].optimised}
                />
              ) : (
                <SkeletonImage height={150} />
              )}
            </div>

            {/* Content */}
            <div className={classes.cardContent}>
              <Row align="middle" justify="space-between">
                <Col flex="auto">
                  <Title level={5} style={{ margin: 0 }}>
                    {mappedData.registration}
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

              {/* Priority Badges */}
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

              {/* Make & Model */}
              {(mappedData.make || mappedData.model) && (
                <Row className={classes.descriptionRow}>
                  <Col>
                    <FontAwesomeIcon
                      className={classes.cardIcon}
                      icon={faCar}
                    />
                    <Text style={{ marginLeft: 8 }} type="secondary">
                      {[mappedData.make, mappedData.model]
                        .filter(Boolean)
                        .join(' ')}
                    </Text>
                  </Col>
                </Row>
              )}

              {/* Colour */}
              {mappedData.colour && (
                <Row className={classes.descriptionRow}>
                  <Col>
                    <FontAwesomeIcon
                      className={classes.cardIcon}
                      icon={faPalette}
                    />
                    <Text style={{ marginLeft: 8 }} type="secondary">
                      {mappedData.colour}
                    </Text>
                  </Col>
                </Row>
              )}

              {/* Stats */}
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

          {/* Image Carousel */}
          <div style={{ position: 'relative' }}>
            {mappedData.images.length > 0 ? (
              <Carousel dots={false} ref={imagesRef}>
                {mappedData.images.map((image) => (
                  <div
                    key={image.id}
                    onClick={() =>
                      onNavigate(`/app/police-vehicles/view/${mappedData.id}`)
                    }
                  >
                    <WatermarkImage
                      position={image.position as string}
                      positionX={image.positionX}
                      positionY={image.positionY}
                      rotation={image.rotation}
                      style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        height: 150,
                        width: '100%',
                      }}
                      url={image.optimised}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div
                onClick={() =>
                  onNavigate(`/app/police-vehicles/view/${mappedData.id}`)
                }
              >
                <SkeletonImage height={150} />
              </div>
            )}

            {/* Carousel Controls */}
            {mappedData.images.length > 1 && (
              <div className={classes.cardControls}>
                <Row align="middle" justify="center" style={{ gap: 40 }}>
                  <div
                    className={classes.cardControl}
                    onClick={(e) => {
                      e.stopPropagation();
                      imagesRef.current?.prev();
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} size="2x" />
                  </div>
                  <div
                    className={classes.cardControl}
                    onClick={(e) => {
                      e.stopPropagation();
                      imagesRef.current?.next();
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleRight} size="2x" />
                  </div>
                </Row>
              </div>
            )}

            {/* Expand Icon */}
            {mappedData.images.length > 0 && (
              <div
                className={classes.imageExpand}
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(
                    mappedData.images.map((img) => ({
                      src: img.optimised || '',
                    })),
                    0
                  );
                }}
              >
                <FontAwesomeIcon icon={faArrowsMaximize} />
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '10px 5px' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={5} style={{ margin: 0 }}>
                  {mappedData.registration}
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

            {/* Vehicle Details */}
            {(mappedData.make || mappedData.model) && (
              <Row className={classes.descriptionRow} gutter={16}>
                <Col>
                  <FontAwesomeIcon className={classes.cardIcon} icon={faCar} />
                  <Text style={{ marginLeft: 8 }} type="secondary">
                    {[mappedData.make, mappedData.model]
                      .filter(Boolean)
                      .join(' ')}
                  </Text>
                </Col>
                {mappedData.colour && (
                  <Col>
                    <FontAwesomeIcon
                      className={classes.cardIcon}
                      icon={faPalette}
                    />
                    <Text style={{ marginLeft: 8 }} type="secondary">
                      {mappedData.colour}
                    </Text>
                  </Col>
                )}
              </Row>
            )}

            {/* Incidents & Offenders */}
            <Row className={classes.descriptionRow} gutter={16}>
              <Col>
                <FontAwesomeIcon className={classes.cardIcon} icon={faShirt} />
                <Text style={{ marginLeft: 8 }} type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: '{count} Incidents' },
                    { count: mappedData.totalIncidents || 0 }
                  )}
                </Text>
              </Col>
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

            {/* Usage Patterns */}
            {mappedData.aiUsagePatterns && (
              <Row className={classes.descriptionRow}>
                <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                  <Text strong>
                    {intl.formatMessage({ defaultMessage: 'Usage Patterns:' })}
                  </Text>
                  <Text style={{ marginLeft: 4 }} type="secondary">
                    {mappedData.aiUsagePatterns}
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

            {/* View Full Vehicle Button */}
            <Row justify="center" style={{ marginTop: 10 }}>
              <Link to={`/app/police-vehicles/view/${mappedData.id}`}>
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

export default PoliceVehicleCard;
