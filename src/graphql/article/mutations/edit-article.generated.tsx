import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { OffenderCardFragmentDoc } from '../../fragments/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditArticleMutationVariables = Types.Exact<{
  data: Types.CreateArticleInput;
  where: Types.UniqueId;
}>;


export type EditArticleMutation = { __typename?: 'Mutation', editArticle: { __typename?: 'Article', id: string, createdAt: Date, priority: Types.ArticlePriority, title: string, groups: Array<{ __typename?: 'Group', id: string, name: string }>, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string }>, createdBy: { __typename?: 'User', fullName: string }, tags: Array<{ __typename?: 'Tag', name: string }>, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition }>, image?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null } | null, rows: Array<{ __typename?: 'ArticleRow', columns: Array<{ __typename?: 'ArticleColumn', text?: string | null, incidents: Array<{ __typename?: 'Incident', id: string, subject?: string | null, description: string, dayTime: string, reference?: number | null, policeRef?: string | null, approved?: boolean | null, uploaded?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, location?: { __typename?: 'Address', id: string, full: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, position: Types.ImagePosition, optimised?: string | null, card?: string | null, offenders: Array<{ __typename?: 'Offender', id: string }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }> }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue: number, comment?: string | null, createdByUser: boolean, idVerified: boolean, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> }> }> }> } };


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