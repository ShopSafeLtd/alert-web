import gql from "graphql-tag";

export const GroupWithSchemeId = gql`
  fragment GroupWithSchemeId on Group {
    id
    name
    scheme {
      id
    }
  }
`;

export interface GroupWithSchemeIdType {
  __typename: "group";
  id: string;
  name: string;
  scheme: {
    id: string;
  };
}
