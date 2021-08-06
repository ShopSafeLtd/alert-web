import gql from 'graphql-tag';

export const ApproveOffender = gql`
  mutation updateOffender(
    $where: UniqueId!
    $data: GroupUpdateInput
  ) {
    updateOffender(
      where: $where
      data: $data
    ) {
      id
      approved
    }
  }
`;

export interface ApproveOffenderArgs {
  where: { id: string; };
  data: {
    approved: { set: boolean; }
    groups: { connect?: { id: string }[]; disconnect?: { id: string }[] }
  }
}

export interface ApproveOffenderRes {
  id: string;
  approved: boolean;
}