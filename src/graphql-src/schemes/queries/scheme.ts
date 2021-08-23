import { gql } from "@apollo/client";

export const Scheme = gql`
  query scheme($where: SchemeWhereUniqueInput!) {
    scheme(where: $where) {
      id
      name
      logo {
        id
        url
        optimised
      }
    }
  }
`;

export interface SchemeArgs {
  where: {
    id: string;
  };
}

export interface SchemeRes {
  scheme: {
    id: string;
    name: string;
    logo: {
      id: string;
      url: string;
      optimised: string;
    };
  };
}
