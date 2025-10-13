import type { ReactNode } from 'react';

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@media print': {
    sideList: 'display: none !important;',
  },
  sideList: {
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    maxWidth: 250,
    overflowY: 'auto',

    padding: 10,
    width: 250,
  },
});

interface Props {
  children: ReactNode;
}

const SideList = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.sideList}>{children}</div>;
};

export default SideList;
