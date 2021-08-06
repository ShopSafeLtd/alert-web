import gql from "graphql-tag";

export const Tag = gql`
  fragment Tag on Tag {
    id
    name
  }
`;

export interface TagType {
  __typename: "Tag";
  id: string;
  name: string;
}