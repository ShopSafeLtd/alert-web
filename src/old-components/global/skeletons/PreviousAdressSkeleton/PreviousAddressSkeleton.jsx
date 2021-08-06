import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const PreviousItem = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #e0e0e0;
  padding: 10px 20px;
  background: ${({ selected }) => selected && 'rgba(255,235,238, 0.5)'};
`;
const Text = styled.div`
  height: 16px;
  flex: 1;
  border-radius: 2px;
  background-color: #bdbdbd;
  margin-right: 20px;
`;

class PreviousAddressSkeleton extends PureComponent {
  render() {
    return (
      <PreviousItem>
        <Text />
        <Button>Select</Button>
      </PreviousItem>
    );
  }
}

export default PreviousAddressSkeleton;
