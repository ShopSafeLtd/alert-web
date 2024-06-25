import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { SimpleImagesFragmentDoc } from '../../fragments/simple-images.generated';
import { CrimeGroupsFragmentDoc } from '../../fragments/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../fragments/vehicles.generated';
import { IncidentsFragmentDoc } from '../../fragments/incidents.generated';
import { OffendersFragmentDoc } from '../../fragments/offenders.generated';
import { ArticlesFragmentDoc } from '../../fragments/articles.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChatMessagesQueryVariables = Types.Exact<{
  where: Types.ChatMessagesWhereInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ChatMessagesQuery = { __typename?: 'Query', chatMessages: Array<{ __typename?: 'MessageItem', id: string, content: string, createdAt: Date, currentUser: boolean, formattedDateTime: string, sent: boolean, showUser: boolean, paddingTop: boolean, type: Types.MessageItemType, from: { __typename?: 'User', id: string, fullName: string, origName: string, origFirstLetter: string, firstLetter: string, businesses: Array<{ __typename?: 'Business', id: string, fullName: string }> }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, totalValue: number, totalRecoveredValue: number, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, articles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> }> };


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