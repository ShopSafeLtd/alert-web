import { UserStatus } from 'graphql/generated';
// wait to check
export const userStatusValues = [
  {
    value: UserStatus.Active,
    label: 'Active',
  },
  {
    value: UserStatus.Inactive,
    label: 'Inactive',
  },

  {
    value: UserStatus.Invited,
    label: 'Invited',
  },
  {
    value: UserStatus.NotInvited,
    label: 'Uninvited',
  },
  {
    value: UserStatus.Disabled,
    label: 'Disabled',
  },
];

export const GetUserStatusValues = {
  [UserStatus.Active]: 'Active',
  [UserStatus.Inactive]: 'Inactive',
  [UserStatus.Invited]: 'Invited',
  [UserStatus.NotInvited]: 'NotInvited',
  [UserStatus.Disabled]: 'Disabled',
} as const;
