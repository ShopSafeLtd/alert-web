/* eslint-disable react/require-default-props */
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  alignItems?: string;
  justifyContent?: string;
  mobileFlex?: boolean;
  flexDirection?: string;
}

const Flex = (props: Props) => {
  const {
    children,
    className = '',
    alignItems,
    justifyContent,
    mobileFlex = true,
    flexDirection = 'row',
  } = props;
  const getFlexResponsive = () => (mobileFlex ? "d-flex" : "d-md-flex");
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? `flex-${  flexDirection}` : ""
      } ${alignItems ? `align-items-${  alignItems}` : ""} ${
        justifyContent ? `justify-content-${  justifyContent}` : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Flex;
