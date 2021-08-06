import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 35px;
`;

class ListImageWrapper extends React.Component {
  render() {
    const { image, alt } = this.props;
    return (
      <Container>
        <Image src={image} alt={alt} />
      </Container>
    );
  }
}

export default ListImageWrapper;
