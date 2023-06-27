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
  },
}));

interface Props {
  children: ReactNode;
  current: boolean;
}

const SideList = ({ children, current }: Props) => {
  const classes = useStyles();

  return (
    <Card
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      className={`${classes.item} ${current ? 'current' : undefined}`}
      bodyStyle={{ padding: 0 }}
    >
      {children}
    </Card>
  );
};

export default SideList;
