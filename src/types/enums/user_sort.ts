export enum UserSort {
  createdAtDesc = 'CREATED_AT_DESC',
  createdAtAsc = 'CREATED_AT_ASC',
  nameDesc = 'NAME_DESC',
  nameAsc = 'NAME_ASC',
}
export const userSortValues = [
  {
    value: 'CREATED_AT_DESC',
    label: 'Newest First',
  },
  {
    value: 'CREATED_AT_ASC',
    label: 'Oldest First',
  },
  {
    value: 'NAME_ASC',
    label: 'Name A-Z',
  },
  {
    value: 'NAME_DESC',
    label: 'Name Z-A',
  },
];

// export enum UpdatedAtSort {
//   updatedAtDesc = 'UPDATED_AT_DESC',
//   updatedAtAsc = 'UPDATED_AT_ASC',
// }
