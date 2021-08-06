import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const StyledCard = styled(Card)`
  max-width: 100%;
  min-width: 100%;
  position: relative;
  margin: 5px 0;
  min-height: ${({ height }) => height};
  max-height: ${({ height }) => height};
  height: ${({ height }) => height};
  @media (min-width: 650px) {
    width: calc(50% - 1rem);
    max-width: calc(50% - 1rem);
    min-width: calc(50% - 1rem);
    margin: 0.5rem;
  }
  @media (min-width: 1240px) {
    width: calc(33.33% - 10px);
    max-width: calc(33.33% - 10px);
    min-width: calc(33.33% - 10px);
    margin: 5px;
  }
  @media (min-width: 1800px) {
    width: calc(25% - 2rem);
    max-width: calc(25% - 2rem);
    min-width: calc(25% - 2rem);
    margin: 1rem;
  }
`;

class CardContainer extends React.Component {
  render() {
    const { children, height } = this.props;
    return <StyledCard height={height}>{children}</StyledCard>;
  }
}

export default CardContainer;
