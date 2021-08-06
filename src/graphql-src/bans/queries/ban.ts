import { gql } from '@apollo/client';

export const Ban = gql`
  query ban($where: BanWhereUniqueInput!) {
    ban(where: $where) {
      id
      active
      location
      startDate
      endDate
      description
      createdBy {
        id
        fullName
      }
      createdAt
    }
  }
`;

export interface BanArgs {
  where: { id: string; };
}

export interface BanRes {
  ban: {
    id: string;
    active: boolean;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    createdBy: {
      id: string;
      fullName: string;
    }
    createdAt: string;
  }
}