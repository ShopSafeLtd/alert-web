import gql from "graphql-tag";

import { ImageType, Image } from "../../images/fragments";
import { Tag, TagType } from "../../tags/fragments";
import { FullOffender, FullOffenderType } from "../../offenders/fragments";
import { LocationType, Location } from "../../address/fragments";
import { CreatedBy, CreatedByType } from "../../users/fragments/created-by";
import { BasicGroup, BasicGroupType } from "../../groups/fragments";

export const FullIncident = gql`
  fragment FullIncident on Incident {
    id
    subject
    description
    date
    time
    crimeTypes {
      ...Tag
    }
    approved
    uploaded
    offenders {
      ...FullOffender
    }
    location {
      ...Location
    }
    createdBy {
      ...CreatedBy
    }
    images {
      ...Image
    }
    groups {
      ...BasicGroup
    }
  }
  ${Image}
  ${Tag}
  ${FullOffender}
  ${Location}
  ${CreatedBy}
  ${BasicGroup}
`;

export interface FullIncidentType {
  __typename: "Incident";
  id: string;
  subject: string;
  description: string;
  date: Date;
  time: Date;
  crimeTypes: TagType[];
  approved: boolean;
  uploaded: boolean;
  offenders: FullOffenderType[];
  location: LocationType;
  createdBy: CreatedByType;
  images: ImageType[];
  groups: BasicGroupType[];
}
