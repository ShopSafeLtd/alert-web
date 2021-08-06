import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import validate from 'validate.js';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { PopOver, Row, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import { SubHeader } from '../../../../global/typography';
import { Field, FieldHeader, Select } from '../../../../global/forms';
import query from '../../../../../graphql/users/queries/User';
import UserMutation from '../../../../../graphql/users/mutations/UpdateUser';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const EditDetailsPopOver = ({ open, close, user }) => {
  // state
  const [details, setDetails] = useState({
    id: '',
    fullName: '',
    fullNameError: '',
    organisation: '',
    organisationError: '',
    email: '',
    emailError: ''
  });
  const [scheme, setScheme] = useState({
    id: '',
    role: '',
    roleErrror: ''
  });
  const [address, setAddress] = useState({
    newAddress: false,
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

  //queries
  const { data, loading } = useQuery(query, {
    variables: {
      id: user,
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setDetails({
        ...details,
        id: data.user.id,
        fullName: data.user.fullName,
        organisation: data.user.organisation,
        email: data.user.email
      });
      setScheme({
        ...scheme,
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

  // fucntions
  const handleDetailsChange = name => event => {
    setDetails({
      ...details,
      [name]: event.target.value
    });
  };

  const handleSchemeChange = name => event => {
    setScheme({
      ...scheme,
      [name]: event.target.value
    });
  };

  const handleAddressChange = name => event => {
    setAddress({
      ...address,
      [name]: event.target.value
    });
  };

  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!details.fullName;
      const organisationValid = !!details.organisation;
      const emailValid =
        validate({ email: details.email }, { email: { email: true } }) ===
        undefined;
      setDetails({
        ...details,
        fullNameError: fullNameValid ? '' : 'This is a required field.',
        organisationError: organisationValid ? '' : 'This is a required field.',
        emailError: emailValid ? '' : 'Please enter a valid email address.'
      });
      fullNameValid && organisationValid && emailValid ? resolve() : reject();
    });

  const validateScheme = () =>
    new Promise((resolve, reject) => {
      const roleValid = !!scheme.role;
      setScheme({
        ...scheme,
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
    validateDetails()
      .then(() => {
        validateScheme()
          .then(() => {
            validateAddress()
              .then(() => {
                if (address.newAddress) {
                  updateUser({
                    variables: {
                      id: user,
                      fullName: { set: details.fullName },
                      organisation: { set: details.organisation },
                      email: { set: details.email },
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
                          where: { id: scheme.id },
                          data: {
                            role: scheme.role
                          }
                        }
                      ],
                      schemeId: window.localStorage.getItem('currentScheme')
                    },
                    optimisticResponse: {
                      updateUser: {
                        ...data.user,
                        id: user,
                        fullName: details.fullName,
                        organisation: details.organisation,
                        email: details.email,
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
                            id: scheme.id,
                            role: scheme.role,
                            __typename: 'Scheme'
                          }
                        ],
                        __typename: 'User'
                      }
                    }
                  });
                } else {
                  updateUser({
                    variables: {
                      id: user,
                      fullName: { set: details.fullName },
                      organisation: { set: details.organisation },
                      email: { set: details.email },
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
                          where: { id: scheme.id },
                          data: {
                            role: scheme.role
                          }
                        }
                      ],
                      schemeId: window.localStorage.getItem('currentScheme')
                    },
                    optimisticResponse: {
                      updateUser: {
                        ...data.user,
                        id: user,
                        fullName: details.fullName,
                        organisation: details.organisation,
                        email: details.email,
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
                            id: scheme.id,
                            role: scheme.role,
                            __typename: 'Scheme'
                          }
                        ],
                        __typename: 'User'
                      }
                    }
                  });
                }
                close();
              })
              .catch(() => {});
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <PopOver
      noPadding
      open={open}
      width={800}
      handleClose={close}
      title="Edit User Details"
      actions={[
        <BackButton key={0} disabled={loading} color="primary" onClick={close}>
          Close
        </BackButton>,
        <Button
          key={1}
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      ]}
    >
      <Grow>
        <PopOverContainer>
          <Row>
            <Field row>
              <FieldHeader required>Full Name</FieldHeader>
              <TextField
                value={details.fullName}
                onChange={handleDetailsChange('fullName')}
                error={!!details.fullNameError}
                helperText={details.fullNameError}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>Organisation</FieldHeader>
              <TextField
                value={details.organisation}
                onChange={handleDetailsChange('organisation')}
                error={!!details.organisationError}
                helperText={details.organisationError}
                fullWidth
              />
            </Field>
          </Row>
          <Row>
            <Field row>
              <FieldHeader required>Email Address</FieldHeader>
              <TextField
                value={details.email}
                onChange={handleDetailsChange('email')}
                error={!!details.emailError}
                helperText={details.emailError}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>User Role</FieldHeader>
              <Select
                value={scheme.role}
                onChange={handleSchemeChange('role')}
                error={!!scheme.roleError}
                helperText={scheme.roleError}
                menuItems={[
                  { value: 'USER', label: 'User' },
                  {
                    value: 'CONTENT_ADMIN',
                    label: 'Content Admin'
                  },
                  {
                    value: 'SCHEME_ADMIN',
                    label: 'Scheme Admin'
                  }
                ]}
              />
            </Field>
          </Row>
          <SubHeader>Address</SubHeader>
          <Row>
            <Field row>
              <FieldHeader>Premise</FieldHeader>
              <TextField
                value={address.premises}
                onChange={handleAddressChange('premises')}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader>Building</FieldHeader>
              <TextField
                value={address.building}
                onChange={handleAddressChange('building')}
                fullWidth
              />
            </Field>
          </Row>
          <Row>
            <Field row>
              <FieldHeader required>Street</FieldHeader>
              <TextField
                value={address.street}
                error={!!address.streetError}
                helperText={address.streetError}
                onChange={handleAddressChange('street')}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>Town City</FieldHeader>
              <TextField
                value={address.townCity}
                error={!!address.townError}
                helperText={address.townError}
                onChange={handleAddressChange('townCity')}
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
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>Postcode</FieldHeader>
              <TextField
                value={address.postcode}
                error={!!address.postcodeError}
                helperText={address.postcodeError}
                onChange={handleAddressChange('postcode')}
                fullWidth
              />
            </Field>
          </Row>
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default EditDetailsPopOver;
