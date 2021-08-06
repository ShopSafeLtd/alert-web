import { gql } from '@apollo/client'

export const Verify = gql`
  query verify(
    $id: String!
  ) {
    verify (
      where: { id: $id }
    ) {
      id
      name
      email
    }
  }
`

export interface VerifyArgs {
  id: string;
}

export interface VerifyRes {
  verify: {
    id: string
    name: string;
    email: string;
  }
}
