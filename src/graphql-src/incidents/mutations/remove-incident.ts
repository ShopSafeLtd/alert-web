import gql from 'graphql-tag';

export const RemoveIncident = gql`
  mutation deleteIncident($id: String!) {
    deleteIncident(where: { id: $id }) {
      id
    }
  }
`;