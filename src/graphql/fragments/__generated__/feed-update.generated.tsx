import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { FeedImageFragmentDoc } from './feed-image.generated';
export type FeedUpdateFragment = { __typename?: 'Update', id?: string | null, text?: string | null, icon?: Types.UpdateIcon | null, type?: Types.UpdateType | null, createdAt?: Date | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> };

export const FeedUpdateFragmentDoc = gql`
    fragment FeedUpdate on Update {
  id
  text
  icon
  type
  createdAt
  feedImage {
    ...FeedImage
  }
  linkedCrimeGroups {
    totalOffenders
    totalIncidents
    alias
    id
    reference
    totalRecoveredValue
    totalTheftSuccess
    totalValue
    updatedAt
  }
  linkedVehicles {
    updatedAt
    totalOffenders
    registration
    reference
    model
    feedImage {
      ...FeedImage
    }
    make
    id
    colour
  }
  linkedOffenders {
    id
    updatedAt
    age
    build
    height
    dateOfBirth
    name
    race
    gender
    feedImage {
      ...FeedImage
    }
  }
  linkedIncidents {
    id
    subject
    description
    dayTime
    feedImage {
      ...FeedImage
    }
  }
  linkedArticles {
    id
    title
    updatedAt
    watermarkImage
    previewImage
    previewText
    priority
    images {
      id
      url
      optimised
      card
      position
      rotation
    }
    createdBy {
      fullName
      id
    }
  }
}
    ${FeedImageFragmentDoc}`;