import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../fragments/__generated__/incident-card.generated';
import { OffenderCardFragmentDoc } from '../../../fragments/__generated__/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateArticleMutationVariables = Types.Exact<{
  data: Types.CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'Article', id: string, createdAt?: Date | null, priority: Types.ArticlePriority, title: string, groups: Array<{ __typename?: 'Group', id: string, name: string }>, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null }>, createdBy: { __typename?: 'User', fullName: string }, tags: Array<{ __typename?: 'Tag', name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null }>, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null } | null, rows: Array<{ __typename?: 'ArticleRow', columns: Array<{ __typename?: 'ArticleColumn', text?: string | null, incidents: Array<{ __typename?: 'Incident', approved?: boolean | null, id?: string | null, totalImages?: number | null, priority: Types.IncidentPriority, customerRef?: string | null, subject?: string | null, reference?: number | null, policeRef?: string | null, dayTime: string, description?: string | null, createdByUser?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, images: Array<{ __typename?: 'Image', low?: string | null, id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id?: string | null }>, business?: { __typename?: 'Business', name?: string | null } | null, location?: { __typename?: 'Address', full?: string | null } | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue?: number | null, comment?: string | null, createdByUser?: boolean | null, idVerified?: boolean | null, updatedAt?: Date | null, latestIncident?: { __typename?: 'Incident', id?: string | null, dateAgo?: number | null, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> }> }> }> } | null };


export const CreateArticleDocument = gql`
    mutation CreateArticle($data: CreateArticleInput!) {
  createArticle(data: $data) {
    id
    groups {
      id
      name
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
    priority
    tags {
      name
    }
    title
    images {
      id
      url
      optimised
      card
      position
    }
    image {
      id
      url
      optimised
      card
    }
    rows {
      columns {
        text
        incidents {
          ...IncidentCard
        }
        offenders {
          ...OffenderCard
        }
      }
    }
  }
}
    ${IncidentCardFragmentDoc}
${OffenderCardFragmentDoc}`;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;