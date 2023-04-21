import type { SortOrder } from 'antd/es/table/interface';
import { Typography } from 'antd';
import React from 'react';

export interface BusinessTableData {
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  updatesCreated: number;
  messagesSent: number;
  logins: number;
  users: number;
}

export const BusinessColumns = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: 'Name',
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: 'Incidents',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: 'Offenders',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'updatesCreated',
    dataIndex: 'updatesCreated',
    title: 'Updates',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.updatesCreated - b.updatesCreated,
  },
  {
    key: 'messagesSent',
    dataIndex: 'messagesSent',
    title: 'Messages',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.messagesSent - b.messagesSent,
  },
  {
    key: 'logins',
    dataIndex: 'logins',
    title: 'Logins',
    sorter: (a: BusinessTableData, b: BusinessTableData) => a.logins - b.logins,
  },
  {
    key: 'users',
    dataIndex: 'users',
    title: 'Users',
    sorter: (a: BusinessTableData, b: BusinessTableData) => a.users - b.users,
  },
];

export interface ContributionTableData {
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  updatesCreated: number;
  messagesSent: number;
  logins: number;
  key: string;
}

export const ContributionColumns = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: 'Name',
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: 'Incidents',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: 'Offenders',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'updatesCreated',
    dataIndex: 'updatesCreated',
    title: 'Updates',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.updatesCreated - b.updatesCreated,
  },
  {
    key: 'messagesSent',
    dataIndex: 'messagesSent',
    title: 'Messages',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.messagesSent - b.messagesSent,
  },
  {
    key: 'logins',
    dataIndex: 'logins',
    title: 'Logins',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.logins - b.logins,
  },
];

export interface OffenderTableData {
  fullName: string;
  totalIncidents: number;
  alertId: string;
  lastIncident: string;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
}

export const OffenderColumns = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: 'Name',
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      a.fullName.localeCompare(b.fullName),
  },
  {
    key: 'totalIncidents',
    dataIndex: 'totalIncidents',
    title: 'Incidents',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      a.totalIncidents - b.totalIncidents,
  },
  {
    key: 'alertId',
    dataIndex: 'alertId',
    title: 'AlertId',
  },
  {
    key: 'lastIncident',
    dataIndex: 'lastIncident',
    title: 'Last Incident',
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: 'Lost value',
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: 'Recovered value',
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: 'SuccessRate',
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },
];

export interface CrimeGroupPerformanceTableData {
  fullName: string;
  totalIncidents: number;
  totalOffenders: number;
  alertId: string;
  lastIncident: string;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
}

export const CrimeGroupPerformanceColumns = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: 'Alias',
    sorter: (
      a: CrimeGroupPerformanceTableData,
      b: CrimeGroupPerformanceTableData
    ) => a.fullName.localeCompare(b.fullName),
  },
  {
    key: 'totalIncidents',
    dataIndex: 'totalIncidents',
    title: 'Incidents',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (
      a: CrimeGroupPerformanceTableData,
      b: CrimeGroupPerformanceTableData
    ) => a.totalIncidents - b.totalIncidents,
  },
  {
    key: 'totalOffenders',
    dataIndex: 'totalOffenders',
    title: 'Offenders',
    sorter: (
      a: CrimeGroupPerformanceTableData,
      b: CrimeGroupPerformanceTableData
    ) => a.totalOffenders - b.totalOffenders,
  },
  {
    key: 'alertId',
    dataIndex: 'alertId',
    title: 'AlertId',
  },
  {
    key: 'lastIncident',
    dataIndex: 'lastIncident',
    title: 'Last Incident',
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: 'Lost value',
    sorter: (
      a: CrimeGroupPerformanceTableData,
      b: CrimeGroupPerformanceTableData
    ) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: 'Recovered value',
    sorter: (
      a: CrimeGroupPerformanceTableData,
      b: CrimeGroupPerformanceTableData
    ) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: 'SuccessRate',
    sorter: (
      a: CrimeGroupPerformanceTableData,
      b: CrimeGroupPerformanceTableData
    ) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },
];

export interface TargetedBusinessTableData {
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
  commonLost: string;
  highestValueLost: number;
  avgLost: string;
}

export const TargetedBusinessColumns = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: 'Name',
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: 'Incidents',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: 'Offenders',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: 'Lost value',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: 'Recovered value',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: 'SuccessRate',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },
  {
    key: 'commonLost',
    dataIndex: 'commonLost',
    title: 'Most Common Lost',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.commonLost.localeCompare(b.commonLost),
  },
  {
    key: 'highestValueLost',
    dataIndex: 'highestValueLost',
    title: 'Highest Value Lost',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.highestValueLost - b.highestValueLost,
  },
  {
    key: 'avgLost',
    dataIndex: 'avgLost',
    title: 'Average Lost',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
  },
];

export interface TargetedGoodsTableData {
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
  avgLost: string;
}

export const TargetGoodsColumns = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: 'Name',
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: 'Incidents',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: 'Offenders',
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: 'Lost value',
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: 'Recovered value',
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: 'SuccessRate',
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },

  {
    key: 'avgLost',
    dataIndex: 'avgLost',
    title: 'Average Lost',
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
  },
];
