/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locale } from 'antd/lib/locale-provider';
import enLang from './entries/en_US';
import frLang from './entries/fr_FR';
import esLang from './entries/es_ES';
import deLang from './entries/de_DE';
import dkLang from './entries/dk_DK';
import itLang from './entries/it_IT';

export type AvailableLanguages = 'en' | 'fr' | 'es' | 'de' | 'dk' | 'it';

interface AppLocaleType {
  en: LocaleType;
  fr: LocaleType;
  es: LocaleType;
  de: LocaleType;
  dk: LocaleType;
  it: LocaleType;
}

interface LocaleType {
  antd: Locale;

  locale: string;
  messages: {
    [key: string]: string;
  };
}

const AppLocale: AppLocaleType = {
  en: enLang,
  fr: frLang,
  es: esLang,
  de: deLang,
  dk: dkLang,
  it: itLang,
};

export default AppLocale;
