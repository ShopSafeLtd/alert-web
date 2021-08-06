import gql from "graphql-tag";

export const Location = gql`
  fragment Location on Address {
    id
    premises
    building
    street
    townCity
    county
    postcode
  }
`;

export interface LocationType {
  __typename: "Address";
  id: string;
  premises: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}