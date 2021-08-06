import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { isEqual } from 'lodash-es';

import { SubHeader } from '../../../../global/typography';
import { Field, FieldHeader } from '../../../../global/forms';
import { Row, Section } from '../../../../global/layout';

class EditLocation extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.loading !== nextProps.loading) return true;
    if (!isEqual(this.props.location, nextProps.location)) return true;
    return false;
  }

  render() {
    const {
      location: {
        building,
        street,
        streetError,
        townCity,
        townError,
        county,
        postcode,
        postcodeError
      },
      handleChange,
      loading
    } = this.props;

    return (
      <Section width="50%" elevation={1}>
        <SubHeader>Location</SubHeader>
        <Row>
          <Field>
            <FieldHeader>Building</FieldHeader>
            <TextField
              id="subject-input"
              value={building}
              onChange={e => handleChange(e.target.value, 'building')}
              disabled={loading}
              fullWidth
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader required>Street</FieldHeader>
            <TextField
              id="subject-input"
              value={street}
              onChange={e => handleChange(e.target.value, 'street')}
              disabled={loading}
              fullWidth
              error={!!streetError}
              helperText={streetError}
            />
          </Field>
          <Field row left>
            <FieldHeader required>City</FieldHeader>
            <TextField
              id="subject-input"
              value={townCity}
              onChange={e => handleChange(e.target.value, 'townCity')}
              disabled={loading}
              fullWidth
              error={!!townError}
              helperText={townError}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader>County</FieldHeader>
            <TextField
              id="subject-input"
              value={county}
              onChange={e => handleChange(e.target.value, 'county')}
              disabled={loading}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader required>Postcode</FieldHeader>
            <TextField
              id="subject-input"
              value={postcode}
              onChange={e => handleChange(e.target.value, 'postcode')}
              disabled={loading}
              fullWidth
              error={!!postcodeError}
              helperText={postcodeError}
            />
          </Field>
        </Row>
      </Section>
    );
  }
}

export default EditLocation;
