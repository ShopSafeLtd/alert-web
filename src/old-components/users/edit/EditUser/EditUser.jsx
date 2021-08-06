import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import validate from 'validate.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Field, FieldHeader, Select } from '../../../global/forms';
import { FullWidthButton } from '../../../global/actions';
import { SubHeader } from '../../../global/typography';
import query from '../../../../graphql/users/queries/User';
import UserMutation from '../../../../graphql/users/mutations/UpdateUser';
import { useStoreActions } from '../../../../state';

const Page = styled.div`
  width: 100%;
  height: calc(100vh - 116px);
  overflow: scroll;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditUser = ({ match, history }) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);

  // state
  const [user, setUser] = useState({
    id: '',
    fullName: '',
    fullNameError: '',
    organisation: '',
    organisationError: '',
    email: '',
    emailError: ''
  });
  const [userScheme, setUserScheme] = useState({
    id: '',
    role: '',
    roleError: ''
  });
  const [address, setAddress] = useState({
    newAddress: false,
    id: '',
    premises: '',
    building: '',
    street: '',
    streetError: '',
    townCity: '',
    twnCityError: '',
    county: '',
    postcode: '',
    postcodeError: ''
  });

  // effects
  useEffect(() => {
    setTitle('Edit User Details');
    setBottomNav(false);
    setNavbarAction('backLink');
    setBackLinkTo(`/admin/users/view/${match.params.id}`);
    return () => {
      setTitle('');
      setBottomNav(true);
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  //queries
  const { loading } = useQuery(query, {
    variables: {
      id: match.params.id,
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setUser({
        ...user,
        id: data.user.id,
        fullName: data.user.fullName,
        organisation: data.user.organisation,
        email: data.user.email
      });
      setUserScheme({
        ...userScheme,
        id: data.user.schemes[0].id,
        role: data.user.schemes[0].role
      });
      if (data.user.addresses.length === 0) {
        setAddress({
          ...address,
          newAddress: true
        });
      } else {
        setAddress({
          id: data.user.addresses[0].id,
          premises: data.user.addresses[0].premises,
          building: data.user.addresses[0].building,
          street: data.user.addresses[0].street,
          townCity: data.user.addresses[0].townCity,
          county: data.user.addresses[0].county,
          postcode: data.user.addresses[0].postcode
        });
      }
    }
  });

  // mutations
  const [updateUser] = useMutation(UserMutation);

  // functions
  const handleUserChange = name => event => {
    setUser({
      ...user,
      [name]: event.target.value
    });
  };

  const handleSchemeChange = name => event => {
    setUserScheme({
      ...userScheme,
      [name]: event.target.value
    });
  };

  const handleAddressChange = name => event => {
    setAddress({
      ...address,
      [name]: event.target.value
    });
  };

  const validateUser = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!user.fullName;
      const organisationValid = !!user.organisation;
      const emailValid =
        validate({ email: user.email }, { email: { email: true } }) ===
        undefined;
      setUser({
        ...user,
        fullNameError: fullNameValid ? '' : 'This is a required field.',
        organisationError: organisationValid ? '' : 'This is a required field.',
        emailError: emailValid ? '' : 'Please enter a valid email address.'
      });
      fullNameValid && organisationValid && emailValid ? resolve() : reject();
    });

  const validateScheme = () =>
    new Promise((resolve, reject) => {
      const roleValid = !!userScheme.role;
      setUserScheme({
        ...userScheme,
        roleError: roleValid ? '' : 'This is a required field.'
      });
      roleValid ? resolve() : reject();
    });

  const validateAddress = () =>
    new Promise((resolve, reject) => {
      const streetValid = !!address.street;
      const townValid = !!address.townCity;
      const postcodeValid = !!address.postcode;
      setAddress({
        ...address,
        streetError: streetValid ? '' : 'This is a required field.',
        townError: townValid ? '' : 'This is a required field.',
        postcodeError: postcodeValid ? '' : 'This is a required field.'
      });
      streetValid && townValid && postcodeValid ? resolve() : reject();
    });

  const handleSave = () => {
    validateUser()
      .then(() => {
        validateScheme()
          .then(() => {
            validateAddress()
              .then(() => {
                if (address.newAddress) {
                  updateUser({
                    variables: {
                      id: match.params.id,
                      fullName: { set: user.fullName },
                      organisation: { set: user.organisation },
                      email: { set: user.email },
                      createAddress: [
                        {
                          primary: true,
                          premises: { set: address.premises },
                          building: { set: address.building },
                          street: { set: address.street },
                          townCity: { set: address.townCity },
                          county: { set: address.county },
                          postcode: { set: address.postcode }
                        }
                      ],
                      updateScheme: [
                        {
                          where: { id: userScheme.id },
                          data: {
                            role: userScheme.role
                          }
                        }
                      ],
                      schemeId: window.localStorage.getItem('currentScheme')
                    },
                    optimisticResponse: {
                      updateUser: {
                        id: match.params.id,
                        fullName: user.fullName,
                        organisation: user.organisation,
                        email: user.email,
                        addresses: [
                          {
                            id: address.newAddress ? 0 : address.id,
                            premises: address.premises,
                            building: address.building,
                            street: address.street,
                            townCity: address.townCity,
                            county: address.county,
                            postcode: address.postcode,
                            __typename: 'Address'
                          }
                        ],
                        schemes: [
                          {
                            id: userScheme.id,
                            role: userScheme.role,
                            __typename: 'Scheme'
                          }
                        ],
                        __typename: 'User'
                      }
                    }
                  });
                  history.push(`/admin/users/view/${match.params.id}`);
                } else {
                  updateUser({
                    variables: {
                      id: match.params.id,
                      fullName: { set: user.fullName },
                      organisation: { set: user.organisation },
                      email: { set: user.email },
                      updateAddress: [
                        {
                          where: { id: address.id },
                          data: {
                            premises: { set: address.premises },
                            building: { set: address.building },
                            street: { set: address.street },
                            townCity: { set: address.townCity },
                            county: { set: address.county },
                            postcode: { set: address.postcode }
                          }
                        }
                      ],
                      updateScheme: [
                        {
                          where: { id: userScheme.id },
                          data: {
                            role: userScheme.role
                          }
                        }
                      ],
                      schemeId: window.localStorage.getItem('currentScheme')
                    },
                    optimisticResponse: {
                      updateUser: {
                        id: match.params.id,
                        fullName: user.fullName,
                        organisation: user.organisation,
                        email: user.email,
                        addresses: [
                          {
                            id: address.newAddress ? 0 : address.id,
                            premises: address.premises,
                            building: address.building,
                            street: address.street,
                            townCity: address.townCity,
                            county: address.county,
                            postcode: address.postcode,
                            __typename: 'Address'
                          }
                        ],
                        schemes: [
                          {
                            id: userScheme.id,
                            role: userScheme.role,
                            __typename: 'Scheme'
                          }
                        ],
                        __typename: 'User'
                      }
                    }
                  });
                  history.push(`/admin/users/view/${match.params.id}`);
                }
              })
              .catch(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <Page>
      {loading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <div>
          <Field>
            <FieldHeader required>Full Name</FieldHeader>
            <TextField
              value={user.fullName}
              disabled={loading}
              onChange={handleUserChange('fullName')}
              error={!!user.fullNameError}
              helperText={user.fullNameError}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Organisation</FieldHeader>
            <TextField
              value={user.organisation}
              disabled={loading}
              onChange={handleUserChange('organisation')}
              error={!!user.organisationError}
              helperText={user.organisationError}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Email Address</FieldHeader>
            <TextField
              value={user.email}
              disabled={loading}
              onChange={handleUserChange('email')}
              error={!!user.emailError}
              helperText={user.emailError}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>User Role</FieldHeader>
            <Select
              value={userScheme.role}
              disabled={loading}
              onChange={handleSchemeChange('role')}
              error={!!userScheme.roleError}
              helperText={!!userScheme.roleError}
              menuItems={[
                { value: 'USER', label: 'User' },
                { value: 'CONTENT_ADMIN', label: 'Content Admin' },
                { value: 'SCHEME_ADMIN', label: 'Scheme Admin' }
              ]}
            />
          </Field>
          <SubHeader>Address</SubHeader>
          <Field>
            <FieldHeader>Premise</FieldHeader>
            <TextField
              value={address.premises}
              disabled={loading}
              onChange={handleAddressChange('premises')}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader>Building</FieldHeader>
            <TextField
              value={address.building}
              disabled={loading}
              onChange={handleAddressChange('building')}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Street</FieldHeader>
            <TextField
              value={address.street}
              error={!!address.streetError}
              helperText={address.streetError}
              disabled={loading}
              onChange={handleAddressChange('street')}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Town City</FieldHeader>
            <TextField
              value={address.townCity}
              error={!!address.townError}
              helperText={address.townError}
              disabled={loading}
              onChange={handleAddressChange('townCity')}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader>County</FieldHeader>
            <TextField
              value={address.county}
              disabled={loading}
              onChange={handleAddressChange('county')}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Postcode</FieldHeader>
            <TextField
              value={address.postcode}
              error={!!address.postcodeError}
              helperText={address.postcodeError}
              disabled={loading}
              onChange={handleAddressChange('postcode')}
              fullWidth
            />
          </Field>
          <FullWidthButton
            text="Save"
            onClick={handleSave}
            disabled={loading}
          />
        </div>
      )}
    </Page>
  );
};

export default EditUser;
