export const LayoutToReadable = [
  {
    i: 'createdSummary',
    readable: 'Created Summary',
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

export const margin: [number, number] = [10, 10];
export const rowHeight = 30;

export const tableLengthToHeight = (length: number) =>
  length > 10 ? 12 * (length / 10) : 14;
