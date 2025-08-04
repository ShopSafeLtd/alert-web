import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../fragments/__generated__/incident-card.generated';
import { OffenderCardFragmentDoc } from '../../../fragments/__generated__/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticleQueryVariables = Types.Exact<{
  where: Types.ArticleWhereUniqueInput;
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, watermarkImage: boolean, createdAt?: Date | null, updatedAt?: Date | null, priority: Types.ArticlePriority, completedAt?: Date | null, status: Types.CompleteStatus, title: string, groups: Array<{ __typename?: 'Group', id: string, name: string, scheme: { __typename?: 'Scheme', id?: string | null, name?: string | null } }>, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null }>, createdBy: { __typename?: 'User', fullName: string }, tags: Array<{ __typename?: 'Tag', name?: string | null, id?: string | null }>, schemes: Array<{ __typename?: 'Scheme', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null } | null, rows: Array<{ __typename?: 'ArticleRow', columns: Array<{ __typename?: 'ArticleColumn', text?: string | null, incidents: Array<{ __typename?: 'Incident', approved?: boolean | null, id?: string | null, totalImages?: number | null, priority: Types.IncidentPriority, customerRef?: string | null, subject?: string | null, reference?: number | null, policeRef?: string | null, dayTime: string, description?: string | null, createdByUser?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, images: Array<{ __typename?: 'Image', low?: string | null, id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id?: string | null }>, business?: { __typename?: 'Business', name?: string | null } | null, location?: { __typename?: 'Address', full?: string | null } | null }>, offenders: Array<{ __typename?: 'Offender', age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, dateOfBirth?: Date | null, alias: Array<string>, id?: string | null, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue?: number | null, comment?: string | null, createdByUser?: boolean | null, idVerified?: boolean | null, updatedAt?: Date | null, targetedBusinesses?: Array<{ __typename?: 'Business', id: string, name?: string | null }> | null, latestIncident?: { __typename?: 'Incident', id?: string | null, date?: Date | null, dayTime: string, dateAgo?: number | null, reportedBusinessName: string } | null, lastActive?: { __typename?: 'Incident', id?: string | null, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> }> }> }> } };


export const ArticleDocument = gql`
    query Article($where: ArticleWhereUniqueInput!) {
  article(where: $where) {
    id
    watermarkImage
    groups {
      id
      name
      scheme {
        id
        name
      }
    }
    documents {
      id
      name
      url
    }
    createdBy {
      fullName
    }
    createdAt
    updatedAt
    priority
    completedAt
    status
    tags {
      name
      id
    }
    schemes {
      id
      name
    }
    images {
      id
      url
      optimised
      card
      position
      rotation
    }
    image {
      id
      url
      optimised
      card
    }
    title
    rows {
      columns {
        text
        incidents {
          ...IncidentCard
        }
        offenders {
          ...OffenderCard
          age
          gender
          race
          build
          dateOfBirth
          alias
          targetedBusinesses {
            id
            name
          }
          latestIncident {
            id
            date
            dayTime
          }
          lastActive {
            id
            dayTime
          }
        }
      }
    }
  }
}
    ${IncidentCardFragmentDoc}
${OffenderCardFragmentDoc}`;
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;