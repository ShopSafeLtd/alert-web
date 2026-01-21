import { Card } from 'antd';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import CrimeGroupFlow from './CrimeGroupFlow.view';
import { useCrimeGroupFlowData } from './useCrimeGroupFlowData';

interface CrimeGroupFlowContainerProps {
  crimeGroupId: string;
  onOffenderClick?: (offenderId: string) => void;
}

export const CrimeGroupFlowContainer: React.FC<
  CrimeGroupFlowContainerProps
> = ({ crimeGroupId, onOffenderClick }) => {
  const intl = useIntl();

  // Track layout mode in container so hook can fetch correct analytics
  const [layoutMode, setLayoutMode] = useState<'impact' | 'link-analysis'>(
    'link-analysis'
  );

  const { analytics, crimeGroup, error, incidents, loading, offenders } =
    useCrimeGroupFlowData(crimeGroupId, layoutMode);

  // Merge analytics data with offender details
  const enrichedOffenders = useMemo(() => {
    // Create lookup map for O(1) access
    const analyticsMap = new Map(analytics.map((a) => [a.offenderId, a]));

    return offenders.map((offender) => {
      const analyticsData = analyticsMap.get(offender.id);

      return {
        // Analytics from backend (for current mode only)
        analytics: analyticsData,
        id: offender.id,
        images: offender.images,
        name: offender.name,

        reference: offender.reference,

        // Derived from analytics
        totalIncidents: analyticsData?.crimeGroupIncidentCount || 0,
        totalValue: analyticsData?.crimeGroupTotalValue || 0,
      };
    });
  }, [analytics, offenders]);

  // Transform to view shape
  const crimeGroupData = useMemo(() => {
    if (!crimeGroup) return null;

    return {
      alias: crimeGroup.alias,
      id: crimeGroup.id,
      incidents: incidents.map((incident) => ({
        id: incident.id,
        incidentType: incident.crimeTypes?.at(0)?.name || null,
        location: {
          address: incident.location?.full || null,
          lat: incident.location?.geoLat || null,
          lng: incident.location?.geoLng || null,
        },
        occurredAt: incident.dayTime,
        offenders: incident.offenders?.map((o) => ({ id: o.id, name: o.name })),
        reference: incident.reference?.toString() || null,
        totalValue: incident.totalValue,
      })),
      offenders: enrichedOffenders,
      reference: crimeGroup.reference,
    };
  }, [crimeGroup, enrichedOffenders, incidents]);

  if (loading || !crimeGroupData) {
    return <Card loading />;
  }

  if (error) {
    return (
      <Card>
        {intl.formatMessage({
          defaultMessage: 'Error loading crime group flow data',
        })}
      </Card>
    );
  }

  return (
    <CrimeGroupFlow
      crimeGroup={crimeGroupData}
      layoutMode={layoutMode}
      onLayoutModeChange={setLayoutMode}
      onOffenderClick={onOffenderClick}
    />
  );
};
