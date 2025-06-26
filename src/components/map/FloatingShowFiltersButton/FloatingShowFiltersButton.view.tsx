import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React from 'react';

import useStyles from './FloatingShowFiltersButton.styles';

interface Props {
  onClick: () => void;
}

const FloatingShowFiltersButton: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.floatingButton}>
      <Button onClick={onClick} type="text">
        <FontAwesomeIcon className={classes.filterIcon} icon={faFilter} />
      </Button>
    </div>
  );
};

export default FloatingShowFiltersButton;
