import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestigationSuggestionsQueryVariables = Types.Exact<{
  where: Types.InvestigationWhereUniqueInput;
  associatedInvestigation?: Types.InputMaybe<Types.UniqueId>;
  crimeTypesWhere?: Types.InputMaybe<Types.TagWhereInput>;
}>;


export type InvestigationSuggestionsQuery = { __typename?: 'Query', investigation: { __typename?: 'Investigation', id: string, suggestedOffenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, reference?: number | null, dateOfBirth?: Date | null, age?: Types.Age | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, hair?: string | null, peculiarities?: string | null, totalAssociatedIncidents: number, totalAssociatedCrimeGroups: number, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, associatedIncidents: Array<{ __typename?: 'Incident', id: string, dayTime: string, reference?: number | null, business?: { __typename?: 'Business', id: string, fullName: string } | null, location?: { __typename?: 'Address', full: string, id: string } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> } }>, associatedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalOffenders: number, totalIncidents: number, totalValue: number }> }>, suggestedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, registration?: string | null, make?: string | null, model?: string | null, colour?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, suggestedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, reference?: number | null, description: string, dayTime: string, policeRef?: string | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, location?: { __typename?: 'Address', id: string, full: string } | null, business?: { __typename?: 'Business', id: string, name: string } | null, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, hair?: string | null, peculiarities?: string | null, alias: Array<string>, images: Array<{ __typename?: 'Image', id: string, position: Types.ImagePosition, rotation: number, optimised?: string | null }> }> }> } };


export const InvestigationSuggestionsDocument = gql`
    query InvestigationSuggestions($where: InvestigationWhereUniqueInput!, $associatedInvestigation: UniqueId, $crimeTypesWhere: TagWhereInput) {
  investigation(where: $where) {
    id
    suggestedOffenders {
      id
      name
      alias
      reference
      dateOfBirth
      age
      gender
      build
      height
      race
      hair
      peculiarities
      images {
        id
        optimised
        position
        rotation
      }
      totalAssociatedIncidents(associatedInvestigation: $associatedInvestigation)
      totalAssociatedCrimeGroups(associatedInvestigation: $associatedInvestigation)
      associatedIncidents(associatedInvestigation: $associatedInvestigation) {
        id
        dayTime
        reference
        business {
          id
          fullName
        }
        location {
          full
          id
        }
        crimeTypes(where: $crimeTypesWhere) {
          id
          name
        }
        createdBy {
          id
          fullName
          businesses {
            id
            name
          }
        }
      }
      associatedCrimeGroups(associatedInvestigation: $associatedInvestigation) {
        id
        reference
        alias
        totalOffenders
        totalIncidents
        totalValue
      }
    }
    suggestedVehicles {
      id
      reference
      registration
      make
      model
      images {
        id
        optimised
        position
        rotation
      }
      colour
    }
    suggestedIncidents {
      id
      subject
      reference
      description
      dayTime
      crimeTypes(where: $crimeTypesWhere) {
        id
        name
      }
      images {
        id
        optimised
        position
        rotation
      }
      policeRef
      location {
        id
        full
      }
      business {
        id
        name
      }
      offenders {
        id
        name
        reference
        age
        gender
        race
        build
        height
        dateOfBirth
        hair
        peculiarities
        alias
        images {
          id
          position
          rotation
          optimised
        }
      }
    }
  }
}
    `;
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