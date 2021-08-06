import { gql } from '@apollo/client'
import { Role } from 'graphql-src/users/enums'

export const CurrentUser  = gql`
  query currentUser {
    currentUser {
      id
      fullName
      email
      organisation
      newUser
      schemes {
        id
        role
        scheme {
          id
          name
          autoApproveIncidents
          autoApproveOffenders
        }
      }
    }
  }
`


export interface CurrentUserRes {
  currentUser: {
    id: string;
    fullName: string;
    email: string;
    organisation: string;
    newUser: boolean;
    schemes: {
      id: string;
      role: Role;
      scheme: {
        id: string;
        name: string;
        autoApproveIncidents: boolean;
        autoApproveOffenders: boolean;
      }
    }[]
  }
}