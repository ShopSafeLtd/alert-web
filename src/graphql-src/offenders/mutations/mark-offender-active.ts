import gql from 'graphql-tag';

export const MarkOffenderActive = gql`
  mutation markOffenderActive(
    $id: OffenderWhereUniqueInput!
    $data: UpdateOffenderInput!
  ) {
    updateOffender(where: $where, data: $data) {
      id
      active
    }
  }
`;

export interface MarkOffenderActiveArgs {
  where: { id: string }
  data: { active: { set: boolean } }
}
export interface MarkOffenderActiveRes {
  id: string;
  active: boolean;
}