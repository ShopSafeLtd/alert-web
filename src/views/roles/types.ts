import type { PermissionModel } from 'graphql/types';

import { PermissionMethod } from 'graphql/types';

export type DataType = PermissionModel;

export type FormData = {
  [key in DataType]: PermissionMethod[];
};

export const ViewRequired = [
  PermissionMethod.Edit,
  PermissionMethod.Delete,
  PermissionMethod.Approve,
  PermissionMethod.Write,
];

export const availableCheckBoxes: {
  [key in DataType]: PermissionMethod[];
} = {
  ACTIVITIES: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  ARTICLES: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  BUSINESSES: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  CHAT: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Delete,
  ],
  CHECKLIST: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  CRIME_GROUPS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  DASHBOARD: [PermissionMethod.Read],
  DOCUMENTS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Delete,
  ],
  EVIDENCE: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Delete,
  ],
  GROUPS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  INCIDENTS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  INVESTIGATIONS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  OFFENDERS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  REPORTS: [PermissionMethod.Read],
  SETTINGS: [PermissionMethod.Edit],
  SINGLE_SHOE: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  TASKS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  USERS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  VEHICLES: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
};
