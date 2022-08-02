const genders = [
  { value: 'UNKNOWN', text: 'Unknown' },
  { value: 'MALE', text: 'Male' },
  { value: 'FEMALE', text: 'Female' },
];
const ethnicities = [
  { value: 'UNKNOWN', text: 'Unknown' },
  { value: 'IC1', text: 'IC1 - White - North European' },
  { value: 'IC2', text: 'IC2 - White - South European' },
  { value: 'IC3', text: 'IC3 - Black' },
  { value: 'IC4', text: 'IC4 - South Asian' },
  { value: 'IC5', text: 'IC5 - Southeast Asian' },
  { value: 'IC6', text: 'IC6 - North African or Arab' },
];
const ages = [
  { value: 'UNKNOWN', text: 'Unknown' },
  { value: 'UNDER_EIGHTEEN', text: 'Under 18' },
  { value: 'EIGHTEEN_THIRTY', text: '18 - 30' },
  { value: 'THIRTY_FORTY', text: '31 - 40' },
  { value: 'FORTY_FIFTY', text: '41 - 50' },
  { value: 'FIFTY_SIXTY', text: '51 - 60' },
  { value: 'SIXTY_SEVENTY', text: '61 - 70' },
  { value: 'SEVENTY_EIGHTY', text: '71 - 80' },
  { value: 'OVER_EIGHTY', text: 'Over 80' },
];
const builds = [
  { value: 'UNKNOWN', text: 'Unknown' },
  { value: 'SMALL', text: 'Small' },
  { value: 'MEDIUM', text: 'Average' },
  { value: 'LARGE', text: 'Large' },
];

const roles = [
  { value: 'USER', text: 'User' },
  { value: 'CONTENT_ADMIN', text: 'Content Admin' },
  { value: 'SCHEME_ADMIN', text: 'Scheme Admin' },
  { value: 'SHOPSAFE_ADMIN', text: 'Scheme Admin' },
];

export const getSex = (gender: string): string =>
  genders.find(({ value }) => value === gender)?.text || 'Unknown';
export const getEthnicity = (ethnicity: string): string =>
  ethnicities.find(({ value }) => value === ethnicity)?.text || 'Unknown';
export const getAge = (age: string | number): string =>
  ages.find(({ value }) => value === age)?.text || 'Unknown';
export const getBuild = (build: string): string =>
  builds.find(({ value }) => value === build)?.text || 'Unknown';
export const getRole = (role: string): string =>
  roles.find(({ value }) => value === role)?.text || 'Unknown';
