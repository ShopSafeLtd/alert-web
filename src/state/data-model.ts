/* eslint-disable no-param-reassign */
import { action, Action } from 'easy-peasy';

export enum IncidentSort {
  createdAtDesc = 'CREATED_AT_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
}
export enum OffenderSort {
  updatedAtDesc = 'UPDATED_AT_DESC',
  updatedAtAsc = 'UPDATED_AT_ASC',
}
export enum FeedItemSort {
  updatedAtDesc = 'UPDATED_AT_DESC',
  updatedAtAsc = 'UPDATED_AT_ASC',
}
interface Incidents {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: {
    search: string;
    crimeTypes: string[];
    groups: string[];
  };
  order: IncidentSort;
}
interface Offenders {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: {
    search: string;
    tags: string[];
    groups: string[];
  };
  order: OffenderSort;
}
interface FeedItems {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };
  variables: {
    search: string;
    groups: string[];
  };
  order: FeedItemSort;
}

interface Vehicles {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };

  search: string;
}
interface CrimeGroups {
  pagination: {
    page: number;
    pageSize: number;
    sizeOptions: string[];
  };

  search: string;
}
export interface DataModel {
  incidents: Incidents;
  offenders: Offenders;
  feedItems: FeedItems;
  vehicles: Vehicles;
  crimeGroups: CrimeGroups;

  setIncidents: Action<DataModel, Incidents>;
  setOffenders: Action<DataModel, Offenders>;
  setFeedItems: Action<DataModel, FeedItems>;
  setVehicles: Action<DataModel, Vehicles>;
  setCrimeGroups: Action<DataModel, CrimeGroups>;
}

const dataModel: DataModel = {
  incidents: {
    pagination: {
      page: 1,
      pageSize: 24,
      sizeOptions: ['24'],
    },
    variables: {
      search: '',
      crimeTypes: [],
      groups: [],
    },
    order: IncidentSort.createdAtDesc,
  },

  setIncidents: action((state, payload) => {
    state.incidents = payload;
  }),

  offenders: {
    pagination: {
      page: 1,
      pageSize: 24,
      sizeOptions: ['24'],
    },
    variables: {
      search: '',
      tags: [],
      groups: [],
    },
    order: OffenderSort.updatedAtDesc,
  },

  setOffenders: action((state, payload) => {
    state.offenders = payload;
  }),

  feedItems: {
    pagination: {
      page: 1,
      pageSize: 20,
      sizeOptions: ['20'],
    },
    variables: {
      search: '',
      groups: [],
    },
    order: FeedItemSort.updatedAtDesc,
  },

  setFeedItems: action((state, payload) => {
    state.feedItems = payload;
  }),

  vehicles: {
    pagination: {
      page: 1,
      pageSize: 20,
      sizeOptions: ['20'],
    },

    search: '',
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
    search: '',
  },

  setCrimeGroups: action((state, payload) => {
    state.crimeGroups = payload;
  }),
};

export default dataModel;
