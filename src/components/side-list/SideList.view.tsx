import type { ReactNode } from 'react';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@media print': {
    sideList: 'display: none !important;',
  },
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    width: 250,
    maxWidth: 250,
    overflowY: 'auto',

    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    padding: 10,
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
