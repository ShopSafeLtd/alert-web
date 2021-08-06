import { gql } from '@apollo/client';
import { FullIncident, FullIncidentType } from '../fragments'

export const EditIncident = gql`
  query incident($id: String!) {
    incident(where: { id: $id }) {
      ...FullIncident
    }
  }
  ${FullIncident}
`;

export interface EditIncidentArgs {
  id: string;
}

export interface EditIncidentRes {
  incident: FullIncidentType
}