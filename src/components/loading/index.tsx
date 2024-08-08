import React from 'react';

import useStyles from './Loading.styles';

export interface Props {
  size?: 'default' | 'large' | 'small' | undefined;
}

const Loading = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.cover}>
      <div className={classes.position}>
        <div className={classes.loadingCard}>
          <div className={classes.loadingLogo} />

          <div className={classes.loadingSpinner}>
            <span className="loader" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
