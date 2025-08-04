import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { SimpleImagesFragmentDoc } from '../../../fragments/__generated__/simple-images.generated';
import { CrimeGroupsFragmentDoc } from '../../../fragments/__generated__/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { IncidentsFragmentDoc } from '../../../fragments/__generated__/incidents.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { ArticlesFragmentDoc } from '../../../fragments/__generated__/articles.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChatMessagesQueryVariables = Types.Exact<{
  where: Types.ChatMessagesWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ChatMessagesQuery = { __typename?: 'Query', chatMessages: Array<{ __typename?: 'MessageItem', id: string, content: string, createdAt: Date, currentUser?: boolean | null, formattedDateTime?: string | null, sent: boolean, showUser?: boolean | null, paddingTop?: boolean | null, type: Types.MessageItemType, from?: { __typename?: 'User', id?: string | null, fullName: string, origName?: string | null, origFirstLetter?: string | null, firstLetter?: string | null, businesses: Array<{ __typename?: 'Business', id: string, fullName?: string | null }> } | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, totalValue?: number | null, totalRecoveredValue?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, articles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> }> };


export const ChatMessagesDocument = gql`
    query ChatMessages($where: ChatMessagesWhereInput!, $take: Int, $skip: Int) {
  chatMessages(where: $where, take: $take, skip: $skip) {
    id
    content
    createdAt
    currentUser
    formattedDateTime
    from {
      id
      fullName
      origName
      origFirstLetter
      firstLetter
      businesses {
        id
        fullName
      }
    }
    sent
    showUser
    paddingTop
    type
    images {
      ...SimpleImages
    }
    crimeGroups {
      ...CrimeGroups
    }
    vehicles {
      ...Vehicles
      images {
        ...SimpleImages
      }
    }
    incidents {
      ...Incidents
      images {
        ...SimpleImages
      }
    }
    offenders {
      ...Offenders
      images {
        ...SimpleImages
        isFace
      }
    }
    articles {
      ...Articles
      images {
        ...SimpleImages
      }
    }
  }
}
    ${SimpleImagesFragmentDoc}
${CrimeGroupsFragmentDoc}
${VehiclesFragmentDoc}
${IncidentsFragmentDoc}
${OffendersFragmentDoc}
${ArticlesFragmentDoc}`;
export function useChatMessagesQuery(baseOptions: Apollo.QueryHookOptions<ChatMessagesQuery, ChatMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(ChatMessagesDocument, options);
      }
export function useChatMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatMessagesQuery, ChatMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(ChatMessagesDocument, options);
        }
export type ChatMessagesQueryHookResult = ReturnType<typeof useChatMessagesQuery>;
export type ChatMessagesLazyQueryHookResult = ReturnType<typeof useChatMessagesLazyQuery>;
export type ChatMessagesQueryResult = Apollo.QueryResult<ChatMessagesQuery, ChatMessagesQueryVariables>;