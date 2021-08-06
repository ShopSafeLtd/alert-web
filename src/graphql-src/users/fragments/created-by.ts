import gql from "graphql-tag";

export const CreatedBy = gql`
  fragment CreatedBy on User {
    id
    fullName
    organisation
  }
`;

export interface CreatedByType {
  __typename: "User";
  id: string;
  fullName: string;
  organisation: string;
}