import gql from "graphql-tag";

export const PreviousAddresses = gql`
  query addresses($where: AddressWhereInput) {
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
    userId: {
      equals: string;
    };
  };
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
