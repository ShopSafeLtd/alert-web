import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Tabs } from 'antd';
import ViewActivities from './TodoList/TodoList.container';
import ActivitiesTemplates from './ActivityTemplates/ActivityTemplates.contianer';
import type { ListData } from './useActivities';

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

interface Props {
  templateData: ListData[];
  loading: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
}

const ActivitiesView = ({ templateData, loading, updateTemplates }: Props) => {
  const classes = useStyles();
  return (
    <div style={{ height: '100vh' }}>
      <div className={classes.sideListContent}>
        <Tabs
          items={[
            {
              key: 'Activities',
              label: (
                <FormattedMessage defaultMessage="Activities" id="UmEsZF" />
              ),
              children: (
                <ViewActivities templateData={templateData} loading={loading} />
              ),
            },
            {
              key: 'Templates',
              label: (
                <FormattedMessage defaultMessage="Templates" id="A3ptul" />
              ),
              children: (
                <ActivitiesTemplates
                  tableData={templateData}
                  loading={loading}
                  updateTemplates={updateTemplates}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ActivitiesView;
