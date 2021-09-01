import { gql } from "@apollo/client";

export const DataRetentionSettings = gql`
  query scheme($id: String) {
    scheme(where: { id: $id }) {
      id
      incidentRetention
      offenderRetention
    }
  }
`;

export interface DataRetentionSettingsArgs {
  id: string;
}

export interface DataRetentionSettingsRes {
  scheme: {
    id: string;
    incidentRetention: number;
    offenderRetention: number;
  };
}
