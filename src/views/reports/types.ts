import type RGL from 'react-grid-layout';

export type ExtendedLayout = RGL.Layout;

export interface MetaData {
  key: string;
  type:
    | 'summary'
    | 'pageBreak'
    | 'donut'
    | 'graph'
    | 'heatmap'
    | 'table'
    | 'bar'
    | 'logo'
    | 'radial'
    | 'pie';
  urls?: string[];
}

export const LayoutToReadable = [
  {
    i: 'createdSummary',
    readable: 'Created Summary',
    type: 'summary',
  },
  {
    i: 'incidentsSummary',
    readable: 'Incidents Summary',
  },
  {
    i: 'lossSummary',
    readable: 'Loss Summary',
  },
  {
    i: 'crimeTypesDonut',
    readable: 'Crime Types Graph',
  },
  {
    i: 'involvedTagsDonut',
    readable: 'Involved Tags Graph',
  },
  {
    i: 'goodsTypeDonut',
    readable: 'Goods Type Graph',
  },
  {
    i: 'goodsValueDonut',
    readable: 'Goods Value Graph',
  },
  {
    i: 'incidentsDayOfWeekGraph',
    readable: 'Incidents Day of Week Graph',
  },
  {
    i: 'incidentsHeatMap',
    readable: 'Incidents Heat Map',
  },
  {
    i: 'businessContributionTable',
    readable: 'Business Contribution Table',
  },
  {
    i: 'topContributors',
    readable: 'Top Contributors Table',
  },
  {
    i: 'offendersTable',
    readable: 'Offenders Table',
  },
  {
    i: 'crimeGroupTable',
    readable: 'Crime Group Table',
  },
  {
    i: 'targetedBusinessTable',
    readable: 'Targeted Business Table',
  },
  {
    i: 'targetedGoodsTable',
    readable: 'Targeted Goods Table',
  },
  {
    i: 'offenderSummary',
    readable: 'Offender Summary',
  },
  {
    i: 'incidentsSummary',
    readable: 'Incidents Summary',
  },
  {
    i: 'lossSummary',
    readable: 'Loss Summary',
  },
  {
    i: 'crimeTypesDonut',
    readable: 'Crime Types Donut',
  },
  {
    i: 'crimeTypesByBusinessRadial',
    readable: 'Crime Types By Business Radial',
  },
  {
    i: 'goodsTypeLossRecoveredRadial',
    readable: 'Goods Type Loss Recovered Radial',
  },
  {
    i: 'crimeTypesByOffender',
    readable: 'Crime Types By Offender',
  },
  {
    i: 'offenderGoodsTypeValue',
    readable: 'Offender Goods Type Value',
  },
  {
    i: 'incidentTimeOfDayDonut',
    readable: 'Incident Time Of Day Donut',
  },
  {
    i: 'incidentMonthDonut',
    readable: 'Incident Month Donut',
  },
  {
    i: 'incidentsDayOfWeekGraph',
    readable: 'Incidents Day Of Week Graph',
  },
  {
    i: 'incidentsHeatMap',
    readable: 'Incidents Heat Map',
  },
  {
    i: 'incidentsTable',
    readable: 'Incidents Table',
  },
];

export interface SelectOptions {
  label: string;
  value: string;
}

export interface IReportTemplate {
  id: string;
  name: string;
  metaData: MetaData[];
  layout: RGL.Layout[];
}
