import React from 'react';
import styled from 'styled-components';

const StyledList = styled.div`
  flex: 1;
  display: flex;
  flexdirection: column;
`;

class List extends React.Component {
  render() {
    const { children } = this.props;
    return <StyledList>{children}</StyledList>;
  }
}

export default List;
