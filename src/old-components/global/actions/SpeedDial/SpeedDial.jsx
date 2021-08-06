import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import onClickOutside from 'react-onclickoutside';
import CloseIcon from '@material-ui/icons/Close';

const SpeedDialStyled = styled.div`
  position: fixed;
  bottom: 70px;
  right: 10px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpeedDialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class SpeedDial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  handleClickOutside = evt => {
    if (this.state.open) {
      this.setState({
        open: false
      });
    }
  };

  render() {
    const { actions, icon } = this.props;
    const { open } = this.state;

    return (
      <SpeedDialStyled>
        {open ? (
          <SpeedDialContainer>
            {actions.map(action => action)}
          </SpeedDialContainer>
        ) : null}
        <Fab color="primary" onClick={this.toggleOpen}>
          {open ? <CloseIcon /> : icon}
        </Fab>
      </SpeedDialStyled>
    );
  }
}

export default onClickOutside(SpeedDial);
