import type { ImagePosition } from '#/graphql/types';

import { useNavigate } from 'react-router';

import type { PoliceOffenderCardFragment } from './__generated__/PoliceOffenderCard.fragment.generated';

// Type guard for PoliceHubTopOffender (which has sharedOffenderId)
interface PoliceHubTopOffender {
  [key: string]: unknown;
  hasName?: boolean;
  images?: Array<unknown> | string;
  incidentCount?: number;
  sharedOffenderId: string;
  tags?: Array<{ id: string; name: string }> | string;
  totalLossValue?: number;
  totalValue?: number;
  updatedAt?: Date | string;
}

interface Props {
  sharedOffender: PoliceOffenderCardFragment;
}

interface Return {
  mappedData: {
    aiImpactScore?: null | number;
    aiKeyObservations: string[];
    aiMethods: string[];
    aiQualityScore?: null | number;
    aiSummary?: null | string;
    id: string;
    idVerified?: boolean;
    images: Array<{
      id: string;
      isFace?: boolean | null;
      optimised?: null | string;
      policeImage?: boolean | null;
      position: ImagePosition;
      positionX?: null | number;
      positionY?: null | number;
      primary?: boolean | null;
      rotation: number;
    }>;
    lastIncidentAt?: Date | null;
    latestIncident?: {
      dateAgo: number;
      dayTime: string;
      id: string;
      reportedBusinessName: string;
    } | null;
    name: string;
    offenderCount: number;
    policeHubs: Array<{
      darkLogo?: {
        url?: null | string;
      } | null;
      id: string;
      logo?: {
        optimised?: null | string;
        url?: null | string;
      } | null;
      name: string;
    }>;
    // Police-specific fields
    policePriorityScore?: null | number;
    reference?: null | number;
    schemes: Array<{
      darkLogo?: {
        url?: null | string;
      } | null;
      hubForce?: null | string;
      id: string;
      logo?: {
        optimised?: null | string;
        url?: null | string;
      } | null;
      name: string;
    }>;
    sources: Array<{
      darkLogo?: {
        url?: null | string;
      } | null;
      id: string;
      logo?: {
        optimised?: null | string;
        url?: null | string;
      } | null;
      name: string;
    }>;
    tags: Array<{ id: string; name: string }>;
    totalImages?: null | number;
    totalIncidents?: null | number;
    totalValue?: null | number;
    updatedAt: Date;
  };
  onNavigate: (url: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

// Parse JSON fields if they're from PoliceHubTopOffender
const parseJSONField = <T>(field: unknown, fallback: T): T => {
  if (!field) return fallback;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field) as T;
    } catch {
      return fallback;
    }
  }
  return field as T;
};

// Lightbox functionality placeholder
const openLightbox = (elements: { src: string }[], index: number): void => {
  // This will be implemented in the parent component
  console.log('Opening lightbox', elements, index);
};

const usePoliceOffenderCard = ({ sharedOffender }: Props): Return => {
  const navigate = useNavigate();

  // Extract primary offender data (still needed for some fields)
  const primaryOffender = sharedOffender.offender?.[0];

  // Handle both PoliceOffenderCardFragment and PoliceHubTopOffender types
  const isPoliceHubTopOffender = 'sharedOffenderId' in sharedOffender;
  const topOffender = isPoliceHubTopOffender
    ? (sharedOffender as unknown as PoliceHubTopOffender)
    : null;

  const images =
    isPoliceHubTopOffender && topOffender
      ? parseJSONField<Array<Return['mappedData']['images'][number]>>(
          topOffender.images,
          []
        )
      : sharedOffender.images || [];

  const tags =
    isPoliceHubTopOffender && topOffender
      ? parseJSONField<Array<{ id: string; name: string }>>(
          topOffender.tags,
          []
        )
      : sharedOffender.tag || [];

  const mappedData = {
    aiImpactScore: sharedOffender.aiImpactScore,
    aiKeyObservations: sharedOffender.aiKeyObservations || [],
    aiMethods: sharedOffender.aiMethods || [],
    aiQualityScore: sharedOffender.aiQualityScore,
    aiSummary: sharedOffender.aiSummary,
    id: topOffender?.sharedOffenderId || sharedOffender.id,
    idVerified: primaryOffender?.idVerified,
    images,
    lastIncidentAt: sharedOffender.lastIncidentAt
      ? new Date(sharedOffender.lastIncidentAt)
      : null,
    // KEEP: Use latestIncident from nested offender (more complete data)
    latestIncident: primaryOffender?.latestIncident,
    // Use shared offender name directly
    name:
      sharedOffender.name || primaryOffender?.name || 'Unidentified Offender',
    offenderCount: sharedOffender.offender?.length || 0,
    policeHubs: sharedOffender.policeHubs || [],
    // Police-specific fields
    policePriorityScore: sharedOffender.policePriorityScore,
    reference: primaryOffender?.reference,
    schemes: sharedOffender.schemes || [],
    sources: sharedOffender.sources || [],
    tags,
    totalImages:
      primaryOffender?.totalImages ||
      (images.length > 0 ? images.length : null),
    // CHANGED: Use totalIncidents from SharedOffender
    totalIncidents:
      topOffender?.incidentCount ?? sharedOffender.totalIncidents ?? null,
    // CHANGED: Use totalValue from SharedOffender or PoliceHubTopOffender
    totalValue: topOffender?.totalValue ?? topOffender?.totalLossValue ?? null,
    updatedAt: topOffender?.updatedAt
      ? new Date(topOffender.updatedAt)
      : new Date(),
  };

  const onNavigate = (url: string) => {
    navigate(url);
  };

  return {
    mappedData,
    onNavigate,
    openLightbox,
  };
};

export default usePoliceOffenderCard;
