import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceOffenderCardFragmentDoc } from '../../../../../components/police-offenders/PoliceOffenderCard/__generated__/PoliceOffenderCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSharedOffenderQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetSharedOffenderQuery = { __typename?: 'Query', sharedOffender: { __typename?: 'SharedOffender', aiTemporalAnalysisSnapshot?: { [key: string]: any } | null, aiGeographicAnalysisSnapshot?: { [key: string]: any } | null, aiTargetAnalysisSnapshot?: { [key: string]: any } | null, aiRiskAssessmentSnapshot?: { [key: string]: any } | null, aiBehavioralAnalysisSnapshot?: { [key: string]: any } | null, aiQualityAssessmentSnapshot?: { [key: string]: any } | null, aiImpactAssessmentSnapshot?: { [key: string]: any } | null, aiIdentityLinkageSnapshot?: { [key: string]: any } | null, aiRecommendedActionsSnapshot?: { [key: string]: any } | null, id: string, name?: string | null, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiImpactScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiMethods: Array<string>, aiMO?: string | null, aiPatternSignature: Array<string>, aiGenerationStatus?: string | null, aiLastGeneratedAt?: Date | null, aiGenerationAttempts: number, hasImages: boolean, hasName: boolean, lastIncidentAt?: Date | null, totalLossValue?: number | null, totalIncidents: number, offender: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, reference?: number | null, totalIncidents: number, totalImages: number, totalValue: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, comment?: string | null, peculiarities?: string | null, age?: Types.Age | null, dateOfBirth?: Date | null, gender?: Types.Gender | null, race?: Types.Race | null, hair?: string | null, height?: Types.Height | null, build?: Types.Build | null, idVerified: boolean, createdAt: Date, updatedAt: Date, scheme: { __typename?: 'Scheme', id: string, name: string, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null }, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, policeRef?: string | null, customerRef?: string | null, subject: string, description: string, date: Date, dayTime: string, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null }> } | null, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null }>, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }>, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }>, tag: Array<{ __typename?: 'Tag', id: string, name: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, sources: Array<{ __typename?: 'Scheme', id: string, name: string, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, policeHubs: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }> } };


export const GetSharedOffenderDocument = gql`
    query GetSharedOffender($id: String!) {
  sharedOffender(where: {id: $id}) {
    ...PoliceOffenderCard
    aiTemporalAnalysisSnapshot
    aiGeographicAnalysisSnapshot
    aiTargetAnalysisSnapshot
    aiRiskAssessmentSnapshot
    aiBehavioralAnalysisSnapshot
    aiQualityAssessmentSnapshot
    aiImpactAssessmentSnapshot
    aiIdentityLinkageSnapshot
    aiRecommendedActionsSnapshot
    offender {
      id
      name
      alias
      reference
      totalIncidents
      totalImages
      totalValue
      approved
      knownFor
      targetedGoods
      comment
      peculiarities
      age
      dateOfBirth
      gender
      race
      hair
      height
      build
      idVerified
      createdAt
      updatedAt
      scheme {
        id
        name
        logo {
          url
          optimised
        }
      }
      incidents {
        id
        reference
        policeRef
        customerRef
        subject
        description
        date
        dayTime
        totalValue
        totalRecoveredValue
        crimeTypes {
          id
          name
        }
        business {
          id
          name
          schemes {
            id
            name
            logo {
              url
              optimised
            }
          }
        }
        location {
          id
          full
          geoLat
          geoLng
        }
      }
      latestIncident {
        id
        dateAgo
        reportedBusinessName
        dayTime
      }
      tags {
        id
        name
      }
    }
  }
}
    ${PoliceOffenderCardFragmentDoc}`;
export function useGetSharedOffenderQuery(baseOptions: Apollo.QueryHookOptions<GetSharedOffenderQuery, GetSharedOffenderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharedOffenderQuery, GetSharedOffenderQueryVariables>(GetSharedOffenderDocument, options);
      }
export function useGetSharedOffenderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharedOffenderQuery, GetSharedOffenderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharedOffenderQuery, GetSharedOffenderQueryVariables>(GetSharedOffenderDocument, options);
        }
export type GetSharedOffenderQueryHookResult = ReturnType<typeof useGetSharedOffenderQuery>;
export type GetSharedOffenderLazyQueryHookResult = ReturnType<typeof useGetSharedOffenderLazyQuery>;
export type GetSharedOffenderQueryResult = Apollo.QueryResult<GetSharedOffenderQuery, GetSharedOffenderQueryVariables>;