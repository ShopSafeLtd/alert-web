import gql from "graphql-tag";

import { FullIncident, FullIncidentType } from "../fragments";
import { Age, Build, Gender, Race } from "../../offenders/enums";

export const CreateIncident = gql`
  mutation createIncident($data: CreatIncidentData!) {
    createIncident(data: $data) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface CreateIncidentArgs {
  data: {
    subject: string;
    date: Date;
    time: Date;
    description: string;
    crimeTypes: {
      id: string;
    }[];
    location: {
      create?: {
        building: string;
        county: string;
        postcode: string;
        premises: string;
        street: string;
        townCity: string;
      };
      previous?: {
        id: string;
      };
    };
    offenders: {
      connect?: {
        id: string;
      }[];
      create?: {
        age?: Age;
        build?: Build;
        dateOfBirth?: Date;
        dateSource?: string;
        gender?: Gender;
        hair?: string;
        name?: string;
        peculiarities?: string;
        race: Race;
      }[];
    };
    images: {
      connect: {
        id: string;
      }[];
      // create?: {
      //   file: any;
      //   offenders?: {
      //     id: string;
      //     new: boolean;
      //   }[];
      // }[];
    };
    groups: {
      id: string;
    }[];
    scheme: string;
  };
}

export interface CreateIncidentRes {
  createIncident: FullIncidentType;
}
