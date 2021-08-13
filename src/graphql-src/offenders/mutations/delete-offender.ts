import gql from "graphql-tag";

export const DeleteOffender = gql`
  mutation deleteOffender($where: OffenderWhereUniqueInput!) {
    deleteOffender(where: { id: $id }) {
      id
    }
  }
`;

export interface DeleteOffenderArgs {
  where: { id: string };
}

export interface DeleteOffenderRes {
  deleteOffender: {
    id: string;
  };
}
