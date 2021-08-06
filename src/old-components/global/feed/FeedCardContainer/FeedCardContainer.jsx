import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
  @media (min-width: 650px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

class FeedCardContainer extends React.PureComponent {
  render() {
    const { children } = this.props;
    return <Container>{children}</Container>;
  }
}

export default FeedCardContainer;
