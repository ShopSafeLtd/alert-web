import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditIncidentQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type EditIncidentQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, date: Date, time: Date, reference?: number | null, ref: string, policeReported: boolean, policeRef?: string | null, policeNo?: string | null, policeInvolved: boolean, activityAuthorised: boolean, subscribed: boolean, totalValue: number, totalRecoveredValue: number, approved?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string, crimeType?: Types.CrimeType | null }>, involvedTags: Array<{ __typename?: 'Tag', id: string, name: string }>, impactTags: Array<{ __typename?: 'Tag', id: string, name: string }>, incidentItems: Array<{ __typename?: 'IncidentItem', id: string, name?: string | null, value?: number | null, recoveredValue?: number | null, goodsType?: { __typename?: 'GoodsType', id: string } | null }>, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null } | null, business?: { __typename?: 'Business', id: string, name: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, url?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, totalCrimeGroups: number, totalIncidents: number, totalOffenders: number, updatedAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, createdAt: Date, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, gender?: Types.Gender | null, hair?: string | null, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, approved?: boolean | null, uploaded?: boolean | null, active?: boolean | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }> } };


export const EditIncidentDocument = gql`
    query EditIncident($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
    subject
    description
    dayTime
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
    location {
      id
      building
      street
      townCity
      county
      postcode
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
export function useEditIncidentQuery(baseOptions: Apollo.QueryHookOptions<EditIncidentQuery, EditIncidentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditIncidentQuery, EditIncidentQueryVariables>(EditIncidentDocument, options);
      }
export function useEditIncidentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditIncidentQuery, EditIncidentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditIncidentQuery, EditIncidentQueryVariables>(EditIncidentDocument, options);
        }
export type EditIncidentQueryHookResult = ReturnType<typeof useEditIncidentQuery>;
export type EditIncidentLazyQueryHookResult = ReturnType<typeof useEditIncidentLazyQuery>;
export type EditIncidentQueryResult = Apollo.QueryResult<EditIncidentQuery, EditIncidentQueryVariables>;