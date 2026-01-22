import type { ImagePosition } from '#/graphql/types';

import { useNavigate } from 'react-router';

import type { PoliceVehicleCardFragment } from './__generated__/PoliceVehicleCard.fragment.generated';

interface Props {
  sharedVehicle: PoliceVehicleCardFragment;
}

interface Return {
  mappedData: {
    aiGeographicPattern?: null | string;
    aiKeyObservations: string[];
    aiQualityScore?: null | number;
    aiSummary?: null | string;
    aiUsagePatterns?: null | string;
    colour?: null | string;
    id: string;
    images: Array<{
      id: string;
      optimised?: null | string;
      position: ImagePosition;
      positionX?: null | number;
      positionY?: null | number;
      primary?: boolean | null;
      rotation: number;
      url?: null | string;
    }>;
    make?: null | string;
    model?: null | string;
    // Police-specific fields
    policePriorityScore?: null | number;
    reference?: null | number;
    registration: string;
    schemes: Array<{ hubForce?: null | string; id: string; name: string }>;
    totalImages?: null | number;
    totalIncidents?: null | number;
    totalOffenders?: null | number;
    updatedAt: Date;
    vehicleCount: number;
  };
  onNavigate: (url: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

// Lightbox functionality - defined at module level to avoid recreation
const openLightbox = (elements: { src: string }[], index: number) => {
  console.log('Opening lightbox', elements, index);
};

const usePoliceVehicleCard = ({ sharedVehicle }: Props): Return => {
  const navigate = useNavigate();

  // Extract primary vehicle data from the vehicle array
  const primaryVehicle = sharedVehicle.vehicle[0];

  const mappedData = {
    aiGeographicPattern: sharedVehicle.aiGeographicPattern,
    aiKeyObservations: sharedVehicle.aiKeyObservations || [],
    aiQualityScore: sharedVehicle.aiQualityScore,
    aiSummary: sharedVehicle.aiSummary,
    aiUsagePatterns: sharedVehicle.aiUsagePatterns,
    colour: primaryVehicle?.colour,
    id: sharedVehicle.id,
    images: primaryVehicle?.images || [],
    make: primaryVehicle?.make,
    model: primaryVehicle?.model,
    // Police-specific fields
    policePriorityScore: sharedVehicle.policePriorityScore,
    reference: primaryVehicle?.reference,
    registration: primaryVehicle?.registration || 'Unknown Vehicle',
    schemes: sharedVehicle.schemes || [],
    totalImages: primaryVehicle?.totalImages,
    totalIncidents: primaryVehicle?.totalIncidents,
    totalOffenders: primaryVehicle?.totalOffenders,
    updatedAt: new Date(sharedVehicle.updatedAt),
    vehicleCount: sharedVehicle.vehicle.length,
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

export default usePoliceVehicleCard;
