export type DateRange = {
  endDate: Date;
  startDate: Date;
} | null;

export enum DatePreset {
  ALL_TIME = 'all_time',
  CUSTOM = 'custom',
  LAST_3_MONTHS = 'last_3_months',
  LAST_6_MONTHS = 'last_6_months',
  LAST_12_MONTHS = 'last_12_months',
  LAST_30_DAYS = 'last_30_days',
}
