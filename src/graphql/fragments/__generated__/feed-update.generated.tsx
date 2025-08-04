import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { FeedImageFragmentDoc } from './feed-image.generated';
export type FeedUpdateFragment = { __typename?: 'Update', id: string, text?: string | null, icon: Types.UpdateIcon, type: Types.UpdateType, createdAt: Date, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> };

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