import gql from 'graphql-tag';
import { CreatedBy, CreatedByType } from '../../users/fragments';
import { BasicGroup, BasicGroupType } from '../../groups/fragments';
import { BasicLocationType } from '../../address/fragments';
import { Tag, TagType } from '../../tags/fragments';
import { Image, ImageType } from '../../images/fragments';
import { Ban, BanType } from '../../bans/fragments';
import { Age, Build, Gender, Race } from '../enums';

export const OffenderFeed = gql`
  query offenderFeed(
    $schemeId: String!
    $userId: String!
    $order: OffenderOrderByWithRelationInput
    $search: String
    $first: Int
    $cursor: String
    $active: Boolean
    $banned: Boolean
    $groups: [String]
    $tags: [String]
    $ethnicity: [String]
    $sex: [String]
    $approved: Boolean
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
      groups: $groups
      tags: $tags
      ethnicity: $ethnicity
      sex: $sex
      approved: $approved
    ) {
      id
      updatedAt
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
        description
        date
        dayTime
        location {
          id
          full
        }
        createdBy {
          ...CreatedBy
        }
        crimeTypes {
          id
          name
        }
        images {
          id
          url
          optimised
        }
        offenders {
          id
          name
          age
          dateOfBirth
          dateSource
          race
          images(first: 1) {
            id
            url
            optimised
          }
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
  groups: string[];
  tags: string[];
  ethnicity: string[];
  sex: string[];
  approved: boolean;
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
