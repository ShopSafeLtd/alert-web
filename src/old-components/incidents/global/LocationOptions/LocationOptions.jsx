import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Options = styled.div`
  flex: 1;
  width: 100%;
  @media (min-width: 1024px) {
    max-width: 300px;
    min-width: 300px;
    border-right: 1px solid #e0e0e0;
  }
`;

const LocationOption = styled.div`
  padding: 25px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  ${({ active }) => active && 'background: rgba(0,0,0,0.03);'};
  @media (min-width: 1024px) {
    padding: 20px 20px;
  }
`;

const OptionText = styled(Typography)`
  flex: 1;
  margin: 0;
  margin-left: 10px;
  ${({ active }) =>
    active
      ? `
    color: #757575;
  `
      : `
    color: #9E9E9E;
  `};
`;

const Svg = styled.svg`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const ACCOUNT = 'ACCOUNT';
const PREVIOUS = 'PREVIOUS';
const NEW = 'NEW';

class LocationOptions extends PureComponent {
  render() {
    const { option, setLocationOption } = this.props;

    return (
      <Options>
        <LocationOption
          active={option === ACCOUNT}
          onClick={() => setLocationOption(ACCOUNT)}
        >
          <Svg viewBox="0 0 24 24">
            <path
              fill={option === ACCOUNT ? '#1E88E5' : '#E0E0E0'}
              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
            />
          </Svg>
          <OptionText active>Use my location</OptionText>
        </LocationOption>
        <LocationOption
          active={option === PREVIOUS}
          onClick={() => setLocationOption(PREVIOUS)}
        >
          <Svg viewBox="0 0 24 24">
            <path
              fill={option === PREVIOUS ? '#1E88E5' : '#E0E0E0'}
              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
            />
          </Svg>
          <OptionText>Use a previous location</OptionText>
        </LocationOption>
        <LocationOption
          active={option === NEW}
          onClick={() => setLocationOption(NEW)}
        >
          <Svg viewBox="0 0 24 24">
            <path
              fill={option === NEW ? '#1E88E5' : '#E0E0E0'}
              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
            />
          </Svg>
          <OptionText>Add a new location</OptionText>
        </LocationOption>
      </Options>
    );
  }
}

export default LocationOptions;
