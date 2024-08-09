import React from 'react';

import ViewContent from '../ViewContent';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TabContent = ({ children }: Props): JSX.Element => (
  <ViewContent
    className="tab-content"
    style={{
      height: 'calc(100vh - 52px)',
      overflowX: 'hidden',
      overflowY: 'auto',
      width: '100%',
    }}
  >
    {children}
  </ViewContent>
);

export default TabContent;
