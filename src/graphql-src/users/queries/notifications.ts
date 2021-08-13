import { gql } from "@apollo/client";

export const Notifications = gql`
  {
    currentUser {
      id
      incidentEmail
      incidentPush
      offenderEmail
      offenderPush
      messagePush
    }
  }
`;

export interface NotificationsRes {
  currentUser: {
    id: string;
    incidentEmail: boolean;
    incidentPush: boolean;
    offenderEmail: boolean;
    offenderPush: boolean;
    messagePush: boolean;
  };
}
