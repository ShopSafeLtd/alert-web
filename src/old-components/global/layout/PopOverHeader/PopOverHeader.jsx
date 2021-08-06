import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

import { CloseButton } from '../../actions';

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0 5px 5px;
`;

const Title = styled(Typography)`
  margin: 0 0 0 5px;
  flex: 1;
`;

const MenuButton = styled(Button)`
  margin-right: 10px;
`;

const Item = styled.div`
  outline: none;
`;

class PopOverHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { close, children, actions } = this.props;
    const { anchorEl } = this.state;
    let key = 0;
    return (
      <Header>
        <CloseButton close={close} />
        <Title variant="h6">{children}</Title>
        {actions !== undefined && (
          <div>
            <MenuButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              color="primary"
            >
              Options
            </MenuButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {actions.map(action => {
                key = key + 1;
                return (
                  <Item key={key} onClick={this.handleClose}>
                    {action}
                  </Item>
                );
              })}
            </Menu>
          </div>
        )}
      </Header>
    );
  }
}

export default PopOverHeader;
