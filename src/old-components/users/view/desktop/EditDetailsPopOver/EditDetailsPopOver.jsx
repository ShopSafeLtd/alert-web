import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import validate from "validate.js";
// import { useQuery, useMutation } from '@apollo/react-hooks';
import { useQuery, useMutation } from "@apollo/client";
import { useStoreState } from "state";

import { PopOver, Row, PopOverContainer } from "../../../../global/layout";
import { BackButton } from "../../../../global/actions";
import { SubHeader } from "../../../../global/typography";
import { Field, FieldHeader, Select } from "../../../../global/forms";
import { User } from "graphql-src/users/queries";
import { UpdateUser } from "graphql-src/users/mutations/update-user";
// import query from '../../../../../graphql/users/queries/User';
// import UserMutation from '../../../../../graphql/users/mutations/UpdateUser';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const EditDetailsPopOver = ({ open, close, user }) => {
  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [details, setDetails] = useState({
    id: "",
    fullName: "",
    fullNameError: "",
    organisation: "",
    organisationError: "",
    email: "",
    emailError: "",
  });
  const [scheme, setScheme] = useState({
    id: "",
    role: "",
    roleErrror: "",
  });
  const [address, setAddress] = useState({
    newAddress: false,
    id: "",
    premises: "",
    building: "",
    street: "",
    streetError: "",
    townCity: "",
    townCityError: "",
    county: "",
    postcode: "",
    postcodeError: "",
  });

  //queries
  const { loading } = useQuery(User, {
    variables: {
      where: {
        id: user,
      },
      scheme: schemeId,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (res) => {
      const output = { ...res.user };
      setDetails((prev) => {
        return {
          ...prev,
          id: output.id,
          fullName: output.fullName,
          organisation: output.organisation,
          email: output.email,
        };
      });
      setScheme((prev) => {
        return {
          ...prev,
          id: output.schemes[0].id,
          role: output.schemes[0].role,
        };
      });
      if (output.addresses.length === 0) {
        setAddress({
          ...address,
          newAddress: true,
        });
      } else {
        setAddress({
          id: output.addresses[0].id,
          premises: output.addresses[0].premises,
          building: output.addresses[0].building,
          street: output.addresses[0].street,
          townCity: output.addresses[0].townCity,
          county: output.addresses[0].county,
          postcode: output.addresses[0].postcode,
        });
      }
    },
  });

  // mutations
  // const [updateUser] = useMutation(UserMutation);
  const [updateUser] = useMutation(UpdateUser);

  // fucntions
  const handleDetailsChange = (name) => (event) => {
    setDetails((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const handleSchemeChange = (name) => (event) => {
    setScheme((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const handleAddressChange = (name) => (event) => {
    setAddress((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      };
    });
  };

  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!details.fullName;
      const organisationValid = !!details.organisation;
      // const emailValid =
      // validate({ email: details.email }, { email: { email: true } }) ===
      // undefined;

      // make sure email matches anything@anything
      const emailValid = /^[^\s@]+@[^\s@]+$/.test(details.email);
      setDetails({
        ...details,
        fullNameError: fullNameValid ? "" : "This is a required field.",
        organisationError: organisationValid ? "" : "This is a required field.",
        emailError: emailValid ? "" : "Please enter a valid email address.",
      });
      fullNameValid && organisationValid && emailValid ? resolve() : reject();
    });

  const validateScheme = () =>
    new Promise((resolve, reject) => {
      const roleValid = !!scheme.role;
      setScheme({
        ...scheme,
        roleError: roleValid ? "" : "This is a required field.",
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
        streetError: streetValid ? "" : "This is a required field.",
        townError: townValid ? "" : "This is a required field.",
        postcodeError: postcodeValid ? "" : "This is a required field.",
      });
      streetValid && townValid && postcodeValid ? resolve() : reject();
    });

  const handleSave = async () => {
    try {
      await validateDetails();
      await validateAddress();
      await validateScheme();

      updateUser({
        variables: {
          where: {
            id: user,
          },
          scheme: schemeId,
          data: {
            fullName: { set: details.fullName },
            organisation: { set: details.organisation },
            email: { set: details.email },
            schemes: {
              update: {
                where: {
                  id: scheme.id,
                },
                data: {
                  role: { set: scheme.role },
                },
              },
            },
            addresses: {
              update: address.newAddress
                ? undefined
                : {
                    where: {
                      id: address.id,
                    },
                    data: {
                      premises: { set: address.premises },
                      building: { set: address.building },
                      street: { set: address.street },
                      townCity: { set: address.townCity },
                      county: { set: address.county },
                      postcode: { set: address.postcode },
                    },
                  },
              create: address.newAddress
                ? [
                    {
                      primary: true,
                      premises: { set: address.premises },
                      building: { set: address.building },
                      street: { set: address.street },
                      townCity: { set: address.townCity },
                      county: { set: address.county },
                      postcode: { set: address.postcode },
                    },
                  ]
                : undefined,
            },
          },
        },
      });
      close();
    } catch (err) {
      console.log(err);
    }
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
        </Button>,
      ]}
    >
      <Grow>
        <PopOverContainer>
          <Row>
            <Field row>
              <FieldHeader required>Full Name</FieldHeader>
              <TextField
                value={details.fullName}
                onChange={handleDetailsChange("fullName")}
                error={!!details.fullNameError}
                helperText={details.fullNameError}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>Organisation</FieldHeader>
              <TextField
                value={details.organisation}
                onChange={handleDetailsChange("organisation")}
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
                onChange={handleDetailsChange("email")}
                error={!!details.emailError}
                helperText={details.emailError}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>User Role</FieldHeader>
              <Select
                value={scheme.role}
                onChange={handleSchemeChange("role")}
                error={!!scheme.roleError}
                helperText={scheme.roleError}
                menuItems={[
                  { value: "USER", label: "User" },
                  {
                    value: "CONTENT_ADMIN",
                    label: "Content Admin",
                  },
                  {
                    value: "SCHEME_ADMIN",
                    label: "Scheme Admin",
                  },
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
                onChange={handleAddressChange("premises")}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader>Building</FieldHeader>
              <TextField
                value={address.building}
                onChange={handleAddressChange("building")}
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
                onChange={handleAddressChange("street")}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>Town City</FieldHeader>
              <TextField
                value={address.townCity}
                error={!!address.townError}
                helperText={address.townError}
                onChange={handleAddressChange("townCity")}
                fullWidth
              />
            </Field>
          </Row>
          <Row>
            <Field row>
              <FieldHeader>County</FieldHeader>
              <TextField
                value={address.county}
                onChange={handleAddressChange("county")}
                fullWidth
              />
            </Field>
            <Field row left>
              <FieldHeader required>Postcode</FieldHeader>
              <TextField
                value={address.postcode}
                error={!!address.postcodeError}
                helperText={address.postcodeError}
                onChange={handleAddressChange("postcode")}
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
