import React, { PureComponent } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

import {
  HeaderText,
  HeaderSubText,
  Field,
  FieldHeader,
  Select,
} from "../../../global/forms";
import { Row } from "../../../global/layout";
import { SubHeader } from "../../../global/typography";

const Page = styled.div`
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 0px 0px 10px;
  }
`;

class Details extends PureComponent {
  componentDidMount() {
    this.props.setNavbarAction("backLink");
    this.props.setBackLinkTo("/admin/users");
    this.props.setActiveStep(0);
  }

  render() {
    const {
      handleChange,
      user: {
        fullName,
        fullNameError,
        email,
        emailError,
        organisation,
        organisationError,
        role,
        roleError,
        premises,
        building,
        street,
        townCity,
        county,
        postcode,
      },
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>User Details</HeaderText>
          <HeaderSubText>
            Complete as much information as you can for the new user, anything
            missing will be completed by the user when they sign up.
          </HeaderSubText>
        </Header>
        <Row>
          <Field row>
            <FieldHeader required>Full Name</FieldHeader>
            <TextField
              value={fullName}
              onChange={handleChange("fullName")}
              error={fullNameError !== ""}
              helperText={fullNameError}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader required>Organisation</FieldHeader>
            <TextField
              value={organisation}
              onChange={handleChange("organisation")}
              error={organisationError !== ""}
              helperText={organisationError}
              fullWidth
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader required>Email Address</FieldHeader>
            <TextField
              value={email}
              onChange={handleChange("email")}
              error={emailError !== ""}
              helperText={emailError}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader required>User Role</FieldHeader>
            <Select
              value={role}
              onChange={handleChange("role")}
              error={!!roleError}
              helperText={roleError}
              menuItems={[
                { value: "USER", label: "User" },
                { value: "CONTENT_ADMIN", label: "Content Admin" },
                { value: "SCHEME_ADMIN", label: "Scheme Admin" },
              ]}
            />
          </Field>
        </Row>
        <SubHeader>User Address</SubHeader>
        <Row>
          <Field row>
            <FieldHeader>Premise</FieldHeader>
            <TextField
              value={premises}
              onChange={handleChange("premises")}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader>Building</FieldHeader>
            <TextField
              value={building}
              onChange={handleChange("building")}
              fullWidth
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader>Street</FieldHeader>
            <TextField
              value={street}
              onChange={handleChange("street")}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader>Town City</FieldHeader>
            <TextField
              value={townCity}
              onChange={handleChange("townCity")}
              fullWidth
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader>County</FieldHeader>
            <TextField
              value={county}
              onChange={handleChange("county")}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader>Postcode</FieldHeader>
            <TextField
              value={postcode}
              onChange={handleChange("postcode")}
              fullWidth
            />
          </Field>
        </Row>
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction("default");
    this.props.setBackLinkTo("");
  }
}

export default Details;
