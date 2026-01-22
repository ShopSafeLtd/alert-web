import type { ImagePosition } from '#/graphql/types';

import {
  faCalendar,
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faImages,
  faLightbulb,
  faReceipt,
  faShoppingBag,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  List,
  Result,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import MapCard from 'components/map/MapCard/MapCard.view';
import PoliceOffenderIncidentTable from 'components/police-offenders/PoliceOffenderIncidentTable';
import PoliceOffenderSideList from 'components/police-offenders/PoliceOffenderSideList';
import Loading from 'components/shared-components/AntD/Loading';
import PoliceHubBadges from 'components/shared-components/PoliceHubBadges';
import { useAtomValue } from 'jotai';
import {
  currencyAtom,
  currencySymbolAtom,
  currentSchemeIdAtom,
} from 'providers/SchemeProvider/SchemeProvider';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type { GetSharedOffenderQuery } from '../graphql/queries/__generated__/get-shared-offender.generated';
import type { IncidentRow } from './usePoliceOffenderIncidents';

const { Paragraph, Text, Title } = Typography;

const getLevel = (value: number): 'high' | 'low' | 'medium' => {
  if (value >= 70) return 'high';
  if (value >= 40) return 'medium';
  return 'low';
};

const PriorityBadge = ({
  intl,
  score,
}: {
  intl: ReturnType<typeof useIntl>;
  score: number;
}): JSX.Element | null => {
  const level = getLevel(score);

  // Hide low priority badges completely
  if (level === 'low') return null;

  const config = {
    high: {
      backgroundColor: 'rgba(255, 77, 79, 0.15)',
      color: '#ff4d4f',
      icon: faExclamationCircle,
      text: intl.formatMessage({ defaultMessage: 'High' }),
    },
    medium: {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
      color: '#faad14',
      icon: faExclamationTriangle,
      text: intl.formatMessage({ defaultMessage: 'Medium' }),
    },
  };

  const { backgroundColor, color, icon, text } = config[level];

  return (
    <Tooltip
      title={intl.formatMessage(
        { defaultMessage: 'Priority: {level} ({score}/100)' },
        { level: text, score }
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
        <span style={{ color, opacity: 0.85 }}>
          {intl.formatMessage(
            { defaultMessage: 'Priority: {level}' },
            { level: text }
          )}
        </span>
      </div>
    </Tooltip>
  );
};

// Format date to human readable relative time
const formatLastIncidentDate = (
  date: Date | null | undefined,
  intl: ReturnType<typeof useIntl>
): string => {
  if (!date) return intl.formatMessage({ defaultMessage: 'Unknown' });

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return intl.formatMessage({ defaultMessage: 'Today' });
  if (diffDays === 1)
    return intl.formatMessage({ defaultMessage: 'Yesterday' });
  if (diffDays < 7)
    return intl.formatMessage(
      { defaultMessage: '{days} days ago' },
      { days: diffDays }
    );
  if (diffDays < 30)
    return intl.formatMessage(
      { defaultMessage: '{weeks} weeks ago' },
      { weeks: Math.floor(diffDays / 7) }
    );
  if (diffDays < 365)
    return intl.formatMessage(
      { defaultMessage: '{months} months ago' },
      { months: Math.floor(diffDays / 30) }
    );
  return intl.formatMessage(
    { defaultMessage: '{years} years ago' },
    { years: Math.floor(diffDays / 365) }
  );
};

// Format date to actual date string
const formatActualDate = (
  date: Date | null | undefined,
  intl: ReturnType<typeof useIntl>
): string => {
  if (!date) return intl.formatMessage({ defaultMessage: 'Unknown' });
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Calculate grid layout based on total number of images
const getGridLayout = (count: number) => {
  if (count === 1) return { columns: 1, imageHeight: 400 };
  if (count === 2) return { columns: 2, imageHeight: 250 };
  if (count === 3) return { columns: 3, imageHeight: 200 };
  if (count === 4) return { columns: 2, imageHeight: 180 };
  if (count <= 6) return { columns: 3, imageHeight: 160 };
  if (count <= 9) return { columns: 3, imageHeight: 150 };
  return { columns: 4, imageHeight: 140 };
};

interface ImageGridProps {
  images: Array<{
    id: string;
    optimised?: null | string;
    position: ImagePosition;
    positionX?: null | number;
    positionY?: null | number;
    rotation: number;
  }>;
  intl: ReturnType<typeof useIntl>;
  onImageClick: (elements: { src: string }[], index: number) => void;
  onShowMore: () => void;
}

const ImageGrid = ({
  images,
  intl,
  onImageClick,
  onShowMore,
}: ImageGridProps): JSX.Element => {
  if (images.length === 0) {
    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          borderRadius: 8,
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <FontAwesomeIcon
            icon={faUser}
            style={{
              color: 'rgba(0, 0, 0, 0.25)',
              fontSize: 64,
            }}
          />
          <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: 16 }}>
            {intl.formatMessage({ defaultMessage: 'No images available' })}
          </div>
        </div>
      </div>
    );
  }

  const lightboxElements = images.map((img) => ({ src: img.optimised || '' }));

  const layout = getGridLayout(images.length);

  // Calculate how many images to show (first 4 rows)
  const imagesPerRow = layout.columns;
  const maxImagesToShow = imagesPerRow * 4; // 4 rows
  const displayImages = images.slice(0, maxImagesToShow);
  const hasMore = images.length > maxImagesToShow;

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
        }}
      >
        {displayImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => onImageClick(lightboxElements, index)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            style={{
              borderRadius: 8,
              cursor: 'pointer',
              height: layout.imageHeight,
              overflow: 'hidden',
              position: 'relative',
              transition: 'transform 0.2s ease',
            }}
          >
            <WatermarkImage
              position={image.position}
              positionX={image.positionX}
              positionY={image.positionY}
              rotation={image.rotation}
              style={{ height: '100%', objectFit: 'cover', width: '100%' }}
              url={image.optimised}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Button onClick={onShowMore} type="default">
            <FontAwesomeIcon icon={faImages} style={{ marginRight: 8 }} />
            {intl.formatMessage(
              { defaultMessage: 'Show all {count} images' },
              { count: images.length }
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

interface Props {
  data: GetSharedOffenderQuery | undefined;
  error: Error | undefined;
  incidents: IncidentRow[];
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  offenderId: string;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setLightBoxOpen: (value: { index: number; open: boolean }) => void;
}

const ViewPoliceOffender = ({
  data,
  error,
  incidents,
  lightBoxOpen,
  lightboxElements,
  loading,
  offenderId,
  openLightbox,
  setLightBoxOpen,
}: Props): JSX.Element => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const { prefix: currency } = useAtomValue(currencySymbolAtom);
  const currencyCode = useAtomValue(currencyAtom);

  // State for image drawer
  const [imageDrawerOpen, setImageDrawerOpen] = React.useState(false);

  // Aggregate and deduplicate incidents with coordinates for map display
  const mapMarkers = React.useMemo(() => {
    if (!data?.sharedOffender?.offender) return [];

    const seenIncidentIds = new Set<string>();
    const markers: Array<{
      business?: { id: string; name?: null | string } | null;
      date?: null | string;
      dayTime?: null | string;
      description?: null | string;
      geoLat?: null | number;
      geoLng?: null | number;
      id: string;
      location?: {
        full?: null | string;
        geoLat?: null | number;
        geoLng?: null | number;
        id: string;
      } | null;
      reference?: null | number;
      subject?: string;
      totalValue?: null | number;
    }> = [];

    for (const offender of data.sharedOffender.offender) {
      if (!offender.incidents) continue;

      for (const incident of offender.incidents) {
        // Skip duplicates
        if (seenIncidentIds.has(incident.id)) continue;

        // Skip incidents without valid coordinates
        if (!incident.location?.geoLat || !incident.location?.geoLng) continue;

        seenIncidentIds.add(incident.id);

        markers.push({
          ...incident,
          date: incident.date ? incident.date.toISOString() : null,
          geoLat: incident.location.geoLat,
          geoLng: incident.location.geoLng,
          subject: incident.subject ?? undefined,
        });
      }
    }

    return markers;
  }, [data]);

  if (loading) {
    return (
      <div className="page-container" style={{ padding: '24px' }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container" style={{ padding: '24px' }}>
        <Result
          status="error"
          subTitle={intl.formatMessage({
            defaultMessage:
              'Sorry, there was an error loading the offender details.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Error',
          })}
        />
      </div>
    );
  }

  const sharedOffender = data?.sharedOffender;

  if (!sharedOffender) {
    return (
      <div className="page-container" style={{ padding: '24px' }}>
        <Result
          status="404"
          subTitle={intl.formatMessage({
            defaultMessage: 'The offender you are looking for does not exist.',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Offender Not Found',
          })}
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Row wrap={false}>
        <Col>
          <PoliceOffenderSideList current={offenderId} />
        </Col>
        <Col flex={1}>
          <div style={{ height: '100vh', overflow: 'auto', padding: '24px' }}>
            <Row gutter={[16, 16]}>
              {/* Header */}
              <Col span={24}>
                <Card style={{ marginBottom: 0 }}>
                  <Row align="middle" gutter={16} justify="space-between">
                    <Col flex="auto">
                      <Space align="center" size={12}>
                        <Title level={2} style={{ margin: 0 }}>
                          {sharedOffender.name ||
                            intl.formatMessage({
                              defaultMessage: 'Unidentified Offender',
                            })}
                        </Title>
                        {sharedOffender.policePriorityScore !== null &&
                          sharedOffender.policePriorityScore !== undefined && (
                            <PriorityBadge
                              intl={intl}
                              score={sharedOffender.policePriorityScore}
                            />
                          )}
                      </Space>
                    </Col>
                    <Col>
                      {sharedOffender.policeHubs.some(
                        (hub) => hub.id !== currentSchemeId
                      ) && (
                        <Text
                          style={{
                            display: 'block',
                            fontSize: '12px',
                            marginBottom: '8px',
                          }}
                          type="secondary"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Also shared with:',
                          })}
                        </Text>
                      )}
                      <PoliceHubBadges
                        currentSchemeId={currentSchemeId}
                        schemes={sharedOffender.policeHubs}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Intelligence Summary */}
              <Col lg={14} md={24} span={24} xl={14}>
                <Card
                  style={{ marginBottom: 0 }}
                  title={intl.formatMessage({
                    defaultMessage: 'Intelligence Summary',
                  })}
                >
                  {/* Stats Section */}
                  <div
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: 8,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 16,
                      marginBottom: 16,
                      padding: '12px 16px',
                    }}
                  >
                    {/* Total Incidents across all linked offenders */}
                    {sharedOffender.offender.length > 0 && (
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          gap: 6,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faReceipt}
                          style={{ color: '#8c8c8c', fontSize: 16 }}
                        />
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            opacity: 0.85,
                          }}
                        >
                          {intl.formatMessage(
                            {
                              defaultMessage:
                                '{count} {count, plural, one {incident} other {incidents}}',
                            },
                            {
                              count: sharedOffender.offender.reduce(
                                (sum, off) => sum + (off.totalIncidents || 0),
                                0
                              ),
                            }
                          )}
                        </span>
                      </div>
                    )}

                    {/* Total Value */}
                    {sharedOffender.totalLossValue !== null &&
                      sharedOffender.totalLossValue !== undefined && (
                        <div
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                            gap: 6,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faShoppingBag}
                            style={{ color: '#8c8c8c', fontSize: 16 }}
                          />
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              opacity: 0.85,
                            }}
                          >
                            {currency}
                            {sharedOffender.totalLossValue.toLocaleString()}
                          </span>
                        </div>
                      )}

                    {/* Last Incident Date */}
                    {sharedOffender.lastIncidentAt && (
                      <Tooltip
                        title={formatActualDate(
                          new Date(sharedOffender.lastIncidentAt),
                          intl
                        )}
                      >
                        <div
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                            gap: 6,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCalendar}
                            style={{ color: '#8c8c8c', fontSize: 16 }}
                          />
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              opacity: 0.85,
                            }}
                          >
                            {formatLastIncidentDate(
                              new Date(sharedOffender.lastIncidentAt),
                              intl
                            )}
                          </span>
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* AI Methods / Known For */}
                  {sharedOffender.aiMethods &&
                    sharedOffender.aiMethods.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            opacity: 0.65,
                          }}
                        >
                          {intl.formatMessage({ defaultMessage: 'Known for:' })}
                        </span>
                        <span
                          style={{ fontSize: 13, marginLeft: 4, opacity: 0.85 }}
                        >
                          {sharedOffender.aiMethods.join(', ')}
                        </span>
                      </div>
                    )}

                  {/* Intelligence Sources */}
                  {sharedOffender.sources.some(
                    (source) => source.id !== currentSchemeId
                  ) && (
                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          marginBottom: 8,
                          opacity: 0.65,
                        }}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Intelligence shared from:',
                        })}
                      </div>
                      <div
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 12,
                        }}
                      >
                        {sharedOffender.sources
                          .filter((source) => source.id !== currentSchemeId)
                          .slice(0, 6)
                          .map((source) => {
                            const logoUrl =
                              source.logo?.optimised || source.logo?.url;

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
                                      maxWidth: 100,
                                      objectFit: 'contain',
                                      padding: 4,
                                      width: 'auto',
                                    }}
                                  />
                                </Tooltip>
                              );
                            }

                            // Fallback to text badge if no logo
                            return (
                              <Tooltip key={source.id} title={source.name}>
                                <Tag style={{ fontSize: 12 }}>
                                  {source.name}
                                </Tag>
                              </Tooltip>
                            );
                          })}
                        {sharedOffender.sources.filter(
                          (source) => source.id !== currentSchemeId
                        ).length > 6 && (
                          <Text style={{ fontSize: 12 }} type="secondary">
                            {intl.formatMessage(
                              { defaultMessage: '+{count} more' },
                              {
                                count:
                                  sharedOffender.sources.filter(
                                    (source) => source.id !== currentSchemeId
                                  ).length - 6,
                              }
                            )}
                          </Text>
                        )}
                      </div>
                    </div>
                  )}

                  {sharedOffender.aiGenerationStatus === 'completed' ? (
                    <>
                      {sharedOffender.aiSummary && (
                        <div style={{ marginBottom: 16 }}>
                          <Title level={5}>
                            {intl.formatMessage({ defaultMessage: 'Summary' })}
                          </Title>
                          <Paragraph>{sharedOffender.aiSummary}</Paragraph>
                        </div>
                      )}

                      {sharedOffender.aiKeyObservations.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                          <Title level={5}>
                            {intl.formatMessage({
                              defaultMessage: 'Key Observations',
                            })}
                          </Title>
                          <List
                            dataSource={sharedOffender.aiKeyObservations}
                            renderItem={(item) => (
                              <List.Item>
                                <Text>
                                  {intl.formatMessage(
                                    { defaultMessage: '• {item}' },
                                    { item }
                                  )}
                                </Text>
                              </List.Item>
                            )}
                            size="small"
                          />
                        </div>
                      )}

                      {sharedOffender.aiMO && (
                        <div style={{ marginBottom: 16 }}>
                          <Title level={5}>
                            {intl.formatMessage({
                              defaultMessage: 'Modus Operandi',
                            })}
                          </Title>
                          <Paragraph>{sharedOffender.aiMO}</Paragraph>
                        </div>
                      )}
                    </>
                  ) : (
                    <Empty
                      description={intl.formatMessage({
                        defaultMessage:
                          'AI analysis is not yet available for this offender.',
                      })}
                    />
                  )}
                </Card>
              </Col>

              {/* Image Grid */}
              <Col lg={10} md={24} span={24} xl={10}>
                <ImageGrid
                  images={sharedOffender.images}
                  intl={intl}
                  onImageClick={openLightbox}
                  onShowMore={() => setImageDrawerOpen(true)}
                />
              </Col>

              {/* Linked Offenders */}
              {sharedOffender.offender.length > 0 && (
                <>
                  {sharedOffender.offender.map((offender) => (
                    <Col
                      key={offender.id}
                      span={sharedOffender.offender.length === 1 ? 12 : 24}
                    >
                      <Card style={{ marginBottom: 0 }}>
                        {/* Header Section */}
                        <div style={{ marginBottom: 12 }}>
                          <div
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: 8,
                            }}
                          >
                            <div
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                gap: 8,
                              }}
                            >
                              {offender.scheme.logo && (
                                <Tooltip title={offender.scheme.name}>
                                  <img
                                    alt={offender.scheme.name}
                                    src={
                                      offender.scheme.logo.optimised ||
                                      offender.scheme.logo.url ||
                                      ''
                                    }
                                    style={{
                                      backgroundColor: '#f0f0f0',
                                      borderRadius: 4,
                                      height: 'auto',
                                      maxHeight: 32,
                                      maxWidth: 80,
                                      objectFit: 'contain',
                                      padding: 4,
                                      width: 'auto',
                                    }}
                                  />
                                </Tooltip>
                              )}
                              <Link
                                style={{ fontSize: 16, fontWeight: 600 }}
                                to={`/app/offenders/view/${offender.id}`}
                              >
                                {offender.name ||
                                  intl.formatMessage({
                                    defaultMessage: 'Unknown',
                                  })}
                              </Link>
                            </div>
                            <Text style={{ fontSize: 14 }} type="secondary">
                              {intl.formatMessage(
                                { defaultMessage: 'Ref: {ref}' },
                                {
                                  ref:
                                    offender.reference ||
                                    intl.formatMessage({
                                      defaultMessage: 'N/A',
                                    }),
                                }
                              )}
                            </Text>
                          </div>

                          {/* Aliases */}
                          {offender.alias && offender.alias.length > 0 && (
                            <div style={{ marginBottom: 8 }}>
                              <Text style={{ fontSize: 12 }} type="secondary">
                                {intl.formatMessage({
                                  defaultMessage: 'Also known as:',
                                })}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontStyle: 'italic',
                                  marginLeft: 4,
                                }}
                              >
                                {offender.alias.join(', ')}
                              </Text>
                            </div>
                          )}

                          {/* Verification Status */}
                          {offender.idVerified && (
                            <div
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                gap: 4,
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{ color: '#52c41a', fontSize: 14 }}
                              />
                              <Text style={{ color: '#52c41a', fontSize: 12 }}>
                                {intl.formatMessage({
                                  defaultMessage: 'ID Verified',
                                })}
                              </Text>
                            </div>
                          )}
                        </div>

                        {/* Statistics Bar */}
                        <div
                          style={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            borderRadius: 8,
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 16,
                            marginBottom: 12,
                            padding: '12px 16px',
                          }}
                        >
                          <div
                            style={{
                              alignItems: 'center',
                              display: 'flex',
                              gap: 6,
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faReceipt}
                              style={{ color: '#8c8c8c', fontSize: 16 }}
                            />
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                opacity: 0.85,
                              }}
                            >
                              {intl.formatMessage(
                                {
                                  defaultMessage:
                                    '{count} {count, plural, one {incident} other {incidents}}',
                                },
                                { count: offender.totalIncidents || 0 }
                              )}
                            </span>
                          </div>
                          {offender.totalValue !== null &&
                            offender.totalValue !== undefined &&
                            offender.totalValue > 0 && (
                              <div
                                style={{
                                  alignItems: 'center',
                                  display: 'flex',
                                  gap: 6,
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faShoppingBag}
                                  style={{ color: '#8c8c8c', fontSize: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    opacity: 0.85,
                                  }}
                                >
                                  {currency}
                                  {offender.totalValue.toLocaleString()}
                                </span>
                              </div>
                            )}
                        </div>

                        {/* Behavioral Intelligence Section */}
                        {(offender.knownFor.length > 0 ||
                          offender.targetedGoods.length > 0) && (
                          <div style={{ marginBottom: 12 }}>
                            {offender.knownFor.length > 0 && (
                              <div style={{ marginBottom: 8 }}>
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    marginRight: 6,
                                    opacity: 0.65,
                                  }}
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Known For:',
                                  })}
                                </span>
                                {offender.knownFor.map((item, idx) => (
                                  <Tag key={idx} style={{ marginBottom: 4 }}>
                                    {item}
                                  </Tag>
                                ))}
                              </div>
                            )}
                            {offender.targetedGoods.length > 0 && (
                              <div>
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    marginRight: 6,
                                    opacity: 0.65,
                                  }}
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Targets:',
                                  })}
                                </span>
                                {(() => {
                                  // Parse targeted goods - split by /0 and clean up
                                  const allGoods =
                                    offender.targetedGoods.flatMap((item) =>
                                      item
                                        .split(/\/0|\/\d+/)
                                        .map((good) => good.trim())
                                        .filter((good) => good.length > 0)
                                    );

                                  // Remove duplicates and limit display
                                  const uniqueGoods = [...new Set(allGoods)];
                                  const displayLimit = 5;
                                  const displayGoods = uniqueGoods.slice(
                                    0,
                                    displayLimit
                                  );
                                  const remainingCount =
                                    uniqueGoods.length - displayLimit;

                                  return (
                                    <>
                                      {displayGoods.map((item, idx) => (
                                        <Tag
                                          color="orange"
                                          key={idx}
                                          style={{
                                            marginBottom: 4,
                                            maxWidth: 250,
                                          }}
                                        >
                                          <span
                                            style={{
                                              display: 'inline-block',
                                              maxWidth: '100%',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                            }}
                                          >
                                            {item}
                                          </span>
                                        </Tag>
                                      ))}
                                      {remainingCount > 0 && (
                                        <Tooltip
                                          title={
                                            <div
                                              style={{
                                                maxHeight: 300,
                                                overflow: 'auto',
                                              }}
                                            >
                                              {uniqueGoods
                                                .slice(displayLimit)
                                                .map((item, idx) => (
                                                  <div
                                                    key={idx}
                                                    style={{ marginBottom: 4 }}
                                                  >
                                                    {intl.formatMessage(
                                                      {
                                                        defaultMessage:
                                                          '• {item}',
                                                      },
                                                      { item }
                                                    )}
                                                  </div>
                                                ))}
                                            </div>
                                          }
                                        >
                                          <Tag
                                            color="orange"
                                            style={{
                                              cursor: 'pointer',
                                              marginBottom: 4,
                                            }}
                                          >
                                            {intl.formatMessage(
                                              {
                                                defaultMessage: '+{count} more',
                                              },
                                              { count: remainingCount }
                                            )}
                                          </Tag>
                                        </Tooltip>
                                      )}
                                    </>
                                  );
                                })()}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Physical Description Section */}
                        {(offender.age ||
                          offender.dateOfBirth ||
                          offender.gender ||
                          offender.race ||
                          offender.height ||
                          offender.build ||
                          offender.hair ||
                          offender.peculiarities) && (
                          <div
                            style={{
                              backgroundColor: 'rgba(24, 144, 255, 0.1)',
                              borderLeft: '3px solid #1890ff',
                              borderRadius: 4,
                              marginBottom: 12,
                              padding: 12,
                            }}
                          >
                            <div
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                gap: 6,
                                marginBottom: 8,
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ color: '#1890ff', fontSize: 14 }}
                              />
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  opacity: 0.65,
                                }}
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Physical Description:',
                                })}
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'grid',
                                gap: '8px 16px',
                                gridTemplateColumns:
                                  'repeat(auto-fit, minmax(150px, 1fr))',
                              }}
                            >
                              {offender.age && offender.age !== 'UNKNOWN' && (
                                <div>
                                  <Text
                                    style={{ fontSize: 12 }}
                                    type="secondary"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Age:',
                                    })}
                                  </Text>
                                  <Text style={{ fontSize: 13, marginLeft: 4 }}>
                                    {offender.age
                                      .replaceAll('_', ' ')
                                      .toLowerCase()
                                      .replaceAll(/\b\w/g, (l) =>
                                        l.toUpperCase()
                                      )}
                                  </Text>
                                </div>
                              )}
                              {offender.dateOfBirth && (
                                <div>
                                  <Text
                                    style={{ fontSize: 12 }}
                                    type="secondary"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'DOB:',
                                    })}
                                  </Text>
                                  <Text style={{ fontSize: 13, marginLeft: 4 }}>
                                    {new Date(
                                      offender.dateOfBirth
                                    ).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </Text>
                                </div>
                              )}
                              {offender.gender &&
                                offender.gender !== 'UNKNOWN' && (
                                  <div>
                                    <Text
                                      style={{ fontSize: 12 }}
                                      type="secondary"
                                    >
                                      {intl.formatMessage({
                                        defaultMessage: 'Gender:',
                                      })}
                                    </Text>
                                    <Text
                                      style={{ fontSize: 13, marginLeft: 4 }}
                                    >
                                      {offender.gender
                                        .replaceAll('_', ' ')
                                        .toLowerCase()
                                        .replaceAll(/\b\w/g, (l) =>
                                          l.toUpperCase()
                                        )}
                                    </Text>
                                  </div>
                                )}
                              {offender.race && offender.race !== 'UNKNOWN' && (
                                <div>
                                  <Text
                                    style={{ fontSize: 12 }}
                                    type="secondary"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Ethnicity:',
                                    })}
                                  </Text>
                                  <Text style={{ fontSize: 13, marginLeft: 4 }}>
                                    {offender.race
                                      .replaceAll('_', ' ')
                                      .toLowerCase()
                                      .replaceAll(/\b\w/g, (l) =>
                                        l.toUpperCase()
                                      )}
                                  </Text>
                                </div>
                              )}
                              {offender.height &&
                                offender.height !== 'UNKNOWN' && (
                                  <div>
                                    <Text
                                      style={{ fontSize: 12 }}
                                      type="secondary"
                                    >
                                      {intl.formatMessage({
                                        defaultMessage: 'Height:',
                                      })}
                                    </Text>
                                    <Text
                                      style={{ fontSize: 13, marginLeft: 4 }}
                                    >
                                      {offender.height
                                        .replaceAll('_', ' ')
                                        .toLowerCase()
                                        .replaceAll(/\b\w/g, (l) =>
                                          l.toUpperCase()
                                        )}
                                    </Text>
                                  </div>
                                )}
                              {offender.build &&
                                offender.build !== 'UNKNOWN' && (
                                  <div>
                                    <Text
                                      style={{ fontSize: 12 }}
                                      type="secondary"
                                    >
                                      {intl.formatMessage({
                                        defaultMessage: 'Build:',
                                      })}
                                    </Text>
                                    <Text
                                      style={{ fontSize: 13, marginLeft: 4 }}
                                    >
                                      {offender.build
                                        .replaceAll('_', ' ')
                                        .toLowerCase()
                                        .replaceAll(/\b\w/g, (l) =>
                                          l.toUpperCase()
                                        )}
                                    </Text>
                                  </div>
                                )}
                              {offender.hair && (
                                <div>
                                  <Text
                                    style={{ fontSize: 12 }}
                                    type="secondary"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Hair:',
                                    })}
                                  </Text>
                                  <Text style={{ fontSize: 13, marginLeft: 4 }}>
                                    {offender.hair}
                                  </Text>
                                </div>
                              )}
                            </div>
                            {offender.peculiarities && (
                              <div
                                style={{
                                  borderTop:
                                    '1px solid rgba(24, 144, 255, 0.2)',
                                  marginTop: 8,
                                  paddingTop: 8,
                                }}
                              >
                                <Text style={{ fontSize: 12 }} type="secondary">
                                  {intl.formatMessage({
                                    defaultMessage: 'Additional Details:',
                                  })}
                                </Text>
                                <br />
                                <Text style={{ fontSize: 13 }}>
                                  {offender.peculiarities}
                                </Text>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Intelligence Notes Section */}
                        {offender.comment && (
                          <div
                            style={{
                              backgroundColor: 'rgba(250, 173, 20, 0.1)',
                              borderLeft: '3px solid #faad14',
                              borderRadius: 4,
                              marginBottom: 12,
                              padding: 12,
                            }}
                          >
                            <div
                              style={{
                                alignItems: 'center',
                                display: 'flex',
                                gap: 6,
                                marginBottom: 6,
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faLightbulb}
                                style={{ color: '#faad14', fontSize: 14 }}
                              />
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  opacity: 0.65,
                                }}
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Intelligence Notes:',
                                })}
                              </span>
                            </div>
                            <Text style={{ fontSize: 13 }}>
                              {offender.comment}
                            </Text>
                          </div>
                        )}

                        {/* Latest Activity Section */}
                        {offender.latestIncident && (
                          <div style={{ marginBottom: 12 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                marginBottom: 6,
                                opacity: 0.65,
                              }}
                            >
                              {intl.formatMessage({
                                defaultMessage: 'Latest Incident:',
                              })}
                            </div>
                            <div style={{ fontSize: 13, opacity: 0.85 }}>
                              <span style={{ fontWeight: 500 }}>
                                {offender.latestIncident.reportedBusinessName}
                              </span>
                              {intl.formatMessage({ defaultMessage: ' • ' })}
                              {offender.latestIncident.dateAgo === 0
                                ? intl.formatMessage({
                                    defaultMessage: 'Today',
                                  })
                                : offender.latestIncident.dateAgo === 1
                                  ? intl.formatMessage({
                                      defaultMessage: 'Yesterday',
                                    })
                                  : offender.latestIncident.dateAgo < 7
                                    ? intl.formatMessage(
                                        { defaultMessage: '{days} days ago' },
                                        {
                                          days: offender.latestIncident.dateAgo,
                                        }
                                      )
                                    : offender.latestIncident.dateAgo < 30
                                      ? intl.formatMessage(
                                          {
                                            defaultMessage: '{weeks} weeks ago',
                                          },
                                          {
                                            weeks: Math.floor(
                                              offender.latestIncident.dateAgo /
                                                7
                                            ),
                                          }
                                        )
                                      : intl.formatMessage(
                                          {
                                            defaultMessage:
                                              '{months} months ago',
                                          },
                                          {
                                            months: Math.floor(
                                              offender.latestIncident.dateAgo /
                                                30
                                            ),
                                          }
                                        )}
                              {intl.formatMessage({ defaultMessage: ' • ' })}
                              <span style={{ textTransform: 'capitalize' }}>
                                {offender.latestIncident.dayTime}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Tags and Metadata */}
                        <div
                          style={{
                            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                            paddingTop: 12,
                          }}
                        >
                          {offender.tags.length > 0 && (
                            <div style={{ marginBottom: 8 }}>
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  marginRight: 6,
                                  opacity: 0.65,
                                }}
                              >
                                {intl.formatMessage({
                                  defaultMessage: 'Tags:',
                                })}
                              </span>
                              {offender.tags.map((tag) => (
                                <Tag key={tag.id} style={{ marginBottom: 4 }}>
                                  {tag.name}
                                </Tag>
                              ))}
                            </div>
                          )}
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '8px 16px',
                            }}
                          >
                            {offender.createdAt && (
                              <Text style={{ fontSize: 12 }} type="secondary">
                                {intl.formatMessage(
                                  { defaultMessage: 'Tracked since: {date}' },
                                  {
                                    date: formatActualDate(
                                      new Date(offender.createdAt),
                                      intl
                                    ),
                                  }
                                )}
                              </Text>
                            )}
                            <Text style={{ fontSize: 12 }} type="secondary">
                              {intl.formatMessage(
                                { defaultMessage: 'Last updated: {date}' },
                                {
                                  date: formatActualDate(
                                    new Date(offender.updatedAt),
                                    intl
                                  ),
                                }
                              )}
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </>
              )}

              {/* Incident Map */}
              {mapMarkers.length > 0 && (
                <Col span={sharedOffender.offender.length === 1 ? 12 : 24}>
                  <MapCard
                    height={400}
                    isPrinting={false}
                    markers={mapMarkers}
                    width="100%"
                  />
                </Col>
              )}

              {/* Incident Log */}
              {incidents.length > 0 && (
                <Col span={24}>
                  <Card
                    style={{ marginBottom: 0 }}
                    title={
                      <span>
                        <FontAwesomeIcon
                          icon={faReceipt}
                          style={{ marginRight: 8 }}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Incident Log',
                        })}
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            marginLeft: 4,
                          }}
                          type="secondary"
                        >
                          {intl.formatMessage(
                            {
                              defaultMessage:
                                '({count} {count, plural, one {incident} other {incidents}})',
                            },
                            { count: incidents.length }
                          )}
                        </Text>
                      </span>
                    }
                  >
                    <PoliceOffenderIncidentTable
                      currency={currencyCode}
                      incidents={incidents}
                      loading={loading}
                    />
                  </Card>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>

      {/* Lightbox */}
      <Lightbox
        close={() => setLightBoxOpen({ index: 0, open: false })}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        slides={lightboxElements}
      />

      {/* Image Drawer */}
      <Drawer
        onClose={() => setImageDrawerOpen(false)}
        open={imageDrawerOpen}
        placement="right"
        title={
          <span>
            <FontAwesomeIcon icon={faImages} style={{ marginRight: 8 }} />
            {intl.formatMessage(
              { defaultMessage: 'All Images ({count})' },
              { count: sharedOffender?.images.length || 0 }
            )}
          </span>
        }
        width={800}
      >
        {sharedOffender?.images && (
          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {sharedOffender.images.map((image, index) => {
              const allLightboxElements = sharedOffender.images.map((img) => ({
                src: img.optimised || '',
              }));

              return (
                <div
                  key={image.id}
                  onClick={() => openLightbox(allLightboxElements, index)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  style={{
                    borderRadius: 8,
                    cursor: 'pointer',
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <WatermarkImage
                    position={image.position}
                    positionX={image.positionX}
                    positionY={image.positionY}
                    rotation={image.rotation}
                    style={{
                      height: '100%',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    url={image.optimised}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ViewPoliceOffender;
