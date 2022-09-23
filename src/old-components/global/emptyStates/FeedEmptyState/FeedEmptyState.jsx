import React from 'react';
import styled from 'styled-components';

import { FeedContainer } from '../../feed';

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Image = styled.div`
  width: 35%;
  margin-bottom: 2rem;
`;
const Text = styled.div`
  fontsize: 1.3rem;
  textalign: center;
  width: 80%;
`;

class EmptyState extends React.PureComponent {
  render() {
    const { image, text, to } = this.props;
    return (
      <FeedContainer to={to}>
        <Container>
          <Image src={image} alt="empty-state" />
          <Text>{text}</Text>
        </Container>
      </FeedContainer>
    );
  }
}

export default EmptyState;
