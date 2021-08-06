import gql from 'graphql-tag';

export const AddIncidentToGroup = gql`
  mutation addToIncidentOnGroup($groupId: ID!, $incidentId: ID!) {
    updateIncident(
      where: { id: $incidentId }
      data: { groups: { connect: { id: $groupId } } }
    ) {
      id
      groups {
        id
        name
      }
    }
  }
`;