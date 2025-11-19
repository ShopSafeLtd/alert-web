export enum RoleSort {
  nameAsc = 'NAME_ASC',
  nameDesc = 'NAME_DESC',
  typeAsc = 'TYPE_ASC',
  typeDesc = 'TYPE_DESC',
  usersCountAsc = 'USERS_COUNT_ASC',
  usersCountDesc = 'USERS_COUNT_DESC',
}

export const roleSortValues = [
  {
    label: 'Name A-Z',
    value: 'NAME_ASC',
  },
  {
    label: 'Name Z-A',
    value: 'NAME_DESC',
  },
  {
    label: 'Type A-Z',
    value: 'TYPE_ASC',
  },
  {
    label: 'Type Z-A',
    value: 'TYPE_DESC',
  },
  {
    label: 'Most Users',
    value: 'USERS_COUNT_DESC',
  },
  {
    label: 'Least Users',
    value: 'USERS_COUNT_ASC',
  },
];
