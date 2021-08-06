import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import EditProfileMutation from '../../graphql/account/mutations/EditProfileMutation';
import { FullWidthButton, ProgressButton } from '../global/actions';
import { HeaderText, HeaderSubText, Field, FieldHeader } from '../global/forms';
import { Row } from '../global/layout';
import { SubHeader } from '../global/typography';
import EditProfileQuery from '../../graphql/account/queries/EditProfileQuery';
import { useStoreActions, useStoreState } from '../../state';

const Container = styled.div`
  min-height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    height: calc(100vh - 56px);
  }
`;
const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    padding: 15px 20px;
    max-width: 1200px;
  }
`;
const FormContainer = styled(Paper)`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  @media (min-width: 1024px) {
    padding: 20px 90px 40px;
  }
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 15px 20px;
  @media (min-width: 1024px) {
    overflow: auto;
    padding: 0px 90px;
  }
`;
const Form = styled.div`
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 40px 0px 10px;
  }
`;

const EditProfile = ({ history }) => {
  const id = useStoreState(state => state.user.id);
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);

  // state
  const [user, setUser] = useState({
    fullName: '',
    fullNameError: '',
    organisation: '',
    organisationError: ''
  });
  const [address, setAddress] = useState({
    id: '',
    premises: '',
    building: '',
    street: '',
    streetError: '',
    townCity: '',
    townCityError: '',
    county: '',
    postcode: '',
    postcodeError: ''
  });

  // redux
  const dispatch = useDispatch();
  const setState = data => dispatch({ type: 'SET_CURRENT_USER', data });
  const userState = useSelector(state => state.currentUser.user);

  // effects
  useEffect(() => {
    setTitle('Edit Profile');
    setNavbarAction('backLink');
    setBackLinkTo('/account-settings');
    setBottomNav(false);
    return () => {
      setTitle('');
      setBackLinkTo('');
      setNavbarAction('default');
      setBottomNav(true);
    };
  });

  // queries
  const { loading } = useQuery(EditProfileQuery, {
    variables: {
      id
    },
    onCompleted: data => {
      setUser({
        ...user,
        fullName: data.user.fullName,
        organisation: data.user.organisation
      });
      setAddress({
        ...address,
        id: data.user.addresses[0].id,
        premises: data.user.addresses[0].premises,
        building: data.user.addresses[0].building,
        street: data.user.addresses[0].street,
        townCity: data.user.addresses[0].townCity,
        county: data.user.addresses[0].county,
        postcode: data.user.addresses[0].postcode
      });
    }
  });

  // mutations
  const [updateUser] = useMutation(EditProfileMutation);

  // functions
  const handleUserChange = name => event => {
    setUser({
      ...user,
      [name]: event.target.value
    });
  };
  const handleAddressChange = name => event => {
    setAddress({
      ...address,
      [name]: event.target.value
    });
  };
  const validateAccount = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!user.fullName;
      const organisationValid = !!user.organisation;
      const streetValid = !!address.street;
      const townCityValid = !!address.townCity;
      const postcodeValid = !!address.postcode;
      setUser({
        ...user,
        fullNameError: fullNameValid ? '' : 'This is a required field.',
        organisationError: organisationValid ? '' : 'This is a required field.'
      });
      setAddress({
        ...address,
        streetError: streetValid ? '' : 'This is a required field.',
        townCityError: townCityValid ? '' : 'This is a required field.',
        postcodeError: postcodeValid ? '' : 'This is a required field.'
      });
      fullNameValid &&
      organisationValid &&
      streetValid &&
      townCityValid &&
      postcodeValid
        ? resolve()
        : reject();
    });

  const handleSave = () => {
    validateAccount()
      .then(() => {
        updateUser({
          variables: {
            id,
            fullName: { set: user.fullName },
            organisation: { set: user.organisation },
            address: {
              where: {
                id: address.id
              },
              data: {
                premises: { set: address.premises },
                building: { set: address.building },
                street: { set: address.street },
                townCity: { set: address.townCity },
                county: { set: address.county },
                postcode: { set: address.postcode }
              }
            }
          }
        });
        setState({
          ...userState,
          fullName: user.fullName,
          organisation: user.organisation
        });
        history.push('/');
      })
      .catch(() => {});
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches => (
        <Container>
          <Page>
            <FormContainer elevation={1}>
              <Content>
                <Form>
                  <Header>
                    {matches && <HeaderText>Edit Account</HeaderText>}
                    <HeaderSubText>
                      Amend your account details and then press the save button
                      to update them.
                    </HeaderSubText>
                  </Header>
                  <Row>
                    <Field row>
                      <FieldHeader required>Full Name</FieldHeader>
                      <TextField
                        value={user.fullName}
                        onChange={handleUserChange('fullName')}
                        error={!!user.fullNameError}
                        helperText={user.fullNameError}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                    <Field row left>
                      <FieldHeader required>Organisation</FieldHeader>
                      <TextField
                        value={user.organisation}
                        onChange={handleUserChange('organisation')}
                        error={!!user.organisationError}
                        helperText={user.organisationError}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                  </Row>
                  <SubHeader>Address</SubHeader>
                  <Row>
                    <Field row>
                      <FieldHeader>Company Name</FieldHeader>
                      <TextField
                        value={address.premises}
                        onChange={handleAddressChange('premises')}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                    <Field row left>
                      <FieldHeader>Building</FieldHeader>
                      <TextField
                        value={address.building}
                        onChange={handleAddressChange('building')}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                  </Row>
                  <Row>
                    <Field row>
                      <FieldHeader required>Street</FieldHeader>
                      <TextField
                        value={address.street}
                        onChange={handleAddressChange('street')}
                        error={!!address.streetError}
                        helperText={address.streetError}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                    <Field row left>
                      <FieldHeader required>Town/City</FieldHeader>
                      <TextField
                        value={address.townCity}
                        onChange={handleAddressChange('townCity')}
                        error={!!address.townCityError}
                        helperText={address.townCityError}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                  </Row>
                  <Row>
                    <Field row>
                      <FieldHeader>County</FieldHeader>
                      <TextField
                        value={address.county}
                        onChange={handleAddressChange('county')}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                    <Field row left>
                      <FieldHeader required>Postcode</FieldHeader>
                      <TextField
                        value={address.postcode}
                        onChange={handleAddressChange('postcode')}
                        error={!!address.postcodeError}
                        helperText={address.postcodeError}
                        disabled={loading}
                        fullWidth
                      />
                    </Field>
                  </Row>
                </Form>
              </Content>
              {matches && (
                <Actions>
                  <ProgressButton
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    Save Account
                  </ProgressButton>
                </Actions>
              )}
              {!matches && (
                <FullWidthButton
                  text="Save Account"
                  onClick={handleSave}
                  disabled={loading}
                />
              )}
            </FormContainer>
          </Page>
        </Container>
      )}
    </MediaQuery>
  );
};

export default EditProfile;
