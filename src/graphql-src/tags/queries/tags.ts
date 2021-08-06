import { gql } from '@apollo/client';
import { DataType } from '../enums'

export const Tags = gql`
  query tags($where: TagWhereInput) {
    tags(
      where: $where
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
      id: { equals: string; };
    };
    dataType: {
      equals: DataType
    }
  }
}

export interface TagsRes {
  tags: {
    id: string;
    name: string;
    description: string;
  }[];
}