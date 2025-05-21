import type { AvailableLanguages } from '#/lang';

import { AvailableLanguagesConst } from '#/lang';
import { LocalStorageKeys, typedLocalStorage } from '#/utils';
import { ClerkProvider } from '@clerk/clerk-react';
import {
  daDK,
  deDE,
  enUS,
  esES,
  frFR,
  itIT,
  nlBE,
  nlNL,
  plPL,
  ptPT,
  svSE,
} from '@clerk/localizations';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function checkLang(l: string): l is AvailableLanguages {
  return (AvailableLanguagesConst as readonly string[]).includes(l);
}

const lang =
  checkLang(
    navigator.language === 'nl-BE' ? 'rbe' : navigator.language.split('-')[0]
  ) &&
  ((navigator.language === 'nl-BE'
    ? 'rbe'
    : navigator.language.split('-')[0]) as AvailableLanguages | null);
const localLang = typedLocalStorage.get(
  LocalStorageKeys.lang
) as AvailableLanguages | null;
const initLang: AvailableLanguages = localLang || lang || 'en';
const getLocal = () => {
  switch (initLang) {
    case 'en': {
      return enUS;
    }
    case 'fr': {
      return frFR;
    }
    case 'es': {
      return esES;
    }
    case 'de': {
      return deDE;
    }
    case 'da': {
      return daDK;
    }
    case 'it': {
      return itIT;
    }
    case 'rbe': {
      return nlBE;
    }
    case 'nl': {
      return nlNL;
    }
    case 'fi': {
      return enUS;
    }
    case 'pl': {
      return plPL;
    }
    case 'pt': {
      return ptPT;
    }
    case 'sv': {
      return svSE;
    }
    default: {
      return enUS;
    }
  }
};

interface Props {
  children: React.ReactNode;
}

export const ClerkWithRouting = ({ children }: Props) => {
  const navigate = useNavigate();

  const satelliteHosts = [
    'https://jdshield.com',
    'https://app.jdshield.com',
    'http://localhost:3004',
  ];

  const isSatellite =
    window.location.host.includes('jdshield') ||
    window.location.host.includes('localhost');

  if (isSatellite) {
    return (
      <ClerkProvider
        allowedRedirectOrigins={satelliteHosts}
        domain={'jdshield.com'}
        isSatellite={true}
        localization={getLocal()}
        publishableKey={PUBLISHABLE_KEY}
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
      >
        {children}
      </ClerkProvider>
    );
  }
  return (
    <ClerkProvider
      allowedRedirectOrigins={satelliteHosts}
      localization={getLocal()}
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
};
