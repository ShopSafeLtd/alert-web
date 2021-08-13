import { gql } from "@apollo/client";
import { FullOffender, FullOffenderType } from "../fragments";
import { Age, Build, Gender, Race } from "../enums";

export const CreateOffender = gql`
  mutation createOffender(
    $age: Age
    $bans: [BanCreateWithoutOffenderInput!]
    $build: Build
    $dateOfBirth: DateTime
    $dateSource: String
    $gender: Gender
    $groups: GroupCreateNestedManyWithoutOffendersInput
    $hair: String
    $images: [UploadOffenderImage!]
    $image: ImageCreateNestedManyWithoutOffendersInput
    $name: String
    $tags: TagCreateNestedManyWithoutOffendersInput
    $peculiarities: String
    $race: Race
    $scheme: String!
  ) {
    createOffender(
      data: {
        age: $age
        bans: $bans
        build: $build
        dateOfBirth: $dateOfBirth
        dateSource: $dateSource
        gender: $gender
        groups: $groups
        hair: $hair
        images: $images
        image: $image
        name: $name
        tags: $tags
        peculiarities: $peculiarities
        race: $race
        scheme: $scheme
      }
    ) {
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
  images?: any; // add type once image upload process is in place
  image?: any; // add type once image upload process is in place
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
