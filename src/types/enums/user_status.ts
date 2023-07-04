import { UserStatus } from 'graphql/generated';

const userStatusValues = [
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
export default userStatusValues;
