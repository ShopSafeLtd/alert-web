import React from 'react';
import type { LayoutProps } from 'antd';
import { Layout } from 'antd';

export const Page = (props: LayoutProps): JSX.Element => (
  <Layout
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    style={{ padding: 15, height: '100vh', width: '100%', overflow: 'auto' }}
    className="page"
  />
);

export default Page;
