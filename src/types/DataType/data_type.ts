import type { UploadFile } from 'antd';
import type {
  Age,
  BanType,
  Build,
  Gender,
  Height,
  IdSource,
  ImagePosition,
  ListIncidentsQuery,
  Race,
  AnswerType,
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
  alias?: string[] | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  height?: Height | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  comment?: string | null;
  approved?: boolean | null;
  updatedAt?: Date;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: ImageCardData[] | null | undefined;
  imageUid?: string[] | undefined;
  bans?: BanData[] | undefined;
  idVerified?: boolean;
  idSource?: IdSource;
  new?: boolean;
  existing?: boolean;
  edited?: boolean;
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
  description?: string;
  dayTime?: string | null;
  images?: Array<ImageCardData>;
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
  groups?: string[];
  incidents?: string[];
  offenders?: string[];
  customGalleries?: string[];
  newCustomGalleriesData?: CustomGalleryData[];
  images?: Array<ImageCardData>;
}

export interface VehicleCardData {
  id: string;
  updatedAt?: Date;
  make?: string | null;
  model?: string | null;
  colour?: string | null | undefined;
  registration?: string | null;
  reference?: number | null;
  totalOffenders?: number | null;
  groups?: string[];
  crimeGroup?: string[];
  customGalleries?: string[];
  images?: Array<ImageCardData>;
  incidents?: IncidentCardData[];
  offenders?: OffenderData[];
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
  optimised?: string | null | undefined;
  url?: string | null | undefined;
  fileName?: string | null;
  type?: string | null;
  edited?: boolean;
  new?: boolean;
  deleted?: boolean;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  policeImage?: boolean | null | undefined;
  rotation?: number;
}
export interface Image extends UploadFile {
  // id: string;
  optimised?: string | null;
  position?: ImagePosition;
  primary?: boolean;
  policeImage?: boolean;
  rotation?: number;
  edited?: boolean;
  new?: boolean;
  deleted?: boolean;
}
export interface EditFeedImage {
  id: string;
  optimised?: string | null | undefined;
  url?: string | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  policeImage?: boolean | null | undefined;
  rotation?: number;
}
// LocationData
export interface LocationData {
  id: string;
  alias?: string | null;
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

// businessData
export interface BusinessData {
  id: string;
  name: string;
  publicName?: boolean;
  parent?:
    | {
        id: string;
        name: string;
      }
    | null
    | undefined;
  locations:
    | {
        id: string;
        building?: string;
        county?: string;
        postcode?: string;
        street?: string;
        townCity?: string;
        full?: string | null | undefined;
      }[];
  // | undefined;
  isConnected?: boolean;
  isNew?: boolean;
}
export interface CustomGalleryData {
  id: string;
  name: string;
  description?: string;
  groups?: string[];
  schemes?: string[];
  isConnected?: boolean;
  isNew?: boolean;
}
export interface TagData {
  id: string;
  name: string;
  description?: string;
  schemes: string[];
  isConnected?: boolean;
  isNew?: boolean;
}

export interface CustomQuestion {
  answerType: AnswerType;
  label: string;
  questionId: string;
  required: boolean;
  tagQuestionId: string;
  value: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface GoodsData {
  id: string;
  name?: string | undefined | null;
  value?: number | undefined | null;
  recoveredValue?: number | undefined | null;
  goodsType?:
    | {
        id: string;
      }
    | undefined
    | null;
  goodsTypeId?: string;
}
export enum UserSort {
  createdAtDesc = 'CREATED_AT_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  nameDesc = 'NAME_DESC',
  nameAsc = 'NAME_ASC',
}
