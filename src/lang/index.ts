/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locale } from 'antd/lib/locale-provider';
import {
  DaLang,
  DeLang,
  EnLang,
  EsLang,
  FiLang,
  FrLang,
  ItLang,
  NlLang,
  PlLang,
  PtLang,
  SvLang,
} from './entries';

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

interface AppLocaleType {
  en: LocaleType;
  fr: LocaleType;
  es: LocaleType;
  de: LocaleType;
  da: LocaleType;
  it: LocaleType;
  rbe: LocaleType;
  nl: LocaleType;
  fi: LocaleType;
  pl: LocaleType;
  pt: LocaleType;
  sv: LocaleType;
}

interface LocaleType {
  antd: Locale;

  locale: string;
  messages: {
    [key: string]: string;
  };
}

const AppLocale: AppLocaleType = {
  en: EnLang,
  fr: FrLang,
  es: EsLang,
  de: DeLang,
  da: DaLang,
  it: ItLang,
  rbe: NlLang,
  nl: NlLang,
  fi: FiLang,
  pl: PlLang,
  pt: PtLang,
  sv: SvLang,
};

export default AppLocale;
