/* eslint-disable react/require-default-props */
import type { ReactNode } from 'react';

import React from 'react';

interface Props {
  alignItems?: string;
  children: ReactNode;
  className?: string;
  flexDirection?: string;
  justifyContent?: string;
  mobileFlex?: boolean;
}

const Flex = (props: Props) => {
  const {
    alignItems,
    children,
    className = '',
    flexDirection = 'row',
    justifyContent,
    mobileFlex = true,
  } = props;
  const getFlexResponsive = () => (mobileFlex ? 'd-flex' : 'd-md-flex');
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? `flex-${flexDirection}` : ''
      } ${alignItems ? `align-items-${alignItems}` : ''} ${
        justifyContent ? `justify-content-${justifyContent}` : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Flex;
