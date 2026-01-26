import dayjs from 'dayjs';
import { useMemo } from 'react';

import type { GetSharedOffenderQuery } from '../graphql/queries/__generated__/get-shared-offender.generated';

export interface IncidentRow {
  businessName?: null | string;
  crimeTypes: Array<{ id: string; name: string }>;
  customerRef?: null | string;
  date?: Date | null;
  dayTime?: null | string;
  description?: null | string;
  id: string;
  locationFull?: null | string;
  netLoss: number;
  policeRef?: null | string;
  reference?: null | number;
  schemeLogo?: null | string;
  schemeName?: null | string;
  totalRecoveredValue?: null | number;
  totalValue?: null | number;
}

interface Props {
  sharedOffender?: GetSharedOffenderQuery['sharedOffender'];
}

interface Return {
  incidents: IncidentRow[];
  totalIncidents: number;
}

const usePoliceOffenderIncidents = ({ sharedOffender }: Props): Return => {
  const incidents = useMemo(() => {
    if (!sharedOffender?.offender) {
      return [];
    }

    // Use a Set to track unique incident IDs and prevent duplicates
    const seenIncidentIds = new Set<string>();
    const aggregatedIncidents: IncidentRow[] = [];

    // Loop through all linked offenders
    for (const offender of sharedOffender.offender) {
      if (!offender.incidents) continue;

      // Extract incidents from this offender
      for (const incident of offender.incidents) {
        // Skip if we've already seen this incident (deduplication)
        if (seenIncidentIds.has(incident.id)) continue;

        seenIncidentIds.add(incident.id);

        // Calculate net loss (totalValue - totalRecoveredValue)
        const netLoss =
          (incident.totalValue || 0) - (incident.totalRecoveredValue || 0);

        // Get scheme info (use first scheme if business has multiple)
        const scheme = incident.business?.schemes?.[0];

        // Format the incident data
        aggregatedIncidents.push({
          businessName: incident.business?.name,
          crimeTypes: incident.crimeTypes || [],
          customerRef: incident.customerRef,
          date: incident.date,
          dayTime: incident.dayTime,
          description: incident.description,
          id: incident.id,
          locationFull: incident.location?.full,
          netLoss,
          policeRef: incident.policeRef,
          reference: incident.reference,
          schemeLogo: scheme?.logo?.optimised || scheme?.logo?.url,
          schemeName: scheme?.name,
          totalRecoveredValue: incident.totalRecoveredValue,
          totalValue: incident.totalValue,
        });
      }
    }

    // Sort by date descending (most recent first)
    aggregatedIncidents.sort((a, b) => {
      const dateA = a.date ? dayjs(a.date) : dayjs(0);
      const dateB = b.date ? dayjs(b.date) : dayjs(0);
      return dateB.unix() - dateA.unix();
    });

    return aggregatedIncidents;
  }, [sharedOffender]);

  return {
    incidents,
    totalIncidents: incidents.length,
  };
};

export default usePoliceOffenderIncidents;
