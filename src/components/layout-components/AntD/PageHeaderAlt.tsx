/* eslint-disable */

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useStoreState, NavType } from 'state';

interface Props {
  children: ReactNode;
  background: string;
  className: string;
  overlap: boolean;
}

export const PageHeaderAlt = ({
  children,
  background,
  className,
  overlap,
}: Props) => {
  const [widthOffset, setWidthOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const navType = useStoreState((state) => state.theme.navType);

  useEffect(() => {
    if (navType === NavType.TOP) {
      const windowSize = window.innerWidth;
      const pageHeaderSize = ref.current!.offsetWidth;
      setWidthOffset((windowSize - pageHeaderSize) / 2);
    }
  }, [navType]);

  const getStyle = () => {
    let style: {
      backgroundImage: string;
      marginRight?: number;
      marginLeft?: number;
      paddingLeft?: number;
      paddingRight?: number;
    } = { backgroundImage: background ? `url(${background})` : 'none' };
    if (navType === NavType.TOP) {
      style.marginRight = -widthOffset;
      style.marginLeft = -widthOffset;
      style.paddingLeft = 0;
      style.paddingRight = 0;
    }
    return style;
  };

  return (
    <div
      ref={ref}
      className={`page-header-alt ${className ? className : ''} ${
        overlap && 'overlap'
      }`}
      style={getStyle()}
    >
      {navType === NavType.TOP ? (
        <div className="container">{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

PageHeaderAlt.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  className: PropTypes.string,
  overlap: PropTypes.bool,
};

export default PageHeaderAlt;
