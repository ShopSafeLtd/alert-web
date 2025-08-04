import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type UpdatesFragment = { __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> };

export const UpdatesFragmentDoc = gql`
    fragment Updates on Update {
  id
  text
  type
  createdAt
  images {
    id
    url
    optimised
    position
    rotation
    card
  }
  linkedCrimeGroups {
    id
    reference
    alias
    totalIncidents
    totalOffenders
    totalRecoveredValue
    totalTheftSuccess
    totalValue
  }
  linkedVehicles {
    id
    reference
    colour
    model
    make
    registration
    images {
      id
      url
      optimised
      position
      rotation
      card
    }
  }
  linkedIncidents {
    id
    reference
    dayTime
    policeRef
    subject
    images {
      id
      url
      optimised
      position
      rotation
      card
    }
  }
  linkedOffenders {
    id
    reference
    name
    gender
    build
    height
    race
    age
    dateOfBirth
    images {
      id
      url
      optimised
      position
      rotation
      card
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
  createdBy {
    origName
    id
    fullName
    businesses {
      id
      name
      fullName
    }
  }
  replies {
    id
    text
    type
    createdAt
    images {
      id
      url
      optimised
      position
      rotation
      card
    }
    linkedCrimeGroups {
      id
      reference
      alias
      totalIncidents
      totalOffenders
      totalRecoveredValue
      totalTheftSuccess
      totalValue
    }
    linkedVehicles {
      id
      reference
      colour
      model
      make
      registration
      images {
        id
        url
        optimised
        position
        rotation
        card
      }
    }
    linkedIncidents {
      id
      reference
      dayTime
      policeRef
      subject
      location {
        id
        full
        geoLat
        geoLng
      }
      images {
        id
        url
        optimised
        position
        rotation
        card
      }
    }
    linkedOffenders {
      id
      reference
      name
      gender
      build
      height
      race
      age
      dateOfBirth
      images {
        id
        url
        optimised
        position
        rotation
        card
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
    createdBy {
      origName
      id
      fullName
      businesses {
        id
        name
        fullName
      }
    }
  }
}
    `;