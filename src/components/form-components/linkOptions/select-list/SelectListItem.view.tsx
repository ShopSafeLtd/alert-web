/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { Theme } from 'configs/ThemeConfig';
import type { ReactNode } from 'react';

import { Card } from 'antd';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  item: {
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
    '&.loading': {
      height: 70,
    },
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    backgroundColor: theme.componentBackground,
    borderRadius: 10,

    marginBottom: 8,
    overflow: 'hidden',
    width: '100%',
  },
}));

interface Props {
  children: ReactNode;
  current: boolean;
  loading?: boolean;
}

const SelectList = ({ children, current, loading }: Props) => {
  const classes = useStyles();

  return (
    <Card
      bodyStyle={{ padding: loading ? 10 : 0 }}
      className={`${classes.item} ${current ? 'current' : undefined} ${
        loading ? 'loading' : undefined
      }`}
      loading={loading || false}
    >
      {children}
    </Card>
  );
};

export default SelectList;
