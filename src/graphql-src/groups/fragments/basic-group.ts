import gql from "graphql-tag";

export const BasicGroup = gql`
  fragment BasicGroup on Group {
    id
    name
  }
`;

export interface BasicGroupType {
  __typename: "group";
  id: string;
  name: string;
}