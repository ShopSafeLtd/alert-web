import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #d7d7d7;
  height: ${({ height }) => height};
`;
const Svg = styled.svg`
  width: 36px;
  height: 36px;
  margin-bottom: 5px;
`;

const Text = styled(Typography)`
  margin-bottom: 0;
  color: #959595;
`;

class CardNoImage extends React.Component {
  render() {
    const { height } = this.props;
    return (
      <Container height={height}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#959595"
            d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z"
          />
        </Svg>
        <Text variant="subtitle1">No Images</Text>
      </Container>
    );
  }
}

export default CardNoImage;
