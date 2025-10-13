export enum Age {
  'EIGHTEEN_THIRTY' = 'EIGHTEEN_THIRTY',
  'FIFTY_SIXTY' = 'FIFTY_SIXTY',
  'FORTY_FIFTY' = 'FORTY_FIFTY',
  'OVER_EIGHTY' = 'OVER_EIGHTY',
  'SEVENTY_EIGHTY' = 'SEVENTY_EIGHTY',
  'SIXTY_SEVENTY' = 'SIXTY_SEVENTY',
  'THIRTY_FORTY' = 'THIRTY_FORTY',
  'UNDER_EIGHTEEN' = 'UNDER_EIGHTEEN',
  'UNKNOWN' = 'UNKNOWN',
}
// wait to check
export const ageValues = [
  {
    label: 'Unknown',
    value: Age.UNKNOWN,
  },
  {
    label: '< 18',
    value: 'UNDER_EIGHTEEN',
  },
  {
    label: '18 - 30',
    value: 'EIGHTEEN_THIRTY',
  },
  {
    label: '30 - 40',
    value: 'THIRTY_FORTY',
  },
  {
    label: '40 - 50',
    value: 'FORTY_FIFTY',
  },
  {
    label: '50-60',
    value: 'FIFTY_SIXTY',
  },
  {
    label: '60-70',
    value: 'SIXTY_SEVENTY',
  },
  {
    label: '70-80',
    value: 'SEVENTY_EIGHTY',
  },
  {
    label: '80 >',
    value: 'OVER_EIGHTY',
  },
];
