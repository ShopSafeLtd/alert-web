import React from 'react';
import { Layout } from 'antd';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
}

const ViewContent = ({ children, style, className }: Props): JSX.Element => (
  <Layout className={`view-content ${className}`} style={style}>
    {children}
  </Layout>
);

ViewContent.defaultProps = {
  style: undefined,
  className: undefined,
};

export default ViewContent;
