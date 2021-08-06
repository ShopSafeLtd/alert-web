import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MenuButton extends PureComponent {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { menuItems, children, ...rest } = this.props;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          {...rest}
        >
          {children}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems.map(({ key, onClick, primaryText, leftIcon }) => (
            <MenuItem
              key={key}
              onClick={() => {
                this.handleClose();
                onClick();
              }}
            >
              {leftIcon}
              {primaryText}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default MenuButton;
