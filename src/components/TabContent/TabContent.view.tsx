import React from 'react';

import ViewContent from '../ViewContent';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TabContent = ({ children }: Props): JSX.Element => (
  <ViewContent
    className="tab-content"
    style={{
      width: '100%',
      height: 'calc(100vh - 65px)',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}
  >
    {children}
  </ViewContent>
);

export default TabContent;
