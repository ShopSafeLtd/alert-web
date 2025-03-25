import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  imageContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  text: {
    fontSize: '100%',
    fontWeight: 100,
    marginRight: '20%',
    textShadow:
      '-1px -1px 0 #212020, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    userSelect: 'none',
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    opacity: 0.2,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'rotate(-45deg)',
    width: '100%',
    zIndex: 1,
  },
  textOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
});

interface Props {
  children: JSX.Element;
}

const WatermarkOverlay = ({ children }: Props) => {
  const classes = useStyles();
  const reference = useAtomValue(currentUserAtom)?.reference ?? '';

  return (
    <div className={classes.container}>
      <div className={classes.textOverlay} />
      <div className={classes.textContainer} style={{ left: '-70%' }}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div className={classes.textContainer} style={{ left: '-40%' }}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
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
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div className={classes.textContainer} style={{ left: '40%' }}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      <div className={classes.textContainer} style={{ left: '70%' }}>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
        <span className={classes.text}>{reference}</span>
      </div>
      {children}
    </div>
  );
};

export default WatermarkOverlay;
