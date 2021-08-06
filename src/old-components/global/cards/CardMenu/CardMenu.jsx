import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

const Container = styled.div`
  position: absolute;
  background-color: #fff;
  top: 0;
  right: 0;
  border-bottom-left-radius: 4px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 2s;
`;

const MenuButton = styled(IconButton)`
  height: 40px !important;
  width: 40px !important;
  padding: 0 !important;
`;

const Svg = styled.svg`
  width: 24px !important;
  height: 24px !important;
`;
const StyledPopper = styled(Popper)`
  z-index: 1;
`;

class CardMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { actions } = this.props;
    const { open } = this.state;

    return (
      <Container>
        <MenuButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Svg viewBox="0 0 24 24">
            <path
              fill="#757575"
              d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
            />
          </Svg>
        </MenuButton>
        <StyledPopper
          open={open}
          anchorEl={this.anchorEl}
          transition
          placement="bottom-end"
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: 'right top' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>{actions}</MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </StyledPopper>
      </Container>
    );
  }
}

export default CardMenu;
