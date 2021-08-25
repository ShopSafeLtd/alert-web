import gql from "graphql-tag";
import { CreatedBy, CreatedByType } from "../../users/fragments";
import { BasicGroup, BasicGroupType } from "../../groups/fragments";
import { BasicLocation, BasicLocationType } from "../../address/fragments";
import { Tag, TagType } from "../../tags/fragments";
import { Image, ImageType } from "../../images/fragments";
import { Ban, BanType } from "../../bans/fragments";
import { Age, Build, Gender, Race } from "../enums";

export const OffenderFeed = gql`
  query offenderFeed(
    $schemeId: String!
    $userId: String!
    $order: OffenderOrderByInput
    $search: String
    $first: Int
    $cursor: String
    $active: Boolean
    $banned: Boolean
  ) {
    offenderFeed(
      schemeId: $schemeId
      userId: $userId
      order: $order
      search: $search
      first: $first
      after: $cursor
      active: $active
      banned: $banned
    ) {
      id
      age
      approved
      build
      gender
      hair
      name
      peculiarities
      race
      dateOfBirth
      dateSource
      active
      bans {
        ...Ban
      }
      images {
        ...Image
      }
      tags {
        ...Tag
      }
      incidents {
        id
        subject
        date
        dayTime
        location {
          id
          full
        }
        createdBy {
          ...CreatedBy
        }
      }
      groups {
        ...BasicGroup
      }
    }
  }
  ${CreatedBy}
  ${BasicGroup}
  ${Tag}
  ${Image}
  ${Ban}
`;

export interface OffenderFeedArgs {
  schemeId: string;
  userId: string;
  order: {};
  search: string;
  first: number;
  cursor: string;
  active: boolean;
  banned: boolean;
}

export interface OffenderFeedRes {
  id: string;
  age: Age;
  approved: boolean;
  build: Build;
  gender: Gender;
  hair: string;
  name: string;
  peculiarities: string;
  race: Race;
  dateOfBirth: string;
  dateSource: string;
  active: boolean;
  bans: BanType[];
  images: ImageType[];
  tags: TagType[];
  incidents: {
    id: string;
    subject: string;
    date: string;
    dayTime: string;
    location: BasicLocationType;
    createdBy: CreatedByType;
  }[];
  groups: BasicGroupType[];
}
