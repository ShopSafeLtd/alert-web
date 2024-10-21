import { Tabs } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import RecycleBin from './RecycleBin';
import RecycleEvidence from './RecycleEvidence';

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

const Recycle = () => {
  const classes = useStyles();

  const tabItems = [
    {
      children: <RecycleBin />,
      key: 'RecycleBin',
      label: <FormattedMessage defaultMessage="Recycle Bin" />,
    },
    {
      children: <RecycleEvidence />,
      key: 'RecycleEvidence',
      label: <FormattedMessage defaultMessage="Recycle Evidence" />,
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

export default Recycle;
