import gql from "graphql-tag";
import { FullIncident, FullIncidentType } from "../fragments";

import { Age, Gender, Build, Race } from "../../offenders/enums";

export const UpdateIncident = gql`
  mutation updateIncident($where: UniqueId!, $data: IncidentUpdateInput!) {
    updateIncident(where: $where, data: $data) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface UpdateIncidentArgs {
  where: { id: string };
  data: {
    subject?: {
      set: string;
    };
    description?: { set: string };
    date?: { set: Date };
    time?: { set: Date };
    location?: {
      update: {
        premises: { set: string };
        building: { set: string };
        street: { set: string };
        townCity: { set: string };
        county: { set: string };
        postcode: { set: string };
      };
    };
    crimeTypes?: {
      connect?: { id: string }[];
      disconnect?: { id: string }[];
    };
    offenders?: {
      connect?: { id: string }[];
      disconnect?: { id: string }[];
      create?: {
        age?: Age;
        build: Build;
        dateOfBirth?: Date | string;
        dateSource?: string;
        gender: Gender;
        hair: string;
        name: string;
        peculiarities: string;
        race: Race;
        scheme: {
          connect: { id: string };
        };
        createdBy: {
          connect: { id: string };
        };
      }[];
    };
    images?: {
      disconnect?: { id: string }[];
      connect?: { id: string }[];
      update?: {
        where: { id: string };
        data: {
          offenders: {
            connect?: { id: string }[];
            disconnect?: { id: string }[];
          };
        };
      };
    };
    groups?: {
      connect?: { id: string }[];
      disconnect?: { id: string }[];
    };
  };
}

export interface UpdateIncidentRes {
  updateIncident: FullIncidentType;
}
