import gql from "graphql-tag";

import { Image, ImageType } from '../../images/fragments'

export const ListOffender = gql`
  fragment ListOffender on Offender {
    id
    name
    images {
      ...Image
    }
  }
  ${Image}
`;

export interface ListOffenderType {
  __typename: "Offender";
  id: string;
  name: string;
  images: ImageType[]
}