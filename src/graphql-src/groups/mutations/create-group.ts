import { gql } from "@apollo/client";

export const CreateGroup = gql`
  mutation createGroup($data: GroupCreateInput!) {
    createGroup(data: $data) {
      id
      name
      description
      uploaded
      users {
        id
      }
    }
  }
`;

export interface CreateGroupArgs {
  data: {
    name: string;
    description: string;
    scheme: {
      connect: { id: string };
    };
    users: {
      connect: {
        id: string;
      }[];
    };
  };
}

export interface CreateGroupRes {
  createGroup: {
    id: string;
    name: string;
    description: string;
    uploaded: boolean;
    users: {
      id: string;
      __typename: string;
    }[];
    __typename: string;
  };
}
