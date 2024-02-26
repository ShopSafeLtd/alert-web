/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { ReactNode } from 'react';
import React from 'react';
import { Card } from 'antd';
import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  item: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: theme.componentBackground,
    borderRadius: 10,
    overflow: 'hidden',

    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
    '&.loading': {
      height: 70,
    },
  },
}));

interface Props {
  children: ReactNode;
  current: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
}

const SideList = ({ children, current, loading, style }: Props) => {
  const classes = useStyles();

  return (
    <Card
      loading={loading || false}
      className={`${classes.item} ${current ? 'current' : undefined} ${
        loading ? 'loading' : undefined
      }`}
      bodyStyle={{ padding: loading ? 10 : 0, ...style }}
    >
      {children}
    </Card>
  );
};

export default SideList;
