import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = () => {
  const { marqueeString } = useDashboardContext();
  if (!marqueeString) return null;
  return (
    <Marquee
      autoFill
      style={{
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {marqueeString}
      <div style={{ width: 200 }} />
    </Marquee>
  );
};

export default MarqueeComponent;
