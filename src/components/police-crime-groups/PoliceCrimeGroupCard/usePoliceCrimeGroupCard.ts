import { useNavigate } from 'react-router';

import type { PoliceCrimeGroupCardFragment } from './__generated__/PoliceCrimeGroupCard.fragment.generated';

interface Props {
  sharedCrimeGroup: PoliceCrimeGroupCardFragment;
}

interface Return {
  mappedData: {
    aiActivityPatterns?: null | string;
    aiKeyObservations: string[];
    aiOrganizationStructure?: null | string;
    aiQualityScore?: null | number;

    aiSophisticationLevel?: null | string;
    aiSummary?: null | string;
    alias?: null | string;
    id: string;
    // AI fields
    policePriorityScore?: null | number;

    ref: string;
    reference?: null | number;
    schemes: Array<{ hubForce?: null | string; id: string; name: string }>;
    // Stats
    totalIncidents?: null | number;
    totalOffenders?: null | number;
    totalRecoveredValue?: null | number;
    totalTheftSuccess?: null | number;

    totalValue?: null | number;
    updatedAt: Date;
  };
  onNavigate: (url: string) => void;
}

const usePoliceCrimeGroupCard = ({ sharedCrimeGroup }: Props): Return => {
  const navigate = useNavigate();

  // CRITICAL: Direct access - crimeGroup is single object, not array
  const crimeGroup = sharedCrimeGroup.crimeGroup;

  const mappedData = {
    aiActivityPatterns: sharedCrimeGroup.aiActivityPatterns,
    aiKeyObservations: sharedCrimeGroup.aiKeyObservations || [],
    aiOrganizationStructure: sharedCrimeGroup.aiOrganizationStructure,
    aiQualityScore: sharedCrimeGroup.aiQualityScore,

    aiSophisticationLevel: sharedCrimeGroup.aiSophisticationLevel,
    aiSummary: sharedCrimeGroup.aiSummary,
    alias: crimeGroup?.alias,
    id: sharedCrimeGroup.id,
    // Police-specific fields from SharedCrimeGroup
    policePriorityScore: sharedCrimeGroup.policePriorityScore,

    ref: crimeGroup?.ref || 'Unknown Group',
    reference: crimeGroup?.reference,
    schemes: sharedCrimeGroup.schemes || [],
    // Stats from nested crimeGroup object
    totalIncidents: crimeGroup?.totalIncidents,
    totalOffenders: crimeGroup?.totalOffenders,
    totalRecoveredValue: crimeGroup?.totalRecoveredValue,
    totalTheftSuccess: crimeGroup?.totalTheftSuccess,

    totalValue: crimeGroup?.totalValue,
    updatedAt: new Date(sharedCrimeGroup.updatedAt),
  };

  const onNavigate = (url: string) => {
    navigate(url);
  };

  return {
    mappedData,
    onNavigate,
  };
};

export default usePoliceCrimeGroupCard;
