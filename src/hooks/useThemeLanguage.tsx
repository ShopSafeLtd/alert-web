import type { AvailableLanguages } from '#/lang';
import AppLocale, { AvailableLanguagesConst } from '#/lang';
import { useStoreActions, useStoreState } from '#/state';
import { LocalStorageKeys, typedLocalStorage } from '#/utils';
import { useEffect, useState } from 'react';
import type { Translations } from '#/state/scheme-model';
import type { Locale } from 'antd/lib/locale-provider';

function checkLang(l: string): l is AvailableLanguages {
  return (AvailableLanguagesConst as readonly string[]).includes(l);
}

interface LocaleType {
  antd: Locale;
  locale: string;
  messages: { [p: string]: string };
}

export const useThemeLanguage = (): {
  theme: 'light' | 'dark';
  currentAppLocale: LocaleType;
  messages: { [key: string]: string };
} => {
  const locale = useStoreState((state) => state.theme.locale);
  const lang =
    checkLang(
      navigator.language === 'nl-BE' ? 'rbe' : navigator.language.split('-')[0]
    ) &&
    (navigator.language === 'nl-BE' ? 'rbe' : navigator.language.split('-')[0]);

  const localLang = typedLocalStorage.get(LocalStorageKeys.lang);

  const initLang = localLang || lang || locale;
  useEffect(() => {
    if (initLang) {
      typedLocalStorage.set(LocalStorageKeys.lang, initLang);
    }
  }, []);

  const customTranslations = useStoreState(
    (state) => state.scheme.translations
  );
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const t = localStorage.getItem('theme');
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);
  if (t) {
    document.documentElement.setAttribute('style', `color-scheme: ${t}`);
  } else {
    // get browser theme preference
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    switchTheme(darkMode ? 'dark' : 'light');
    // set color-scheme: dark or light on the html element
    document.documentElement.setAttribute(
      'style',
      `color-scheme: ${darkMode ? 'dark' : 'light'}`
    );
  }
  const currentAppLocale = AppLocale[initLang as AvailableLanguages];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore. eslint-disable-next-line
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function convertTranslationsToJSON(
    translations: Translations[],
    language: string
  ): { [key: string]: string } {
    const json = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const translation of translations) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const id = Object.keys(translation)[0];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      json[id] = translation[id][language];
    }

    return json;
  }

  const [messages, setMessages] = useState({
    ...currentAppLocale.messages,
    ...convertTranslationsToJSON(customTranslations || [], locale),
  });
  useEffect(() => {
    setMessages({
      ...currentAppLocale.messages,
      ...convertTranslationsToJSON(customTranslations || [], locale),
    });
  }, [currentAppLocale.messages, customTranslations, locale]);

  return {
    theme: currentTheme,
    currentAppLocale,
    messages,
  };
};
