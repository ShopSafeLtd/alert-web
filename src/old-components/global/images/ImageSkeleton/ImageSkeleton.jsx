import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Image = styled.div`
  background-color: #eeeeee;
  height: 220px;
  width: 100%;
  margin: 10px;
`;

class ImageSkeleton extends PureComponent {
  render() {
    return <Image />;
  }
}

export default ImageSkeleton;
