import gql from "graphql-tag";

export const Groups = gql`
  query GroupsQuery($where: GroupWhereInput) {
    groups(where: $where) {
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
}

export interface GroupsRes {
  groups: {
    id: string;
    name: string;
    description: string;
  };
}
