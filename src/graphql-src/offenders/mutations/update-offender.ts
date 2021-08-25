import { gql } from "@apollo/client";
import { Age, Build, Gender, Race } from "../enums";
import { FullOffender, FullOffenderType } from "../fragments";

export const UpdateOffender = gql`
  mutation updateOffender($data: OffenderUpdateInput!, $where: UniqueId!) {
    updateOffender(where: $where, data: $data) {
      ...FullOffender
    }
  }
  ${FullOffender}
`;

export interface UpdateOffenderArgs {
  id: string;
  age?: { set: Age };
  build?: { set: Build };
  dateOfBirth?: { set: Date };
  dateSource?: { set: string };
  gender?: { set: Gender };
  hair?: { set: string };
  name?: { set: string };
  peculiarities?: { set: string };
  race?: { set: Race };
  bans?: {
    create?: {
      location: string;
      description: string;
      startDate: Date;
      endDate: Date;
      scheme: {
        connect: { id: string };
      };
      createdBy: {
        connect: { id: string };
      };
    }[];
    update?: {
      where: { id: string };
      data: {
        location?: { set: string };
        description?: { set: string };
        startDate?: { set: Date };
        endDate?: { set: Date };
      };
    }[];
    delete?: { id: string }[];
  };
  tags?: {
    connect?: { id: string }[];
    disconnect?: { id: string }[];
    create?: {
      description: string;
      name: string;
      dataType: "OFFENDER";
      createdBy: {
        connect: {
          id: string;
        };
      };
      scheme: {
        connect: {
          id: string;
        };
      };
    }[];
  };
  groups?: {
    connect?: { id: string }[];
    disconnect?: { id: string }[];
  };
  images?: {
    connect?: { id: string }[];
    disconnect?: { id: string }[];
  };
}

export interface UpdateOffenderRes {
  updateOffender: FullOffenderType;
}
