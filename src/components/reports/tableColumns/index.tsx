/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { ColumnsType, SortOrder } from 'antd/es/table/interface';
import { Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';
import moment from 'moment';
import GetInvestigationStatusValues from '#/types/enums/investigation-status';
import { InvestigationStatus } from 'graphql/types';

export interface BusinessTableData {
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  updatesCreated: number;
  messagesSent: number;
  logins: number;
  users: number;
}

export const BusinessColumns: ColumnsType<BusinessTableData> = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: <FormattedMessage defaultMessage="Incidents" />,
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: <FormattedMessage defaultMessage="Offenders" />,
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'updatesCreated',
    dataIndex: 'updatesCreated',
    title: <FormattedMessage defaultMessage="Updates" />,
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.updatesCreated - b.updatesCreated,
  },
  {
    key: 'messagesSent',
    dataIndex: 'messagesSent',
    title: <FormattedMessage defaultMessage="Messages" />,
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.messagesSent - b.messagesSent,
  },
  {
    key: 'logins',
    dataIndex: 'logins',
    title: <FormattedMessage defaultMessage="Logins" />,
    sorter: (a: BusinessTableData, b: BusinessTableData) => a.logins - b.logins,
  },
  {
    key: 'users',
    dataIndex: 'users',
    title: <FormattedMessage defaultMessage="Users" />,
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

export const ContributionColumns: ColumnsType<ContributionTableData> = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: <FormattedMessage defaultMessage="Incidents" />,
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: <FormattedMessage defaultMessage="Offenders" />,
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'updatesCreated',
    dataIndex: 'updatesCreated',
    title: <FormattedMessage defaultMessage="Updates" />,
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.updatesCreated - b.updatesCreated,
  },
  {
    key: 'messagesSent',
    dataIndex: 'messagesSent',
    title: <FormattedMessage defaultMessage="Messages" />,
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.messagesSent - b.messagesSent,
  },
  {
    key: 'logins',
    dataIndex: 'logins',
    title: <FormattedMessage defaultMessage="Logins" />,
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
  id: string;
  totalBulletins: number;
}

export const OffenderColumns: ColumnsType<OffenderTableData> = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      a.fullName.localeCompare(b.fullName),
    render: (name: string, item: OffenderTableData) => (
      <Link to={`/app/offenders/view/${item.id}`}>{name}</Link>
    ),
  },
  {
    key: 'totalIncidents',
    dataIndex: 'totalIncidents',
    title: <FormattedMessage defaultMessage="Incidents" />,
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      a.totalIncidents - b.totalIncidents,
  },
  {
    key: 'alertId',
    dataIndex: 'alertId',
    title: 'Alert ID',
  },
  {
    key: 'lastIncident',
    dataIndex: 'lastIncident',
    title: 'Last Incident',
  },
  {
    key: 'totalBulletins',
    dataIndex: 'totalBulletins',
    title: 'Bulletins',
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: <FormattedMessage defaultMessage="Lost value" />,
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: <FormattedMessage defaultMessage="Recovered value" />,
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: <FormattedMessage defaultMessage="Loss Rate" />,
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

export const CrimeGroupPerformanceColumns: ColumnsType<CrimeGroupPerformanceTableData> =
  [
    {
      key: 'fullName',
      dataIndex: 'fullName',
      title: <FormattedMessage defaultMessage="Alias" />,
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) => a.fullName.localeCompare(b.fullName),
    },
    {
      key: 'totalIncidents',
      dataIndex: 'totalIncidents',
      title: <FormattedMessage defaultMessage="Incidents" />,
      defaultSortOrder: 'descend' as SortOrder,
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) => a.totalIncidents - b.totalIncidents,
    },
    {
      key: 'totalOffenders',
      dataIndex: 'totalOffenders',
      title: <FormattedMessage defaultMessage="Offenders" />,
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
      title: <FormattedMessage defaultMessage="Lost value" />,
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) =>
        Number.parseInt(a.lostValue || '0', 10) -
        Number.parseInt(b.lostValue || '0', 10),
      render: (text: string) => (
        <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
          0
        )}`}</Typography.Text>
      ),
    },
    {
      key: 'recoveredValue',
      dataIndex: 'recoveredValue',
      title: <FormattedMessage defaultMessage="Recovered value" />,
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) =>
        Number.parseInt(a.recoveredValue || '0', 10) -
        Number.parseInt(b.recoveredValue || '0', 10),
      render: (text: string) => (
        <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
          0
        )}`}</Typography.Text>
      ),
    },
    {
      key: 'successRate',
      dataIndex: 'successRate',
      title: <FormattedMessage defaultMessage="Sucesses Rate" />,
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

export const TargetedBusinessColumns: ColumnsType<TargetedBusinessTableData> = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: <FormattedMessage defaultMessage="Incidents" />,
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: <FormattedMessage defaultMessage="Offenders" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: <FormattedMessage defaultMessage="Lost value" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: <FormattedMessage defaultMessage="Recovered value" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: <FormattedMessage defaultMessage="Recovery Rate" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },
  {
    key: 'commonLost',
    dataIndex: 'commonLost',
    title: <FormattedMessage defaultMessage="Most Common Lost" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.commonLost.localeCompare(b.commonLost),
  },
  {
    key: 'highestValueLost',
    dataIndex: 'highestValueLost',
    title: <FormattedMessage defaultMessage="Highest Value Lost" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.highestValueLost - b.highestValueLost,
    render: (text: number) => <Typography.Text>{`£${text}`}</Typography.Text>,
  },
  {
    key: 'avgLost',
    dataIndex: 'avgLost',
    title: <FormattedMessage defaultMessage="Average Lost" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
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

export const TargetGoodsColumns: ColumnsType<TargetedGoodsTableData> = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: <FormattedMessage defaultMessage="Incidents" />,
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  // {
  //   key: 'offendersCreated',
  //   dataIndex: 'offendersCreated',
  //   title: <FormattedMessage id="xb54TN" defaultMessage="Offenders" />,
  //   sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
  //     a.offendersCreated - b.offendersCreated,
  // },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: <FormattedMessage defaultMessage="Lost value" />,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: <FormattedMessage defaultMessage="Recovered value" />,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: <FormattedMessage defaultMessage="Recovery Rate" />,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },
  {
    key: 'avgLost',
    dataIndex: 'avgLost',
    title: <FormattedMessage defaultMessage="Average Lost" />,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
];

export interface InvestigationsTableData {
  key: string;
  alertId: string;
  name: string;
  status: InvestigationStatus;
  totalIncidents: number;
  totalOffenders: number;
  totalValue: number;
  createdAt: Date;
}

export const InvestigationsColumns: ColumnsType<InvestigationsTableData> = [
  {
    key: 'alertId',
    dataIndex: 'alertId',
    title: <FormattedMessage defaultMessage="Alert ID" />,
    render: (text, item) => (
      <Link to={`/app/investigations/view/${item.key}`}>{text}</Link>
    ),
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: <FormattedMessage defaultMessage="Status" />,
    filters: [
      {
        text: <FormattedMessage defaultMessage="Open" />,
        value: InvestigationStatus.Open,
      },
      {
        text: <FormattedMessage defaultMessage="Closed" />,
        value: InvestigationStatus.Closed,
      },
    ],
    defaultFilteredValue: [InvestigationStatus.Open],
    onFilter: (value: string | number | boolean, record) =>
      value === record.status,
    render: (value: InvestigationStatus) => (
      <Typography.Text>{GetInvestigationStatusValues[value]}</Typography.Text>
    ),
  },
  {
    key: 'createdAt',
    dataIndex: 'createdAt',
    title: <FormattedMessage defaultMessage="Date Opened" />,
    render: (date: string) => moment(date).format('DD/MM/YYYY'),
  },
  {
    key: 'closedAt',
    dataIndex: 'closedAt',
    title: <FormattedMessage defaultMessage="Date Closed" />,
    render: (value: string) =>
      value ? moment(value).format('DD/MM/YYYY') : undefined,
  },
  {
    key: 'totalIncidents',
    dataIndex: 'totalIncidents',
    title: <FormattedMessage defaultMessage="Total Incidents" />,
    sorter: (a: InvestigationsTableData, b: InvestigationsTableData) =>
      a.totalIncidents - b.totalIncidents,
    render: (text: number) => (
      <Typography.Text>{text.toFixed(0)}</Typography.Text>
    ),
  },
  {
    key: 'totalOffenders',
    dataIndex: 'totalOffenders',
    title: <FormattedMessage defaultMessage="Total Offenders" />,
    sorter: (a: InvestigationsTableData, b: InvestigationsTableData) =>
      a.totalOffenders - b.totalOffenders,
    render: (text: number) => (
      <Typography.Text>{text.toFixed(0)}</Typography.Text>
    ),
  },
  {
    key: 'totalValue',
    dataIndex: 'totalValue',
    title: <FormattedMessage defaultMessage="Total Value" />,
    sorter: (a: InvestigationsTableData, b: InvestigationsTableData) =>
      a.totalValue - b.totalValue,
    render: (text: number) => (
      <Typography.Text>{`£${text.toFixed(0)}`}</Typography.Text>
    ),
  },
];

export interface IncidentsTableData {
  key: string;
  alertId: number | null | undefined;
  date: string;
  value: string;
  valueRec: string;
  location: string;
  totalOffenders: number;
  crimeTypes: string;
  policeReported: string;
  policeAttended: string;
  crimeRef: string;
}

export const IncidentsColumns: ColumnsType<IncidentsTableData> = [
  {
    key: 'alertId',
    dataIndex: 'alertId',
    title: <FormattedMessage defaultMessage="Alert ID" />,
  },
  {
    key: 'date',
    dataIndex: 'date',
    title: <FormattedMessage defaultMessage="Date" />,
    // compare dates
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    defaultSortOrder: 'descend',
  },
  {
    key: 'value',
    dataIndex: 'value',
    title: <FormattedMessage defaultMessage="Value Lost" />,
    sorter: (a, b) => a.value.localeCompare(b.value),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'valueRec',
    dataIndex: 'valueRec',
    title: <FormattedMessage defaultMessage="Value Recovered" />,
    sorter: (a, b) => a.valueRec.localeCompare(b.valueRec),
    render: (text: string) => (
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'location',
    dataIndex: 'location',
    title: <FormattedMessage defaultMessage="Location" />,
    sorter: (a, b) => a.location.localeCompare(b.location),
  },
  {
    key: 'totalOffenders',
    dataIndex: 'totalOffenders',
    title: (
      <FormattedMessage
        defaultMessage="
Offenders
    "
      />
    ),
    sorter: (a, b) => a.totalOffenders - b.totalOffenders,
  },
  {
    key: 'crimeTypes',
    dataIndex: 'crimeTypes',
    title: <FormattedMessage defaultMessage="Crime Types" />,
  },
  {
    key: 'policeReported',
    dataIndex: 'policeReported',
    title: <FormattedMessage defaultMessage="Police Reported" />,
  },
  {
    key: 'policeAttended',
    dataIndex: 'policeAttended',
    title: <FormattedMessage defaultMessage="Police Attended" />,
  },
  {
    key: 'crimeRef',
    dataIndex: 'crimeRef',
    title: <FormattedMessage defaultMessage="Crime Ref" />,
  },
];
