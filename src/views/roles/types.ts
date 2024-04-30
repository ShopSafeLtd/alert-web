import type { PermissionModel } from '../../graphql/generated';
import { PermissionMethod } from '../../graphql/generated';

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
  ARTICLES: [
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
  VEHICLES: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  SETTINGS: [PermissionMethod.Edit],
  TASKS: [
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
  DOCUMENTS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Delete,
  ],
  REPORTS: [PermissionMethod.Read],
  USERS: [
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
  EVIDENCE: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Delete,
  ],
};
