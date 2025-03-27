/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { ColumnsType, SortOrder } from 'antd/es/table/interface';

import GetInvestigationStatusValues from '#/types/enums/investigation-status';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { InvestigationStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';

export interface BusinessTableData {
  fullName: string;
  incidentsCreated: number;
  logins: number;
  messagesSent: number;
  offendersCreated: number;
  updatesCreated: number;
  users: number;
}

export const BusinessColumns: ColumnsType<BusinessTableData> = [
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'incidentsCreated',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'incidentsCreated',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  {
    dataIndex: 'offendersCreated',
    key: 'offendersCreated',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
    title: <FormattedMessage defaultMessage="Offenders" />,
  },
  {
    dataIndex: 'updatesCreated',
    key: 'updatesCreated',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.updatesCreated - b.updatesCreated,
    title: <FormattedMessage defaultMessage="Updates" />,
  },
  {
    dataIndex: 'messagesSent',
    key: 'messagesSent',
    sorter: (a: BusinessTableData, b: BusinessTableData) =>
      a.messagesSent - b.messagesSent,
    title: <FormattedMessage defaultMessage="Messages" />,
  },
  {
    dataIndex: 'logins',
    key: 'logins',
    sorter: (a: BusinessTableData, b: BusinessTableData) => a.logins - b.logins,
    title: <FormattedMessage defaultMessage="Logins" />,
  },
  {
    dataIndex: 'users',
    key: 'users',
    sorter: (a: BusinessTableData, b: BusinessTableData) => a.users - b.users,
    title: <FormattedMessage defaultMessage="Users" />,
  },
];

export interface ContributionTableData {
  fullName: string;
  incidentsCreated: number;
  key: string;
  logins: number;
  messagesSent: number;
  offendersCreated: number;
  updatesCreated: number;
}

export const ContributionColumns: ColumnsType<ContributionTableData> = [
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'incidentsCreated',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'incidentsCreated',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.incidentsCreated - b.incidentsCreated,
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  {
    dataIndex: 'offendersCreated',
    key: 'offendersCreated',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.offendersCreated - b.offendersCreated,
    title: <FormattedMessage defaultMessage="Offenders" />,
  },
  {
    dataIndex: 'updatesCreated',
    key: 'updatesCreated',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.updatesCreated - b.updatesCreated,
    title: <FormattedMessage defaultMessage="Updates" />,
  },
  {
    dataIndex: 'messagesSent',
    key: 'messagesSent',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.messagesSent - b.messagesSent,
    title: <FormattedMessage defaultMessage="Messages" />,
  },
  {
    dataIndex: 'logins',
    key: 'logins',
    sorter: (a: ContributionTableData, b: ContributionTableData) =>
      a.logins - b.logins,
    title: <FormattedMessage defaultMessage="Logins" />,
  },
];
export interface ActivityTableData {
  completed: boolean;
  dueDate: string;
  id: string;
  name: string;
  totalAnswers: number;
  totalAssignedUsers: number;
  totalQuestions: number;
}

export const ActivityColumns: ColumnsType<ActivityTableData> = [
  {
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <Link to={`/app/tasks`}>{name}</Link>,
    sorter: (a: ActivityTableData, b: ActivityTableData) =>
      a.name.localeCompare(b.name),
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'completed',
    key: 'completed',
    render: (value: ActivityTableData) => (
      <Typography.Text>
        {value.completed ? (
          <FormattedMessage defaultMessage="Completed" />
        ) : (
          <FormattedMessage defaultMessage="Open" />
        )}
      </Typography.Text>
    ),
    title: <FormattedMessage defaultMessage="Status" />,
  },
  {
    dataIndex: 'totalAssignedUsers',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalAssignedUsers',
    sorter: (a: ActivityTableData, b: ActivityTableData) =>
      a.totalAssignedUsers - b.totalAssignedUsers,
    title: <FormattedMessage defaultMessage="Assigned Users" />,
  },
  {
    dataIndex: 'totalQuestions',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalQuestions',
    sorter: (a: ActivityTableData, b: ActivityTableData) =>
      a.totalQuestions - b.totalQuestions,
    title: <FormattedMessage defaultMessage="Questions" />,
  },
  {
    dataIndex: 'totalAnswers',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalAnswers',
    sorter: (a: ActivityTableData, b: ActivityTableData) =>
      a.totalAnswers - b.totalAnswers,
    title: <FormattedMessage defaultMessage="Answers" />,
  },
  {
    dataIndex: 'dueDate',
    key: 'dueDate',
    title: 'Due Date',
  },
];
export interface ChecklistTableData {
  completedAt: string;
  id: string;
  name: string;
  percentAnswer: number;
  percentComplete: number;
  percentScore: number;
  totalAnswers: number;
  totalQuestions: number;
  totalSections: number;
}

export const ChecklistColumns: ColumnsType<ChecklistTableData> = [
  {
    dataIndex: 'name',
    key: 'name',
    render: (name: string, item: ChecklistTableData) => (
      <Link to={`/app/checklists/active/${item.id}`}>{name}</Link>
    ),
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.name.localeCompare(b.name),
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'percentComplete',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'percentComplete',
    render: (value: ChecklistTableData) => (
      <Typography.Text>{`${value.percentComplete || 0}%`}</Typography.Text>
    ),
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.percentComplete - b.percentComplete,
    title: <FormattedMessage defaultMessage="Completion (%)" />,
  },
  {
    dataIndex: 'percentScore',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'percentScore',
    render: (value: ChecklistTableData) => (
      <Typography.Text>{`${value.percentScore || 0}%`}</Typography.Text>
    ),
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.percentScore - b.percentScore,
    title: <FormattedMessage defaultMessage="Score (%)" />,
  },
  {
    dataIndex: 'percentAnswer',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'percentAnswer',
    render: (value: ChecklistTableData) => (
      <Typography.Text>{`${value.percentAnswer || 0}%`}</Typography.Text>
    ),
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.percentAnswer - b.percentAnswer,
    title: <FormattedMessage defaultMessage="Answered (%)" />,
  },
  {
    dataIndex: 'totalSections',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalSections',
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.totalSections - b.totalSections,
    title: <FormattedMessage defaultMessage="Sections" />,
  },
  {
    dataIndex: 'totalQuestions',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalQuestions',
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.totalQuestions - b.totalQuestions,
    title: <FormattedMessage defaultMessage="Questions" />,
  },
  {
    dataIndex: 'totalAnswers',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalAnswers',
    sorter: (a: ChecklistTableData, b: ChecklistTableData) =>
      a.totalAnswers - b.totalAnswers,
    title: <FormattedMessage defaultMessage="Answers" />,
  },
  {
    dataIndex: 'completedAt',
    key: 'completedAt',
    title: 'Completed Date',
  },
];
export interface IncidentTableData {
  alertId: string;
  date: string;
  id: string;
  lostValue: string;
  recoveredValue: string;
  subject: string;
  successRate: string;
  totalBulletins: number;
  totalOffenders: number;
}

export const IncidentColumns: ColumnsType<IncidentTableData> = [
  {
    dataIndex: 'subject',
    key: 'subject',
    render: (subject: string, item: IncidentTableData) => (
      <Link to={`/app/incidents/view/${item.id}`}>{subject}</Link>
    ),
    sorter: (a: IncidentTableData, b: IncidentTableData) =>
      a.subject.localeCompare(b.subject),
    title: <FormattedMessage defaultMessage="Subject" />,
  },
  {
    dataIndex: 'totalOffenders',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalOffenders',
    sorter: (a: IncidentTableData, b: IncidentTableData) =>
      a.totalOffenders - b.totalOffenders,
    title: <FormattedMessage defaultMessage="Offenders" />,
  },
  {
    dataIndex: 'alertId',
    key: 'alertId',
    title: 'Alert ID',
  },
  {
    dataIndex: 'date',
    key: 'date',
    title: 'Date',
  },
  {
    dataIndex: 'totalBulletins',
    key: 'totalBulletins',
    title: 'Bulletins',
  },
  {
    dataIndex: 'lostValue',
    key: 'lostValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: IncidentTableData, b: IncidentTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    title: <FormattedMessage defaultMessage="Lost value" />,
  },
  {
    dataIndex: 'recoveredValue',
    key: 'recoveredValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: IncidentTableData, b: IncidentTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    title: <FormattedMessage defaultMessage="Recovered value" />,
  },
  {
    dataIndex: 'successRate',
    key: 'successRate',
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
    sorter: (a: IncidentTableData, b: IncidentTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    title: <FormattedMessage defaultMessage="Loss Rate" />,
  },
];
export interface OffenderTableData {
  alertId: string;
  fullName: string;
  id: string;
  lastIncident: string;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
  totalBulletins: number;
  totalIncidents: number;
}

export const OffenderColumns: ColumnsType<OffenderTableData> = [
  {
    dataIndex: 'fullName',
    key: 'fullName',
    render: (name: string, item: OffenderTableData) => (
      <Link to={`/app/offenders/view/${item.id}`}>{name}</Link>
    ),
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      a.fullName.localeCompare(b.fullName),
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'totalIncidents',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalIncidents',
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      a.totalIncidents - b.totalIncidents,
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  {
    dataIndex: 'alertId',
    key: 'alertId',
    title: 'Alert ID',
  },
  {
    dataIndex: 'lastIncident',
    key: 'lastIncident',
    title: 'Last Incident',
  },
  {
    dataIndex: 'totalBulletins',
    key: 'totalBulletins',
    title: 'Bulletins',
  },
  {
    dataIndex: 'lostValue',
    key: 'lostValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    title: <FormattedMessage defaultMessage="Lost value" />,
  },
  {
    dataIndex: 'recoveredValue',
    key: 'recoveredValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    title: <FormattedMessage defaultMessage="Recovered value" />,
  },
  {
    dataIndex: 'successRate',
    key: 'successRate',
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
    sorter: (a: OffenderTableData, b: OffenderTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    title: <FormattedMessage defaultMessage="Loss Rate" />,
  },
];
export interface InvestigationTableData {
  alertId: string;
  // closedAt: string;
  // createdAt: string;
  id: string;
  lostValue: string;
  name: string;
  recoveredValue: string;
  status: InvestigationStatus;
  successRate: string;
  totalIncidents: number;
  totalOffenders: number;
}
const getTextStatus = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'success';
  if (value === InvestigationStatus.Closed) return 'danger';
  if (value === InvestigationStatus.Paused) return 'warning';
  return 'success';
};
export const InvestigationColumns: ColumnsType<InvestigationTableData> = [
  {
    dataIndex: 'name',
    key: 'name',
    render: (name: string, item: InvestigationTableData) => (
      <Link to={`/app/investigations/view/${item.id}`}>{name}</Link>
    ),
    sorter: (a: InvestigationTableData, b: InvestigationTableData) =>
      a.name.localeCompare(b.name),
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'status',
    key: 'status',
    render: (value: InvestigationTableData) => (
      <Typography.Text type={getTextStatus(value.status)}>
        {GetInvestigationStatusValues[value.status]}
      </Typography.Text>
    ),
    title: <FormattedMessage defaultMessage="Status" />,
  },
  {
    dataIndex: 'totalIncidents',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalIncidents',
    sorter: (a: InvestigationTableData, b: InvestigationTableData) =>
      a.totalIncidents - b.totalIncidents,
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  {
    dataIndex: 'totalOffenders',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'totalOffenders',
    sorter: (a: InvestigationTableData, b: InvestigationTableData) =>
      a.totalOffenders - b.totalOffenders,
    title: <FormattedMessage defaultMessage="Offenders" />,
  },
  {
    dataIndex: 'alertId',
    key: 'alertId',
    title: 'Alert ID',
  },
  // {
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   title: 'Date Opened',
  // },
  // {
  //   dataIndex: 'closedAt',
  //   key: 'closedAt',
  //   title: 'Date Closed',
  // },
  {
    dataIndex: 'lostValue',
    key: 'lostValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: InvestigationTableData, b: InvestigationTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    title: <FormattedMessage defaultMessage="Lost value" />,
  },
  {
    dataIndex: 'recoveredValue',
    key: 'recoveredValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: InvestigationTableData, b: InvestigationTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    title: <FormattedMessage defaultMessage="Recovered value" />,
  },
  {
    dataIndex: 'successRate',
    key: 'successRate',
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
    sorter: (a: InvestigationTableData, b: InvestigationTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    title: <FormattedMessage defaultMessage="Loss Rate" />,
  },
];
export interface CrimeGroupPerformanceTableData {
  alertId: string;
  fullName: string;
  lastIncident: string;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
  totalIncidents: number;
  totalOffenders: number;
}

export const CrimeGroupPerformanceColumns: ColumnsType<CrimeGroupPerformanceTableData> =
  [
    {
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) => a.fullName.localeCompare(b.fullName),
      title: <FormattedMessage defaultMessage="Alias" />,
    },
    {
      dataIndex: 'totalIncidents',
      defaultSortOrder: 'descend' as SortOrder,
      key: 'totalIncidents',
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) => a.totalIncidents - b.totalIncidents,
      title: <FormattedMessage defaultMessage="Incidents" />,
    },
    {
      dataIndex: 'totalOffenders',
      key: 'totalOffenders',
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) => a.totalOffenders - b.totalOffenders,
      title: <FormattedMessage defaultMessage="Offenders" />,
    },
    {
      dataIndex: 'alertId',
      key: 'alertId',
      title: 'AlertId',
    },
    {
      dataIndex: 'lastIncident',
      key: 'lastIncident',
      title: 'Last Incident',
    },
    {
      dataIndex: 'lostValue',
      key: 'lostValue',
      render: (text: string) => (
        <Typography.Text>
          <FormattedNumber
            currency={'GBP'}
            style={'currency'}
            value={Number.parseInt(text || '0', 10)}
          />
        </Typography.Text>
      ),
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) =>
        Number.parseInt(a.lostValue || '0', 10) -
        Number.parseInt(b.lostValue || '0', 10),
      title: <FormattedMessage defaultMessage="Lost value" />,
    },
    {
      dataIndex: 'recoveredValue',
      key: 'recoveredValue',
      render: (text: string) => (
        <Typography.Text>
          <FormattedNumber
            currency={'GBP'}
            style={'currency'}
            value={Number.parseInt(text || '0', 10)}
          />
        </Typography.Text>
      ),
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) =>
        Number.parseInt(a.recoveredValue || '0', 10) -
        Number.parseInt(b.recoveredValue || '0', 10),
      title: <FormattedMessage defaultMessage="Recovered value" />,
    },
    {
      dataIndex: 'successRate',
      key: 'successRate',
      render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
      sorter: (
        a: CrimeGroupPerformanceTableData,
        b: CrimeGroupPerformanceTableData
      ) =>
        Number.parseInt(a.successRate || '0', 10) -
        Number.parseInt(b.successRate || '0', 10),
      title: <FormattedMessage defaultMessage="Sucesses Rate" />,
    },
  ];

export interface TargetedBusinessTableData {
  avgLost: string;
  commonLost: string;
  fullName: string;
  highestValueLost: number;
  incidentsCreated: number;
  lostValue: string;
  offendersCreated: number;
  recoveredValue: string;
  successRate: string;
}

export const TargetedBusinessColumns: ColumnsType<TargetedBusinessTableData> = [
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'incidentsCreated',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'incidentsCreated',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  {
    dataIndex: 'offendersCreated',
    key: 'offendersCreated',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
    title: <FormattedMessage defaultMessage="Offenders" />,
  },
  {
    dataIndex: 'lostValue',
    key: 'lostValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    title: <FormattedMessage defaultMessage="Lost value" />,
  },
  {
    dataIndex: 'recoveredValue',
    key: 'recoveredValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    title: <FormattedMessage defaultMessage="Recovered value" />,
  },
  {
    dataIndex: 'successRate',
    key: 'successRate',
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    title: <FormattedMessage defaultMessage="Recovery Rate" />,
  },
  {
    dataIndex: 'commonLost',
    key: 'commonLost',
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.commonLost.localeCompare(b.commonLost),
    title: <FormattedMessage defaultMessage="Most Common Lost" />,
  },
  {
    dataIndex: 'highestValueLost',
    key: 'highestValueLost',
    render: (text: number) => (
      <FormattedNumber currency={'GBP'} style={'currency'} value={text || 0} />
    ),
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.highestValueLost - b.highestValueLost,
    title: <FormattedMessage defaultMessage="Highest Value Lost" />,
  },
  {
    dataIndex: 'avgLost',
    key: 'avgLost',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
    title: <FormattedMessage defaultMessage="Average Lost" />,
  },
];

export interface TargetedGoodsTableData {
  avgLost: string;
  fullName: string;
  incidentsCreated: number;
  lostValue: string;
  offendersCreated: number;
  recoveredValue: string;
  successRate: string;
}

export const TargetGoodsColumns: ColumnsType<TargetedGoodsTableData> = [
  {
    dataIndex: 'fullName',
    key: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'incidentsCreated',
    defaultSortOrder: 'descend' as SortOrder,
    key: 'incidentsCreated',
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      a.incidentsCreated - b.incidentsCreated,
    title: <FormattedMessage defaultMessage="Incidents" />,
  },
  // {
  //   key: 'offendersCreated',
  //   dataIndex: 'offendersCreated',
  //   title: <FormattedMessage id="xb54TN" defaultMessage="Offenders" />,
  //   sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
  //     a.offendersCreated - b.offendersCreated,
  // },
  {
    dataIndex: 'lostValue',
    key: 'lostValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    title: <FormattedMessage defaultMessage="Lost value" />,
  },
  {
    dataIndex: 'recoveredValue',
    key: 'recoveredValue',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    title: <FormattedMessage defaultMessage="Recovered value" />,
  },
  {
    dataIndex: 'successRate',
    key: 'successRate',
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    title: <FormattedMessage defaultMessage="Recovery Rate" />,
  },
  {
    dataIndex: 'avgLost',
    key: 'avgLost',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a: TargetedGoodsTableData, b: TargetedGoodsTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
    title: <FormattedMessage defaultMessage="Average Lost" />,
  },
];

export interface InvestigationsTableData {
  alertId: string;
  createdAt: Date;
  key: string;
  name: string;
  status: InvestigationStatus;
  totalIncidents: number;
  totalOffenders: number;
  totalValue: number;
}

export const InvestigationsColumns: ColumnsType<InvestigationsTableData> = [
  {
    dataIndex: 'alertId',
    key: 'alertId',
    render: (text, item) => (
      <Link to={`/app/investigations/view/${item.key}`}>{text}</Link>
    ),
    title: <FormattedMessage defaultMessage="Alert ID" />,
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: <FormattedMessage defaultMessage="Name" />,
  },
  {
    dataIndex: 'status',
    defaultFilteredValue: [InvestigationStatus.Open],
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
    key: 'status',
    onFilter: (value: boolean | number | string, record) =>
      value === record.status,
    render: (value: InvestigationStatus) => (
      <Typography.Text>{GetInvestigationStatusValues[value]}</Typography.Text>
    ),
    title: <FormattedMessage defaultMessage="Status" />,
  },
  {
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    title: <FormattedMessage defaultMessage="Date Opened" />,
  },
  {
    dataIndex: 'closedAt',
    key: 'closedAt',
    render: (value: string) =>
      value ? dayjs(value).format('DD/MM/YYYY') : undefined,
    title: <FormattedMessage defaultMessage="Date Closed" />,
  },
  {
    dataIndex: 'totalIncidents',
    key: 'totalIncidents',
    render: (text: number) => (
      <Typography.Text>{text.toFixed(0)}</Typography.Text>
    ),
    sorter: (a: InvestigationsTableData, b: InvestigationsTableData) =>
      a.totalIncidents - b.totalIncidents,
    title: <FormattedMessage defaultMessage="Total Incidents" />,
  },
  {
    dataIndex: 'totalOffenders',
    key: 'totalOffenders',
    render: (text: number) => (
      <Typography.Text>{text.toFixed(0)}</Typography.Text>
    ),
    sorter: (a: InvestigationsTableData, b: InvestigationsTableData) =>
      a.totalOffenders - b.totalOffenders,
    title: <FormattedMessage defaultMessage="Total Offenders" />,
  },
  {
    dataIndex: 'totalValue',
    key: 'totalValue',
    render: (text: number) => (
      <Typography.Text>
        {' '}
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={text || 0}
        />
      </Typography.Text>
    ),
    sorter: (a: InvestigationsTableData, b: InvestigationsTableData) =>
      a.totalValue - b.totalValue,
    title: <FormattedMessage defaultMessage="Total Value" />,
  },
];

export interface IncidentsTableData {
  alertId: null | number | undefined;
  crimeRef: string;
  crimeTypes: string;
  date: string;
  key: string;
  location: string;
  policeAttended: string;
  policeReported: string;
  totalOffenders: number;
  value: string;
  valueRec: string;
}

export const IncidentsColumns: ColumnsType<IncidentsTableData> = [
  {
    dataIndex: 'alertId',
    key: 'alertId',
    title: <FormattedMessage defaultMessage="Alert ID" />,
  },
  {
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    key: 'date',
    // compare dates
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    title: <FormattedMessage defaultMessage="Date" />,
  },
  {
    dataIndex: 'value',
    key: 'value',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a, b) => a.value.localeCompare(b.value),
    title: <FormattedMessage defaultMessage="Value Lost" />,
  },
  {
    dataIndex: 'valueRec',
    key: 'valueRec',
    render: (text: string) => (
      <Typography.Text>
        <FormattedNumber
          currency={'GBP'}
          style={'currency'}
          value={Number.parseInt(text || '0', 10)}
        />
      </Typography.Text>
    ),
    sorter: (a, b) => a.valueRec.localeCompare(b.valueRec),
    title: <FormattedMessage defaultMessage="Value Recovered" />,
  },
  {
    dataIndex: 'location',
    key: 'location',
    sorter: (a, b) => a.location.localeCompare(b.location),
    title: <FormattedMessage defaultMessage="Location" />,
  },
  {
    dataIndex: 'totalOffenders',
    key: 'totalOffenders',
    sorter: (a, b) => a.totalOffenders - b.totalOffenders,
    title: (
      <FormattedMessage
        defaultMessage="
Offenders
    "
      />
    ),
  },
  {
    dataIndex: 'crimeTypes',
    key: 'crimeTypes',
    title: <FormattedMessage defaultMessage="Incident Types" />,
  },
  {
    dataIndex: 'policeReported',
    key: 'policeReported',
    title: <FormattedMessage defaultMessage="Police Reported" />,
  },
  {
    dataIndex: 'policeAttended',
    key: 'policeAttended',
    title: <FormattedMessage defaultMessage="Police Attended" />,
  },
  {
    dataIndex: 'crimeRef',
    key: 'crimeRef',
    title: <FormattedMessage defaultMessage="Crime Ref" />,
  },
];
