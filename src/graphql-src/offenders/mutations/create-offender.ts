import { gql } from "@apollo/client";
import { FullOffender, FullOffenderType } from "../fragments";
import { Age, Build, Gender, Race } from "../enums";

export const CreateOffender = gql`
  mutation createOffender($data: CreateOffenderData!) {
    createOffender(data: $data) {
      ...FullOffender
    }
  }
  ${FullOffender}
`;

export interface CreateOffenderArgs {
  age?: Age;
  bans?: {
    description?: string;
    title?: string;
    endDate: Date;
    location: string;
    startDate: Date;
    scheme: {
      connect: {
        id: string;
      }[];
    };
  }[];
  build?: Build;
  dateOfBirth?: Date;
  dateSource?: string;
  gender?: Gender;
  groups?: {
    connect: {
      id: string;
    }[];
  };
  hair?: string;
  image?: {
    connect: {
      id: string;
    };
  };
  name?: string;
  tags?: {
    connect: {
      id: string;
    }[];
  };
  peculiarities?: string;
  race?: Race;
  scheme: string;
}

export interface CreateOffenderRes {
  createOffender: FullOffenderType;
}
