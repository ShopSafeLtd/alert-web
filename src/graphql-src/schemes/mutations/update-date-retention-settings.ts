import { gql } from "@apollo/client";

export const UpdateDataRetentionSettings = gql`
  mutation updateScheme(
    $id: String!
    $incidentRetention: NullableIntFieldUpdateOperationsInput
    $offenderRetention: NullableIntFieldUpdateOperationsInput
  ) {
    updateScheme(
      where: { id: $id }
      data: {
        incidentRetention: $incidentRetention
        offenderRetention: $offenderRetention
      }
    ) {
      id
      incidentRetention
      offenderRetention
    }
  }
`;

export interface UpdateDataRetentionSettingsArgs {
  id: string;
  incidentRetention: { set: number | undefined };
  offenderRetention: { set: number | undefined };
}

export interface UpdateDataRetentionSettingsRes {
  updateScheme: {
    id: string;
    incidentRetention: number | undefined;
    offenderRetention: number | undefined;
  };
}
