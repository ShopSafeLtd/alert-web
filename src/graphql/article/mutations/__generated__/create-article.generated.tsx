import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../fragments/__generated__/incident-card.generated';
import { OffenderCardFragmentDoc } from '../../../fragments/__generated__/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateArticleMutationVariables = Types.Exact<{
  data: Types.CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: string, createdAt: Date, priority: Types.ArticlePriority, title: string, groups: Array<{ __typename?: 'Group', id: string, name: string }>, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string }>, createdBy: { __typename?: 'User', fullName: string }, tags: Array<{ __typename?: 'Tag', name: string }>, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition }>, image?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null } | null, rows: Array<{ __typename?: 'ArticleRow', columns: Array<{ __typename?: 'ArticleColumn', text?: string | null, incidents: Array<{ __typename?: 'Incident', approved?: boolean | null, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, id: string, rotation: number, position: Types.ImagePosition, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id: string, images: Array<{ __typename?: 'Image', id: string, low?: string | null, rotation: number, position: Types.ImagePosition }> }>, business?: { __typename?: 'Business', name: string } | null, location?: { __typename?: 'Address', full: string } | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue: number, comment?: string | null, createdByUser: boolean, idVerified: boolean, updatedAt: Date, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> }> }> }> } };


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