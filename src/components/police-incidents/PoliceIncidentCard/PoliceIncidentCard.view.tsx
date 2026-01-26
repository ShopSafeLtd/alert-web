import type { CarouselRef } from 'antd/lib/carousel';

import { PoliceForce } from '#/graphql/types';
import {
  faArrowsMaximize,
  faClock,
  faEye,
  faLocationDot,
  faShieldCheck,
} from '@fortawesome/pro-light-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Card,
  Carousel,
  Col,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import SkeletonImage from 'components/images/SkeletonImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { IncidentPriority } from 'graphql/types';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { PoliceIncidentCardFragment } from './__generated__/PoliceIncidentCard.fragment.generated';

import useStyles from './PoliceIncidentCard.styles';
import usePoliceIncidentCard from './usePoliceIncidentCard';

const { Paragraph, Text, Title } = Typography;

const policeAreaLabels: Record<PoliceForce, string> = {
  [PoliceForce.AvonAndSomerset]: 'Avon and Somerset Constabulary',
  [PoliceForce.Bedfordshire]: 'Bedfordshire Police',
  [PoliceForce.BritishTransportPolice]: 'British Transport Police',
  [PoliceForce.Cambridgeshire]: 'Cambridgeshire Constabulary',
  [PoliceForce.Cheshire]: 'Cheshire Constabulary',
  [PoliceForce.CityOfLondon]: 'City of London Police',
  [PoliceForce.Cleveland]: 'Cleveland Police',
  [PoliceForce.Cumbria]: 'Cumbria Constabulary',
  [PoliceForce.Derbyshire]: 'Derbyshire Constabulary',
  [PoliceForce.DevonAndCornwall]: 'Devon and Cornwall Police',
  [PoliceForce.Dorset]: 'Dorset Police',
  [PoliceForce.Durham]: 'Durham Constabulary',
  [PoliceForce.DyfedPowys]: 'Dyfed-Powys Police',
  [PoliceForce.Essex]: 'Essex Police',
  [PoliceForce.Gloucestershire]: 'Gloucestershire Constabulary',
  [PoliceForce.GreaterManchester]: 'Greater Manchester Police',
  [PoliceForce.Gwent]: 'Gwent Police',
  [PoliceForce.Hampshire]: 'Hampshire Constabulary',
  [PoliceForce.Hertfordshire]: 'Hertfordshire Constabulary',
  [PoliceForce.Humberside]: 'Humberside Police',
  [PoliceForce.Kent]: 'Kent Police',
  [PoliceForce.Lancashire]: 'Lancashire Constabulary',
  [PoliceForce.Leicestershire]: 'Leicestershire Police',
  [PoliceForce.Lincolnshire]: 'Lincolnshire Police',
  [PoliceForce.Merseyside]: 'Merseyside Police',
  [PoliceForce.Metropolitan]: 'Metropolitan Police',
  [PoliceForce.Norfolk]: 'Norfolk Constabulary',
  [PoliceForce.NorthWales]: 'North Wales Police',
  [PoliceForce.NorthYorkshire]: 'North Yorkshire Police',
  [PoliceForce.Northamptonshire]: 'Northamptonshire Police',
  [PoliceForce.Northumbria]: 'Northumbria Police',
  [PoliceForce.Nottinghamshire]: 'Nottinghamshire Police',
  [PoliceForce.PoliceScotland]: 'Police Scotland',
  [PoliceForce.Psni]: 'Police Service of Northern Ireland',
  [PoliceForce.SouthWales]: 'South Wales Police',
  [PoliceForce.SouthYorkshire]: 'South Yorkshire Police',
  [PoliceForce.Staffordshire]: 'Staffordshire Police',
  [PoliceForce.Suffolk]: 'Suffolk Constabulary',
  [PoliceForce.Surrey]: 'Surrey Police',
  [PoliceForce.Sussex]: 'Sussex Police',
  [PoliceForce.ThamesValley]: 'Thames Valley Police',
  [PoliceForce.Warwickshire]: 'Warwickshire Police',
  [PoliceForce.WestMercia]: 'West Mercia Police',
  [PoliceForce.WestMidlands]: 'West Midlands Police',
  [PoliceForce.WestYorkshire]: 'West Yorkshire Police',
  [PoliceForce.Wiltshire]: 'Wiltshire Police',
};

interface Props {
  compactView: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  sharedIncident: PoliceIncidentCardFragment;
}

const PoliceIncidentCard = ({
  compactView,
  openLightbox,
  sharedIncident,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  const classes = useStyles();

  const { mappedData } = usePoliceIncidentCard({
    sharedIncident,
  });

  // Get fallback image from offender if incident has no images
  const getFallbackOffenderImage = () => {
    if (mappedData.totalImages && mappedData.totalImages > 0) return null;

    const offenderWithImage = mappedData.offenders.find(
      (offender) => offender.images && offender.images.length > 0
    );

    return offenderWithImage?.images?.[0] || null;
  };

  const fallbackImage = getFallbackOffenderImage();
  const hasImages =
    (mappedData.totalImages && mappedData.totalImages > 0) || fallbackImage;

  const getPriorityBorder = () => {
    if (mappedData.priority === IncidentPriority.High)
      return '6px solid rgb(222, 68, 54)';
    if (mappedData.priority === IncidentPriority.Medium)
      return '6px solid #fa8c16';
    if (mappedData.priority === IncidentPriority.Normal)
      return '6px solid #52c41a';
    return undefined;
  };

  return (
    <div>
      {compactView ? (
        <Card
          bodyStyle={{
            borderLeft: getPriorityBorder(),
            borderRadius: 5,
            height: 150,
            overflow: 'hidden',
            padding: 0,
          }}
          key={mappedData.id}
          style={{
            marginBottom: 0,
          }}
        >
          <Row wrap={false}>
            {hasImages ? (
              <Col>
                <div className={classes.imageContainer}>
                  {mappedData.totalImages && mappedData.totalImages > 0 ? (
                    <>
                      <Carousel ref={imagesRef}>
                        {mappedData.images.map((image) => (
                          <div className={classes.image} key={image.id}>
                            <WatermarkImage
                              position={image.position as never}
                              positionX={image.positionX}
                              positionY={image.positionY}
                              rotation={image.rotation}
                              url={image.low}
                            />
                          </div>
                        ))}
                      </Carousel>
                      {mappedData.totalImages && mappedData.totalImages > 1 ? (
                        <Row className={classes.cardControls}>
                          <Col>
                            <FontAwesomeIcon
                              className={classes.cardControl}
                              icon={faAngleLeft}
                              onClick={() => imagesRef.current?.prev()}
                            />
                          </Col>
                          <Col flex={1} />
                          <Col>
                            <FontAwesomeIcon
                              className={classes.cardControl}
                              icon={faAngleRight}
                              onClick={() => imagesRef.current?.next()}
                            />
                          </Col>
                        </Row>
                      ) : null}
                      <FontAwesomeIcon
                        className={classes.imageExpand}
                        icon={faArrowsMaximize}
                        onClick={() =>
                          openLightbox(
                            mappedData.images.map((image) => ({
                              src: image.low || '',
                            })),
                            0
                          )
                        }
                      />
                    </>
                  ) : fallbackImage ? (
                    <div className={classes.image}>
                      <WatermarkImage
                        position={fallbackImage.position as never}
                        positionX={fallbackImage.positionX}
                        positionY={fallbackImage.positionY}
                        rotation={fallbackImage.rotation}
                        url={fallbackImage.optimised}
                      />
                    </div>
                  ) : null}
                </div>
              </Col>
            ) : (
              <Col />
            )}
            <Col className={classes.cardContent} flex={1}>
              <Link to={`/app/police-incidents/view/${mappedData.id}`}>
                <Row wrap={false}>
                  <Col flex={1}>
                    <Title ellipsis level={4}>
                      {mappedData.subject}
                    </Title>
                  </Col>
                  {mappedData.policePriorityScore !== null &&
                    mappedData.policePriorityScore !== undefined && (
                      <Col style={{ marginTop: 2 }}>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Police Priority Score',
                          })}
                        >
                          <Badge
                            className={classes.priorityBadge}
                            color="red"
                            count={mappedData.policePriorityScore}
                            overflowCount={999}
                            showZero
                          />
                        </Tooltip>
                      </Col>
                    )}
                  {mappedData.aiQualityScore !== null &&
                    mappedData.aiQualityScore !== undefined && (
                      <Col style={{ marginTop: 2 }}>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'AI Quality Score',
                          })}
                        >
                          <Badge
                            className={classes.priorityBadge}
                            color="blue"
                            count={mappedData.aiQualityScore}
                            overflowCount={999}
                            showZero
                          />
                        </Tooltip>
                      </Col>
                    )}
                </Row>
                <div className={classes.alertId}>
                  <Text ellipsis type="secondary">
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Alert ID: {incidentReference} {customerRef, plural, =1 {Ref: {customerRefS}} other {}} {policeRef, plural, =1 {Ref: {policeRefS}} other {}}',
                      },
                      {
                        customerRef: mappedData.customerRef ? 1 : 0,
                        customerRefS: mappedData.customerRef,
                        incidentReference: mappedData.reference,
                        policeRef: mappedData.policeRef ? 1 : 0,
                        policeRefS: mappedData.policeRef,
                      }
                    )}
                  </Text>
                </div>
                <Paragraph ellipsis={{ rows: 2 }} type="secondary">
                  {mappedData.description}
                </Paragraph>
              </Link>
              <div className={classes.bottomRow}>
                <Row align="middle" justify="space-between" wrap={false}>
                  <Col>
                    <Row wrap={false}>
                      <Col>
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faClock}
                          size="sm"
                        />
                      </Col>
                      <Col>
                        <Text style={{ fontSize: 14 }} type="secondary">
                          {mappedData.dayTime}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  {mappedData.schemeCount > 0 && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage(
                          {
                            defaultMessage:
                              'Shared by {count} {count, plural, one {scheme} other {schemes}}',
                          },
                          { count: mappedData.schemeCount }
                        )}
                      >
                        <Tag
                          className={classes.schemesIndicator}
                          color="purple"
                          icon={<FontAwesomeIcon icon={faShieldCheck} />}
                        >
                          {mappedData.schemeCount}
                        </Tag>
                      </Tooltip>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Card
          bodyStyle={{
            borderRadius: 10,
            borderTop: getPriorityBorder(),
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: 555,
            overflow: 'hidden',
          }}
          className="incident-card"
          key={mappedData.id}
          style={{
            marginBottom: 0,
          }}
        >
          <div>
            {mappedData.totalImages && mappedData.totalImages > 0 ? (
              <>
                <Carousel ref={imagesRef}>
                  {mappedData.images.map((image) => (
                    <div key={image.id}>
                      <div className="incident-card-image">
                        <WatermarkImage
                          position={image.position as never}
                          positionX={image.positionX}
                          positionY={image.positionY}
                          rotation={image.rotation}
                          url={image.low}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
                {mappedData.totalImages && mappedData.totalImages > 1 ? (
                  <Row className="incident-card-controls">
                    <Col>
                      <FontAwesomeIcon
                        className="incident-card-control"
                        icon={faAngleLeft}
                        onClick={() => imagesRef.current?.prev()}
                      />
                    </Col>
                    <Col flex={1} />
                    <Col>
                      <FontAwesomeIcon
                        className="incident-card-control"
                        icon={faAngleRight}
                        onClick={() => imagesRef.current?.next()}
                      />
                    </Col>
                  </Row>
                ) : null}
                <FontAwesomeIcon
                  className="incident-card-expand"
                  icon={faArrowsMaximize}
                  onClick={() =>
                    openLightbox(
                      mappedData.images.map((image) => ({
                        src: image.low || '',
                      })),
                      0
                    )
                  }
                />
              </>
            ) : fallbackImage ? (
              <div className="incident-card-image">
                <WatermarkImage
                  position={fallbackImage.position as never}
                  positionX={fallbackImage.positionX}
                  positionY={fallbackImage.positionY}
                  rotation={fallbackImage.rotation}
                  url={fallbackImage.optimised}
                />
              </div>
            ) : (
              <SkeletonImage height={280} />
            )}
          </div>
          <div className="incident-card-content">
            <Space direction="vertical">
              <Row align="middle" gutter={8}>
                <Col>
                  <Title ellipsis level={4} style={{ marginBottom: 0 }}>
                    {mappedData.subject}
                  </Title>
                </Col>
                {mappedData.policePriorityScore !== null &&
                  mappedData.policePriorityScore !== undefined && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Police Priority Score',
                        })}
                      >
                        <Badge
                          color="red"
                          count={mappedData.policePriorityScore}
                          overflowCount={999}
                          showZero
                        />
                      </Tooltip>
                    </Col>
                  )}
                {mappedData.aiQualityScore !== null &&
                  mappedData.aiQualityScore !== undefined && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'AI Quality Score',
                        })}
                      >
                        <Badge
                          color="blue"
                          count={mappedData.aiQualityScore}
                          overflowCount={999}
                          showZero
                        />
                      </Tooltip>
                    </Col>
                  )}
                {mappedData.policeArea && (
                  <Col>
                    <Tag color="geekblue">
                      {policeAreaLabels[mappedData.policeArea] ||
                        mappedData.policeArea}
                    </Tag>
                  </Col>
                )}
              </Row>
              <div>
                <Text type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'Alert ID: {incidentReference} {customerRef, plural, =1 {Ref: {customerRefS}} other {}} {policeRef, plural, =1 {Crime Ref: {policeRefS}} other {}}',
                    },
                    {
                      customerRef: mappedData.customerRef ? 1 : 0,
                      customerRefS: mappedData.customerRef,
                      incidentReference: mappedData.reference,
                      policeRef: mappedData.policeRef ? 1 : 0,
                      policeRefS: mappedData.policeRef,
                    }
                  )}
                </Text>
              </div>
              {mappedData.offenders.length > 0 ? (
                <Row wrap={false}>
                  {mappedData.offenders.slice(0, 1).map((offender) => (
                    <Tag key={offender.id}>
                      {offender.name ||
                        intl.formatMessage({
                          defaultMessage: 'Unknown Offender',
                        })}
                    </Tag>
                  ))}
                  {mappedData.offenders.length > 1 && (
                    <Tooltip
                      title={mappedData.offenders
                        .slice(1)
                        .map((item) => item.name)
                        .join(', ')}
                    >
                      <Tag>
                        {intl.formatMessage(
                          {
                            defaultMessage: '+ {num} more',
                          },
                          {
                            num: mappedData.offenders.length - 1,
                          }
                        )}
                      </Tag>
                    </Tooltip>
                  )}
                </Row>
              ) : (
                <div />
              )}
              {mappedData.schemeCount > 0 && (
                <Row>
                  <Tooltip
                    title={
                      <div>
                        <div>
                          {intl.formatMessage({
                            defaultMessage: 'Shared by schemes:',
                          })}
                        </div>
                        {mappedData.schemes.map((scheme) => (
                          <div key={scheme.id}>
                            {scheme.name}
                            {scheme.hubForce &&
                              intl.formatMessage(
                                { defaultMessage: ' ({force})' },
                                {
                                  force:
                                    policeAreaLabels[
                                      scheme.hubForce as PoliceForce
                                    ] || scheme.hubForce,
                                }
                              )}
                          </div>
                        ))}
                      </div>
                    }
                  >
                    <Tag
                      className={classes.schemesIndicator}
                      color="purple"
                      icon={<FontAwesomeIcon icon={faShieldCheck} />}
                    >
                      {intl.formatMessage(
                        {
                          defaultMessage:
                            '{count} {count, plural, one {Scheme} other {Schemes}}',
                        },
                        { count: mappedData.schemeCount }
                      )}
                    </Tag>
                  </Tooltip>
                </Row>
              )}
              {mappedData.aiSummary && (
                <div>
                  <Text strong>
                    {intl.formatMessage({ defaultMessage: 'AI Summary:' })}
                  </Text>
                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    style={{ marginBottom: 5, marginTop: 4 }}
                    type="secondary"
                  >
                    {mappedData.aiSummary}
                  </Paragraph>
                </div>
              )}
              <Link to={`/app/police-incidents/view/${mappedData.id}`}>
                <Row
                  gutter={8}
                  style={{ marginBottom: 5, maxWidth: '100%' }}
                  wrap={false}
                >
                  <Col span={12}>
                    <Row wrap={false}>
                      <Col>
                        <FontAwesomeIcon
                          className="incident-card-icon"
                          icon={faClock}
                          size="sm"
                        />
                      </Col>
                      <Col>
                        <Text type="secondary">{mappedData.dayTime}</Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row wrap={false}>
                      <Col>
                        <FontAwesomeIcon
                          className="incident-card-icon"
                          icon={faLocationDot}
                          size="sm"
                        />
                      </Col>
                      <Col>
                        <Text ellipsis style={{ flex: 1 }} type="secondary">
                          {mappedData.business?.name ||
                            mappedData.location?.full}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Paragraph
                  ellipsis={{ rows: 3 }}
                  style={{ marginBottom: 5 }}
                  type="secondary"
                >
                  {mappedData.description}
                </Paragraph>
              </Link>
            </Space>
            <Row
              justify="center"
              style={{ alignContent: 'flex-end', flexGrow: 1, marginTop: 0 }}
            >
              <Col>
                <Link to={`/app/police-incidents/view/${mappedData.id}`}>
                  <Tag
                    color="blue"
                    icon={<FontAwesomeIcon icon={faEye} />}
                    style={{ cursor: 'pointer' }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'View Intelligence',
                    })}
                  </Tag>
                </Link>
              </Col>
            </Row>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PoliceIncidentCard;
