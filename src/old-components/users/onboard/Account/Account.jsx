import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import {
  HeaderText,
  Field,
  FieldHeader,
  HeaderSubText
} from '../../../global/forms';
import { Row } from '../../../global/layout';
import { SubHeader } from '../../../global/typography';

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

class Account extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      values: {
        fullName,
        fullNameError,
        organisation,
        organisationError,
        premises,
        building,
        street,
        streetError,
        townCity,
        townCityError,
        county,
        postcode,
        postcodeError
      },
      handleChange,
      loading
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Account Details</HeaderText>
          <HeaderSubText>
            Please review your account details and correct any errors or fill in
            any missing information.
          </HeaderSubText>
        </Header>
        <Row>
          <Field row>
            <FieldHeader required>Full Name</FieldHeader>
            <TextField
              value={fullName}
              onChange={handleChange('fullName')}
              error={!!fullNameError}
              helperText={fullNameError}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <FieldHeader required>Organisation</FieldHeader>
            <TextField
              value={organisation}
              onChange={handleChange('organisation')}
              error={!!organisationError}
              helperText={organisationError}
              fullWidth
              disabled={loading}
            />
          </Field>
        </Row>
        <SubHeader>Address</SubHeader>
        <Row>
          <Field row>
            <FieldHeader>Company Name</FieldHeader>
            <TextField
              value={premises}
              onChange={handleChange('premises')}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <FieldHeader>Building</FieldHeader>
            <TextField
              value={building}
              onChange={handleChange('building')}
              fullWidth
              disabled={loading}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader required>Street</FieldHeader>
            <TextField
              value={street}
              onChange={handleChange('street')}
              error={!!streetError}
              helperText={streetError}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <FieldHeader required>Town/City</FieldHeader>
            <TextField
              value={townCity}
              onChange={handleChange('townCity')}
              error={!!townCityError}
              helperText={townCityError}
              fullWidth
              disabled={loading}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader>County</FieldHeader>
            <TextField
              value={county}
              onChange={handleChange('county')}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <FieldHeader required>Postcode</FieldHeader>
            <TextField
              value={postcode}
              onChange={handleChange('postcode')}
              error={!!postcodeError}
              helperText={postcodeError}
              fullWidth
              disabled={loading}
            />
          </Field>
        </Row>
      </Page>
    );
  }
}

export default Account;
