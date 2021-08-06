import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { Field, FieldHeader } from '../../../global/forms';
import { Row } from '../../../global/layout';

const LocationContent = styled.div`
  padding: 0px 30px;
  width: 100%;
  @media (min-width: 1024px) {
    padding: 0px 50px;
  }
`;

class NewLocation extends PureComponent {
  render() {
    const {
      newLocation: {
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
      <LocationContent>
        <Row>
          <Field row>
            <FieldHeader>Premises</FieldHeader>
            <TextField
              id="premises-input"
              value={premises}
              onChange={e => handleChange(e.target.value, 'premises')}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <FieldHeader>Building</FieldHeader>
            <TextField
              id="building-input"
              value={building}
              onChange={e => handleChange(e.target.value, 'building')}
              fullWidth
              disabled={loading}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader required>Street</FieldHeader>
            <TextField
              id="street-input"
              value={street}
              onChange={e => handleChange(e.target.value, 'street')}
              error={!!streetError}
              helperText={streetError}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <FieldHeader required>Town / City</FieldHeader>
            <TextField
              id="townCity-input"
              value={townCity}
              onChange={e => handleChange(e.target.value, 'townCity')}
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
              id="county-input"
              value={county}
              onChange={e => handleChange(e.target.value, 'county')}
              disabled={loading}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader required>Postcode</FieldHeader>
            <TextField
              id="postcode-input"
              value={postcode}
              onChange={e => handleChange(e.target.value, 'postcode')}
              error={!!postcodeError}
              helperText={postcodeError}
              fullWidth
              disabled={loading}
            />
          </Field>
        </Row>
      </LocationContent>
    );
  }
}

export default NewLocation;
