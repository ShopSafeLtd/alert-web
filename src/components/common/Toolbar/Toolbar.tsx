import type { ButtonProps } from 'antd';

import { Button } from 'antd';
import React from 'react';
import { createUseStyles } from 'react-jss';

interface ToolbarButton extends ButtonProps {
  key: string;
}

interface ToolbarProps {
  buttons: ToolbarButton[];
}

const useStyles = createUseStyles({
  button: {
    '&:first-child': {
      borderBottomRightRadius: '0 !important',
      borderTopRightRadius: '0 !important',
    },
    '&:last-child': {
      borderBottomLeftRadius: '0 !important',
      borderTopLeftRadius: '0 !important',
    },
    '&:not(:first-child)': {
      marginLeft: '-1px', // Overlap borders
    },
    '&:not(:first-child):not(:last-child)': {
      borderRadius: '0 !important',
    },
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
  },
});

const Toolbar: React.FC<ToolbarProps> = ({ buttons }) => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      {buttons.map((buttonProps, _index) => {
        const { className, key, ...restProps } = buttonProps;
        return (
          <Button
            className={`${classes.button} ${className || ''}`}
            key={key}
            {...restProps}
          />
        );
      })}
    </div>
  );
};

export default Toolbar;
