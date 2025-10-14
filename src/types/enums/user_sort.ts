export enum UserSort {
  createdAtAsc = 'CREATED_AT_ASC',
  createdAtDesc = 'CREATED_AT_DESC',
  nameAsc = 'NAME_ASC',
  nameDesc = 'NAME_DESC',
}
// wait to check
export const userSortValues = [
  {
    label: 'Newest First',
    value: 'CREATED_AT_DESC',
  },
  {
    label: 'Oldest First',
    value: 'CREATED_AT_ASC',
  },
  {
    label: 'Name A-Z',
    value: 'NAME_ASC',
  },
  {
    label: 'Name Z-A',
    value: 'NAME_DESC',
  },
];
