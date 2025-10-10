import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { SimpleImagesFragmentDoc } from '../../../fragments/__generated__/simple-images.generated';
import { CrimeGroupsFragmentDoc } from '../../../fragments/__generated__/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { IncidentsFragmentDoc } from '../../../fragments/__generated__/incidents.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { ArticlesFragmentDoc } from '../../../fragments/__generated__/articles.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MessagesSubscriptionSubscriptionVariables = Types.Exact<{
  chat: Types.Scalars['ID'];
  user: Types.Scalars['ID'];
}>;


export type MessagesSubscriptionSubscription = { __typename?: 'Subscription', chatMessages: Array<{ __typename?: 'MessageItem', id: string, content: string, createdAt: Date, currentUser: boolean, formattedDateTime: string, sent: boolean, showUser: boolean, paddingTop: boolean, type: Types.MessageItemType, from: { __typename?: 'User', id: string, fullName: string, firstLetter: string }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, totalValue: number, totalRecoveredValue: number, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null }>, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, articles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> }> };


export const MessagesSubscriptionDocument = gql`
    subscription MessagesSubscription($chat: ID!, $user: ID!) {
  chatMessages(chatId: $chat, userId: $user) {
    id
    content
    createdAt
    currentUser
    formattedDateTime
    from {
      id
      fullName
      firstLetter
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
export function useMessagesSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessagesSubscriptionSubscription, MessagesSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessagesSubscriptionSubscription, MessagesSubscriptionSubscriptionVariables>(MessagesSubscriptionDocument, options);
      }
export type MessagesSubscriptionSubscriptionHookResult = ReturnType<typeof useMessagesSubscriptionSubscription>;
export type MessagesSubscriptionSubscriptionResult = Apollo.SubscriptionResult<MessagesSubscriptionSubscription>;