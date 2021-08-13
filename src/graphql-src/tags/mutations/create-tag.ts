import { gql } from "@apollo/client";

import { DataType } from "../enums";

export const CreateTag = gql`
  mutation createTag(
    $user: String
    $description: String!
    $name: String!
    $scheme: String
    $dataType: Model!
  ) {
    createTag(
      data: {
        description: $description
        name: $name
        scheme: { connect: { id: $scheme } }
        dataType: $dataType
        createdBy: { connect: { id: $user } }
      }
    ) {
      id
      name
      description
    }
  }
`;

export interface CreateTagArgs {
  name: string;
  description: string;
  scheme: string;
  user: string;
  dataType: DataType;
}

export interface CreateTagRes {
  createTag: {
    id: string;
    name: string;
    description: string;
  };
}

export default CreateTag;
