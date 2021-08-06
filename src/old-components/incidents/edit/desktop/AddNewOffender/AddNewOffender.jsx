import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { Row } from '../../../../global/layout';
import {
  Select,
  DateField,
  Field,
  FieldHeader,
  ControlledAgeField
} from '../../../../global/forms';
import { ageValues, buildValues, genderValues, raceValues } from 'graphql-src/offenders/enums';

const HalfWidth = styled(Field)`
  width: 100%;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

class AddNewOffender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ageSection: 0
    };
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  render() {
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities,
      handleChange
    } = this.props;
    const { ageSection } = this.state;
    return (
      <form>
        <Row>
          <Field row>
            <FieldHeader>Name</FieldHeader>
            <TextField
              id="name-subject"
              value={name}
              onChange={e => handleChange(e.target.value, 'name')}
              fullWidth
            />
          </Field>
          <Field row left>
            <FieldHeader>Gender</FieldHeader>
            <Select
              id="gender-subject"
              menuItems={genderValues}
              value={gender}
              onChange={e => handleChange(e.target.value, 'gender')}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <FieldHeader>Ethnicity</FieldHeader>
            <Select
              id="races-subject"
              menuItems={raceValues}
              value={race}
              onChange={e => handleChange(e.target.value, 'race')}
            />
          </Field>
          <Field row left>
            <FieldHeader>Build</FieldHeader>
            <Select
              id="build-subject"
              menuItems={buildValues}
              value={build}
              onChange={e => handleChange(e.target.value, 'build')}
            />
          </Field>
        </Row>
        <HalfWidth>
          <ControlledAgeField
            section={ageSection}
            setSection={section => this.handleChange(section, 'ageSection')}
            dateSection={
              <div>
                <Field>
                  <Row row>
                    <FieldHeader>Date Of Birth</FieldHeader>
                  </Row>
                  <DateField
                    id="date-of-birth-subject"
                    value={dateOfBirth}
                    onChange={value => handleChange(value, 'dateOfBirth')}
                  />
                </Field>
                <Field>
                  <Row row>
                    <FieldHeader>Information Source</FieldHeader>
                  </Row>
                  <TextField
                    id="date-source-input"
                    value={dateSource}
                    onChange={e => handleChange(e.target.value, 'dateSource')}
                    fullWidth
                  />
                </Field>
              </div>
            }
            rangeSection={
              <Field>
                <Row row>
                  <FieldHeader>Age Range</FieldHeader>
                </Row>
                <Select
                  id="age-range"
                  name="age-range"
                  menuItems={ageValues}
                  value={age}
                  onChange={e => handleChange(e.target.value, 'age')}
                />
              </Field>
            }
          />
        </HalfWidth>
        <Row>
          <Field row>
            <FieldHeader>Hair</FieldHeader>
            <TextField
              id="hair-input"
              value={hair}
              onChange={e => handleChange(e.target.value, 'hair')}
              fullWidth
            />
          </Field>
        </Row>
        <Field>
          <FieldHeader>Peculiarities</FieldHeader>
          <TextField
            id="peculiarities-input"
            value={peculiarities}
            onChange={e => handleChange(e.target.value, 'peculiarities')}
            fullWidth
            multiline
            rows="3"
          />
        </Field>
      </form>
    );
  }
}

export default AddNewOffender;
