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
  AUTOMATIONS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  BRANDS: [PermissionMethod.Read],
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
  CHAT_GROUPS: [PermissionMethod.Read],
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
  DASHBOARDS: [PermissionMethod.Read],
  DATA_EXPORT: [PermissionMethod.Read],
  DATA_IMPORT: [PermissionMethod.Read],
  DEM: [
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
  EVIDENCE: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Delete,
  ],
  GENERAL_SETTINGS: [PermissionMethod.Read],
  GROUPS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  INCIDENT_OPTIONS: [PermissionMethod.Read],
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
  OFFENDER_GALLERIES: [PermissionMethod.Read],
  OFFENDER_WARNINGS: [PermissionMethod.Read],
  OFFENDERS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  RECYCLE_BIN: [PermissionMethod.Read],
  REPORTS: [PermissionMethod.Read],
  ROLES: [PermissionMethod.Read],
  SETTINGS: [PermissionMethod.Edit],
  SHARING_SETTINGS: [PermissionMethod.Read],
  SINGLE_SHOE: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  STATEMENT_TEMPLATES: [PermissionMethod.Read],
  TASKS: [
    PermissionMethod.Read,
    PermissionMethod.Write,
    PermissionMethod.Edit,
    PermissionMethod.Delete,
  ],
  TERMS: [PermissionMethod.Read],
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
  WORKFLOWS: [PermissionMethod.Read],
};
