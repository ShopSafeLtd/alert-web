/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { UserStatus } from '#/graphql/types';

const getUserStatusText = (value: UserStatus) => {
  if (value === UserStatus.Active) return 'success';
  if (value === UserStatus.Invited) return 'warning';
  if (value === UserStatus.Disabled) return 'danger';
  return 'secondary';
};
export default getUserStatusText;
