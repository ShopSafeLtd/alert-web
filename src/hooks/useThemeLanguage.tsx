import type { AvailableLanguages } from '#/lang';
import type { Locale } from 'antd/lib/locale-provider';

import { AvailableLanguagesConst } from '#/lang';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreActions, useStoreState } from '#/state';
import { LocalStorageKeys, typedLocalStorage } from '#/utils';
// Import all Ant Design locales
import antdDaDK from 'antd/es/locale/da_DK';
import antdDeDE from 'antd/es/locale/de_DE';
import antdElGR from 'antd/es/locale/el_GR';
import antdEnUS from 'antd/es/locale/en_US';
import antdEsES from 'antd/es/locale/es_ES';
import antdFiFI from 'antd/es/locale/fi_FI';
import antdFrFR from 'antd/es/locale/fr_FR';
import antdHuHU from 'antd/es/locale/hu_HU';
import antdIdID from 'antd/es/locale/id_ID';
import antdItIT from 'antd/es/locale/it_IT';
import antdMsMY from 'antd/es/locale/ms_MY';
import antdNlBE from 'antd/es/locale/nl_BE';
import antdNlNL from 'antd/es/locale/nl_NL';
import antdPlPL from 'antd/es/locale/pl_PL';
import antdPtPT from 'antd/es/locale/pt_PT';
import antdRoRO from 'antd/es/locale/ro_RO';
import antdSvSE from 'antd/es/locale/sv_SE';
import antdThTH from 'antd/es/locale/th_TH';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

export type CustomTranslationResponse =
  | Record<string, Record<string, string>>[]
  | null;

export async function fetchCustomTranslation(
  id: string
): Promise<CustomTranslationResponse> {
  if (!id) {
    return null;
  }
  if (window.location.hostname === 'localhost') {
    // use the VITE_GRAPHQL_URL env -/graphql to get the base url

    const url = import.meta.env.VITE_GRAPHQL_URL;
    const urlBase = url.replace('/graphql', '');

    const response = await fetch(`${urlBase}/custom-translation/${id}`, {
      headers: {
        // Include the Authorization header if token exists
        Authorization: 'translation',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch custom translation. Status: ${response.status}`
      );
    }

    return response.json() as Promise<CustomTranslationResponse>;
  }
  const response = await fetch(`/api/custom-translation/${id}`, {
    headers: {
      // Include the Authorization header if token exists
      Authorization: 'translation',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch custom translation. Status: ${response.status}`
    );
  }

  return response.json() as Promise<CustomTranslationResponse>;
}

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

function checkLang(l: string): l is AvailableLanguages {
  return (AvailableLanguagesConst as readonly string[]).includes(l);
}

interface LocaleType {
  antd: Locale;
  locale: string;
  messages: { [p: string]: string };
}

interface TranslationCache {
  [key: string]: LocaleType;
}

const translationCache: TranslationCache = {};

// Map our language codes to Ant Design locales
const antdLocaleMap: Record<string, Locale> = {
  da: antdDaDK,
  de: antdDeDE,
  el: antdElGR,
  en: antdEnUS,
  es: antdEsES,
  fi: antdFiFI,
  fr: antdFrFR,
  hu: antdHuHU,
  id: antdIdID,
  it: antdItIT,
  ms: antdMsMY,
  nl: antdNlNL,
  pl: antdPlPL,
  pt: antdPtPT,
  rbe: antdNlBE,
  ro: antdRoRO,
  sv: antdSvSE,
  th: antdThTH,
};

// Map our language codes to translation file names
const translationFileMap: Record<string, string> = {
  da: 'da_DK.json',
  de: 'de_DE.json',
  el: 'el_GR.json',
  en: 'en_US.json',
  es: 'es_ES.json',
  fi: 'fi_FI.json',
  fr: 'fr_FR.json',
  hu: 'hu_HU.json',
  id: 'id_ID.json',
  it: 'it_IT.json',
  ms: 'ms_MY.json',
  nl: 'nl_NL.json',
  pl: 'pl_PL.json',
  pt: 'pt_PT.json',
  rbe: 'nl_BE.json',
  ro: 'ro_RO.json',
  sv: 'sv_SE.json',
  th: 'th_TH.json',
};

const loadTranslations = async (lang: string): Promise<LocaleType> => {
  // Check cache first
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  try {
    const antd = antdLocaleMap[lang.toLowerCase()] || antdEnUS;
    const fileName = translationFileMap[lang.toLowerCase()] || 'en_US.json';
    const messages = (await fetch(`/translations/${fileName}`).then((res) =>
      res.json()
    )) as { [key: string]: string };

    const locale = {
      antd,
      locale: lang,
      messages,
    };

    // Cache the result
    translationCache[lang] = locale;
    return locale;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    // Fallback to English if loading fails
    const messages = (await fetch('/translations/en_US.json').then((res) =>
      res.json()
    )) as { [key: string]: string };

    const fallbackLocale = {
      antd: antdEnUS,
      locale: 'en_US',
      messages,
    };

    // Cache the fallback
    translationCache['en_US'] = fallbackLocale;
    return fallbackLocale;
  }
};

export const useThemeLanguage = (): {
  currentAppLocale: LocaleType;
  messages: { [key: string]: string };
  theme: 'dark' | 'light';
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
  const currentScheme = useAtomValue(currentSchemeAtom).id;

  const [customTranslations, setCustomTranslations] =
    useState<CustomTranslationResponse>(null);

  useEffect(() => {
    void (async () => {
      try {
        const data = await fetchCustomTranslation(currentScheme);
        setCustomTranslations(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentScheme]);

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const t = localStorage.getItem('theme');
  const switchTheme = useStoreActions((actions) => actions.theme.switchTheme);

  if (t) {
    document.documentElement.setAttribute('style', `color-scheme: ${t}`);
  } else {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    switchTheme(darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute(
      'style',
      `color-scheme: ${darkMode ? 'dark' : 'light'}`
    );
  }

  const [currentAppLocale, setCurrentAppLocale] = useState<LocaleType>({
    antd: {} as Locale,
    locale: initLang,
    messages: {},
  });
  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const localeI = await loadTranslations(initLang);
        setCurrentAppLocale(localeI);
        setMessages({
          ...localeI.messages,
          ...convertTranslationsToJSON(
            customTranslations || [],
            localeI.locale
          ),
        });
      } catch (error) {
        console.error('Failed to load locale:', error);
      }
    };

    void loadLocale();
  }, [initLang, customTranslations]);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function convertTranslationsToJSON(
    translations: Translations[],
    language: string
  ): { [key: string]: string } {
    const json: { [key: string]: string } = {};

    for (const translation of translations) {
      const id = Object.keys(translation)[0];
      if (translation[id] && translation[id][language]) {
        json[id] = translation[id][language];
      }
    }

    return json;
  }

  return {
    currentAppLocale,
    messages,
    theme: currentTheme,
  };
};
