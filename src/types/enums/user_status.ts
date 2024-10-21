import { UserStatus } from '#/graphql/types';

// wait to check
export const userStatusValues = [
  {
    label: 'Active',
    value: UserStatus.Active,
  },
  {
    label: 'Inactive',
    value: UserStatus.Inactive,
  },

  {
    label: 'Invited',
    value: UserStatus.Invited,
  },
  {
    label: 'Uninvited',
    value: UserStatus.NotInvited,
  },
  {
    label: 'Disabled',
    value: UserStatus.Disabled,
  },
];

export const GetUserStatusValues = {
  [UserStatus.Active]: 'Active',
  [UserStatus.Disabled]: 'Disabled',
  [UserStatus.Inactive]: 'Inactive',
  [UserStatus.Invited]: 'Invited',
  [UserStatus.NotInvited]: 'NotInvited',
} as const;
