import type RGL from 'react-grid-layout';

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
];

// eslint-disable-next-line import/prefer-default-export
export const PerformanceLayout: RGL.Layout[] = [
  {
    w: 2,
    h: 4,
    x: 0,
    y: 0,
    minH: 4,
    i: 'createdSummary',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 4,
    minH: 4,
    x: 0,
    y: 0,
    i: 'incidentsSummary',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 4,
    minH: 4,
    x: 0,
    y: 0,
    i: 'lossSummary',
    moved: false,
    static: false,
  },
  {
    w: 1,
    h: 10,
    maxH: 11,
    x: 0,
    y: 11,
    i: 'crimeTypesDonut',
    moved: false,
    static: false,
  },
  {
    w: 1,
    h: 10,
    x: 1,
    y: 11,
    maxH: 11,
    i: 'involvedTagsDonut',
    moved: false,
    static: false,
  },
  {
    w: 1,
    h: 10,
    x: 0,
    y: 21,
    maxH: 11,

    i: 'goodsTypeDonut',
    moved: false,
    static: false,
  },
  {
    w: 1,
    h: 10,
    x: 1,
    y: 21,
    maxH: 11,

    i: 'goodsValueDonut',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 12,
    x: 0,
    y: 34,
    minH: 4,

    i: 'incidentsDayOfWeekGraph',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 16,
    x: 0,
    y: 41,
    i: 'incidentsHeatMap',
    moved: false,
    static: false,
  },
  {
    w: 2,
    minW: 2,
    h: 15,
    x: 0,
    y: 48,
    minH: 5,

    i: 'businessContributionTable',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 15,
    minW: 2,

    x: 0,
    y: 56,
    i: 'topContributors',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 15,
    x: 0,
    minW: 2,

    y: 64,
    minH: 5,

    i: 'offendersTable',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 15,
    x: 0,
    minW: 2,

    y: 72,
    minH: 5,

    i: 'crimeGroupTable',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 15,
    x: 0,
    minW: 2,

    y: 86,
    minH: 5,

    i: 'targetedBusinessTable',
    moved: false,
    static: false,
  },
  {
    w: 2,
    h: 15,
    minW: 2,

    x: 0,
    y: 92,
    minH: 5,

    i: 'targetedGoodsTable',
    moved: false,
    static: false,
  },
];

export const margin: [number, number] = [10, 10];
export const rowHeight = 30;
export const tableLengthToHeight = (length: number) =>
  length > 10 ? 12 * (length / 10) : 14;
