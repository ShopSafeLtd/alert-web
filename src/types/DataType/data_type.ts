import type { ListIncidentsQuery } from '#/graphql/incidents/queries/__generated__/list-incidents.generated';
import type { UploadFile } from 'antd';
import type {
  Age,
  AnswerType,
  ArticlePriority,
  BanType,
  Build,
  Gender,
  Height,
  IdSource,
  ImagePosition,
  Race,
  UpdateType,
} from 'graphql/types';
import type { Moment } from 'moment';

// BanData
export interface BanData {
  description?: null | string | undefined;
  endDate?: Date;
  fineValue?: null | number | undefined;
  id: string;
  location?: string;
  months?: null | number | undefined;
  startDate?: Date;
  type?: BanType | null;
}

// Offender
export interface OffenderData {
  age?: Age | null;
  alias?: null | string[];
  approved?: boolean | null;
  bans?: BanData[] | undefined;
  build?: Build | null;
  comment?: null | string;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  edited?: boolean;
  existing?: boolean;
  gender?: Gender | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  hair?: null | string;
  height?: Height | null;
  id: string;
  idSource?: IdSource | null;
  idVerified?: boolean;
  imageUid?: string[] | undefined;
  images?: ImageCardData[] | null | undefined;
  infoSource?: null | string;
  justification?: null | string;
  knownFor?: null | string[];
  lastActive?:
    | { dayTime?: null | string | undefined; id: string }
    | null
    | undefined;
  name?: null | string;
  new?: boolean;
  peculiarities?: null | string;
  race?: Race | null;
  reference?: null | number;
  tags?: {
    id: string;
    name: string;
  }[];
  targetedGoods?: null | string[];
  updatedAt?: Date;
}

export interface OffenderCardData {
  id: string;
  images?:
    | {
        id: string;
        optimised?: null | string;
        url?: null | string;
      }[]
    | null
    | undefined;
  name?: null | string;
  reference?: null | number;
  updatedAt?: Date | undefined;
}

// Incident
export type IncidentsData =
  | Exclude<ListIncidentsQuery['listIncidents'], null | undefined>['incidents']
  | undefined;

export interface IncidentCardData {
  createdBy?: {
    businesses: { id: string; name: string }[];
    fullName: string;
    id: string;
  };
  crimeTypes?: {
    id: string;
    name: string;
  }[];
  dayTime?: null | string | undefined;
  description?: string;
  id: string;
  images?: ImageCardData[] | null | undefined;
  policeRef?: null | string | undefined;
  reference?: null | number;
  subject?: null | string;
  totalRecoveredValue?: null | number;
  totalValue?: null | number | undefined;
}

// Vehicle
export interface VehicleData {
  colour?: null | string | undefined;
  crimeGroup?: string[];
  customGalleries?: string[];
  groups?: string[];
  id: string;
  images?: ImageCardData[] | null | undefined;
  incidents?: string[];
  make?: null | string | undefined;
  model?: null | string | undefined;
  newCustomGalleriesData?: CustomGalleryData[];
  offenders?: string[];
  reference?: null | number;
  registration?: null | string | undefined;
  totalOffenders?: null | number;
}

export interface VehicleCardData {
  colour?: null | string | undefined;
  crimeGroup?: string[];
  customGalleries?: string[];
  groups?: string[];
  id: string;
  images?: ImageCardData[] | null | undefined;
  incidents?: IncidentCardData[];
  make?: null | string;
  model?: null | string;
  offenders?: OffenderData[];
  reference?: null | number;
  registration?: null | string;
  totalOffenders?: null | number;
}

// CrimeGroupData
export interface CrimeGroupData {
  alias?: null | string;
  id: string;
  offenders?: string[];
  reference?: null | number;
  totalIncidents?: null | number;
  totalOffenders?: null | number;
  totalRecoveredValue?: null | number;
  totalTheftSuccess?: null | number;
  totalValue?: null | number;
  vehicles?: string[];
}

export interface CrimeGroupCardData {
  alias?: null | string;
  id: string;
  offenders?: OffenderData[];
  reference?: null | number;
  totalIncidents?: null | number;
  totalOffenders?: null | number;
  totalValue?: null | number;
  vehicles?: VehicleData[];
}

export interface InvestigationDetails {
  description?: null | string;
  groupIds?: string[];
  id: string;
  name?: string;
}

// image
export interface ImageCardData {
  deleted?: boolean;
  edited?: boolean;
  fileName?: null | string;
  id: string;
  isFace?: boolean | null | undefined;
  new?: boolean;
  offenders?: {
    id: string;
    images: { id: string; optimised?: null | string | undefined }[];
  }[];
  optimised?: null | string | undefined;
  policeImage?: boolean | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  rotation?: number;
  totalFaces?: number;
  type?: null | string;
  url?: null | string | undefined;
}

export interface Image extends UploadFile {
  deleted?: boolean;
  edited?: boolean;
  isFace?: boolean;
  new?: boolean;
  // id: string;
  optimised?: null | string;
  policeImage?: boolean;
  position?: ImagePosition;
  primary?: boolean;
  rotation?: number;
  totalFaces?: number;
}

export interface ImageFaceType {
  AgeRange: {
    High: number;
    Low: number;
  };
  Beard: boolean;
  BoundingBox: {
    Height: string;
    Left: string;
    Top: string;
    Width: string;
  };
  Gender: 'Female' | 'Male';
  Mustache: boolean;
  imageURL: string;
}

export interface EditFeedImage {
  id: string;
  optimised?: null | string | undefined;
  policeImage?: boolean | null | undefined;
  position?: ImagePosition;
  primary?: boolean | null | undefined;
  rotation?: number;
  url?: null | string | undefined;
}

// LocationData
export interface LocationData {
  alias?: null | string;
  building?: null | string;
  county?: null | string;
  full?: null | string;
  geoLat?: null | number;
  geoLng?: null | number;
  id?: string;
  postcode?: null | string;
  street?: null | string;
  townCity?: null | string;
}

export interface NewLocationData {
  full?: string;
  geoLat: number;
  geoLng: number;
  postcode?: string;
  street?: string;
  townCity?: string;
}

export interface ViewportData {
  full?: string;
  latitude: number;
  longitude: number;
  transitionDuration?: number;
  zoom?: number;
  // street?: string;
  // townCity?: string;
  // postcode?: string;
}

export interface AddressData {
  alias?: null | string;
  building?: null | string;
  county?: null | string;
  postcode: string;
  street: string;
  townCity: string;
}

// SchemeUserData
export interface SchemeUserData {
  businesses?: { id: string; name: string }[];
  businessesName?: string;
  firstLetter?: null | string;
  fullName: string;

  id: string;
  oldFullName: string;
}

// updateData
export interface DatedMessages {
  content?: null | string | undefined;
  createdAt?: Moment;
  crimeGroups?: CrimeGroupData[];
  from?: {
    businesses: { id: string; name: string }[];
    fullName: string;
    id: string;
  };
  id?: string;
  images?: ImageCardData[];
  incidents?: IncidentCardData[];
  offenders?: OffenderCardData[];
  vehicles?: VehicleData[];
}

// date
export interface DateType {
  endDate: Date;
  startDate: Date;
}

// businessData
export interface BusinessData {
  groups?: string[];
  id: string;
  isConnected?: boolean;
  isNew?: boolean;
  locations: LocationData[];
  name: string;
  newTags?: TagData[];
  parent?:
    | {
        id: string;
        name: string;
        // disconnectId?: string;
      }
    | null
    | undefined;
  publicName?: boolean;
  siteNumber?: string;
  tags?: string[];
}

export interface BrandData {
  businesses: string[];
  description?: null | string;
  id: string;
  name: string;
  schemeId?: string;
  // newBusinesses?: BusinessData[];
}

export interface CustomGalleryData {
  description?: null | string;
  groups?: string[];
  id: string;
  isConnected?: boolean;
  isNew?: boolean;
  name: string;
  schemes?: string[];
}

export interface CustomGalleryQueryData {
  description?: string;
  groups?: { id: string; name?: string }[];
  id: string;
  name: string;
}

export interface TagData {
  createdById: string;
  description?: string;
  id: string;
  isConnected?: boolean;
  isNew?: boolean;
  name: string;
  schemes: string[];
}

export interface NewTagData {
  createdById?: string;
  description?: string;
  id: string;
  isConnected?: boolean;
  isNew?: boolean;
  name: string;
  schemes: string[];
}

export interface CustomQuestion {
  answerType: AnswerType;
  dependentOnAnswerValue?: null | string;
  dependentOnBrandIds?: string[];
  dependentOnQuestionId?: null | string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  questionId: string;
  required: boolean;
  tagQuestionId: string;
  value: string;
}

export interface GoodsData {
  goodsType?:
    | {
        id: string;
      }
    | null
    | undefined;
  goodsTypeId?: string;
  id: string;
  name?: null | string | undefined;
  quantity?: null | number | undefined;
  recoveredQuantity?: null | number | undefined;
  recoveredValue?: null | number | undefined;
  sku?: null | string;
  stockItemId?: string;
  value?: null | number | undefined;
}

export enum UserSort {
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC',
  nameAsc = 'NAME_ASC',
  nameDesc = 'NAME_DESC',
}

export interface ArticleData {
  createdBy?: {
    businesses?: { id: string; name: string }[];
    fullName: string;
    id: string;
  };
  id: string;
  image?: ImageCardData | null;
  images?: ImageCardData[];
  previewText?: null | string | undefined;
  priority: ArticlePriority;
  title: string;
  updatedAt?: Date;
  watermarkImage?: boolean;
}

export interface Update {
  createdAt: Moment;
  createdBy: {
    businesses: { fullName: string; id: string; name: string }[];
    fullName: string;
    id: string;
    origName: string;
  };
  id: string;
  images?: ImageCardData[];
  linkedArticles?: ArticleData[];
  linkedCrimeGroups?: CrimeGroupData[];
  linkedIncidents?: IncidentCardData[];
  linkedOffenders?: OffenderCardData[];
  linkedVehicles?: VehicleData[];
  text?: null | string | undefined;
  type: UpdateType;
}

export interface UpdateData extends Update {
  replies: Update[];
}

export interface OffenderSettingsType {
  age: boolean;
  alias: boolean;
  build: boolean;
  comment: boolean;
  dateOfBirth: boolean;
  dateOfBirthSource: boolean;
  ethnicity: boolean;
  gender: boolean;
  hair: boolean;
  height: boolean;
  idVerified: boolean;
  images: boolean;
  name: boolean;
  peculiarities: boolean;
}
