import gql from "graphql-tag";

export const BasicChat = gql`
  fragment BasicChat on Chat {
    id
    name
    scheme {
      id
    }
  }
`;

export interface BasicChatType {
  __typename: "chat";
  id: string;
  name: string;
  scheme: {
    id: string;
  };
}
