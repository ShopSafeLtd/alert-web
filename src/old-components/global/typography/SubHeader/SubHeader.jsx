import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class SubHeader extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Typography variant="h6" {...rest}>
        {children}
      </Typography>
    );
  }
}

export default SubHeader;
