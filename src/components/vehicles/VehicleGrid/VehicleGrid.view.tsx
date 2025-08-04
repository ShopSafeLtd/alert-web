/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { Theme } from 'configs/ThemeConfig';
import type { ImagePosition } from 'graphql/types';
import type { VehicleData } from 'types/DataType';

import {
  faCar,
  faEdit,
  faExternalLink,
  faPalette,
  faTrash,
  faUnlink,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Dropdown, Menu, Row, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';

import { usePrintShowAll } from '../../offenders/OffenderGrid/usePrintShowAll';

const useStyles = createUseStyles((theme: Theme) => ({
  actionButtons: {
    '& button': {
      fontSize: 11,
      height: 24,
      minWidth: 24,
      padding: '2px 6px',
    },
    display: 'flex',
    gap: 6,
    marginTop: 8,
  },
  cardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 200,
    overflow: 'hidden',
    padding: '12px 16px',
  },
  cardHeader: {
    marginBottom: 4,
  },
  detailLabel: {
    color: theme.secondaryText,
    fontSize: 12,
    marginRight: 6,
  },
  detailRow: {
    '& svg': {
      color: theme.secondaryText,
      opacity: 0.7,
      width: 12,
    },
    alignItems: 'center',
    display: 'flex',
    gap: 6,
    marginBottom: 4,
  },
  detailText: {
    color: theme.headerColor,
    flex: 1,
    fontSize: 12,
    lineHeight: 1.3,
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
    height: 200,
    width: 150,
  },
  imageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 50,
      },
      height: 200,
      width: 150,
    },
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    height: '200px !important',
    width: '150px !important',
  },
  infoSection: {
    flex: 1,
    marginTop: 6,
    overflow: 'hidden',
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
    fontSize: 14,
    fontWeight: 600,
  },
  statsRow: {
    borderTop: `1px solid ${theme.borderColor}`,
    display: 'flex',
    gap: 16,
    marginTop: 'auto',
    paddingTop: 8,
  },
  vehicleCard: {
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
    height: 200,
    overflow: 'hidden',
    padding: 0,
    transition: 'all 0.2s ease',
    width: '100%',
  },
  vehicleName: {
    alignItems: 'baseline',
    color: theme.headerColor,
    display: 'flex',
    fontSize: 15,
    fontWeight: 600,
    gap: 6,
    lineHeight: 1.2,
    marginBottom: 0,
  },
  vehicleRef: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 400,
  },
}));

interface Vehicle {
  colour?: null | string;
  id: string;
  images?:
    | {
        id: string;
        optimised?: null | string | undefined;
        position?: number;
        rotation?: number;
        url?: null | string;
      }[]
    | null
    | undefined;
  make?: null | string;
  model?: null | string;
  reference?: null | number;
  registration?: null | string;
  totalIncidents?: number;
  totalOffenders?: number;
}

interface Props {
  canDisconnect?: boolean;
  deleteRights?: boolean;
  editRights?: boolean;
  onDeleteVehicle?: (id: string) => void;
  onDisconnectVehicle?: (id: string) => void;
  setEditVehicleData?: (value: VehicleData | null) => void;
  sortBy?: string;
  vehicles?: Vehicle[];
}

interface VehicleCardProps {
  canDisconnect?: boolean;
  deleteRights?: boolean;
  editRights?: boolean;
  onDeleteVehicle?: (id: string) => void;
  onDisconnectVehicle?: (id: string) => void;
  setEditVehicleData?: (value: VehicleData | null) => void;
  vehicle: Vehicle;
}

const VehicleCard = ({
  canDisconnect,
  deleteRights,
  editRights,
  onDeleteVehicle,
  onDisconnectVehicle,
  setEditVehicleData,
  vehicle,
}: VehicleCardProps) => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on action buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    navigate(`/app/vehicles/view/${vehicle.id}`);
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
      window.open(`/app/vehicles/view/${vehicle.id}`, '_blank');
    },
  });

  if (canDisconnect) {
    contextMenuItems.push({
      icon: <FontAwesomeIcon icon={faUnlink} />,
      key: 'disconnect',
      label: intl.formatMessage({
        defaultMessage: 'Disconnect from Crime Group',
      }),
      onClick: () => {
        onDisconnectVehicle && onDisconnectVehicle(vehicle.id);
      },
    });
  }

  const renderCard = () => (
    <div className={classes.vehicleCard} onClick={handleCardClick}>
      <div style={{ display: 'flex', flexShrink: 0, height: 200 }}>
        {vehicle.images && vehicle.images?.length > 0 ? (
          <div className={classes.image}>
            <WatermarkImage
              position={vehicle.images[0].position as unknown as ImagePosition}
              url={vehicle.images[0].optimised || vehicle.images[0].url}
            />
          </div>
        ) : (
          <Skeleton.Image className={classes.imageSkeleton} />
        )}
      </div>
      <div className={classes.cardContent}>
        <div className={classes.cardHeader}>
          <Typography.Text className={classes.vehicleName}>
            <span>
              {vehicle.registration ||
                intl.formatMessage({ defaultMessage: 'Unknown' })}
            </span>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <span className={classes.vehicleRef}>#{vehicle.reference}</span>
          </Typography.Text>

          {/* Vehicle info */}
          <div className={classes.infoSection}>
            {vehicle.make && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon icon={faCar} />
                <Typography.Text className={classes.detailText}>
                  {vehicle.make}
                  {vehicle.model && <> {vehicle.model}</>}
                </Typography.Text>
              </div>
            )}

            {vehicle.colour && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon icon={faPalette} />
                <Typography.Text className={classes.detailText}>
                  {vehicle.colour}
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
            <span className={classes.statValue}>
              {vehicle.totalIncidents || 0}
            </span>
          </div>
          <div className={classes.statItem}>
            <span className={classes.statLabel}>
              {intl.formatMessage({ defaultMessage: 'Offenders' })}
            </span>
            <span className={classes.statValue}>
              {vehicle.totalOffenders || 0}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        {(editRights || deleteRights) && (
          <div className={classes.actionButtons}>
            {editRights && (
              <Button
                icon={<FontAwesomeIcon icon={faEdit} />}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditVehicleData &&
                    setEditVehicleData({
                      ...vehicle,
                      images: vehicle.images?.map((img) => ({
                        ...img,
                        position: img.position as unknown as ImagePosition,
                      })),
                    } as VehicleData);
                }}
                size="small"
                type="text"
              >
                {intl.formatMessage({ defaultMessage: 'Edit' })}
              </Button>
            )}
            {deleteRights && (
              <Button
                danger
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteVehicle && onDeleteVehicle(vehicle.id);
                }}
                size="small"
                type="text"
              >
                {intl.formatMessage({ defaultMessage: 'Delete' })}
              </Button>
            )}
          </div>
        )}
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

const VehicleGrid = ({
  canDisconnect,
  deleteRights,
  editRights,
  onDeleteVehicle,
  onDisconnectVehicle,
  setEditVehicleData,
  sortBy = 'registration',
  vehicles,
}: Props): JSX.Element => {
  const rowRef = useRef<HTMLDivElement>(null);

  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [columns, setColumns] = useState(6);
  const [showAll, setShowAll] = useState(false);

  // Force show all items when printing
  usePrintShowAll(setShowAll);

  const sortVehicles = (vehiclesList: Vehicle[], sortKey: string) =>
    [...vehiclesList].sort((a, b) => {
      switch (sortKey) {
        case 'registration': {
          return (a.registration || '').localeCompare(b.registration || '');
        }
        case 'registrationDesc': {
          return (b.registration || '').localeCompare(a.registration || '');
        }
        case 'make': {
          return (a.make || '').localeCompare(b.make || '');
        }
        case 'makeDesc': {
          return (b.make || '').localeCompare(a.make || '');
        }
        case 'incidents': {
          return (b.totalIncidents || 0) - (a.totalIncidents || 0);
        }
        case 'incidentsAsc': {
          return (a.totalIncidents || 0) - (b.totalIncidents || 0);
        }
        case 'offenders': {
          return (b.totalOffenders || 0) - (a.totalOffenders || 0);
        }
        case 'offendersAsc': {
          return (a.totalOffenders || 0) - (b.totalOffenders || 0);
        }
        default: {
          return 0;
        }
      }
    });

  const calcVehicles = (value: number) => {
    if (vehicles) {
      let toDisplay = vehicles;

      // Apply sorting
      toDisplay = sortVehicles(toDisplay, sortBy);

      // Apply pagination
      if (showAll) {
        setVehiclesData(toDisplay);
      } else
        switch (value) {
          case 24: {
            setVehiclesData(toDisplay.slice(0, 4)); // 1 column: show 4

            break;
          }
          case 12: {
            setVehiclesData(toDisplay.slice(0, 6)); // 2 columns: show 6

            break;
          }
          case 8: {
            setVehiclesData(toDisplay.slice(0, 9)); // 3 columns: show 9

            break;
          }
          default: {
            setVehiclesData(toDisplay.slice(0, 12)); // 4 columns: show 12
          }
        }
    }
  };

  const calcColumns = () => {
    const values = rowRef.current?.getBoundingClientRect();
    if (values && values.width < 768) {
      setColumns(24); // 1 column on mobile
    } else if (values && values.width < 1024) {
      setColumns(12); // 2 columns on tablet
    } else if (values && values.width < 1440) {
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
    calcVehicles(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles, showAll, columns, sortBy]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <Row gutter={[24, 24]} ref={rowRef}>
        {vehiclesData.map((item) => (
          <Col key={item.id} span={columns}>
            <VehicleCard
              canDisconnect={canDisconnect}
              deleteRights={deleteRights}
              editRights={editRights}
              onDeleteVehicle={onDeleteVehicle}
              onDisconnectVehicle={onDisconnectVehicle}
              setEditVehicleData={setEditVehicleData}
              vehicle={item}
            />
          </Col>
        ))}
      </Row>
      {vehicles && (vehicles.length > vehiclesData.length || showAll) && (
        <Row justify="center" style={{ marginTop: 20 }}>
          <Col>
            <Button danger onClick={toggleShowAll}>
              {!showAll && (
                <FormattedMessage defaultMessage="Show All Vehicles" />
              )}
              {showAll && (
                <FormattedMessage defaultMessage="Minimise Vehicles" />
              )}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default VehicleGrid;
