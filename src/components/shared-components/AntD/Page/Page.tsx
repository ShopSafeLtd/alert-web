import type { LayoutProps } from 'antd';

import { Layout } from 'antd';
import React from 'react';

export const Page = (props: LayoutProps): JSX.Element => (
  <Layout
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className="page"
    style={{ height: '100vh', overflow: 'auto', padding: 15, width: '100%' }}
  />
);

export default Page;
