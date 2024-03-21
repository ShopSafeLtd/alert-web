import React from 'react';
import Marquee from 'react-fast-marquee';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';

const MarqueeComponent = () => {
  const { marqueeString } = useDashboardContext();
  if (!marqueeString) return null;
  return (
    <Marquee autoFill>
      {marqueeString}
      <div style={{ width: 200 }} />
    </Marquee>
  );
};

export default MarqueeComponent;
