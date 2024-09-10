import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../fragments/__generated__/incident-card.generated';
import { OffenderCardFragmentDoc } from '../../../fragments/__generated__/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticleQueryVariables = Types.Exact<{
  where: Types.ArticleWhereUniqueInput;
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, watermarkImage: boolean, createdAt: Date, updatedAt: Date, priority: Types.ArticlePriority, title: string, groups: Array<{ __typename?: 'Group', id: string, name: string, scheme: { __typename?: 'Scheme', id: string, name: string } }>, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string }>, createdBy: { __typename?: 'User', fullName: string }, tags: Array<{ __typename?: 'Tag', name: string, id: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, image?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null } | null, rows: Array<{ __typename?: 'ArticleRow', columns: Array<{ __typename?: 'ArticleColumn', text?: string | null, incidents: Array<{ __typename?: 'Incident', approved?: boolean | null, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', low?: string | null, id: string, rotation: number, position: Types.ImagePosition, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id: string }>, business?: { __typename?: 'Business', name: string } | null, location?: { __typename?: 'Address', full: string } | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue: number, comment?: string | null, createdByUser: boolean, idVerified: boolean, updatedAt: Date, lastActive?: { __typename?: 'Incident', id: string, dayTime: string } | null, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> }> }> }> } };


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