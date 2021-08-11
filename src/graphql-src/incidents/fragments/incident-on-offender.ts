import gql from "graphql-tag";

import { ImageType, Image } from "../../images/fragments";
import { LocationType, Location } from "../../address/fragments";
import { CreatedBy, CreatedByType } from "../../users/fragments/created-by";
import { BasicGroup, BasicGroupType } from "../../groups/fragments";

export const IncidentOnOffender = gql`
  fragment IncidentOnOffender on Incident {
    id
    subject
    description
    date
    time
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
  ${Location}
  ${CreatedBy}
  ${BasicGroup}
`;

export interface IncidentOnOffenderType {
  __typename: "Incident";
  id: string;
  subject: string;
  description: string;
  date: Date | string | number;
  time: Date | string | number;
  location: LocationType;
  createdBy: CreatedByType;
  images: ImageType[];
  groups: BasicGroupType[];
}
