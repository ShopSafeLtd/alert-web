import type RGL from 'react-grid-layout';

export interface ExtendedLayout extends RGL.Layout {
  allowDuplicates?: boolean;
}

export type AllowedValue =
  | 'createdSummary'
  | 'incidentsSummary'
  | 'policeSummary'
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
  | 'customQuestionsCountGraph';

type ReportItemTypes =
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

export const LayoutToReadable: {
  i: AllowedValue;
  readable: string;
}[] = [
  {
    i: 'createdSummary',
    readable: 'Created Summary',
  },
  {
    i: 'incidentsSummary',
    readable: 'Incidents Summary',
  },
  {
    i: 'policeSummary',
    readable: 'Police Summary',
  },
  {
    i: 'investigationSummary',
    readable: 'Investigation Summary',
  },
  {
    i: 'outcomeSummary',
    readable: 'Outcome Summary',
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
  {
    i: 'investigationsTable',
    readable: 'Investigations Table',
  },
  {
    i: 'priorityGraph',
    readable: 'Priority Graph',
  },
  {
    i: 'timeHeatMap',
    readable: 'Time Heat Map',
  },
  {
    i: 'customQuestionsCountGraph',
    readable: 'Incident Answer Count',
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
}

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

export const redactedText = '██████████';
