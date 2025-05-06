import type { AvailableLanguages } from '#/lang';

import App from '#/App';
import LoadingScreen from '#/components/layout-components/LoadingScreen';
import { AvailableLanguagesConst } from '#/lang';
import { ThemeConfig } from '#/state';
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
import { ThemeSwitcherProvider } from 'react-css-theme-switcher/src';
import ReactDOM from 'react-dom';
import { BrowserRouter, useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import '~/yet-another-react-lightbox/dist/styles.css';

import './index.css';
import * as serviceWorker from './serviceWorker';

const themes = {
  dark: '/css/dark-theme.css',
  light: '/css/light-theme.css',
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

window.addEventListener('vite:preloadError', () => {
  window.location.reload();
});

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

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

const ClerkWithRouting = ({ children }: Props) => {
  const navigate = useNavigate();

  const satelliteHosts = ['jdshield.com', 'app.jdshield.com']; // add more if needed
  const isSatellite = satelliteHosts.includes(window.location.host);
  const primarySignInUrl = 'https://app.shopsafe.io/sign-in';
  // const [clerk, setClerk] = useState<ClerkProp | null>(null);
  //
  // useEffect(() => {
  //   const loadClerk = async () => {
  //     const loadFromCDN = async () => {
  //       const ClerkConstructor = new Clerk(PUBLISHABLE_KEY);
  //       await ClerkConstructor.load();
  //       return ClerkConstructor as unknown as ClerkProp;
  //     };
  //
  //     const loadFromBundle = async () => {
  //       const { Clerk: BundledClerk } = await import('@clerk/clerk-js');
  //       const ClerkConstructor = new BundledClerk(PUBLISHABLE_KEY);
  //       await ClerkConstructor.load();
  //       return ClerkConstructor as unknown as ClerkProp;
  //     };
  //
  //     try {
  //       const clerkInstance = await loadFromCDN();
  //       setClerk(clerkInstance);
  //     } catch (error) {
  //       console.warn(
  //         'Failed to load Clerk from CDN, falling back to bundle:',
  //         error
  //       );
  //       try {
  //         const fallbackInstance = await loadFromBundle();
  //         setClerk(fallbackInstance);
  //       } catch (bundleError) {
  //         console.error(
  //           'Failed to load Clerk from both CDN and bundle:',
  //           bundleError
  //         );
  //       }
  //     }
  //   };
  //
  //   void loadClerk();
  // }, []);
  //
  // if (!clerk) return <LoadingScreen />;
  return (
    <ClerkProvider
      allowedRedirectOrigins={satelliteHosts}
      domain={(url) => url.host}
      isSatellite={isSatellite}
      localization={getLocal()}
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl={isSatellite ? primarySignInUrl : undefined}
    >
      {children}
    </ClerkProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <ThemeSwitcherProvider
          defaultTheme={ThemeConfig.currentTheme}
          insertionPoint="styles-insertion-point"
          themeMap={themes}
        >
          <ClerkWithRouting>
            <React.Suspense fallback={<LoadingScreen />}>
              <App />
            </React.Suspense>
          </ClerkWithRouting>
        </ThemeSwitcherProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
