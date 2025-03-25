import type { Theme } from 'configs/ThemeConfig';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';

const useStyles = createUseStyles((theme: Theme) => ({
  noImage: {
    alignItems: 'center',
    backgroundColor: theme.imageBackgroundColor,
    display: 'flex',
    justifyContent: 'center',
  },
  noImageLogo: {
    opacity: 0.8,
    width: 200,
  },
}));

const SkeletonImage = ({ height = 280 }: { height?: number }) => {
  const classes = useStyles();
  const lightLogo = useAtomValue(currentSchemeAtom)?.logo?.optimisedPersisted;
  const darkLogo =
    useAtomValue(currentSchemeAtom)?.darkLogo?.optimisedPersisted;
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  return (
    <div className={classes.noImage} style={{ height }}>
      {!darkLogo && <FontAwesomeIcon icon={faImage} size="4x" />}
      {lightLogo && darkLogo && (
        <img
          // eslint-disable-next-line formatjs/no-literal-string-in-jsx
          alt="logo"
          className={classes.noImageLogo}
          src={
            currentTheme === 'light'
              ? lightLogo || 'https://app.shopsafe.io/img/dark-logo.svg'
              : darkLogo || 'https://app.shopsafe.io/img/light-logo.svg'
          }
        />
      )}
    </div>
  );
};

export default SkeletonImage;
