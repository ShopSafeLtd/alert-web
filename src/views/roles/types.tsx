import type { IconDefinition } from '@fortawesome/pro-light-svg-icons';

import {
  faBolt,
  faBoot,
  faBuilding,
  faCar,
  faCheckCircle,
  faClipboard,
  faClipboardListCheck,
  faCog,
  faExclamationCircle,
  faFile,
  faHome,
  faLineChart,
  faNewspaper,
  faPeopleGroup,
  faPlayCircle,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { faMessages } from '@fortawesome/pro-solid-svg-icons';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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

export const roleItems: {
  description: React.ReactNode;
  icon: IconDefinition;
  key: PermissionModel;
  methods: {
    key: PermissionMethod;
    name: React.ReactNode;
    tooltip?: React.ReactNode;
  }[];
  title: React.ReactNode;
}[] = [
  {
    description: (
      <FormattedMessage defaultMessage="Track and log real-time security and safety-related actions within the platform." />
    ),
    icon: faCheckCircle,
    key: PermissionModel.Tasks,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
        tooltip: (
          <FormattedMessage defaultMessage="View activities in the activity centre as well as on other data such as incidents, offenders, business, etc." />
        ),
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Activities" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Set up rules and workflows to streamline responses to security incidents and risks." />
    ),
    icon: faBolt,
    key: PermissionModel.Automations,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Automations" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Share critical alerts, warnings, and intelligence updates with relevant users." />
    ),
    icon: faNewspaper,
    key: PermissionModel.Articles,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Bulletins" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Manage and view business profiles linked to security incidents and crime reports." />
    ),
    icon: faBuilding,
    key: PermissionModel.Businesses,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Business" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Enable instant messaging for secure communication between stakeholders." />
    ),
    icon: faMessages,
    key: PermissionModel.Chat,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Chat" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Create structured task lists to ensure compliance and thorough incident handling." />
    ),
    icon: faClipboardListCheck,
    key: PermissionModel.Checklist,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Read" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Checklists" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Categorise and track organised criminal activities and repeat offenders." />
    ),
    icon: faPeopleGroup,
    key: PermissionModel.CrimeGroups,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Crime Groups" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Gain an overview of key security metrics, incidents, and system insights." />
    ),
    icon: faHome,
    key: PermissionModel.Dashboard,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Dashboard" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="DEM for securely storing, organising, and reviewing case-related media." />
    ),
    icon: faPlayCircle,
    key: PermissionModel.Dem,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="DEM" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Store and manage policies, reports, and case-related documentation securely." />
    ),
    icon: faFile,
    key: PermissionModel.Documents,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Documents" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Collect, upload, and manage images, videos, and files crucial for investigations." />
    ),
    icon: faPlayCircle,
    key: PermissionModel.Evidence,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Evidence" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Organise and monitor in-depth case investigations with linked evidence and reports." />
    ),
    icon: faClipboard,
    key: PermissionModel.Investigations,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Investigations" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Record, track, and manage security breaches, thefts, and other incidents in real time." />
    ),
    icon: faExclamationCircle,
    key: PermissionModel.Incidents,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Approve,
        name: <FormattedMessage defaultMessage="Approve" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Maintain profiles of known offenders, including histories, images, and incident links." />
    ),
    icon: faUsers,
    key: PermissionModel.Offenders,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Approve,
        name: <FormattedMessage defaultMessage="Approve" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Offenders" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Generate detailed analytics and summaries of incidents, trends, and security operations." />
    ),
    icon: faLineChart,
    key: PermissionModel.Reports,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Reports" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Report, track, match and reunite single shoes across your estate." />
    ),
    icon: faBoot,
    key: PermissionModel.SingleShoe,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Single Shoe" />,
  },
  {
    description: (
      <FormattedMessage defaultMessage="Register and monitor vehicle details related to incidents, investigations, or offences." />
    ),
    icon: faCar,
    key: PermissionModel.Vehicles,
    methods: [
      {
        key: PermissionMethod.Read,
        name: <FormattedMessage defaultMessage="View" />,
      },
      {
        key: PermissionMethod.Write,
        name: <FormattedMessage defaultMessage="Create" />,
      },
      {
        key: PermissionMethod.Approve,
        name: <FormattedMessage defaultMessage="Approve" />,
      },
      {
        key: PermissionMethod.Edit,
        name: <FormattedMessage defaultMessage="Edit" />,
      },
      {
        key: PermissionMethod.Delete,
        name: <FormattedMessage defaultMessage="Delete" />,
      },
    ],
    title: <FormattedMessage defaultMessage="Vehicles" />,
  },
];
export const settings = [
  {
    children: [
      {
        key: PermissionModel.Brands,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Brands" />,
      },
      {
        key: PermissionModel.ChatGroups,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Chat Groups" />,
      },
      {
        key: PermissionModel.Groups,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
          {
            key: PermissionMethod.Write,
            name: <FormattedMessage defaultMessage="Create" />,
          },
          {
            key: PermissionMethod.Edit,
            name: <FormattedMessage defaultMessage="Edit" />,
          },
          {
            key: PermissionMethod.Delete,
            name: <FormattedMessage defaultMessage="Delete" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Content Groups" />,
      },
      {
        key: PermissionModel.Dashboards,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Dashboards" />,
      },
      {
        key: PermissionModel.DataExport,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Data Export" />,
      },
      {
        key: PermissionModel.DataImport,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Data Import" />,
      },
      {
        key: PermissionModel.GeneralSettings,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="General Settings" />,
      },
      {
        key: PermissionModel.IncidentOptions,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Incident Options" />,
      },
      {
        key: PermissionModel.OffenderGalleries,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Offender Galleries" />,
      },
      {
        key: PermissionModel.OffenderWarnings,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Offender Warnings" />,
      },
      {
        key: PermissionModel.RecycleBin,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Recycle Bin" />,
      },
      {
        key: PermissionModel.Roles,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Roles" />,
      },
      {
        key: PermissionModel.SharingSettings,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Sharing Settings" />,
      },
      {
        key: PermissionModel.StatementTemplates,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Statement Templates" />,
      },
      {
        key: PermissionModel.Terms,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Terms" />,
      },
      {
        key: PermissionModel.Users,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
          {
            key: PermissionMethod.Write,
            name: <FormattedMessage defaultMessage="Create" />,
          },
          {
            key: PermissionMethod.Edit,
            name: <FormattedMessage defaultMessage="Edit" />,
          },
          {
            key: PermissionMethod.Delete,
            name: <FormattedMessage defaultMessage="Delete" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Users" />,
      },
      {
        key: PermissionModel.Workflows,
        methods: [
          {
            key: PermissionMethod.Read,
            name: <FormattedMessage defaultMessage="View" />,
          },
        ],
        title: <FormattedMessage defaultMessage="Workflows" />,
      },
    ],
    description: (
      <FormattedMessage defaultMessage="Configure system preferences, user permissions, and security settings for the platform." />
    ),
    icon: faCog,
    key: PermissionModel.Settings,
    methods: [],
    title: <FormattedMessage defaultMessage="Settings" />,
  },
];
