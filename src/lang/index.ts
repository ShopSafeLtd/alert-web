/* eslint-disable @typescript-eslint/no-explicit-any */
import enLang from './entries/en_US';
import frLang from './entries/fr_FR';

interface AppLocaleType {
  en: LocaleType;
  fr: LocaleType;
}

interface LocaleType {
  antd: any;
  locale: string;
  messages: any;
}

const AppLocale: AppLocaleType = {
  en: enLang,
  fr: frLang,
};

export default AppLocale;
