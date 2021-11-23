import gql from 'graphql-tag';

export const Ban = gql`
  fragment Ban on Ban {
    id
    location
    startDate
    endDate
    description
    title
    active
  }
`;

export interface BanType {
  __typename: 'ban';
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  active: boolean;
}
