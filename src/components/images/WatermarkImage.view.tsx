import { ImagePosition } from 'graphql/generated';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';
import type { Theme } from '#/configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2,
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
    transform: 'rotate(-45deg)',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  text: {
    marginRight: '20%',
    fontSize: '100%',
    fontWeight: 100,
    textShadow:
      '-1px -1px 0 #212020, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    userSelect: 'none',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: '#fff',
    backgroundColor: theme.imageBackgroundColor,
  },
  standardImage: {
    maxHeight: '100vh',
  },
}));

const getPosition = (position?: ImagePosition): string => {
  switch (position) {
    case ImagePosition.CenterBottom: {
      return 'center bottom';
    }
    case ImagePosition.CenterTop: {
      return 'center top';
    }
    case ImagePosition.LeftBottom: {
      return 'left bottom';
    }
    case ImagePosition.LeftCenter: {
      return 'left center';
    }
    case ImagePosition.LeftTop: {
      return 'left top';
    }
    case ImagePosition.RightBottom: {
      return 'right bottom';
    }
    case ImagePosition.RightCenter: {
      return 'right center';
    }
    case ImagePosition.RightTop: {
      return 'right top';
    }
    default: {
      return 'center center';
    }
  }
};

interface Props {
  url?: string | null;
  image?: boolean;
  position?: ImagePosition;
  rotation?: number;
  showWatermark?: boolean;
}

const WatermarkImage = ({
  url,
  image,
  position,
  rotation,
  showWatermark = true,
}: Props) => {
  const classes = useStyles();
  const reference = useStoreState((state) => state.user.reference);
  if (!showWatermark) {
    return (
      <div className={image ? classes.imageContainer : classes.container}>
        {!image && (
          <div
            className={classes.image}
            style={{
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              backgroundImage: `url(${url})`,
              backgroundPosition: getPosition(position),
              transform: `rotate(${rotation || 0}deg)`,
            }}
          />
        )}
        {image && (
          <img
            className={classes.standardImage}
            src={url || undefined}
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            alt="lightbox"
          />
        )}
      </div>
    );
  }
  return (
    <div className={image ? classes.imageContainer : classes.container}>
      <div className={classes.textOverlay} />
      <div style={{ left: '-70%' }} className={classes.textContainer}>
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
      <div style={{ left: '-40%' }} className={classes.textContainer}>
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
      <div style={{ left: '40%' }} className={classes.textContainer}>
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
      <div style={{ left: '70%' }} className={classes.textContainer}>
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
      {!image && (
        <div
          className={classes.image}
          style={{
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            backgroundImage: `url(${url})`,
            backgroundPosition: getPosition(position),
            transform: `rotate(${rotation || 0}deg)`,
          }}
        />
      )}
      {image && (
        <img
          className={classes.standardImage}
          src={url || undefined}
          // eslint-disable-next-line formatjs/no-literal-string-in-jsx
          alt="lightbox"
        />
      )}
    </div>
  );
};

export default React.memo(WatermarkImage);
