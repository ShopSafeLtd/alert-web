import React from 'react';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { useStoreState } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/pro-light-svg-icons';

const useStyles = createUseStyles((theme: Theme) => ({
  noImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.imageBackgroundColor,
  },
  noImageLogo: {
    width: 200,
    opacity: 0.8,
  },
}));

const SkeletonImage = ({ height = 280 }: { height?: number }) => {
  const classes = useStyles();
  const lightLogo = useStoreState((state) => state.scheme.logo);
  const darkLogo = useStoreState((state) => state.scheme.darkLogo);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  return (
    <div className={classes.noImage} style={{ height }}>
      {!darkLogo && <FontAwesomeIcon icon={faImage} size="4x" />}
      {lightLogo && darkLogo && (
        <img
          className={classes.noImageLogo}
          src={
            currentTheme === 'light'
              ? lightLogo || 'https://app.shopsafealert.co.uk/img/dark-logo.svg'
              : darkLogo || 'https://app.shopsafealert.co.uk/img/light-logo.svg'
          }
          // eslint-disable-next-line formatjs/no-literal-string-in-jsx
          alt="logo"
        />
      )}
    </div>
  );
};

export default SkeletonImage;
