import gql from "graphql-tag";
import { SortOrder } from "graphql-src/types";

export const Groups = gql`
  query GroupsQuery($where: GroupWhereInput, $orderBy: [GroupOrderByInput!]) {
    groups(where: $where, orderBy: $orderBy) {
      id
      name
      description
      users {
        id
        fullName
        organisation
      }
    }
  }
`;

export interface GroupsArgs {
  where: {
    scheme: { id: { equals: string } };
    users?: { some: { id: { equals: string } } };
    id?: { notIn: string[] };
    OR?: [
      { name: { contains: string } },
      { users: { some: { fullName: { contains: string } } } }
    ];
  };
  orderBy?: {
    createdAt?: SortOrder;
    createdById?: SortOrder;
    description?: SortOrder;
    id?: SortOrder;
    name?: SortOrder;
    schemeId?: SortOrder;
    updatedAt?: SortOrder;
    uploaded?: SortOrder;
    dataType?: SortOrder;
  }[];
}

export interface GroupsRes {
  groups: {
    id: string;
    name: string;
    description: string;
  };
}
