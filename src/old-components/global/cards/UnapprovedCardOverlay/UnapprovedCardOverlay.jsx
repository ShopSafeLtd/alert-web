import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 8;
  margin: 0;
`;

class UnapprovedCardOverlay extends React.Component {
  render() {
    const { actions, visible } = this.props;
    return visible ? null : (
      <Container>
        {actions === undefined
          ? null
          : actions.map(action => {
              return action;
            })}
      </Container>
    );
  }
}

export default UnapprovedCardOverlay;
