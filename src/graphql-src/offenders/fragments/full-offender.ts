import gql from "graphql-tag";

import { Image, ImageType } from "../../images/fragments";
import {
  IncidentOnOffender,
  IncidentOnOffenderType,
} from "../../incidents/fragments/incident-on-offender";
import { BasicGroup, BasicGroupType } from "../../groups/fragments";
import { CreatedBy, CreatedByType } from "../../users/fragments";
import { Tag, TagType } from "../../tags/fragments";
import { Ban, BanType } from "../../bans/fragments";

import { Age, Gender, Build, Race } from "../enums";

export const FullOffender = gql`
  fragment FullOffender on Offender {
    id
    createdAt
    updatedAt
    age
    build
    dateOfBirth
    dateSource
    gender
    hair
    name
    peculiarities
    race
    approved
    uploaded
    active
    incidents {
      ...IncidentOnOffender
    }
    groups {
      ...BasicGroup
    }
    images {
      ...Image
    }
    recycled
    createdBy {
      ...CreatedBy
    }
    tags {
      ...Tag
    }
    bans {
      ...Ban
    }
  }
  ${IncidentOnOffender}
  ${BasicGroup}
  ${Image}
  ${CreatedBy}
  ${Tag}
  ${Ban}
`;

export interface FullOffenderType {
  __typename: "Offender";
  id: string;
  createdAt: Date | number | string;
  updatedAt: Date | number | string;
  age: Age;
  build: Build;
  dateOfBirth: Date | number | string;
  dateSource: string;
  gender: Gender;
  hair: string;
  name: string;
  peculiarities: string;
  race: Race;
  approved: boolean;
  uploaded: boolean;
  active: boolean;
  incidents: IncidentOnOffenderType[];
  groups: BasicGroupType[];
  images: ImageType[];
  recycled: boolean;
  createdBy: CreatedByType;
  tags: TagType[];
  bans: BanType[];
}
