import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type DemDevicesFragment = { __typename?: 'DemDevice', id: string, demId: string, createdAt: Date, serialNumber?: string | null, name: string };

export const DemDevicesFragmentDoc = gql`
    fragment DemDevices on DemDevice {
  id
  demId
  createdAt
  serialNumber
  name
}
    `;