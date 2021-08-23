import { gql } from "@apollo/client";

export const UpdateScheme = gql`
  mutation updateScheme($where: UniqueId!, $data: SchemeUpdateInput!) {
    updateScheme(where: $where, data: $data) {
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

export interface UpdateSchemeArgs {
  where: {
    id: string;
  };
  data: {
    name: { set: string };
    logo?: {
      delete?: boolean;
      upload?: {
        file: any;
      };
    };
  };
}

export interface UpdateSchemeRes {
  updateScheme: {
    id: string;
    name: string;
    logo: {
      id: string;
      url: string;
      optimised: string;
    };
  };
}
