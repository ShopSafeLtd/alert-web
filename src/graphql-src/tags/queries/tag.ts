import { gql } from "@apollo/client";

export const Tag = gql`
  query tag($where: TagWhereUniqueInput!) {
    tag(where: $where) {
      id
      name
      description
    }
  }
`;

export interface TagArgs {
  where: {
    id: string;
  };
}

export interface TagRes {
  tag: {
    id: string;
    name: string;
    description: string;
  };
}
