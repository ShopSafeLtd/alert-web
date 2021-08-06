import gql from 'graphql-tag';
import { FullIncident, FullIncidentType } from '../fragments'

export const UpdateIncident = gql`
  mutation updateIncident(
    $where: UniqueId!
    $data: IncidentUpdateInput!
  ) {
    updateIncident(
      where: $where
      data: $data
    ) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface UpdateIncidentArgs {
  where: { id: string };
  data: {}
}

export interface UpdateIncidentRes {
  updateIncident: FullIncidentType
}