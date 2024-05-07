import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Tabs } from 'antd';
import { useStoreState } from '#/state';
import EvidenceList from './EvidenceList/EvidenceList.container';
import ListDocuments from './ListDocuments';

const useStyles = createUseStyles({
  sideListContent: {
    height: '100vh',
    // paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 0,
    paddingRight: 0,
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
  },
});

const Evidence = () => {
  const classes = useStyles();
  const demIds = useStoreState((state) => state.user.dem);

  const tabItems = useMemo(() => {
    const demTab =
      demIds.length > 0
        ? [
            {
              key: 'Body Cameras',
              label: (
                <FormattedMessage defaultMessage="Body Cameras" id="p9UGut" />
              ),
              children: <EvidenceList />,
            },
          ]
        : [];

    const generalTabs = [
      {
        key: 'Evidence Files',
        label: <FormattedMessage defaultMessage="Evidence Files" id="AHxroc" />,
        children: <ListDocuments />,
      },
    ];
    return [...demTab, ...generalTabs];
  }, [demIds]);

  return (
    <div style={{ height: '100vh' }}>
      <div className={classes.sideListContent}>
        <Tabs items={tabItems} />
      </div>
    </div>
  );
};

export default Evidence;
