import {gql} from "@apollo/client";

export const BasicLocation = gql`
  fragment BasicLocation on Location {
    id
    full
  }
`;

export interface BasicLocationType {
  __typename: "location";
  id: string;
  full: string;
}