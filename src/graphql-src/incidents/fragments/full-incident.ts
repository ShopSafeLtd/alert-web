import gql from "graphql-tag";

import { ImageType, Image } from '../../images/fragments'
import { Tag, TagType } from '../../tags/fragments'
import { ListOffender, ListOffenderType } from '../../offenders/fragments'
import { LocationType, Location } from '../../address/fragments'
import { CreatedBy, CreatedByType } from '../../users/fragments/created-by'

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
      ...ListOffender
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
  }
  ${Image}
  ${Tag}
  ${ListOffender}
  ${Location}
  ${CreatedBy}
`;

export interface FullIncidentType {
  __typename: "Incident";
  id: string;
  subject: string;
  description: string;
  date: Date;
  time: Date;
  crimeTypes: TagType[]
  approved: boolean;
  uploaded: boolean;
  offenders: ListOffenderType[]
  location: LocationType
  createdBy: CreatedByType
  images: ImageType[]
}