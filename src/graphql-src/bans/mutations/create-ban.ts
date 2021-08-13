import { gql } from "@apollo/client";
import { Ban, BanType } from "../fragments";
import { CreatedBy, CreatedByType } from "../../users/fragments";
import { ListOffender, ListOffenderType } from "../../offenders/fragments";

export const CreateBan = gql`
  mutation createBan($data: BanCreateInput!) {
    createBan(data: $data) {
      ...Ban
      createdBy {
        ...CreatedBy
      }
      offender {
        ...ListOffender
      }
    }
  }
  ${Ban}
  ${CreatedBy}
  ${ListOffender}
`;

export interface CreateBanArgs {
  description?: string;
  endDate: Date;
  startDate: Date;
  location: string;
  offender: { connect: { id: string } };
  scheme: { connect: { id: string } };
  createdBy: { connect: { id: string } };
}

interface CreateBanType extends BanType {
  createdBy: CreatedByType;
  offender: ListOffenderType;
}

export interface CreateBanRes {
  createBan: CreateBanType;
}
