import { gql } from "@apollo/client";

export const UpdateNotifications = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UniqueId!) {
    updateUser(data: $data, where: $where) {
      id
      incidentEmail
      incidentPush
      offenderEmail
      offenderPush
      messagePush
    }
  }
`;

export interface UpdateNotificationsArgs {
  data: {
    incidentEmail: { set: boolean };
    incidentPush: { set: boolean };
    offenderEmail: { set: boolean };
    offenderPush: { set: boolean };
    messagePush: { set: boolean };
  };
  where: {
    id: string;
  };
}

export interface UpdateNotificationsRes {
  updateUser: {
    id: string;
    incidentEmail: boolean;
    incidentPush: boolean;
    offenderEmail: boolean;
    offenderPush: boolean;
    messagePush: boolean;
  };
}
