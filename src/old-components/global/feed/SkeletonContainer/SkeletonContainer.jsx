import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Card } from '../../cards';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class SkeletonContainer extends PureComponent {
  render() {
    const { children, cardHeight } = this.props;

    let skeletons = [1, 2, 3];
    if (window.innerWidth > 1239 && window.innerWidth < 1800) {
      skeletons = [1, 2, 3, 4, 5, 6];
    } else if (window.innerWidth > 1799) {
      skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
    }
    return (
      <Row>
        {skeletons.map(index => (
          <Card height={cardHeight} key={index}>
            {children}
          </Card>
        ))}
      </Row>
    );
  }
}

export default SkeletonContainer;
