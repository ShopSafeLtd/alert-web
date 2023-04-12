import React from 'react';
import { Layout, LayoutProps } from 'antd';

export const Page = (props: LayoutProps): JSX.Element => {
  return (
    <Layout
      {...props}
      style={{ padding: 15, height: '100vh', width: '100%', overflow: 'auto' }}
      className="page"
    />
  );
};

export default Page;
