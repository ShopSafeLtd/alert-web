import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { OffenderCardFragmentDoc } from '../../../fragments/__generated__/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditArticleMutationVariables = Types.Exact<{
  data: Types.CreateArticleInput;
  where: Types.UniqueId;
}>;


export type EditArticleMutation = { __typename?: 'Mutation', editArticle?: { __typename?: 'Article', id: string, createdAt?: Date | null, priority: Types.ArticlePriority, title: string, groups: Array<{ __typename?: 'Group', id: string, name: string }>, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null }>, createdBy: { __typename?: 'User', fullName: string }, tags: Array<{ __typename?: 'Tag', name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null }>, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null } | null, rows: Array<{ __typename?: 'ArticleRow', columns: Array<{ __typename?: 'ArticleColumn', text?: string | null, incidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, reference?: number | null, policeRef?: string | null, approved?: boolean | null, uploaded?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, location?: { __typename?: 'Address', id: string, full?: string | null } | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> }, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, position?: Types.ImagePosition | null, optimised?: string | null, card?: string | null, offenders: Array<{ __typename?: 'Offender', id?: string | null }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue?: number | null, comment?: string | null, createdByUser?: boolean | null, idVerified?: boolean | null, updatedAt?: Date | null, latestIncident?: { __typename?: 'Incident', id?: string | null, dateAgo?: number | null, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> }> }> }> } | null };


export const EditArticleDocument = gql`
    mutation EditArticle($data: CreateArticleInput!, $where: UniqueId!) {
  editArticle(data: $data, where: $where) {
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
          id
          subject
          description
          dayTime
          reference
          policeRef
          crimeTypes {
            id
            name
          }
          approved
          uploaded
          location {
            id
            full
          }
          createdBy {
            id
            fullName
            businesses {
              fullName
              id
              name
            }
          }
          images {
            id
            url
            position
            optimised
            card
            offenders {
              id
            }
          }
          groups {
            id
            name
          }
          offenders {
            id
            name
          }
        }
        offenders {
          ...OffenderCard
        }
      }
    }
  }
}
    ${OffenderCardFragmentDoc}`;
export type EditArticleMutationFn = Apollo.MutationFunction<EditArticleMutation, EditArticleMutationVariables>;
export function useEditArticleMutation(baseOptions?: Apollo.MutationHookOptions<EditArticleMutation, EditArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditArticleMutation, EditArticleMutationVariables>(EditArticleDocument, options);
      }
export type EditArticleMutationHookResult = ReturnType<typeof useEditArticleMutation>;
export type EditArticleMutationResult = Apollo.MutationResult<EditArticleMutation>;
export type EditArticleMutationOptions = Apollo.BaseMutationOptions<EditArticleMutation, EditArticleMutationVariables>;