const genders = [
  { text: 'Unknown', value: 'UNKNOWN' },
  { text: 'Male', value: 'MALE' },
  { text: 'Female', value: 'FEMALE' },
];
const ethnicities = [
  { text: 'Unknown', value: 'UNKNOWN' },
  { text: 'IC1 - White - North European', value: 'IC1' },
  { text: 'IC2 - White - South European', value: 'IC2' },
  { text: 'IC3 - Black', value: 'IC3' },
  { text: 'IC4 - South Asian', value: 'IC4' },
  { text: 'IC5 - Southeast Asian', value: 'IC5' },
  { text: 'IC6 - North African or Arab', value: 'IC6' },
];
const ages = [
  { text: 'Unknown', value: 'UNKNOWN' },
  { text: 'Under 18', value: 'UNDER_EIGHTEEN' },
  { text: '18 - 30', value: 'EIGHTEEN_THIRTY' },
  { text: '31 - 40', value: 'THIRTY_FORTY' },
  { text: '41 - 50', value: 'FORTY_FIFTY' },
  { text: '51 - 60', value: 'FIFTY_SIXTY' },
  { text: '61 - 70', value: 'SIXTY_SEVENTY' },
  { text: '71 - 80', value: 'SEVENTY_EIGHTY' },
  { text: 'Over 80', value: 'OVER_EIGHTY' },
];
const builds = [
  { text: 'Unknown', value: 'UNKNOWN' },
  { text: 'Small', value: 'SMALL' },
  { text: 'Average', value: 'MEDIUM' },
  { text: 'Large', value: 'LARGE' },
];

export const getSex = (gender: string): string =>
  genders.find(({ value }) => value === gender)?.text || gender;
export const getEthnicity = (ethnicity: string): string =>
  ethnicities.find(({ value }) => value === ethnicity)?.text || ethnicity;
export const getAge = (age: number | string): string =>
  ages.find(({ value }) => value === age)?.text || 'Unknown';
export const getBuild = (build: string): string =>
  builds.find(({ value }) => value === build)?.text || build;
