import { action, Action } from "easy-peasy";

export enum IncidentSort {
  createdAtDesc = "CREATED_AT_DESC",
  createdAtAsc = "CREATED_AT_ASC",
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

export interface DataModel {
  incidents: Incidents;

  setIncidents: Action<DataModel, Incidents>;
}

const dataModel: DataModel = {
  incidents: {
    pagination: {
      page: 1,
      pageSize: 24,
      sizeOptions: ["24"],
    },
    variables: {
      search: '',
      crimeTypes: [],
      groups: [],
    },
    order: IncidentSort.createdAtDesc
  },

  setIncidents: action((state, payload) => {
    state.incidents = payload;
  }),
};

export default dataModel;
