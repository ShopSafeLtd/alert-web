import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';

const Exclusion = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  min-height: 70px;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
  &:hover {
    background: #eeeeee;
  }
`;
const Arrow = styled.div`
  padding: 0 20px;
  height: 24px;
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  cursor: pointer;
`;
const Date = styled(Moment)`
  ${({ active }) => active === 0 && 'color: #9E9E9E;'};
`;
const Location = styled(Typography)`
  font-weight: 400;
  margin-bottom: 8px;
  ${({ active }) => active === 0 && 'color: #9E9E9E;'};
`;
const LocationBold = styled.span`
  font-weight: 500;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Grow = styled.div`
  flex: 1;
`;

class OffenderCardExclusion extends React.Component {
  render() {
    const { exclusion, openExclusion } = this.props;
    return (
      <Exclusion>
        <Container onClick={openExclusion}>
          <Grow>
            <Location variant="body2" active={exclusion.active ? 1 : 0}>
              <LocationBold>Banned From: </LocationBold>
              {exclusion.location}
            </Location>
            <Row>
              <Typography>
                <Date active={exclusion.active ? 1 : 0} format="DD/MM/YYYY">
                  {exclusion.startDate}
                </Date>
              </Typography>
              <Arrow>
                <Svg viewBox="0 0 24 24">
                  <path
                    fill={exclusion.active ? '#9E9E9E' : '#BDBDBD'}
                    d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
                  />
                </Svg>
              </Arrow>
              <Typography>
                <Date active={exclusion.active ? 1 : 0} format="DD/MM/YYYY">
                  {exclusion.endDate}
                </Date>
              </Typography>
            </Row>
          </Grow>
          <Center>
            <Svg viewBox="0 0 24 24">
              <path
                fill={exclusion.active ? '#E57373' : '#BDBDBD'}
                d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
              />
            </Svg>
          </Center>
        </Container>
      </Exclusion>
    );
  }
}

export default OffenderCardExclusion;
