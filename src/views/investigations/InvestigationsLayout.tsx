import type { Theme } from 'configs/ThemeConfig';

import { Col, Drawer, Row } from 'antd';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation/AddInvestigation.container';
import InvestigationSideList from 'components/investigations/InvestigationSideList';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Outlet } from 'react-router-dom';

const useStyles = createUseStyles((_theme: Theme) => ({
  content: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  layout: {
    height: '100vh',
    overflow: 'hidden',
  },
  sideList: {
    height: '100%',
    overflow: 'hidden',
    width: 'auto',
  },
}));

const InvestigationsLayout: React.FC = () => {
  const classes = useStyles();
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [_leftSidelistCollapsed, setLeftSidelistCollapsed] = useState(false);

  const handleCreateNew = () => {
    setShowCreateDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowCreateDrawer(false);
  };

  // Handle mutual exclusivity between sidebars
  const handleRightSidebarToggle = (open: boolean) => {
    setRightSidebarOpen(open);
    if (open) {
      setLeftSidelistCollapsed(true);
    }
  };

  const handleLeftSidelistExpand = () => {
    setLeftSidelistCollapsed(false);
    setRightSidebarOpen(false);
  };

  return (
    <>
      <Row className={classes.layout} wrap={false}>
        <Col className={classes.sideList}>
          <InvestigationSideList
            forceCollapsed={rightSidebarOpen}
            onCreateNew={handleCreateNew}
            onExpandRequest={handleLeftSidelistExpand}
          />
        </Col>
        <Col className={classes.content}>
          <Outlet
            context={{
              rightSidebarOpen,
              setRightSidebarOpen: handleRightSidebarToggle,
            }}
          />
        </Col>
      </Row>

      <Drawer
        destroyOnClose
        onClose={handleCloseDrawer}
        open={showCreateDrawer}
        title={<FormattedMessage defaultMessage="Create Investigation" />}
        width={600}
      >
        {showCreateDrawer && <AddInvestigation onClose={handleCloseDrawer} />}
      </Drawer>
    </>
  );
};

export default InvestigationsLayout;
