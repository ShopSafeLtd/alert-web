import { gql } from "@apollo/client";

import { SortOrder, BoolFilter } from "../../types";
import { Role } from "../enums";
import { BasicGroup, BasicGroupType } from "graphql-src/groups/fragments";

export const SchemeUsers = gql`
  query schemeUsers(
    $scheme: String
    $search: String
    $orderByName: SortOrder
    $orderByOrganisation: SortOrder
    $orderByCreatedAt: SortOrder
    $disabled: BoolFilter
    $newUser: BoolFilter
    $role: Role
    $after: UserWhereUniqueInput
  ) {
    users(
      where: {
        schemes: {
          some: {
            recycled: { equals: false }
            role: { equals: $role }
            scheme: { id: { equals: $scheme } }
          }
        }
        recycled: { equals: false }
        OR: [
          { fullName: { contains: $search } }
          { organisation: { contains: $search } }
        ]
        disabled: $disabled
        newUser: $newUser
      }
      orderBy: {
        fullName: $orderByName
        organisation: $orderByOrganisation
        createdAt: $orderByCreatedAt
      }
      after: $after
    ) {
      id
      fullName
      email
      organisation
      newUser
      disabled
      groups(where: { scheme: { id: { equals: $scheme } } }) {
        ...BasicGroup
      }
      schemes(where: { scheme: { id: { equals: $scheme } } }) {
        id
        role
      }
    }
  }
  ${BasicGroup}
`;

export interface SchemeUsersArgs {
  scheme: string;
  search: string;
  orderByName?: SortOrder;
  orderByOrganisation?: SortOrder;
  orderByCreatedAt?: SortOrder;
  disabled?: BoolFilter;
  newUser?: BoolFilter;
  role?: Role;
  after?: { id: string };
}

export interface SchemeUsersRes {
  users: {
    id: string;
    fullName: string;
    organisation: string;
    newUser: boolean;
    disabled: boolean;
    groups: BasicGroupType[];
    schemes: {
      id: string;
      role: Role;
    }[];
  }[];
}
