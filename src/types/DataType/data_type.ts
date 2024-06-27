import type { UploadFile } from 'antd';

import type { Moment } from 'moment';
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
import type { ListIncidentsQuery } from 'graphql/incidents/queries/list-incidents.generated';

// BanData
export interface BanData {
  id: string;
  type?: BanType | null;
  endDate?: Date;
  startDate?: Date;
  location?: string;
  description?: string | null | undefined;
  months?: number | null | undefined;
  fineValue?: number | null | undefined;
}

// Offender
export interface OffenderData {
  id: string;
  reference?: number | null;
  name?: string | null;
  alias?: string[] | null;
  knownFor?: string[] | null;
  targetedGoods?: string[] | null;
  infoSource?: string | null;
  justification?: string | null;
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
  tags?: {
    id: string;
    name: string;
  }[];
  lastActive?:
    | { id: string; dayTime?: string | null | undefined }
    | null
    | undefined;
  images?: ImageCardData[] | null | undefined;
  imageUid?: string[] | undefined;
  bans?: BanData[] | undefined;
  idVerified?: boolean;
  idSource?: IdSource | null;
  new?: boolean;
  existing?: boolean;
  edited?: boolean;
}

export interface OffenderCardData {
  id: string;
  reference?: number | null;
  updatedAt?: Date | undefined;
  name?: string | null;
  images?:
    | Array<{
        id: string;
        url?: string | null;
        optimised?: string | null;
      }>
    | null
    | undefined;
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
  dayTime?: string | undefined | null;
  images?: ImageCardData[] | null | undefined;
  crimeTypes?: Array<{
    id: string;
    name: string;
  }>;
  createdBy?: {
    id: string;
    fullName: string;
    businesses: Array<{ id: string; name: string }>;
  };
  policeRef?: string | undefined | null;
  totalValue?: number | undefined | null;
  totalRecoveredValue?: number | null;
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
  images?: ImageCardData[] | null | undefined;
}

export interface VehicleCardData {
  id: string;
  make?: string | null;
  model?: string | null;
  colour?: string | null | undefined;
  registration?: string | null;
  reference?: number | null;
  totalOffenders?: number | null;
  groups?: string[];
  crimeGroup?: string[];
  customGalleries?: string[];
  images?: ImageCardData[] | null | undefined;
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
  totalIncidents?: number | null;
  totalValue?: number | null;
  vehicles?: VehicleData[];
  offenders?: OffenderData[];
}

export interface InvestigationDetails {
  id: string;
  name?: string;
  description?: string | null;
  groupIds?: string[];
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
  isFace?: boolean | null | undefined;
  policeImage?: boolean | null | undefined;
  rotation?: number;
  totalFaces?: number;
  offenders?: {
    id: string;
    images: { id: string; optimised?: string | undefined | null }[];
  }[];
}

export interface Image extends UploadFile {
  // id: string;
  optimised?: string | null;
  position?: ImagePosition;
  primary?: boolean;
  policeImage?: boolean;
  rotation?: number;
  totalFaces?: number;
  edited?: boolean;
  new?: boolean;
  deleted?: boolean;
  isFace?: boolean;
}

export interface ImageFaceType {
  imageURL: string;
  Gender: 'Male' | 'Female';
  AgeRange: {
    High: number;
    Low: number;
  };
  Beard: boolean;
  Mustache: boolean;
  BoundingBox: {
    Height: string;
    Left: string;
    Top: string;
    Width: string;
  };
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
  id?: string;
  alias?: string | null;
  building?: string | null;
  street?: string | null;
  townCity?: string | null;
  county?: string | null;
  postcode?: string | null;
  geoLat?: number | null;
  geoLng?: number | null;
  full?: string | null;
}

export interface NewLocationData {
  geoLat: number;
  geoLng: number;
  full?: string;
  street?: string;
  townCity?: string;
  postcode?: string;
}

export interface ViewportData {
  latitude: number;
  longitude: number;
  full?: string;
  zoom?: number;
  transitionDuration?: number;
  // street?: string;
  // townCity?: string;
  // postcode?: string;
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
  businessesName?: string;
  businesses?: { id: string; name: string }[];

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
  startDate: Date;
  endDate: Date;
}

// businessData
export interface BusinessData {
  id: string;
  name: string;
  publicName?: boolean;
  siteNumber?: string;
  parent?:
    | {
        id: string;
        name: string;
        // disconnectId?: string;
      }
    | null
    | undefined;
  locations: LocationData[];
  tags?: string[];
  newTags?: TagData[];
  groups?: string[];
  isConnected?: boolean;
  isNew?: boolean;
}

export interface BrandData {
  id: string;
  name: string;
  description?: string | null;
  schemeId?: string;
  businesses: string[];
  // newBusinesses?: BusinessData[];
}

export interface CustomGalleryData {
  id: string;
  name: string;
  description?: string | null;
  groups?: string[];
  schemes?: string[];
  isConnected?: boolean;
  isNew?: boolean;
}

export interface CustomGalleryQueryData {
  id: string;
  name: string;
  description?: string;
  groups?: { id: string; name?: string }[];
}

export interface TagData {
  id: string;
  name: string;
  description?: string;
  schemes: string[];
  createdById: string;
  isConnected?: boolean;
  isNew?: boolean;
}

export interface NewTagData {
  id: string;
  name: string;
  description?: string;
  schemes: string[];
  createdById?: string;
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
  dependentOnQuestionId?: string | null;
  dependentOnAnswerValue?: string | null;
  dependentOnBrandIds?: string[];
}

export interface GoodsData {
  id: string;
  goodsType?: string;
  value?: number;
  recoveredValue?: number;
  quantity?: number;
  recoveredQuantity?: number;
  sku?: string;
  name?: string;
  stockItem?: string;
  // id: string;
  // name?: string | undefined | null;
  // value?: number | undefined | null;
  // recoveredValue?: number | undefined | null;
  // goodsType?:
  //   | {
  //       id: string;
  //     }
  //   | undefined
  //   | null;
  // goodsTypeId?: string;
}

export enum UserSort {
  createdAtDesc = 'CREATED_AT_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  nameDesc = 'NAME_DESC',
  nameAsc = 'NAME_ASC',
}

export interface ArticleData {
  id: string;
  title: string;
  previewText?: string | undefined | null;
  priority: ArticlePriority;
  createdBy?: {
    id: string;
    fullName: string;
    businesses?: Array<{ id: string; name: string }>;
  };
  watermarkImage?: boolean;
  image?: ImageCardData | null;
  images?: ImageCardData[];
  updatedAt?: Date;
}

export interface Update {
  id: string;
  text?: string | undefined | null;
  createdBy: {
    id: string;
    origName: string;
    fullName: string;
    businesses: { id: string; name: string; fullName: string }[];
  };
  images?: ImageCardData[];
  linkedOffenders?: OffenderCardData[];
  linkedIncidents?: IncidentCardData[];
  linkedVehicles?: VehicleData[];
  linkedCrimeGroups?: CrimeGroupData[];
  linkedArticles?: ArticleData[];
  createdAt: Moment;
  type: UpdateType;
}

export interface UpdateData extends Update {
  replies: Update[];
}

export interface OffenderSettingsType {
  name: boolean;
  alias: boolean;
  ethnicity: boolean;
  gender: boolean;
  build: boolean;
  height: boolean;
  hair: boolean;
  age: boolean;
  dateOfBirth: boolean;
  dateOfBirthSource: boolean;
  idVerified: boolean;
  peculiarities: boolean;
  comment: boolean;
  images: boolean;
}

export interface ActivityData {
  id: string;
  name?: string | null | undefined;
  description?: string | null | undefined;
  createdAt?: Date | null | undefined;
  completedDate?: Date | null | undefined;
  assignedUsers: { id: string; fullName: string }[];
  groups: { id: string; name: string }[];
  completed?: boolean | null | undefined;
}
