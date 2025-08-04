import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type DemDevicesFragment = { __typename?: 'DemDevice', id?: string | null, demId?: string | null, createdAt?: Date | null, serialNumber?: string | null, name?: string | null };

export const DemDevicesFragmentDoc = gql`
    fragment DemDevices on DemDevice {
  id
  demId
  createdAt
  serialNumber
  name
}
    `;