/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { Theme } from 'configs/ThemeConfig';
import type { Age, Build, Gender, ImagePosition, Race } from 'graphql/types';
import type { OffenderData } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faBuilding,
  faCalendarAlt,
  faEdit,
  faExternalLink,
  faTag,
  faUnlink,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Dropdown, Menu, Row, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import {
  getOffenderAge,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

const useStyles = createUseStyles((theme: Theme) => ({
  badge: {
    '& .ant-badge-status-text': {
      color: theme.secondaryText,
      fontSize: 11,
    },
  },
  cardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 220,
    overflow: 'hidden',
    padding: '16px 20px',
  },
  cardHeader: {
    marginBottom: 8,
  },
  detailLabel: {
    color: theme.secondaryText,
    fontSize: 13,
    marginRight: 8,
  },
  detailRow: {
    '& svg': {
      color: theme.secondaryText,
      opacity: 0.7,
      width: 14,
    },
    alignItems: 'center',
    display: 'flex',
    gap: 8,
    marginBottom: 4,
  },
  detailText: {
    color: theme.headerColor,
    flex: 1,
    fontSize: 13,
    lineHeight: 1.4,
    opacity: 0.85,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  image: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    flexShrink: 0,
    height: 220,
    width: 160,
  },
  imageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 50,
      },
      height: 220,
      width: 160,
    },
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    height: '220px !important',
    width: '160px !important',
  },
  infoSection: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
  },
  offenderCard: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 8px 24px rgba(0, 0, 0, 0.4)'
          : '0 8px 24px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 16,
    cursor: 'pointer',
    display: 'flex',
    height: 220,
    overflow: 'hidden',
    padding: 0,
    transition: 'all 0.2s ease',
    width: '100%',
  },
  offenderName: {
    alignItems: 'baseline',
    color: theme.headerColor,
    display: 'flex',
    fontSize: 16,
    fontWeight: 600,
    gap: 8,
    lineHeight: 1.2,
    marginBottom: 0,
    overflow: 'hidden',
    width: '100%',
  },
  offenderRef: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 400,
  },
  statItem: {
    flex: 1,
    textAlign: 'center',
  },
  statLabel: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 10,
    letterSpacing: '0.5px',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 16,
    fontWeight: 600,
  },
  statsRow: {
    borderTop: `1px solid ${theme.borderColor}`,
    display: 'flex',
    gap: 20,
    marginTop: 'auto',
    paddingTop: 12,
  },
}));

interface Offender {
  age?: Age | null;
  alias?: string[];
  build?: Build | null;
  dateOfBirth?: Date | null;
  gender?: Gender | null;
  id: string;
  images?:
    | {
        id: string;
        optimised?: null | string | undefined;
        position?: ImagePosition;
        rotation?: number;
      }[]
    | null
    | undefined;
  knownFor?: string[];
  latestIncident?: {
    date: Date;
    id: string;
  } | null;
  name?: null | string;
  race?: Race | null;
  reference?: null | number;
  targetedBusinesses?:
    | {
        id: string;
        name: string;
      }[]
    | null;
  targetedGoods?: string[];
  totalIncidents: number;
  totalValue: number;
}

// Type that accepts offenders from both pagination implementations
type OffenderItem = {
  id: string;
  totalIncidents: number;
  totalValue: number;
} & Partial<Offender>;

interface Props {
  canDisconnect?: boolean;
  disconnectLabel?: string;
  editRights?: boolean;
  loading?: boolean;
  offenders?: OffenderItem[];
  onDisconnectOffender?: (id: string) => void;
  setEditOffenderData?: (value: OffenderData | null) => void;
  sortBy?: string;
}

interface OffenderCardProps {
  canDisconnect?: boolean;
  disconnectLabel?: string;
  editRights?: boolean;
  offender: OffenderItem;
  onDisconnectOffender?: (id: string) => void;
  setEditOffenderData?: (value: OffenderData | null) => void;
}

const OffenderCard = ({
  canDisconnect,
  disconnectLabel,
  editRights,
  offender,
  onDisconnectOffender,
  setEditOffenderData,
}: OffenderCardProps) => {
  const classes = useStyles();
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on action buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    navigate(`/app/offenders/view/${offender.id}`);
  };

  const contextMenuItems: Array<{
    danger?: boolean;
    icon: React.ReactNode;
    key: string;
    label: string;
    onClick: () => void;
  }> = [];

  // Always add "Open in new tab" option
  contextMenuItems.push({
    icon: <FontAwesomeIcon icon={faExternalLink} />,
    key: 'open-new-tab',
    label: intl.formatMessage({ defaultMessage: 'Open in new tab' }),
    onClick: () => {
      window.open(`/app/offenders/view/${offender.id}`, '_blank');
    },
  });

  // Add edit option if user has edit rights
  if (editRights) {
    contextMenuItems.push({
      icon: <FontAwesomeIcon icon={faEdit} />,
      key: 'edit',
      label: intl.formatMessage({ defaultMessage: 'Edit' }),
      onClick: () => {
        setEditOffenderData && setEditOffenderData(offender);
      },
    });
  }

  // Add disconnect option if enabled
  if (canDisconnect) {
    contextMenuItems.push({
      danger: true,
      icon: <FontAwesomeIcon icon={faUnlink} />,
      key: 'disconnect',
      label:
        disconnectLabel ||
        intl.formatMessage({
          defaultMessage: 'Disconnect from Crime Group',
        }),
      onClick: () => {
        onDisconnectOffender && onDisconnectOffender(offender.id);
      },
    });
  }

  const renderCard = () => (
    <div className={classes.offenderCard} onClick={handleCardClick}>
      <div style={{ display: 'flex', flexShrink: 0, height: 220 }}>
        {offender.images && offender.images?.length > 0 ? (
          <div className={classes.image}>
            <WatermarkImage
              position={offender.images[0].position}
              url={offender.images[0].optimised}
            />
          </div>
        ) : (
          <Skeleton.Image className={classes.imageSkeleton} />
        )}
      </div>
      <div className={classes.cardContent}>
        <div className={classes.cardHeader}>
          <Typography.Text className={classes.offenderName}>
            <span
              style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {offender.name ||
                intl.formatMessage({ defaultMessage: 'Unknown' })}
            </span>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <span className={classes.offenderRef} style={{ flexShrink: 0 }}>
              #{offender.reference}
            </span>
          </Typography.Text>

          {/* Demographic info */}
          <div className={classes.infoSection}>
            {(offender.gender || offender.race || offender.age) && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon icon={faUser} />
                <Typography.Text className={classes.detailText}>
                  {offender.gender && getOffenderGender(offender.gender)}
                  {offender.gender && (offender.race || offender.age) && (
                    <>{' • '}</>
                  )}
                  {offender.race && getOffenderRace(offender.race, true)}
                  {offender.race && offender.age && <>{' • '}</>}
                  {offender.age && getOffenderAge(offender.age)}
                </Typography.Text>
              </div>
            )}

            {offender.latestIncident && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className={classes.detailLabel}>
                  {intl.formatMessage({ defaultMessage: 'Last seen:' })}
                </span>
                <Typography.Text className={classes.detailText}>
                  {dayjs(offender.latestIncident.date).format('DD/MM/YYYY')}
                </Typography.Text>
              </div>
            )}

            {/* Known For / Targeted Info */}
            {offender.knownFor && offender.knownFor.length > 0 && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon icon={faTag} />
                <span className={classes.detailLabel}>
                  {intl.formatMessage({ defaultMessage: 'Known for:' })}
                </span>
                <Typography.Text className={classes.detailText}>
                  {offender.knownFor.slice(0, 2).join(', ')}
                  {offender.knownFor.length > 2 && (
                    <>
                      {' '}
                      {intl.formatMessage(
                        { defaultMessage: '+{count}' },
                        { count: offender.knownFor.length - 2 }
                      )}
                    </>
                  )}
                </Typography.Text>
              </div>
            )}

            {offender.targetedBusinesses &&
              offender.targetedBusinesses.length > 0 && (
                <div className={classes.detailRow}>
                  <FontAwesomeIcon icon={faBuilding} />
                  <span className={classes.detailLabel}>
                    {intl.formatMessage({ defaultMessage: 'Targets:' })}
                  </span>
                  <Typography.Text className={classes.detailText}>
                    {offender.targetedBusinesses
                      .slice(0, 1)
                      .map((b) => b.name)
                      .join(', ')}
                    {offender.targetedBusinesses.length > 1 && (
                      <>
                        {' '}
                        {intl.formatMessage(
                          { defaultMessage: '+{count}' },
                          { count: offender.targetedBusinesses.length - 1 }
                        )}
                      </>
                    )}
                  </Typography.Text>
                </div>
              )}
          </div>
        </div>

        {/* Stats */}
        <div className={classes.statsRow}>
          <div className={classes.statItem}>
            <span className={classes.statLabel}>
              {intl.formatMessage({ defaultMessage: 'Incidents' })}
            </span>
            <span className={classes.statValue}>{offender.totalIncidents}</span>
          </div>
          <div className={classes.statItem}>
            <span className={classes.statLabel}>
              {intl.formatMessage({ defaultMessage: 'Total Loss' })}
            </span>
            <span className={classes.statValue}>
              {intl.formatNumber(offender.totalValue || 0, {
                currency,
                maximumFractionDigits: 0,
                notation: 'compact',
                style: 'currency',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Always wrap the card in a dropdown for context menu
  return (
    <Dropdown
      overlay={<Menu items={contextMenuItems} />}
      trigger={['contextMenu']}
    >
      {renderCard()}
    </Dropdown>
  );
};

const OffenderGrid = ({
  canDisconnect,
  disconnectLabel,
  editRights,
  loading = false,
  offenders,
  onDisconnectOffender,
  setEditOffenderData,
  sortBy = 'incidents',
}: Props): JSX.Element => {
  const rowRef = useRef<HTMLDivElement>(null);

  const [offendersData, setOffendersData] = useState<Offender[]>([]);
  const [columns, setColumns] = useState(6);

  const calcOffenders = () => {
    if (offenders) {
      setOffendersData(offenders);
    }
  };

  const calcColumns = () => {
    const values = rowRef.current?.getBoundingClientRect();
    if (values && values.width < 768) {
      setColumns(24); // 1 column on mobile
    } else if (values && values.width < 1100) {
      setColumns(12); // 2 columns on tablet
    } else if (values && values.width < 1500) {
      setColumns(8); // 3 columns on small desktop
    } else {
      setColumns(6); // 4 columns on large desktop
    }
  };

  useEffect(() => {
    const rowNode = rowRef.current;

    const rowObserver = new ResizeObserver(() => {
      calcColumns();
    });

    if (rowRef.current) {
      calcColumns();
      rowObserver.observe(rowRef.current);
    }

    return () => {
      if (rowNode) rowObserver.unobserve(rowNode);
    };
  }, []);

  useEffect(() => {
    calcOffenders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offenders, sortBy]);

  return (
    <div>
      <Row gutter={[24, 24]} ref={rowRef}>
        {loading
          ? // Show skeleton cards while loading
            Array.from({ length: 12 }).map((_, index) => (
              <Col
                className={`offender-col offender-col-${index}`}
                key={`skeleton-${index}`}
                span={columns}
              >
                <div
                  style={{
                    backgroundColor: 'var(--component-background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 16,
                    display: 'flex',
                    height: 220,
                    overflow: 'hidden',
                    padding: 0,
                  }}
                >
                  <Skeleton.Image
                    active
                    style={{
                      borderBottomLeftRadius: 16,
                      borderTopLeftRadius: 16,
                      height: 220,
                      width: 160,
                    }}
                  />
                  <div style={{ flex: 1, padding: '16px 20px' }}>
                    <Skeleton active paragraph={{ rows: 4 }} title />
                  </div>
                </div>
              </Col>
            ))
          : offendersData &&
            offendersData.map((item, index) => (
              <Col
                className={`offender-col offender-col-${index}`}
                key={item.id}
                span={columns}
              >
                <OffenderCard
                  canDisconnect={canDisconnect}
                  disconnectLabel={disconnectLabel}
                  editRights={editRights}
                  offender={item}
                  onDisconnectOffender={onDisconnectOffender}
                  setEditOffenderData={setEditOffenderData}
                />
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default OffenderGrid;
