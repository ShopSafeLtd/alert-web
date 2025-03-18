import type RGL from 'react-grid-layout';

import React from 'react';
import { FormattedMessage } from 'react-intl';

export interface ExtendedLayout extends RGL.Layout {
  allowDuplicates?: boolean;
}

export type AllowedValue =
  | 'activitiesTable'
  | 'activityGraph'
  | 'activitySummary'
  | 'basicPoliceSummary'
  | 'businessContributionTable'
  | 'businessCrimeTypeGraph'
  | 'businessIncidentCountGraph'
  | 'businessLossRecoveredGraph'
  | 'checklistQuestionsTable'
  | 'checklistsTable'
  | 'createdSummary'
  | 'crimeGroupTable'
  | 'crimeTypesByBusinessRadial'
  | 'crimeTypesByOffender'
  | 'crimeTypesDonut'
  | 'customQuestionsCountGraph'
  | 'goodsTypeDonut'
  | 'goodsTypeLossRecoveredRadial'
  | 'goodsValueDonut'
  | 'incidentMonthDonut'
  | 'incidentTimeOfDayDonut'
  | 'incidentsDayOfWeekGraph'
  | 'incidentsHeatMap'
  | 'incidentsSummary'
  | 'incidentsTable'
  | 'investigationSummary'
  | 'investigationsTable'
  | 'involvedTagsDonut'
  | 'logo'
  | 'lossSummary'
  | 'offenderGoodsTypeValue'
  | 'offenderSummary'
  | 'offendersTable'
  | 'outcomeSummary'
  | 'pageBreak'
  | 'pageBreak2'
  | 'pageBreak3'
  | 'pageBreak4'
  | 'policeSummary'
  | 'priorityGraph'
  | 'targetedBusinessTable'
  | 'targetedGoodsTable'
  | 'timeHeatMap'
  | 'topContributors'
  | 'userIncidentCountGraph'
  | 'userSessionsDonut';

export type ReportItemTypes =
  | 'bar'
  | 'donut'
  | 'graph'
  | 'heatmap'
  | 'logo'
  | 'map'
  | 'pageBreak'
  | 'pie'
  | 'radial'
  | 'summary'
  | 'table';

export type MetaDataAllowedValue = 'globalFilter' | AllowedValue;

export type MetaDataItemTypes = 'globalFilter' | ReportItemTypes;

export type ReportViews =
  | 'activity_table'
  | 'business'
  | 'checklist_question_table'
  | 'checklist_table'
  | 'crime_group'
  | 'incident_table'
  | 'investigation_table'
  | 'offender'
  | 'offender_table'
  | 'summary';

export const LayoutToReadable: {
  allowDuplicates: boolean;
  description: React.ReactNode;
  i: AllowedValue;
  item: ExtendedLayout;
  readable: string;
  reportItemTypes: ReportItemTypes[];
  reportViews: ReportViews[];
}[] = [
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing incidents, offenders, updates, messages, vehicles, bulletins and crime groups created in Alert." />
    ),
    i: 'createdSummary',
    item: {
      h: 4,
      i: 'createdSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 0,
    },
    readable: 'Created Summary',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing open/closed activities in Alert." />
    ),
    i: 'activityGraph',
    item: {
      h: 4,
      i: 'activityGraph',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 0,
    },
    readable: 'Activity Graph',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing open/closed activities in Alert." />
    ),
    i: 'activitySummary',
    item: {
      h: 4,
      i: 'activitySummary',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 0,
    },
    readable: 'Activity Summary',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing the number of incidents reported to the police and the number of times the police attended incidents." />
    ),
    i: 'basicPoliceSummary',
    item: {
      allowDuplicates: false,
      h: 4,
      i: 'basicPoliceSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 1,
      x: 1,
      y: 4,
    },
    readable: 'Police Summary',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing the number of incidents reported to the police, number of times the police attended incidents as well as custody images shared." />
    ),
    i: 'policeSummary',
    item: {
      allowDuplicates: false,
      h: 4,
      i: 'policeSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 1,
      x: 1,
      y: 4,
    },
    readable: 'Police Summary (Extended)',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing a breakdown of investigation data in alert including currently open, closed and opened investigations." />
    ),
    i: 'investigationSummary',
    item: {
      allowDuplicates: false,
      h: 4,
      i: 'investigationSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 4,
    },
    readable: 'Investigation Summary',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing an overview of outcomes for offenders in alert including verified ids, arrests, CBOs, prison sentences, rehbilitation orders and fines." />
    ),
    i: 'outcomeSummary',
    item: {
      h: 4,
      i: 'outcomeSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 8,
    },
    readable: 'Outcome Summary',
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing the breakdown of different incident types reported, avaliable as a bar and a a donut graph." />
    ),
    i: 'crimeTypesDonut',
    item: {
      h: 9,
      i: 'crimeTypesDonut',
      maxH: 11,
      moved: false,
      static: false,
      w: 1,
      x: 1,
      y: 36,
    },
    readable: 'Incident Types Graph',
    reportItemTypes: ['bar', 'donut'],
    reportViews: ['summary', 'business', 'crime_group', 'offender'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing the breakdown of different invoved tags reported on incidents, avaliable as a bar and a a donut graph." />
    ),
    i: 'involvedTagsDonut',
    item: {
      h: 10,
      i: 'involvedTagsDonut',
      maxH: 11,
      moved: false,
      static: false,
      w: 1,
      x: 1,
      y: 16,
    },
    readable: 'Involved Tags Graph',
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary', 'business'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing a breakdown of groods types by number of incidents, avaliable as a bar and a a donut graph." />
    ),
    i: 'goodsTypeDonut',
    item: {
      h: 10,
      i: 'goodsTypeDonut',
      maxH: 11,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 16,
    },
    readable: 'Goods Type Graph',
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing a breakdown of goods types by loss values, avaliable as a bar and a a donut graph." />
    ),
    i: 'goodsValueDonut',
    item: {
      h: 9,
      i: 'goodsValueDonut',
      maxH: 11,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 36,
    },
    readable: 'Goods Value Graph',
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary', 'business'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Line graph plotting the number of incidents by day of the week." />
    ),
    i: 'incidentsDayOfWeekGraph',
    item: {
      h: 12,
      i: 'incidentsDayOfWeekGraph',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Incidents Day of Week Graph',
    reportItemTypes: ['graph'],
    reportViews: ['summary', 'business', 'offender', 'crime_group'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing the created Alert data for each business giving an idea of engagement with the system." />
    ),
    i: 'businessContributionTable',
    item: {
      h: 15,
      i: 'businessContributionTable',
      minH: 5,
      minW: 2,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 75,
    },
    readable: 'Business Contribution Table',
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing the top contributing users in Alert and a summary of their created data." />
    ),
    i: 'topContributors',
    item: {
      h: 15,
      i: 'topContributors',
      minW: 2,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 90,
    },
    readable: 'Top Contributors Table',
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing data for offenders in Alert including incident count, last incident date, total lost and recovered values. By default ordered by incident count to show prolific offenders." />
    ),
    i: 'offendersTable',
    item: {
      h: 15,
      i: 'offendersTable',
      minH: 5,
      minW: 2,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 105,
    },
    readable: 'Offenders Table',
    reportItemTypes: ['table'],
    reportViews: ['summary', 'crime_group', 'offender_table'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing data for crime groups in Alert including incident count, last incident date, total lost and recovered values. By default ordered by incident count to show the most harmfull groups." />
    ),
    i: 'crimeGroupTable',
    item: {
      h: 15,
      i: 'crimeGroupTable',
      minH: 5,
      minW: 2,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 120,
    },
    readable: 'Crime Group Table',
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing incident data for business inclunding incident coount, loss values statistics and last incident date. By defaut ordered by incident count by can be ordered by all columns to highlight most impacted businesses." />
    ),
    i: 'targetedBusinessTable',
    item: {
      h: 15,
      i: 'targetedBusinessTable',
      minH: 5,
      minW: 2,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 135,
    },
    readable: 'Targeted Business Table',
    reportItemTypes: ['table'],
    reportViews: ['summary', 'offender', 'crime_group'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing highest targeted goods, includes a incident count and loss values statistics. By defaut ordered by incident count by can be ordered by all columns to highlight most targeted goods." />
    ),
    i: 'targetedGoodsTable',
    item: {
      h: 15,
      i: 'targetedGoodsTable',
      minH: 5,
      minW: 2,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 150,
    },
    readable: 'Targeted Goods Table',
    reportItemTypes: ['table'],
    reportViews: ['crime_group', 'offender', 'summary', 'business'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing basic identity information for an offender, including name, Alert ID, image and description." />
    ),
    i: 'offenderSummary',
    item: {
      allowDuplicates: false,
      h: 4,
      i: 'offenderSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 4,
    },
    readable: 'Offender Summary',
    reportItemTypes: ['summary'],
    reportViews: ['offender'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing an overview of incident data in Alert." />
    ),
    i: 'incidentsSummary',
    item: {
      allowDuplicates: false,
      h: 4,
      i: 'incidentsSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 4,
    },
    readable: 'Incidents Summary',
    reportItemTypes: ['summary'],
    reportViews: ['offender', 'summary', 'business', 'crime_group'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Summary component showing an overview of incident loss statistics in Alert." />
    ),
    i: 'lossSummary',
    item: {
      h: 4,
      i: 'lossSummary',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 12,
    },
    readable: 'Loss Summary',
    reportItemTypes: ['summary'],
    reportViews: ['crime_group', 'business', 'summary', 'offender'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Radial graph showing a breakdown of the incident types by number of incidents for the business with the highest incident counts." />
    ),
    i: 'crimeTypesByBusinessRadial',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'crimeTypesByBusinessRadial',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Incident Types By Business Radial',
    reportItemTypes: ['donut'],
    reportViews: ['offender'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Radial graph showing a breakdown of loss vs recovered values for each of the higest targeted goods items." />
    ),
    i: 'goodsTypeLossRecoveredRadial',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'goodsTypeLossRecoveredRadial',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Goods Type Loss Recovered Radial',
    reportItemTypes: ['donut'],
    reportViews: ['offender', 'business', 'crime_group'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the count for each incident type by offender." />
    ),
    i: 'crimeTypesByOffender',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'crimeTypesByOffender',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Incident Types By Offender',
    reportItemTypes: ['bar'],
    reportViews: ['crime_group'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the loss value for goods types by offender." />
    ),
    i: 'offenderGoodsTypeValue',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'offenderGoodsTypeValue',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Offender Goods Type Value',
    reportItemTypes: ['bar'],
    reportViews: ['crime_group'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the loss value for goods types by offender." />
    ),
    i: 'incidentTimeOfDayDonut',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'incidentTimeOfDayDonut',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Incident Time Of Day Donut',
    reportItemTypes: ['bar'],
    reportViews: ['crime_group', 'offender', 'summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the loss value for goods types by offender." />
    ),
    i: 'incidentMonthDonut',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'incidentMonthDonut',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Incident Month Donut',
    reportItemTypes: ['bar'],
    reportViews: ['offender', 'crime_group', 'business'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Map showing a heatmap of incident data based on the count of incidents reported at businesses." />
    ),
    i: 'incidentsHeatMap',
    item: {
      h: 17,
      i: 'incidentsHeatMap',
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 57,
    },
    readable: 'Incidents Heat Map',
    reportItemTypes: ['map'],
    reportViews: ['crime_group', 'summary', 'offender'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing a summary of recorded incident data." />
    ),
    i: 'incidentsTable',
    item: {
      allowDuplicates: false,
      h: 15,
      i: 'incidentsTable',
      minH: 5,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 8,
    },
    readable: 'Incidents Table',
    reportItemTypes: ['table'],
    reportViews: ['offender', 'crime_group', 'business'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Table component showing a summary of open investigations." />
    ),
    i: 'investigationsTable',
    item: {
      allowDuplicates: false,
      h: 15,
      i: 'investigationsTable',
      minH: 5,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 8,
    },
    readable: 'Investigations Table',
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Bar graph component showming a breakdown of reported incidents by assigned priotity." />
    ),
    i: 'priorityGraph',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'priorityGraph',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Priority Graph',
    reportItemTypes: ['bar'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Heat map component showing incident count broken down by day and hour." />
    ),
    i: 'timeHeatMap',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'timeHeatMap',
      minH: 4,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Time Heat Map',
    reportItemTypes: ['heatmap'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: true,
    description: (
      <FormattedMessage defaultMessage="Graph component that shows the results from custom incident questions. Once added to the report you can select the question to base the data on." />
    ),
    i: 'customQuestionsCountGraph',
    item: {
      allowDuplicates: true,
      h: 9,
      i: 'customQuestionsCountGraph',
      maxH: 11,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 36,
    },
    readable: 'Incident Answer Count',
    reportItemTypes: ['donut'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Radial graph showing the breakdown of sessions across the web and mobile apps for the most active users." />
    ),
    i: 'userSessionsDonut',
    item: {
      allowDuplicates: false,
      h: 9,
      i: 'userSessionsDonut',
      maxH: 11,
      moved: false,
      static: false,
      w: 1,
      x: 0,
      y: 36,
    },
    readable: 'User Session Radial Graph',
    reportItemTypes: ['donut'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing the reported incident count for the top 10 users. Avaliable as a donut and bar graph." />
    ),
    i: 'userIncidentCountGraph',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'userIncidentCountGraph',
      maxH: 11,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'User Incidents Count',
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Graph component showing the incident count for the top 10 impacted business. Avaliable as a donut and bar graph." />
    ),
    i: 'businessIncidentCountGraph',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'businessIncidentCountGraph',
      maxH: 11,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Business Incidents Count',
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Bar graph component showing the incident loss values for the top 10 impacted business." />
    ),
    i: 'businessLossRecoveredGraph',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'businessLossRecoveredGraph',
      maxH: 11,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Businesses Loss Recovered Graph',
    reportItemTypes: ['bar'],
    reportViews: ['summary'],
  },
  {
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Stacked bar graph component showing breackdown of incident types for the top 10 impacted business." />
    ),
    i: 'businessCrimeTypeGraph',
    item: {
      allowDuplicates: false,
      h: 12,
      i: 'businessCrimeTypeGraph',
      maxH: 11,
      moved: false,
      static: false,
      w: 2,
      x: 0,
      y: 45,
    },
    readable: 'Business Incident Type Graph',
    reportItemTypes: ['bar'],
    reportViews: ['summary'],
  },
];

const layoutMap = new Map<string, string>(
  LayoutToReadable.map(({ i, readable }) => [i, readable])
);
export { layoutMap };

export type Elements = {
  [K in AllowedValue]?: JSX.Element;
};

export interface MetaData {
  columns?: string[];
  data?: { [i: string]: unknown };
  graphOptions?: { [i: string]: unknown };
  key: MetaDataAllowedValue;
  propId?: string;
  type: MetaDataItemTypes;
  urls?: string[];
}

export interface SelectOptions {
  label: string;
  value: string;
}

export interface IReportTemplate {
  default: boolean;
  id: string;
  layout: RGL.Layout[];
  metaData: MetaData[];
  name: string;
}

export const redactedText = '██████████';
