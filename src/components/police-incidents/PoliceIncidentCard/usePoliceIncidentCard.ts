import type { ImagePosition } from '#/graphql/types';

import { useNavigate } from 'react-router';

import type { PoliceIncidentCardFragment } from './__generated__/PoliceIncidentCard.fragment.generated';

interface Props {
  sharedIncident: PoliceIncidentCardFragment;
}

interface Return {
  mappedData: {
    aiKeyObservations: string[];
    aiMO?: null | string;
    aiMethod?: null | string;
    aiQualityScore?: null | number;
    aiSummary?: null | string;
    business?: { id: string; name: string } | null;
    crimeTypes: Array<{ id: string; name: string }>;
    customerRef?: null | string;
    dayTime?: null | string;
    description?: null | string;
    id: string;
    images: Array<{
      id: string;
      low?: null | string;
      optimised?: null | string;
      position: ImagePosition;
      positionX?: null | number;
      positionY?: null | number;
      primary?: boolean | null;
      rotation: number;
    }>;
    incidentId: string;
    location?: { full: string; id: string } | null;
    newIncident?: boolean | null;
    offenders: Array<{
      id: string;
      images: Array<{
        id: string;
        optimised?: null | string;
        position: ImagePosition;
        positionX?: null | number;
        positionY?: null | number;
        rotation: number;
      }>;
      name?: null | string;
    }>;
    policeArea?: null | string;
    // Police-specific fields
    policePriorityScore?: null | number;
    policeRef?: null | string;
    priority?: null | string;
    reference?: null | number;
    schemeCount: number;
    schemes: Array<{ hubForce?: null | string; id: string; name: string }>;
    subject?: null | string;
    tags: Array<{ id: string; name: string }>;
    totalImages?: null | number;
    updatedAt: Date;
  };
  onNavigate: (url: string) => void;
}

const usePoliceIncidentCard = ({ sharedIncident }: Props): Return => {
  const navigate = useNavigate();

  // Extract incident data from the nested incident object
  const incident = sharedIncident.incident;

  const mappedData = {
    aiKeyObservations: sharedIncident.aiKeyObservations || [],
    aiMO: sharedIncident.aiMO,
    aiMethod: sharedIncident.aiMethod,
    aiQualityScore: sharedIncident.aiQualityScore,
    aiSummary: sharedIncident.aiSummary,
    business: incident.business,
    crimeTypes: incident.crimeTypes || [],
    customerRef: incident.customerRef,
    dayTime: incident.dayTime,
    description: incident.description,
    id: sharedIncident.id,
    images: incident.images || [],
    incidentId: incident.id,
    location: incident.location,
    newIncident: incident.newIncident,
    offenders: incident.offenders || [],
    policeArea: sharedIncident.policeArea,
    // Police-specific from SharedIncident
    policePriorityScore: sharedIncident.policePriorityScore,
    policeRef: incident.policeRef,
    priority: incident.priority,
    reference: incident.reference,
    schemeCount: sharedIncident.schemes.length,
    schemes: sharedIncident.schemes || [],
    // From nested Incident
    subject: incident.subject,
    tags: sharedIncident.tag || [],
    totalImages: incident.totalImages,
    updatedAt: new Date(sharedIncident.updatedAt),
  };

  const onNavigate = (url: string) => {
    navigate(url);
  };

  return {
    mappedData,
    onNavigate,
  };
};

export default usePoliceIncidentCard;
