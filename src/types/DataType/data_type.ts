import type {
  Age,
  BanType,
  Build,
  Gender,
  ListIncidentsQuery,
  Race,
} from 'graphql/generated';
import type { Moment } from 'moment';

// BanData
export interface BanData {
  id: string;
  title?: string | null | undefined;
  type?: BanType | null;
  endDate: Date;
  startDate: Date;
  location: string;
  description?: string | null | undefined;
}
// Offender
export interface OffenderData {
  id: string;
  reference?: number | null;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
  bans?: BanData[] | undefined;
}

export interface OffenderCardData {
  id: string;
  reference?: number | null;
  updatedAt?: Date | undefined;
  name?: string | null;
  images?: Array<{
    id: string;
    url?: string | null;
    optimised?: string | null;
  }>;
}

// Incident
export type IncidentsData =
  | Exclude<ListIncidentsQuery['listIncidents'], undefined | null>['incidents']
  | undefined;

export interface IncidentCardData {
  id: string;
  reference?: number | null;
  subject?: string | null;
  description: string;
  dayTime?: string | null;
  images: Array<{ id: string; url?: string | null; optimised?: string | null }>;
}

// Vehicle
export interface VehicleData {
  id: string;
  make?: string | null | undefined;
  model?: string | null | undefined;
  colour?: string | null | undefined;
  reference?: number | null;
  totalOffenders?: number | null;
  registration?: string | null | undefined;
  crimeGroup?: string[];
  incidents?: string[];
  offenders?: string[];
  images?: Array<{
    id: string;
    url?: string | null;
    optimised?: string | null;
    fileName?: string | null;
    type?: string | null;
  }>;
}

export interface VehicleCardData {
  id: string;
  updatedAt: Date;
  make?: string | null;
  model?: string | null;
  registration?: string | null;
  reference?: number | null;
  totalOffenders?: number | null;
  images?: Array<{
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }>;
}

// CrimeGroupData
export interface CrimeGroupData {
  id: string;
  reference?: number | null;
  alias?: string | null;
  totalOffenders?: number | null;
  totalIncidents?: number | null;
  totalValue?: number | null;
  totalRecoveredValue?: number | null;
  totalTheftSuccess?: number | null;
  vehicles?: string[];
  offenders?: string[];
}

export interface CrimeGroupCardData {
  id: string;
  alias?: string | null;
  reference?: number | null;
  totalOffenders?: number | null;
}

// image
export interface ImageCardData {
  id: string;
  url?: string | null;
  optimised?: string | null;
}

// LocationData
export interface LocationData {
  building?: string | null;
  street: string;
  townCity: string;
  county?: string | null;
  postcode: string;
}

export interface AddressData {
  alias?: string | null;
  building?: string | null;
  street: string;
  townCity: string;
  county?: string | null;
  postcode: string;
}
// SchemeUserData
export interface SchemeUserData {
  id: string;
  fullName: string;
  businesses: { id: string; name: string }[];
  firstLetter?: string | null;
  oldFullName: string;
}

// updateData
export interface DatedMessages {
  id?: string;
  content?: string | undefined | null;
  from?: {
    id: string;
    fullName: string;
    businesses: { id: string; name: string }[];
  };
  images?: ImageCardData[];
  offenders?: OffenderCardData[];
  incidents?: IncidentCardData[];
  vehicles?: VehicleData[];
  crimeGroups?: CrimeGroupData[];
  createdAt?: Moment;
}

// date
export interface DateType {
  startDate: Moment | Date;
  endDate: Moment | Date;
}
