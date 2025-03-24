import { demIdsAtom } from '#/providers/UserProvider/UserProvider';
import { Tabs } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';

import EvidenceList from './EvidenceList/EvidenceList.container';
import ListDocuments from './ListDocuments';

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
  const demIds = useAtomValue(demIdsAtom);

  const tabItems = useMemo(() => {
    const demTab =
      demIds.length > 0
        ? [
            {
              children: <EvidenceList />,
              key: 'Body Cameras',
              label: <FormattedMessage defaultMessage="Body Cameras" />,
            },
          ]
        : [];

    const generalTabs = [
      {
        children: <ListDocuments />,
        key: 'Evidence Files',
        label: <FormattedMessage defaultMessage="Evidence Files" />,
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
