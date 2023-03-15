import React from 'react';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.2,
    textShadow:
      '-1px -1px 0 #212020, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    fontSize: 10,
    fontWeight: 100,
    color: '#fff',
    transform: 'rotate(-45deg)',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  text: {
    marginRight: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
});

interface Props {
  url?: string | null;
}

const WatermarkImage = ({ url }: Props) => {
  const classes = useStyles();
  const reference = useStoreState((state) => state.user.reference);

  return (
    <div className={classes.container}>
      <div style={{ left: -200 }} className={classes.textContainer}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div style={{ left: -100 }} className={classes.textContainer}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div className={classes.textContainer}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div style={{ left: 100 }} className={classes.textContainer}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div style={{ left: 200 }} className={classes.textContainer}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
    </div>
  );
};

export default WatermarkImage;
