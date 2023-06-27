/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locale } from 'antd/lib/locale-provider';
import enLang from './entries/en_US';
import frLang from './entries/fr_FR';

interface AppLocaleType {
  en: LocaleType;
  fr: LocaleType;
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
};

export default AppLocale;
