import React, { PureComponent } from 'react';
import styled from 'styled-components';

import UserLocation from '../UserLocation/UserLocation';
import PreviousLocations from '../PreviousLocations/PreviousLocations';
import NewLocation from '../NewLocation/NewLocation';
import LocationOptions from '../../../global/LocationOptions/LocationOptions';
import { Header, HeaderSubText } from '../../../../global/forms';

const Location = styled.div`
  height: 100%;
  display: flex;
  padding-bottom: 20px;
`;
const Container = styled.div`
  height: 90%;
`;

const ACCOUNT = 'ACCOUNT';
const PREVIOUS = 'PREVIOUS';
const NEW = 'NEW';

class AddLocation extends PureComponent {
  render() {
    const {
      option,
      newLocation,
      previousLocation,
      primaryLocation,
      previousLocations,
      handleLocationChange,
      setLocationOption,
      setPreviousLocation,
      handleNext
    } = this.props;

    return (
      <Container>
        <Header>
          <HeaderSubText>
            Select or enter a location for the incident.
          </HeaderSubText>
        </Header>
        <Location>
          <LocationOptions
            setLocationOption={setLocationOption}
            option={option}
          />
          {option === ACCOUNT && <UserLocation address={primaryLocation} />}
          {option === PREVIOUS && (
            <PreviousLocations
              previousLocations={previousLocations}
              previousLocation={previousLocation}
              setPreviousLocation={setPreviousLocation}
              handleNext={handleNext}
            />
          )}
          {option === NEW && (
            <NewLocation
              handleChange={handleLocationChange}
              newLocation={newLocation}
            />
          )}
        </Location>
      </Container>
    );
  }
}

export default AddLocation;
