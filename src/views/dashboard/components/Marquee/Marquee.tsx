import { useStoreState } from '#/state';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = () => {
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const { marqueeString } = useDashboardContext();
  if (!marqueeString) return null;
  return (
    <Marquee
      autoFill
      style={{
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
        backgroundColor: currentTheme === 'dark' ? '#FFF' : '#283142',
        borderRadius: 6,
        color: currentTheme === 'dark' ? '#283142' : '#FFF',
        marginBottom: 8,
        marginTop: 8,
        paddingBottom: 6,
        paddingTop: 6,
      }}
    >
      {marqueeString}
      <div style={{ width: 200 }} />
    </Marquee>
  );
};

export default MarqueeComponent;
