import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: 0;
  z-index: 6;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  padding: 0.2rem 1rem;
  justify-content: flex-end;
`;
const Spacer = styled.div`
  flex: 1;
`;
const Approve = styled(Button)`
  color: #4caf50 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  height: 32px !important;
`;
const Decline = styled(Button)`
  color: #f44336 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  height: 32px !important;
`;
const Cancel = styled(Button)`
  color: #bdbdbd !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  height: 32px !important;
`;

class UnapprovedCardOptions extends React.Component {
  render() {
    const { approve, decline, cancel, top, visible } = this.props;
    return visible ? (
      <Container top={top}>
        <Approve onClick={() => approve()}>Approve</Approve>
        <Decline onClick={() => decline()}>Decline</Decline>
        <Spacer />
        <Cancel onClick={() => cancel()}>Cancel</Cancel>
      </Container>
    ) : null;
  }
}

export default UnapprovedCardOptions;
