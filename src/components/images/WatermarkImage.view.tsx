import type { Theme } from '#/configs/ThemeConfig';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { ImagePosition } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  image: {
    backgroundColor: theme.imageBackgroundColor,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: '#fff',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  standardImage: {
    maxHeight: '100vh',
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
}));

const getPosition = (
  position?: ImagePosition,
  positionX?: null | number,
  positionY?: null | number
): string => {
  // If custom position values are provided, use them
  if (
    positionX !== undefined &&
    positionX !== null &&
    positionY !== undefined &&
    positionY !== null
  ) {
    return `${positionX}% ${positionY}%`;
  }

  // Otherwise fall back to enum-based positioning
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
  image?: boolean;
  position?: ImagePosition;
  positionX?: null | number;
  positionY?: null | number;
  rotation?: number;
  showWatermark?: boolean;
  style?: React.CSSProperties;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
  url?: null | string;
}

const WatermarkImage = ({
  image,
  position,
  positionX,
  positionY,
  rotation,
  showWatermark = true,
  style,
  triggerLightbox,
  url,
}: Props) => {
  const classes = useStyles();
  const reference = useAtomValue(currentUserAtom)?.reference ?? '';
  if (!showWatermark) {
    return (
      <div
        className={image ? classes.imageContainer : classes.container}
        onClick={() => {
          if (triggerLightbox && url) triggerLightbox([{ src: url }], 0);
        }}
      >
        {!image && url && (
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(${url})`,
              backgroundPosition: getPosition(position, positionX, positionY),
              transform: `rotate(${rotation || 0}deg)`,
            }}
          />
        )}
        {image && (
          <img
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            alt="lightbox"
            className={classes.standardImage}
            loading="lazy"
            src={url || undefined}
          />
        )}
      </div>
    );
  }
  return (
    <div
      className={image ? classes.imageContainer : classes.container}
      onClick={() => {
        if (triggerLightbox && url) triggerLightbox([{ src: url }], 0);
      }}
    >
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
      {!image && url && (
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: getPosition(position, positionX, positionY),
            transform: `rotate(${rotation || 0}deg)`,
          }}
        />
      )}
      {image && (
        <img
          // eslint-disable-next-line formatjs/no-literal-string-in-jsx
          alt="lightbox"
          className={classes.standardImage}
          loading="lazy"
          src={url || undefined}
          style={style}
        />
      )}
    </div>
  );
};

export default React.memo(WatermarkImage);
