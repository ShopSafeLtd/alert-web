import gql from 'graphql-tag';

export const ApproveIncident = gql`
  mutation approveIncident(
    $id: ID!
    $groups: GroupUpdateManyWithoutIncidentsInput!
  ) {
    approveIncident(id: $id, groups: $groups) {
      id
      approved
      groups {
        id
        name
      }
    }
  }
`;