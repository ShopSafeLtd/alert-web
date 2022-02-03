import { gql } from "@apollo/client";
import { Image, ImageType } from "../../images/fragments";
import { Age, Build, Gender, Race } from "../enums";

export const Offenders = gql`
  query offenders(
    $where: OffenderWhereInput
    $after: OffenderWhereUniqueInput
    $orderBy: [OffenderOrderByWithRelationInput!]
  ) {
    offenders(where: $where, first: 20, after: $after, orderBy: $orderBy) {
      id
      age
      build
      gender
      hair
      name
      peculiarities
      race
      dateOfBirth
      dateSource
      images {
        ...Image
      }
    }
  }
  ${Image}
`;

export interface OffendersArgs {
  where: {
    id?: { notIn: string[] };
    scheme: { id: { equals: string } };
    approved: { equals: boolean };
    name?: { contains: string };
  };
  after?: { id: string };
}

export interface OffendersRes {
  id: string;
  age: Age;
  build: Build;
  gender: Gender;
  hair: string;
  name: string;
  peculiarities: string;
  race: Race;
  dateOfBirth: string;
  dateSource: string;
  images: ImageType;
}
