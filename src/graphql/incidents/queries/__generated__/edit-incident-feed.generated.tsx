import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditIncidentFeedQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type EditIncidentFeedQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, date?: Date | null, time?: Date | null, reference?: number | null, ref?: string | null, policeReported?: boolean | null, policeRef?: string | null, policeNo?: string | null, policeInvolved?: boolean | null, activityAuthorised?: boolean | null, subscribed?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, priority: Types.IncidentPriority, customerRef?: string | null, approved?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null, crimeType?: Types.CrimeType | null }> | null, involvedTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, impactTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, incidentItems: Array<{ __typename?: 'IncidentItem', id?: string | null, name?: string | null, value?: number | null, recoveredValue?: number | null, goodsType?: { __typename?: 'GoodsType', id?: string | null } | null }>, business?: { __typename?: 'Business', id: string, name?: string | null } | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, totalCrimeGroups: number, totalIncidents: number, totalOffenders: number, updatedAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, createdAt?: Date | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, gender?: Types.Gender | null, hair?: string | null, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, approved?: boolean | null, uploaded?: boolean | null, active?: boolean | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }>, updates: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> }, replies: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> } }> }> } };


export const EditIncidentFeedDocument = gql`
    query EditIncidentFeed($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
    subject
    description
    date
    time
    reference
    ref
    policeReported
    policeRef
    policeNo
    policeInvolved
    activityAuthorised
    subscribed
    totalValue
    totalRecoveredValue
    priority
    customerRef
    crimeTypes {
      id
      name
      crimeType
    }
    involvedTags {
      id
      name
    }
    impactTags {
      id
      name
    }
    incidentItems {
      id
      name
      value
      recoveredValue
      goodsType {
        id
      }
    }
    approved
    business {
      id
      name
    }
    createdBy {
      id
      fullName
      businesses {
        id
        name
      }
    }
    images {
      id
      optimised
      url
      position
      rotation
      primary
      policeImage
      rotation
      offenders {
        id
        name
      }
    }
    groups {
      id
      name
    }
    crimeGroups {
      id
      reference
      alias
      totalIncidents
      totalOffenders
      totalRecoveredValue
      totalTheftSuccess
      totalValue
    }
    vehicles {
      id
      reference
      colour
      model
      make
      registration
      totalCrimeGroups
      totalIncidents
      totalOffenders
      updatedAt
      images {
        id
        url
        optimised
        position
        rotation
      }
    }
    offenders {
      id
      reference
      createdAt
      updatedAt
      age
      build
      height
      dateOfBirth
      dateSource
      gender
      hair
      name
      peculiarities
      race
      approved
      uploaded
      active
      images {
        id
        url
        optimised
        card
        position
        rotation
      }
      tags {
        id
        name
      }
    }
    updates(orderBy: {createdAt: desc}) {
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
        images {
          id
          url
          optimised
          position
          rotation
        }
        updatedAt
        totalOffenders
        registration
        reference
        model
        make
        id
        colour
        images {
          id
          url
          optimised
          position
          rotation
        }
      }
      linkedIncidents {
        id
        subject
        description
        dayTime
        images {
          id
          url
          optimised
          position
          rotation
        }
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
        images {
          id
          url
          optimised
          position
          rotation
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
          images {
            id
            url
            optimised
            position
            rotation
          }
          updatedAt
          totalOffenders
          registration
          reference
          model
          make
          id
          colour
          images {
            id
            url
            optimised
            position
            rotation
          }
        }
        linkedIncidents {
          id
          subject
          description
          dayTime
          images {
            id
            url
            optimised
            position
            rotation
          }
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
          images {
            id
            url
            optimised
            position
            rotation
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
  }
}
    `;
export function useEditIncidentFeedQuery(baseOptions: Apollo.QueryHookOptions<EditIncidentFeedQuery, EditIncidentFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditIncidentFeedQuery, EditIncidentFeedQueryVariables>(EditIncidentFeedDocument, options);
      }
export function useEditIncidentFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditIncidentFeedQuery, EditIncidentFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditIncidentFeedQuery, EditIncidentFeedQueryVariables>(EditIncidentFeedDocument, options);
        }
export type EditIncidentFeedQueryHookResult = ReturnType<typeof useEditIncidentFeedQuery>;
export type EditIncidentFeedLazyQueryHookResult = ReturnType<typeof useEditIncidentFeedLazyQuery>;
export type EditIncidentFeedQueryResult = Apollo.QueryResult<EditIncidentFeedQuery, EditIncidentFeedQueryVariables>;