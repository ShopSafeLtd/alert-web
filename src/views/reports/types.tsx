import React from 'react';
import type RGL from 'react-grid-layout';
import { FormattedMessage } from 'react-intl';

export interface ExtendedLayout extends RGL.Layout {
  allowDuplicates?: boolean;
}

export type AllowedValue =
  | 'createdSummary'
  | 'incidentsSummary'
  | 'policeSummary'
  | 'basicPoliceSummary'
  | 'investigationSummary'
  | 'outcomeSummary'
  | 'lossSummary'
  | 'crimeTypesDonut'
  | 'involvedTagsDonut'
  | 'goodsTypeDonut'
  | 'goodsValueDonut'
  | 'incidentsDayOfWeekGraph'
  | 'incidentsHeatMap'
  | 'businessContributionTable'
  | 'topContributors'
  | 'offendersTable'
  | 'crimeGroupTable'
  | 'targetedBusinessTable'
  | 'targetedGoodsTable'
  | 'investigationsTable'
  | 'offenderSummary'
  | 'crimeTypesByBusinessRadial'
  | 'goodsTypeLossRecoveredRadial'
  | 'crimeTypesByOffender'
  | 'offenderGoodsTypeValue'
  | 'incidentTimeOfDayDonut'
  | 'incidentMonthDonut'
  | 'incidentsTable'
  | 'pageBreak'
  | 'pageBreak2'
  | 'pageBreak3'
  | 'pageBreak4'
  | 'logo'
  | 'timeHeatMap'
  | 'priorityGraph'
  | 'customQuestionsCountGraph'
  | 'userSessionsDonut'
  | 'userIncidentCountGraph'
  | 'businessIncidentCountGraph'
  | 'businessLossRecoveredGraph'
  | 'businessCrimeTypeGraph';

export type ReportItemTypes =
  | 'summary'
  | 'pageBreak'
  | 'donut'
  | 'graph'
  | 'heatmap'
  | 'map'
  | 'table'
  | 'bar'
  | 'logo'
  | 'radial'
  | 'pie';

export type ReportViews = 'summary' | 'offender' | 'business' | 'crime_group';

export const LayoutToReadable: {
  i: AllowedValue;
  readable: string;
  description: React.ReactNode;
  allowDuplicates: boolean;
  item: ExtendedLayout;
  reportViews: ReportViews[];
  reportItemTypes: ReportItemTypes[];
}[] = [
  {
    i: 'createdSummary',
    readable: 'Created Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing incidents, offenders, updates, messages, vehicles, bulletins and crime groups created in Alert." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 4,
      x: 0,
      y: 0,
      i: 'createdSummary',
      minH: 4,
      moved: false,
      static: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    i: 'basicPoliceSummary',
    readable: 'Police Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing the number of incidents reported to the police and the number of times the police attended incidents." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 4,
      x: 1,
      y: 4,
      i: 'basicPoliceSummary',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    i: 'policeSummary',
    readable: 'Police Summary (Extended)',
    description: (
      <FormattedMessage defaultMessage="Summary component showing the number of incidents reported to the police, number of times the police attended incidents as well as custody images shared." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 4,
      x: 1,
      y: 4,
      i: 'policeSummary',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    i: 'investigationSummary',
    readable: 'Investigation Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing a breakdown of investigation data in alert including currently open, closed and opened investigations." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 4,
      x: 0,
      y: 4,
      i: 'investigationSummary',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    i: 'outcomeSummary',
    readable: 'Outcome Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing an overview of outcomes for offenders in alert including verified ids, arrests, CBOs, prison sentences, rehbilitation orders and fines." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 4,
      x: 0,
      y: 8,
      i: 'outcomeSummary',
      minH: 4,
      moved: false,
      static: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['summary'],
  },
  {
    i: 'crimeTypesDonut',
    readable: 'Crime Types Graph',
    description: (
      <FormattedMessage defaultMessage="Graph component showing the breakdown of different incident types reported, avaliable as a bar and a a donut graph." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 9,
      x: 1,
      y: 36,
      i: 'crimeTypesDonut',
      maxH: 11,
      moved: false,
      static: false,
    },
    reportItemTypes: ['bar', 'donut'],
    reportViews: ['summary', 'business', 'crime_group', 'offender'],
  },
  {
    i: 'involvedTagsDonut',
    readable: 'Involved Tags Graph',
    description: (
      <FormattedMessage defaultMessage="Graph component showing the breakdown of different invoved tags reported on incidents, avaliable as a bar and a a donut graph." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 10,
      x: 1,
      y: 16,
      i: 'involvedTagsDonut',
      maxH: 11,
      moved: false,
      static: false,
    },
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary', 'business'],
  },
  {
    i: 'goodsTypeDonut',
    readable: 'Goods Type Graph',
    description: (
      <FormattedMessage defaultMessage="Graph component showing a breakdown of groods types by number of incidents, avaliable as a bar and a a donut graph." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 10,
      x: 0,
      y: 16,
      i: 'goodsTypeDonut',
      maxH: 11,
      moved: false,
      static: false,
    },
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary'],
  },
  {
    i: 'goodsValueDonut',
    readable: 'Goods Value Graph',
    description: (
      <FormattedMessage defaultMessage="Graph component showing a breakdown of goods types by loss values, avaliable as a bar and a a donut graph." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 9,
      x: 0,
      y: 36,
      i: 'goodsValueDonut',
      maxH: 11,
      moved: false,
      static: false,
    },
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary', 'business'],
  },
  {
    i: 'incidentsDayOfWeekGraph',
    readable: 'Incidents Day of Week Graph',
    description: (
      <FormattedMessage defaultMessage="Line graph plotting the number of incidents by day of the week." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'incidentsDayOfWeekGraph',
      minH: 4,
      moved: false,
      static: false,
    },
    reportItemTypes: ['graph'],
    reportViews: ['summary', 'business', 'offender', 'crime_group'],
  },
  {
    i: 'businessContributionTable',
    readable: 'Business Contribution Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing the created Alert data for each business giving an idea of engagement with the system." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 75,
      i: 'businessContributionTable',
      minW: 2,
      minH: 5,
      moved: false,
      static: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    i: 'topContributors',
    readable: 'Top Contributors Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing the top contributing users in Alert and a summary of their created data." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 90,
      i: 'topContributors',
      minW: 2,
      moved: false,
      static: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    i: 'offendersTable',
    readable: 'Offenders Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing data for offenders in Alert including incident count, last incident date, total lost and recovered values. By default ordered by incident count to show prolific offenders." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 105,
      i: 'offendersTable',
      minW: 2,
      minH: 5,
      moved: false,
      static: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['summary', 'crime_group'],
  },
  {
    i: 'crimeGroupTable',
    readable: 'Crime Group Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing data for crime groups in Alert including incident count, last incident date, total lost and recovered values. By default ordered by incident count to show the most harmfull groups." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 120,
      i: 'crimeGroupTable',
      minW: 2,
      minH: 5,
      moved: false,
      static: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    i: 'targetedBusinessTable',
    readable: 'Targeted Business Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing incident data for business inclunding incident coount, loss values statistics and last incident date. By defaut ordered by incident count by can be ordered by all columns to highlight most impacted businesses." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 135,
      i: 'targetedBusinessTable',
      minW: 2,
      minH: 5,
      moved: false,
      static: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['summary', 'offender', 'crime_group'],
  },
  {
    i: 'targetedGoodsTable',
    description: (
      <FormattedMessage defaultMessage="Table component showing highest targeted goods, includes a incident count and loss values statistics. By defaut ordered by incident count by can be ordered by all columns to highlight most targeted goods." />
    ),
    readable: 'Targeted Goods Table',
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 150,
      i: 'targetedGoodsTable',
      minW: 2,
      minH: 5,
      moved: false,
      static: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['crime_group', 'offender', 'summary', 'business'],
  },
  {
    i: 'offenderSummary',
    readable: 'Offender Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing basic identity information for an offender, including name, Alert ID, image and description." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 4,
      x: 0,
      y: 4,
      i: 'offenderSummary',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['offender'],
  },
  {
    i: 'incidentsSummary',
    readable: 'Incidents Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing an overview of incident data in Alert." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 4,
      x: 0,
      y: 4,
      i: 'incidentsSummary',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['offender', 'summary', 'business', 'crime_group'],
  },
  {
    i: 'lossSummary',
    readable: 'Loss Summary',
    description: (
      <FormattedMessage defaultMessage="Summary component showing an overview of incident loss statistics in Alert." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 4,
      x: 0,
      y: 12,
      i: 'lossSummary',
      minH: 4,
      moved: false,
      static: false,
    },
    reportItemTypes: ['summary'],
    reportViews: ['crime_group', 'business', 'summary', 'offender'],
  },
  {
    i: 'crimeTypesByBusinessRadial',
    readable: 'Crime Types By Business Radial',
    description: (
      <FormattedMessage defaultMessage="Radial graph showing a breakdown of the incident types by number of incidents for the business with the highest incident counts." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'crimeTypesByBusinessRadial',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['donut'],
    reportViews: ['offender'],
  },
  {
    i: 'goodsTypeLossRecoveredRadial',
    readable: 'Goods Type Loss Recovered Radial',
    allowDuplicates: false,
    description: (
      <FormattedMessage defaultMessage="Radial graph showing a breakdown of loss vs recovered values for each of the higest targeted goods items." />
    ),
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'goodsTypeLossRecoveredRadial',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['donut'],
    reportViews: ['offender', 'business', 'crime_group'],
  },
  {
    i: 'crimeTypesByOffender',
    readable: 'Incident Types By Offender',
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the count for each incident type by offender." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'crimeTypesByOffender',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['bar'],
    reportViews: ['crime_group'],
  },
  {
    i: 'offenderGoodsTypeValue',
    readable: 'Offender Goods Type Value',
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the loss value for goods types by offender." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'offenderGoodsTypeValue',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['bar'],
    reportViews: ['crime_group'],
  },
  {
    i: 'incidentTimeOfDayDonut',
    readable: 'Incident Time Of Day Donut',
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the loss value for goods types by offender." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'incidentTimeOfDayDonut',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['bar'],
    reportViews: ['crime_group', 'offender', 'summary'],
  },
  {
    i: 'incidentMonthDonut',
    readable: 'Incident Month Donut',
    description: (
      <FormattedMessage defaultMessage="Bar graph showing the loss value for goods types by offender." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'incidentMonthDonut',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['bar'],
    reportViews: ['offender', 'crime_group', 'business'],
  },
  {
    i: 'incidentsHeatMap',
    readable: 'Incidents Heat Map',
    description: (
      <FormattedMessage defaultMessage="Map showing a heatmap of incident data based on the count of incidents reported at businesses." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 17,
      x: 0,
      y: 57,
      i: 'incidentsHeatMap',
      moved: false,
      static: false,
    },
    reportItemTypes: ['map'],
    reportViews: ['crime_group', 'summary', 'offender'],
  },
  {
    i: 'incidentsTable',
    readable: 'Incidents Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing a summary of recorded incident data." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 8,
      i: 'incidentsTable',
      minH: 5,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['offender', 'crime_group', 'business'],
  },
  {
    i: 'investigationsTable',
    readable: 'Investigations Table',
    description: (
      <FormattedMessage defaultMessage="Table component showing a summary of open investigations." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 15,
      x: 0,
      y: 8,
      i: 'investigationsTable',
      minH: 5,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['table'],
    reportViews: ['summary'],
  },
  {
    i: 'priorityGraph',
    readable: 'Priority Graph',
    description: (
      <FormattedMessage defaultMessage="Bar graph component showming a breakdown of reported incidents by assigned priotity." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'priorityGraph',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['bar'],
    reportViews: ['summary'],
  },
  {
    i: 'timeHeatMap',
    readable: 'Time Heat Map',
    description: (
      <FormattedMessage defaultMessage="Heat map component showing incident count broken down by day and hour." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'timeHeatMap',
      minH: 4,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['heatmap'],
    reportViews: ['summary'],
  },
  {
    i: 'customQuestionsCountGraph',
    readable: 'Incident Answer Count',
    description: (
      <FormattedMessage defaultMessage="Graph component that shows the results from custom incident questions. Once added to the report you can select the question to base the data on." />
    ),
    allowDuplicates: true,
    item: {
      w: 1,
      h: 9,
      x: 0,
      y: 36,
      i: 'customQuestionsCountGraph',
      maxH: 11,
      moved: false,
      static: false,
      allowDuplicates: true,
    },
    reportItemTypes: ['donut'],
    reportViews: ['summary'],
  },
  {
    i: 'userSessionsDonut',
    readable: 'User Session Radial Graph',
    description: (
      <FormattedMessage defaultMessage="Radial graph showing the breakdown of sessions across the web and mobile apps for the most active users." />
    ),
    allowDuplicates: false,
    item: {
      w: 1,
      h: 9,
      x: 0,
      y: 36,
      i: 'userSessionsDonut',
      maxH: 11,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['donut'],
    reportViews: ['summary'],
  },
  {
    i: 'userIncidentCountGraph',
    readable: 'User Incidents Count',
    description: (
      <FormattedMessage defaultMessage="Graph component showing the reported incident count for the top 10 users. Avaliable as a donut and bar graph." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'userIncidentCountGraph',
      maxH: 11,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary'],
  },
  {
    i: 'businessIncidentCountGraph',
    readable: 'Business Incidents Count',
    description: (
      <FormattedMessage defaultMessage="Graph component showing the incident count for the top 10 impacted business. Avaliable as a donut and bar graph." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'businessIncidentCountGraph',
      maxH: 11,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['donut', 'bar'],
    reportViews: ['summary'],
  },
  {
    i: 'businessLossRecoveredGraph',
    readable: 'Businesses Loss Recovered Graph',
    description: (
      <FormattedMessage defaultMessage="Bar graph component showing the incident loss values for the top 10 impacted business." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'businessLossRecoveredGraph',
      maxH: 11,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
    reportItemTypes: ['bar'],
    reportViews: ['summary'],
  },
  {
    i: 'businessCrimeTypeGraph',
    readable: 'Business Crime Type Graph',
    description: (
      <FormattedMessage defaultMessage="Stacked bar graph component showing breackdown of incident types for the top 10 impacted business." />
    ),
    allowDuplicates: false,
    item: {
      w: 2,
      h: 12,
      x: 0,
      y: 45,
      i: 'businessCrimeTypeGraph',
      maxH: 11,
      moved: false,
      static: false,
      allowDuplicates: false,
    },
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
  key: AllowedValue;
  type: ReportItemTypes;
  urls?: string[];
  propId?: string;
  columns?: string[];
}

export interface SelectOptions {
  label: string;
  value: string;
}

export interface IReportTemplate {
  id: string;
  name: string;
  default: boolean;
  metaData: MetaData[];
  layout: RGL.Layout[];
}

export const redactedText = '██████████';
