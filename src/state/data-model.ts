import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';
import type {
  Age,
  ArticlePriority,
  Build,
  CompleteStatus,
  Gender,
  InvestigationStatus,
  Model,
  PoliceForce,
  Race,
} from 'graphql/types';
import { IncidentPriority, SortOrder } from 'graphql/types';
import type { DateType } from 'types/DataType';

export enum IncidentSort {
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC',
}

export enum OffenderSort {
  incidentValueAsc = 'INCIDENT_VALUE_ASC',
  incidentValueDesc = 'INCIDENT_VALUE_DESC',
  noIncidentAsc = 'NO_INCIDENT_ASC',
  noIncidentDesc = 'NO_INCIDENT_DESC',
  updatedAtAsc = 'UPDATED_AT_ASC',
  updatedAtDesc = 'UPDATED_AT_DESC',
}

export interface IncidentFilters {
  businesses: string[];
  compactView: boolean;
  createdAt: DateType | undefined;
  createdBy: string[];
  crimeTypes: string[];
  gallery: string[];
  goods: string[];
  groups: string[];
  incidentDate: DateType | undefined;
  peculiarities: string;
  priority: IncidentPriority[];
  search: string;
  tableView: boolean;
  policeAreas?: PoliceForce[];
}

export interface OffenderFilters {
  age: Age[];
  build: Build[];
  businesses: string[];
  compactView: boolean;
  createdAt:
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined;
  createdBy: string[];
  crimeTypes: string[];
  customGalleries: string[];
  ethnicity: Race[];
  gallery: string[];
  groups: string[];
  hair: string;
  peculiarities: string;
  search: string;
  sex: Gender[];
  tableView: boolean;
  warnings: string[];
  policeAreas?: PoliceForce[];
}

export interface FeedItemFilters {
  createdAt:
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined;
  gallery: string[];
  groups: string[];
  order: SortOrder;
  search: string;
  types: Model[];
}

export interface VehicleFilters {
  createdAt:
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined;
  customGalleries: string[];
  gallery: string[];
  groups: string[];
  order: SortOrder;
  search: string;
  policeAreas?: PoliceForce[];
}

export interface CrimeGroupFilters {
  createdAt:
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined;
  gallery: string[];
  groups: string[];
  order: SortOrder;
  search: string;
}

export interface InvestigationFilters {
  createdAt:
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined;
  groups: string[];
  orderBy: 'createdAtAsc' | 'createdAtDesc';
}

export interface ArticleFilters {
  createdAt:
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined;
  gallery: string[];
  groups: string[];
  order: SortOrder;
  priorities: ArticlePriority[];
  search: string;
  status: CompleteStatus[];
}

export enum UserSort {
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC',
  nameAsc = 'NAME_ASC',
  nameDesc = 'NAME_DESC',
}

export enum UserStatus {
  'ACTIVE' = 'ACTIVE',
  'ALL' = 'ALL',
  'DISABLED' = 'DISABLED',
  'INVITED' = 'INVITED',
}

interface Incidents {
  order: IncidentSort;
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: IncidentFilters;
  // gallery: string[];
}

interface Offenders {
  order: OffenderSort;
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: OffenderFilters;
}

interface FeedItems {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: FeedItemFilters;
}

interface Articles {
  variables: ArticleFilters;
}

interface Vehicles {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: VehicleFilters;
}

interface CrimeGroups {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: CrimeGroupFilters;
}

interface Investigations {
  takeAllSchemes: boolean;
  variables: {
    groups: string[];
    search: string;
    status: InvestigationStatus[];
  };
}

export interface DataModel {
  articles: Articles;
  crimeGroups: CrimeGroups;
  feedItems: FeedItems;
  incidents: Incidents;
  investigations: Investigations;
  offenders: Offenders;
  setArticles: Action<DataModel, Articles>;
  setCrimeGroups: Action<DataModel, CrimeGroups>;
  setFeedItems: Action<DataModel, FeedItems>;
  setIncidentPriority: Action<DataModel, IncidentPriority[]>;
  setIncidents: Action<DataModel, Incidents>;
  setInvestigationGroupsFilter: Action<DataModel, string[]>;
  setInvestigationSearch: Action<DataModel, string>;
  setInvestigationStatusFilter: Action<DataModel, InvestigationStatus[]>;
  setInvestigationTakeAllSchemes: Action<DataModel, boolean>;
  setInvestigations: Action<DataModel, Investigations>;
  setOffenders: Action<DataModel, Offenders>;
  setVehicles: Action<DataModel, Vehicles>;
  vehicles: Vehicles;
  policeAreas?: PoliceForce[];
}

const dataModel: DataModel = {
  articles: {
    variables: {
      createdAt: undefined,
      gallery: [],
      groups: [],
      order: SortOrder.Desc,
      priorities: [],
      search: '',
      status: [],
    },
  },

  crimeGroups: {
    pagination: {
      page: 1,
      pageSize: 20,
      sizeOptions: ['20'],
    },
    variables: {
      createdAt: undefined,
      gallery: [],
      groups: [],
      order: SortOrder.Desc,
      search: '',
    },
  },
  feedItems: {
    pagination: {
      page: 1,
      pageSize: 10,
      sizeOptions: ['10'],
    },
    variables: {
      createdAt: undefined,
      gallery: [],
      groups: [],
      order: SortOrder.Desc,
      search: '',
      types: [],
    },
  },

  incidents: {
    order: IncidentSort.createdAtDesc,
    pagination: {
      page: 1,
      pageSize: 12,
      sizeOptions: ['12'],
    },
    variables: {
      businesses: [],
      compactView: false,
      createdAt: undefined,
      createdBy: [],
      crimeTypes: [],
      gallery: [],
      goods: [],
      groups: [],
      incidentDate: undefined,
      peculiarities: '',
      priority: [
        IncidentPriority.High,
        IncidentPriority.Medium,
        IncidentPriority.Normal,
      ],
      search: '',
      tableView: false,
    },
    // gallery: []
  },

  investigations: {
    takeAllSchemes: false,
    variables: { groups: [], search: '', status: [] },
  },

  offenders: {
    order: OffenderSort.updatedAtDesc,
    pagination: {
      page: 1,
      pageSize: 24,
      sizeOptions: ['24'],
    },
    variables: {
      age: [],
      build: [],
      businesses: [],
      compactView: false,
      createdAt: undefined,
      createdBy: [],
      crimeTypes: [],
      customGalleries: [],
      ethnicity: [],
      gallery: [],
      groups: [],
      hair: '',
      peculiarities: '',
      search: '',
      sex: [],
      tableView: false,
      warnings: [],
    },
  },

  setArticles: action((state, payload) => {
    state.articles = payload;
  }),
  setCrimeGroups: action((state, payload) => {
    state.crimeGroups = payload;
  }),
  setFeedItems: action((state, payload) => {
    state.feedItems = payload;
  }),

  setIncidentPriority: action((state, payload) => {
    state.incidents.variables.priority = payload;
  }),

  setIncidents: action((state, payload) => {
    state.incidents = payload;
  }),

  setInvestigationGroupsFilter: action((state, payload) => {
    state.investigations.variables.groups = payload || [];
  }),

  setInvestigationSearch: action((state, payload) => {
    state.investigations.variables.search = payload || '';
  }),

  setInvestigationStatusFilter: action((state, payload) => {
    state.investigations.variables.status = payload || [];
  }),

  setInvestigationTakeAllSchemes: action((state, payload) => {
    state.investigations.takeAllSchemes = payload;
  }),
  setInvestigations: action((state, payload) => {
    state.investigations = payload;
  }),
  setOffenders: action((state, payload) => {
    state.offenders = payload;
  }),
  setVehicles: action((state, payload) => {
    state.vehicles = payload;
  }),
  vehicles: {
    pagination: {
      page: 1,
      pageSize: 20,
      sizeOptions: ['20'],
    },
    variables: {
      createdAt: undefined,
      customGalleries: [],
      gallery: [],
      groups: [],
      order: SortOrder.Desc,
      search: '',
    },
  },
};

export default dataModel;
