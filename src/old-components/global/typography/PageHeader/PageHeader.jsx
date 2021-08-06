import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class PageHeader extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Typography variant="h5" {...rest}>
        {children}
      </Typography>
    );
  }
}

export default PageHeader;
