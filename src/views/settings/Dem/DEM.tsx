import { Tabs } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import DemDeviceList from './demDevices/DemDeviceList';
import DemGroupList from './demGroups/DemGroupList';

const useStyles = createUseStyles({
  sideListContent: {
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    marginRight: 0,
    paddingRight: 0,
    // paddingTop: 10,
    width: '100%',
  },
});

const Evidence = () => {
  const classes = useStyles();

  const tabItems = [
    {
      children: <DemDeviceList />,
      key: 'Dem Devices',
      label: <FormattedMessage defaultMessage="Dem Devices" />,
    },
    {
      children: <DemGroupList />,
      key: 'Dem Groups',
      label: <FormattedMessage defaultMessage="Dem Groups" />,
    },
  ];

  return (
    <div style={{ height: '100vh' }}>
      <div className={classes.sideListContent}>
        <Tabs items={tabItems} />
      </div>
    </div>
  );
};

export default Evidence;
