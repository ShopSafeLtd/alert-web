import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { FullWidthButton } from '../../../../global/actions';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import {
  Header as FormHeader,
  HeaderText,
  HeaderSubText
} from '../../../../global/forms';
import Options from './Options';
import Account from './Account';
import Previous from './Previous';
import New from './New';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: flex;
`;

const ACCOUNT = 'ACCOUNT';
const PREVIOUS = 'PREVIOUS';
const NEW = 'NEW';

const AddLocation = ({
  setNavbarAction,
  setBackLinkTo,
  locationPristine,
  option,
  setLocationOption,
  setLocationPristine,
  history,
  primaryLocation,
  loadingAddresses,
  previousLocations,
  previousLocation,
  newLocation,
  handleChange,
  validateLocation,
  setPreviousLocation,
  schemeAdmin,
  crimeTypes
}) => {
  // state
  const [error, setError] = useState(false);

  // effects
  useEffect(() => {
    setNavbarAction('backLink');
    setBackLinkTo(
      !schemeAdmin && !crimeTypes
        ? '/incidents/add'
        : '/incidents/add/crime-types'
    );
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  // functions
  const handleNext = () => {
    validateLocation()
      .then(() => history.push('/incidents/add/offenders'))
      .catch(error => {
        if (error === NEW) {
          setLocationOption(NEW);
          setLocationPristine(false);
        }
        if (error === PREVIOUS) {
          setLocationOption(PREVIOUS);
          setLocationPristine(false);
          setError(true);
        }
      });
  };

  return (
    <Page>
      <FormHeader>
        <HeaderText>Location</HeaderText>
        <HeaderSubText>Select a location for this incident.</HeaderSubText>
      </FormHeader>
      <Form>
        {locationPristine ? (
          <Options
            option={option}
            setLocationOption={setLocationOption}
            setLocationPristine={setLocationPristine}
            history={history}
          />
        ) : (
          <Container>
            {option === ACCOUNT && (
              <Account
                setLocationPristine={setLocationPristine}
                primaryLocation={primaryLocation}
                loadingAddresses={loadingAddresses}
              />
            )}
            {option === PREVIOUS && (
              <Previous
                setLocationPristine={setLocationPristine}
                loadingAddresses={loadingAddresses}
                previousLocations={previousLocations}
                previousLocation={previousLocation}
                history={history}
                setPreviousLocation={setPreviousLocation}
              />
            )}
            {option === NEW && (
              <New
                setLocationPristine={setLocationPristine}
                newLocation={newLocation}
                handleChange={handleChange}
              />
            )}
          </Container>
        )}
      </Form>
      {(option !== PREVIOUS || locationPristine) && (
        <FullWidthButton
          text={option === NEW && !locationPristine ? 'Add Location' : 'Next'}
          onClick={handleNext}
        />
      )}
      <ConfirmDialog
        open={error}
        handleClose={() => setError(false)}
        title="You need to select a location!"
        description="Please select a previous locations from the list, if you don't have any add a new one or use your location."
        actions={[
          <Button
            key={Math.random()}
            onClick={() => setError(false)}
            color="primary"
          >
            Go Back
          </Button>
        ]}
      />
    </Page>
  );
};

export default AddLocation;
