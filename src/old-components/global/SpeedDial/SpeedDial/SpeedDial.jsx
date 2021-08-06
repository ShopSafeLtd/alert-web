import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

const Container = styled.div``;
const FAB = styled(Fab)`
  position: fixed;
  bottom: ${({ bottom }) => (bottom ? '15px' : '70px')};
  right: 10px;
  z-index: 15;
  @media (min-width: 1024px) {
    bottom: 25px;
    right: 20px;
  }
`;
const Actions = styled.div`
  position: fixed;
  bottom: ${({ bottom }) => (bottom ? '81px' : '136px')};
  right: 15px;
  z-index: 15;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    bottom: 91px;
    right: 20px;
  }
`;
const Action = styled(Fab)``;
const Icon = styled(AddIcon)`
  transition: transform 0.15s cubic-bezier(0.47, 0, 0.745, 0.715);
  ${({ open }) => open && `transform: rotate(45deg);`};
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 5px 0;
`;
const ActionText = styled(Typography)`
  background-color: #424242;
  border-radius: 5px;
  padding: 2px 5px;
  color: #fff;
  margin-right: 10px;
`;

class SpeedDial extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { actions, disabled, bottom } = this.props;
    const { open } = this.state;
    return (
      <ClickAwayListener onClickAway={this.handleClose}>
        <Container>
          <FAB
            onClick={this.handleClick}
            color="primary"
            aria-label="Add Image"
            disabled={disabled}
            bottom={bottom}
          >
            <Icon open={open} />
          </FAB>
          <Grow in={open}>
            <Actions bottom={bottom}>
              {actions.map(action => (
                <ActionContainer>
                  <ActionText>{action.name}</ActionText>
                  <Action
                    size="small"
                    key={action.name}
                    onClick={() => {
                      action.onClick();
                      this.handleClose();
                    }}
                  >
                    {action.icon}
                  </Action>
                </ActionContainer>
              ))}
            </Actions>
          </Grow>
        </Container>
      </ClickAwayListener>
    );
  }
}

export default SpeedDial;
