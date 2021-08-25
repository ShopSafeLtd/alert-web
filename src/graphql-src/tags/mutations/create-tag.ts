import { gql } from "@apollo/client";

import { DataType } from "../enums";

export const CreateTag = gql`
  mutation createTag($data: TagCreateInput!) {
    createTag(data: $data) {
      id
      name
      description
    }
  }
`;

export interface CreateTagArgs {
  data: {
    name: string;
    description: string;
    scheme: {
      connect: { id: string };
    };
    users?: {
      connect: {
        id: string;
      }[];
    };
    dataType: DataType;
    createdBy: {
      connect: {
        id: string;
      };
    };
  };
}

export interface CreateTagRes {
  createTag: {
    id: string;
    name: string;
    description: string;
  };
}

export default CreateTag;
