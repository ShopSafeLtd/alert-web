import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../fragments/__generated__/incident-card.generated';
import { CrimeGroupsFragmentDoc } from '../../../fragments/__generated__/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestigationSuggestionsQueryVariables = Types.Exact<{
  where: Types.InvestigationWhereUniqueInput;
  associatedInvestigation?: Types.InputMaybe<Types.UniqueId>;
}>;


export type InvestigationSuggestionsQuery = { __typename?: 'Query', investigation: { __typename?: 'Investigation', id: string, suggestedOffenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, alias: Array<string>, dateOfBirth?: Date | null, age?: Types.Age | null, gender?: Types.Gender | null, build?: Types.Build | null, race?: Types.Race | null, hair?: string | null, peculiarities?: string | null, totalAssociatedIncidents: number, totalAssociatedCrimeGroups: number, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, rotation: number, position: Types.ImagePosition }>, associatedIncidents: Array<{ __typename?: 'Incident', approved?: boolean | null, draft: boolean, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, optimised?: string | null, id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id: string, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null }>, associatedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }> }>, suggestedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, suggestedIncidents: Array<{ __typename?: 'Incident', approved?: boolean | null, draft: boolean, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, optimised?: string | null, id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id: string, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null }> } };


export const InvestigationSuggestionsDocument = gql`
    query InvestigationSuggestions($where: InvestigationWhereUniqueInput!, $associatedInvestigation: UniqueId) {
  investigation(where: $where) {
    id
    suggestedOffenders {
      id
      name
      reference
      alias
      dateOfBirth
      age
      gender
      build
      race
      hair
      peculiarities
      totalAssociatedIncidents
      totalAssociatedCrimeGroups
      images {
        id
        optimised
        rotation
        position
      }
      associatedIncidents(associatedInvestigation: $associatedInvestigation) {
        ...IncidentCard
      }
      associatedCrimeGroups(associatedInvestigation: $associatedInvestigation) {
        ...CrimeGroups
      }
    }
    suggestedVehicles {
      ...Vehicles
    }
    suggestedIncidents {
      ...IncidentCard
    }
  }
}
    ${IncidentCardFragmentDoc}
${CrimeGroupsFragmentDoc}
${VehiclesFragmentDoc}`;
export function useInvestigationSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<InvestigationSuggestionsQuery, InvestigationSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestigationSuggestionsQuery, InvestigationSuggestionsQueryVariables>(InvestigationSuggestionsDocument, options);
      }
export function useInvestigationSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestigationSuggestionsQuery, InvestigationSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestigationSuggestionsQuery, InvestigationSuggestionsQueryVariables>(InvestigationSuggestionsDocument, options);
        }
export type InvestigationSuggestionsQueryHookResult = ReturnType<typeof useInvestigationSuggestionsQuery>;
export type InvestigationSuggestionsLazyQueryHookResult = ReturnType<typeof useInvestigationSuggestionsLazyQuery>;
export type InvestigationSuggestionsQueryResult = Apollo.QueryResult<InvestigationSuggestionsQuery, InvestigationSuggestionsQueryVariables>;