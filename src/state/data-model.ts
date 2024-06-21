/* eslint-disable no-param-reassign */
import type { Action } from 'easy-peasy';
import { action } from 'easy-peasy';

import type { DateType } from 'types/DataType';
import type {
  Age,
  ArticlePriority,
  Build,
  Gender,
  InvestigationStatus,
  Model,
  Race,
  Role,
} from 'graphql/types';
import { IncidentPriority, SortOrder } from 'graphql/types';

export enum IncidentSort {
  createdAtDesc = 'CREATED_AT_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
}

export enum OffenderSort {
  updatedAtDesc = 'UPDATED_AT_DESC',
  updatedAtAsc = 'UPDATED_AT_ASC',
  incidentValueDesc = 'INCIDENT_VALUE_DESC',
  incidentValueAsc = 'INCIDENT_VALUE_ASC',
  noIncidentDesc = 'NO_INCIDENT_DESC',
  noIncidentAsc = 'NO_INCIDENT_ASC',
}

export interface IncidentFilters {
  search: string;
  crimeTypes: string[];
  groups: string[];
  createdBy: string[];
  businesses: string[];
  goods: string[];
  createdAt: DateType | undefined;
  incidentDate: DateType | undefined;
  gallery: string[];
  peculiarities: string;
  compactView: boolean;
  tableView: boolean;
  priority: IncidentPriority[];
}

export interface OffenderFilters {
  search: string;
  hair: string;
  peculiarities: string;
  gallery: string[];
  customGalleries: string[];
  businesses: string[];
  warnings: string[];
  groups: string[];
  createdBy: string[];
  ethnicity: Race[];
  build: Build[];
  age: Age[];
  sex: Gender[];
  createdAt:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
  compactView: boolean;
  tableView: boolean;
}

export interface FeedItemFilters {
  order: SortOrder;
  groups: string[];
  search: string;
  gallery: string[];
  createdAt:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
  types: Model[];
}

export interface VehicleFilters {
  order: SortOrder;
  groups: string[];
  search: string;
  gallery: string[];
  customGalleries: string[];
  createdAt:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
}

export interface CrimeGroupFilters {
  order: SortOrder;
  groups: string[];
  search: string;
  gallery: string[];
  createdAt:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
}

export interface InvestigationFilters {
  orderBy: 'createdAtAsc' | 'createdAtDesc';
  groups: string[];
  createdAt:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
}

export interface ArticleFilters {
  order: SortOrder;
  groups: string[];
  createdAt:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
  priorities: ArticlePriority[];
  search: string;
  gallery: string[];
}

export interface UserFilters {
  orderBy: UserSort;
  groups: string[];
  status: UserStatus | undefined;
  roles: Role[];
}

export enum UserSort {
  createdAtDesc = 'CREATED_AT_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  nameDesc = 'NAME_DESC',
  nameAsc = 'NAME_ASC',
}

export enum UserStatus {
  'ACTIVE' = 'ACTIVE',
  'DISABLED' = 'DISABLED',
  'INVITED' = 'INVITED',
  'ALL' = 'ALL',
}

interface Incidents {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: IncidentFilters;
  order: IncidentSort;
  // gallery: string[];
}

interface Offenders {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: OffenderFilters;
  order: OffenderSort;
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
    status: InvestigationStatus[];
    search: string;
  };
}

export interface DataModel {
  incidents: Incidents;
  offenders: Offenders;
  feedItems: FeedItems;
  vehicles: Vehicles;
  crimeGroups: CrimeGroups;
  investigations: Investigations;
  articles: Articles;
  setArticles: Action<DataModel, Articles>;
  setIncidents: Action<DataModel, Incidents>;
  setIncidentPriority: Action<DataModel, IncidentPriority[]>;
  setOffenders: Action<DataModel, Offenders>;
  setFeedItems: Action<DataModel, FeedItems>;
  setVehicles: Action<DataModel, Vehicles>;
  setCrimeGroups: Action<DataModel, CrimeGroups>;
  setInvestigations: Action<DataModel, Investigations>;
  setInvestigationGroupsFilter: Action<DataModel, string[]>;
  setInvestigationStatusFilter: Action<DataModel, InvestigationStatus[]>;
  setInvestigationSearch: Action<DataModel, string>;
  setInvestigationTakeAllSchemes: Action<DataModel, boolean>;
}

const dataModel: DataModel = {
  incidents: {
    pagination: {
      page: 1,
      pageSize: 12,
      sizeOptions: ['12'],
    },
    variables: {
      search: '',
      crimeTypes: [],
      groups: [],
      createdBy: [],
      businesses: [],
      createdAt: undefined,
      incidentDate: undefined,
      goods: [],
      gallery: [],
      peculiarities: '',
      compactView: false,
      tableView: false,
      priority: [
        IncidentPriority.High,
        IncidentPriority.Medium,
        IncidentPriority.Normal,
      ],
    },
    order: IncidentSort.createdAtDesc,
    // gallery: []
  },

  setIncidents: action((state, payload) => {
    state.incidents = payload;
  }),
  setIncidentPriority: action((state, payload) => {
    state.incidents.variables.priority = payload;
  }),

  offenders: {
    pagination: {
      page: 1,
      pageSize: 24,
      sizeOptions: ['24'],
    },
    variables: {
      search: '',
      warnings: [],
      groups: [],
      createdBy: [],
      businesses: [],
      createdAt: undefined,
      gallery: [],
      customGalleries: [],
      peculiarities: '',
      hair: '',
      ethnicity: [],
      build: [],
      age: [],
      sex: [],
      compactView: false,
      tableView: false,
    },
    order: OffenderSort.updatedAtDesc,
  },

  setOffenders: action((state, payload) => {
    state.offenders = payload;
  }),

  feedItems: {
    pagination: {
      page: 1,
      pageSize: 10,
      sizeOptions: ['10'],
    },
    variables: {
      order: SortOrder.Desc,
      search: '',
      createdAt: undefined,
      gallery: [],
      groups: [],
      types: [],
    },
  },

  setFeedItems: action((state, payload) => {
    state.feedItems = payload;
  }),
  articles: {
    variables: {
      order: SortOrder.Desc,
      createdAt: undefined,
      groups: [],
      priorities: [],
      search: '',
      gallery: [],
    },
  },
  setArticles: action((state, payload) => {
    state.articles = payload;
  }),

  vehicles: {
    pagination: {
      page: 1,
      pageSize: 20,
      sizeOptions: ['20'],
    },
    variables: {
      order: SortOrder.Desc,
      search: '',
      createdAt: undefined,
      gallery: [],
      customGalleries: [],
      groups: [],
    },
  },

  setVehicles: action((state, payload) => {
    state.vehicles = payload;
  }),

  crimeGroups: {
    pagination: {
      page: 1,
      pageSize: 20,
      sizeOptions: ['20'],
    },
    variables: {
      order: SortOrder.Desc,
      search: '',
      createdAt: undefined,
      gallery: [],
      groups: [],
    },
  },

  setCrimeGroups: action((state, payload) => {
    state.crimeGroups = payload;
  }),

  investigations: {
    takeAllSchemes: false,
    variables: { groups: [], status: [], search: '' },
  },

  setInvestigations: action((state, payload) => {
    state.investigations = payload;
  }),
  setInvestigationTakeAllSchemes: action((state, payload) => {
    state.investigations.takeAllSchemes = payload;
  }),
  setInvestigationSearch: action((state, payload) => {
    state.investigations.variables.search = payload || '';
  }),
  setInvestigationGroupsFilter: action((state, payload) => {
    state.investigations.variables.groups = payload || [];
  }),
  setInvestigationStatusFilter: action((state, payload) => {
    state.investigations.variables.status = payload || [];
  }),
};

export default dataModel;
