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
  documents?: { fileList: UploadFile[] };
  draftSkip?: string;
  fellingTags?: string[];
  goods?: {
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
  offenders: StateOffenderData[] | null;
  policeCCTVEmail?: string;
  policeDay?: boolean;
  policeDistanceFromIncident?: string;
  policeIncidentDuration?: string;
  policeInvolved?: boolean;
  policeItemsLocation?: string[];
  policeItemsMO?: string[];
  policeKnownBefore?: string;
  policeMG11: boolean;
  policeNo?: string;
  policeObstructions?: string;
  policeObstructionsDetails?: string; // new
  policeReasonRemember?: string;
  policeRef?: string;
  policeReported?: boolean;
  policeResponse?: PoliceResponseTime;
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
  vehicles: StateVehicleData[] | null;
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
