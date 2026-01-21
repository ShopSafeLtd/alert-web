import type { Age, Gender, ImagePosition, Race } from 'graphql/types';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faBuilding,
  faCalendarAlt,
  faCheckCircle,
  faTag,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  getOffenderAge,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import useStyles from './OffenderSelectableCard.styles';

interface OffenderSelectableCardProps {
  isSelected: boolean;
  offender: {
    age?: Age | null;
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
    totalIncidents: number;
    totalValue: number;
  };
  onClick: () => void;
  showCheckmark?: boolean;
}

const OffenderSelectableCard: React.FC<OffenderSelectableCardProps> = ({
  isSelected,
  offender,
  onClick,
  showCheckmark = true,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  return (
    <div
      className={`${classes.card} ${isSelected ? classes.cardSelected : ''}`}
      onClick={onClick}
    >
      {/* Selection Checkmark */}
      {showCheckmark && isSelected && (
        <FontAwesomeIcon className={classes.checkmark} icon={faCheckCircle} />
      )}

      {/* Image */}
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

      {/* Card Content */}
      <div className={classes.cardContent}>
        {/* Header: Name + Reference */}
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
            <span className={classes.reference} style={{ flexShrink: 0 }}>
              #{offender.reference}
            </span>
          </Typography.Text>

          {/* Information Section */}
          <div className={classes.infoSection}>
            {/* Demographics */}
            {(offender.gender || offender.race || offender.age) && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon className={classes.detailIcon} icon={faUser} />
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

            {/* Last Incident */}
            {offender.latestIncident && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon
                  className={classes.detailIcon}
                  icon={faCalendarAlt}
                />
                <span className={classes.detailLabel}>
                  {intl.formatMessage({ defaultMessage: 'Last seen:' })}
                </span>
                <Typography.Text className={classes.detailText}>
                  {dayjs(offender.latestIncident.date).format('DD/MM/YYYY')}
                </Typography.Text>
              </div>
            )}

            {/* Known For */}
            {offender.knownFor && offender.knownFor.length > 0 && (
              <div className={classes.detailRow}>
                <FontAwesomeIcon className={classes.detailIcon} icon={faTag} />
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

            {/* Targeted Businesses */}
            {offender.targetedBusinesses &&
              offender.targetedBusinesses.length > 0 && (
                <div className={classes.detailRow}>
                  <FontAwesomeIcon
                    className={classes.detailIcon}
                    icon={faBuilding}
                  />
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

        {/* Stats Row */}
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
};

export default OffenderSelectableCard;
