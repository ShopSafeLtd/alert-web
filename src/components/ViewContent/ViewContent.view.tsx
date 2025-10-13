import { Layout } from 'antd';
import React from 'react';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

const ViewContent = ({ children, className, style }: Props): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  <Layout className={`view-content ${className}`} style={style}>
    {children}
  </Layout>
);

ViewContent.defaultProps = {
  className: undefined,
  style: undefined,
};

export default ViewContent;
