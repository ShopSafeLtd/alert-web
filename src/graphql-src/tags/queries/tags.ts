import { gql } from "@apollo/client";
import { DataType } from "../enums";
import { SortOrder } from "graphql-src/types";

export const Tags = gql`
  query tags(
    $where: TagWhereInput
    $orderBy: [TagOrderByInput!]
    $first: Int
    $last: Int
    $before: TagWhereUniqueInput
    $after: TagWhereUniqueInput
  ) {
    tags(
      where: $where
      orderBy: $orderBy
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      id
      name
      description
    }
  }
`;

export interface TagsArgs {
  where: {
    scheme: {
      id: { equals: string };
    };
    dataType: {
      equals: DataType;
    };
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
  first?: number;
  last?: number;
  before?: { id: string };
  after?: { id: string };
}

export interface TagsRes {
  tags: {
    id: string;
    name: string;
    description: string;
  }[];
}
