import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
export type PoliceCrimeGroupCardFragment = { __typename?: 'SharedCrimeGroup', id: string, crimeGroupId: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiSophisticationLevel?: Types.AiSophisticationLevel | null, aiSummary?: string | null, aiActivityPatterns?: string | null, aiOrganizationStructure?: string | null, aiKeyObservations: Array<string>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, crimeGroup: { __typename?: 'CrimeGroup', id: string, ref: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalValue: number, totalRecoveredValue: number, totalTheftSuccess: number } };

export const PoliceCrimeGroupCardFragmentDoc = gql`
    fragment PoliceCrimeGroupCard on SharedCrimeGroup {
  id
  crimeGroupId
  createdAt
  updatedAt
  policePriorityScore
  aiQualityScore
  aiSophisticationLevel
  aiSummary
  aiActivityPatterns
  aiOrganizationStructure
  aiKeyObservations
  schemes {
    id
    name
    hubForce
  }
  crimeGroup {
    id
    ref
    reference
    alias
    totalIncidents
    totalOffenders
    totalValue
    totalRecoveredValue
    totalTheftSuccess
  }
}
    `;