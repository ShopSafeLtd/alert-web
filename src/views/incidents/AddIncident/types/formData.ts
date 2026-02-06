import type { StateImageData } from '#/components/incidents/IncidentForm/ImageSection/useImageSection';
import type { StateOffenderData } from '#/components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { StateVehicleData } from '#/components/incidents/IncidentForm/Profiles/Vehicles/useVehicles';
import type { UploadFile } from 'antd';
import type { PoliceResponseTime } from 'graphql/types';
import type React from 'react';

export interface FormData {
  business?: {
    label: React.ReactNode;
    value: string;
  };
  cctv?: {
    aheadBehind?: string; // new
    cameraNumber: string;
    correctTime: boolean; // new
    description: string;
    endTime: Date;
    id?: string;
    incorrectBy?: number; // new
    showFace: boolean;
    showIncident: boolean;
    startTime: Date;
  }[];
  cctvAvailable?: boolean;
  date: Date;
  description: string;
  documents?: UploadFile[];
  draftSkip?: string;
  fellingTags?: string[];
  goods?: {
    barcode?: string;
    damagedQuantity?: number;
    description?: string;
    goodsType?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
    variant?: string;
  }[];
  goodsKnown?: boolean;
  groups?: string[];
  hasVictims: boolean;
  images?: StateImageData[];
  involvedTags?: string[];
  offenders?: StateOffenderData[];
  policeAdditionalEvidence?: string;
  policeCCTVAheadBehind?: string;
  policeCCTVEmail?: string;
  policeCCTVIncorrectBy?: number;
  policeCCTVReviewDateTime?: Date;
  policeCCTVReviewed?: boolean;
  policeCCTVTimeCorrect?: boolean;
  policeDay?: boolean;
  policeDepartment?: string;
  policeDistanceFromIncident?: string;
  policeIncidentDuration?: string;
  policeInvolved?: boolean;
  policeItemsLocation?: string[];
  policeItemsMO?: string[];
  policeKnownBefore?:
    | 'KNOWN_FROM_PREVIOUS_INCIDENTS'
    | 'KNOWN_PERSONALLY'
    | 'KNOWN_VERIFIED_ID'
    | 'NOT_KNOWN';
  policeMG11: boolean;
  policeNo?: string;
  policeObstructions?: string;
  policeObstructionsDetails?: string; // new
  policeOfficerName?: string;
  policeReasonRemember?: string;
  policeRef?: string;
  policeReported?: boolean;
  policeResponse?: PoliceResponseTime;
  policeScreenshotDateTime?: Date;
  policeSign?: string;
  policeStatement?: string;
  policeWillingCourt?: boolean;
  policeWitnessAddress?: string;
  policeWitnessAtTime?: boolean;
  policeWitnessEmail?: string;
  policeWitnessEthnicity?: string;
  policeWitnessGender?: string;
  policeWitnessLength?: string; // new
  policeWitnessMobileNo?: string;
  policeWitnessName?: string;
  policeWitnessPlaceOfBirth?: string;
  policeWitnessPostcode?: string;
  policeWitnessWorkNo?: string;
  recoveredValue?: number;
  reportToPolice: boolean;
  subject: string;
  tags: string[];
  value?: number;
  vehicles?: StateVehicleData[];
  victimsDetails?: {
    description?: string;
    email?: string;
    name: string;
    phone?: string;
  }[];
  witnessDetails?: {
    description?: string;
    email?: string;
    name: string;
    phone?: string;
  }[];
  witnessesInvolved: boolean;
}
