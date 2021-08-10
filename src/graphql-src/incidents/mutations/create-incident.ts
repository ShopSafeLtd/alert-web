import gql from "graphql-tag";

import { FullIncident, FullIncidentType } from "../fragments";
import { Age, Build, Gender, Race } from "../../offenders/enums";

export const CreateIncident = gql`
  mutation createIncident(
    $subject: String!
    $date: DateTime!
    $time: DateTime!
    $description: String!
    $crimeTypes: [UniqueId]
    $location: CreateIncidentLocation!
    $offenders: CreateIncidentOffenders!
    $images: CreatIncidentImages!
    $groups: [UniqueId]!
    $scheme: String!
  ) {
    createIncident(
      data: {
        subject: $subject
        date: $date
        time: $time
        description: $description
        crimeTypes: $crimeTypes
        location: $location
        images: $images
        groups: $groups
        scheme: $scheme
        offenders: $offenders
      }
    ) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface CreateIncidentArgs {
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
}

export interface CreateIncidentRes {
  createIncident: FullIncidentType;
}
