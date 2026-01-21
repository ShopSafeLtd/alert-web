import { Card, Col, Empty, Grid, Row } from 'antd';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import PoliceOffenderCard from 'components/police-offenders/PoliceOffenderCard';
import React from 'react';
import { useIntl } from 'react-intl';

const { useBreakpoint } = Grid;

import type { PoliceOffenderCardFragment } from 'components/police-offenders/PoliceOffenderCard/__generated__/PoliceOffenderCard.fragment.generated';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface PriorityOffendersCardsProps {
  datePreset?: string;
  loading: boolean;
  offenders:
    | PoliceHubDashboardQuery['policeHubDashboard']['topOffenders']
    | undefined;
}

const PriorityOffendersCards: React.FC<PriorityOffendersCardsProps> = ({
  datePreset,
  loading,
  offenders,
}) => {
  const intl = useIntl();
  const screens = useBreakpoint();

  // Determine number of offenders to show based on screen size
  // xxl (3 columns): show 9 offenders
  // xl (2 columns): show 10 offenders
  const maxOffenders = screens.xxl ? 9 : 10;

  if (loading) {
    return (
      <Card
        style={{ marginBottom: 24 }}
        title={intl.formatMessage(
          { defaultMessage: 'Priority Offenders ({preset})' },
          {
            preset:
              datePreset || intl.formatMessage({ defaultMessage: 'All Time' }),
          }
        )}
      >
        <Row gutter={[16, 16]}>
          {Array.from({ length: maxOffenders }).map((_, index) => (
            <Col key={index} lg={24} md={24} sm={24} xl={12} xs={24} xxl={8}>
              <CompactSkeletonCard />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }

  if (!offenders || offenders.length === 0) {
    return (
      <Card
        style={{ marginBottom: 24 }}
        title={intl.formatMessage(
          { defaultMessage: 'Priority Offenders ({preset})' },
          {
            preset:
              datePreset || intl.formatMessage({ defaultMessage: 'All Time' }),
          }
        )}
      >
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No high-risk individuals with incidents found.',
          })}
        />
      </Card>
    );
  }

  return (
    <Card
      style={{ marginBottom: 24 }}
      title={intl.formatMessage(
        { defaultMessage: 'Priority Offenders ({preset})' },
        {
          preset:
            datePreset || intl.formatMessage({ defaultMessage: 'All Time' }),
        }
      )}
    >
      <Row gutter={[16, 16]}>
        {offenders.slice(0, maxOffenders).map((offender) => (
          <Col
            key={offender.sharedOffenderId}
            lg={24}
            md={24}
            sm={24}
            xl={12}
            xs={24}
            xxl={8}
          >
            <PoliceOffenderCard
              openLightbox={() => {}}
              sharedOffender={offender as unknown as PoliceOffenderCardFragment}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PriorityOffendersCards;
