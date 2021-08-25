import { gql } from "@apollo/client";

import { Location, LocationType } from "graphql-src/address/fragments";
import {
  GroupWithSchemeId,
  GroupWithSchemeIdType,
} from "graphql-src/groups/fragments";
import { BasicChat, BasicChatType } from "graphql-src/chat/fragments";
import { UserScheme, UserSchemeType } from "graphql-src/schemes/fragments";

export const User = gql`
  query user($where: UserWhereUniqueInput!, $scheme: String!) {
    user(where: $where) {
      id
      fullName
      organisation
      email
      newUser
      disabled
      status
      addresses(where: { primary: { equals: true } }) {
        ...Location
      }
      groups(where: { scheme: { id: { equals: $scheme } } }) {
        ...GroupWithSchemeId
      }
      chats(where: { chat: { scheme: { id: { equals: $scheme } } } }) {
        id
        chat {
          ...BasicChat
        }
      }
      schemes(where: { scheme: { id: { equals: $scheme } } }) {
        ...UserScheme
      }
    }
  }
  ${Location}
  ${GroupWithSchemeId}
  ${BasicChat}
  ${UserScheme}
`;

export interface UserArgs {
  where: {
    id: string;
    email: string;
    auth0Id: string;
  };
  scheme: string;
}

export interface UserRes {
  user: {
    id: string;
    fullName: string;
    organisation: string;
    email: string;
    newUser: boolean;
    disabled: boolean;
    status: string;
    addresses: LocationType[];
    groups: GroupWithSchemeIdType[];
    chats: {
      id: string;
      chat: BasicChatType;
    }[];
    schemes: UserSchemeType[];
  };
}
