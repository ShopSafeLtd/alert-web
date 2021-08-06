import gql from 'graphql-tag';

export const PreviousAddresses = gql`
  query allAddresses($where: AddressWhereInput) {
    addresses(where: $where) {
      id
      primary
      premises
      building
      street
      townCity
      county
      postcode
    }
  }
`;

export interface PreviousAddressesArgs {
  where: {
    user: {
      id: {
        equals: string;
      }
    }
  }
}

export interface PreviousAddressesRes {
  id: string;
  primary: string;
  premises: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}