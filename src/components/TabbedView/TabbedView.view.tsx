import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  tabbedView: {
    width: '100%',
    display: 'flex',

    '& .tab-content': {
      height: '100%',
      overflow: 'hidden',
    },
    '& .ant-tabs': {
      flex: 1,
    },
    '& .ant-tabs-nav': {
      marginBottom: 0,
    },
  },
});

interface Props {
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties | undefined;
}

const TabbedView = ({ children, style }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.tabbedView} style={style}>
      {children}
    </div>
  );
};
TabbedView.defaultProps = {
  style: undefined,
  className: undefined,
};
export default TabbedView;
