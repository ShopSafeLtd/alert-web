import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  height: 16px;
  width: 40%;
  border-radius: 2px;
  background-color: #bdbdbd;
`;

class SkeletonText extends PureComponent {
  render() {
    return <Text />;
  }
}

export default SkeletonText;
