/* eslint-disable @typescript-eslint/no-explicit-any */
export const AvailableLanguagesConst = [
  'en',
  'fr',
  'es',
  'de',
  'da',
  'it',
  'rbe',
  'nl',
  'fi',
  'pl',
  'pt',
  'sv',
] as const;

export type AvailableLanguages = (typeof AvailableLanguagesConst)[number];
