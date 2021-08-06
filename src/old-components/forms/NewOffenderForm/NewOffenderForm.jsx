import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import {
  Field,
  FieldHeader,
  FieldHelp,
  ControlledAgeField,
  DateField,
  Select
} from '../../global/forms';
import { Row } from '../../global/layout';
import { ageValues, buildValues, genderValues, raceValues } from 'graphql-src/offenders/enums';

const Form = styled.div`
  width: 100%;
`;
const HalfWidth = styled.div`
  width: 100%;
  padding-right: 0px;
  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 10px;
  }
`;

class OffenderForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ageSection: 0
    };
  }

  setAgeSection = value => {
    this.setState({
      ageSection: value
    });
  };

  render() {
    const {
      handleChange,
      disabled,
      data: {
        name,
        gender,
        race,
        dateOfBirth,
        dateSource,
        sourceError,
        age,
        build,
        hair,
        peculiarities
      },
      ageSection: inheritedAgeSection,
      setAgeSection
    } = this.props;
    const { ageSection } = this.state;

    return (
      <Form>
        <HalfWidth>
          <Field>
            <Row row>
              <FieldHeader>Name</FieldHeader>
              <FieldHelp>
                Enter the offenders name if you know it, if not leave this field
                blank.
              </FieldHelp>
            </Row>
            <TextField
              id="name-input"
              value={name}
              onChange={e => handleChange(e.target.value, 'name')}
              disabled={disabled}
              fullWidth
            />
          </Field>
        </HalfWidth>
        <Row>
          <Field row>
            <Row row>
              <FieldHeader>Gender</FieldHeader>
              <FieldHelp>The gender of the offender if known.</FieldHelp>
            </Row>
            <Select
              value={gender}
              name="gender"
              onChange={e => handleChange(e.target.value, 'gender')}
              disabled={disabled}
              menuItems={genderValues}
            />
          </Field>
          <Field row left>
            <Row row>
              <FieldHeader>Ethnicity</FieldHeader>
              <FieldHelp>The ethnicity of the offender if known.</FieldHelp>
            </Row>
            <Select
              name="race"
              value={race}
              onChange={e => handleChange(e.target.value, 'race')}
              disabled={disabled}
              menuItems={raceValues}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <ControlledAgeField
              section={!!inheritedAgeSection ? inheritedAgeSection : ageSection}
              setSection={section =>
                !!setAgeSection
                  ? setAgeSection(section)
                  : this.setAgeSection(section)
              }
              dateSection={
                <div>
                  <Field>
                    <Row row>
                      <FieldHeader>Date Of Birth</FieldHeader>
                      <FieldHelp>
                        Date of birth of the offender, only complete this if you
                        know the exact date.
                      </FieldHelp>
                    </Row>
                    <DateField
                      id="date-of-birth-subject"
                      value={dateOfBirth}
                      disabled={disabled}
                      onChange={value => handleChange(value, 'dateOfBirth')}
                    />
                  </Field>
                  <Field>
                    <Row row>
                      <FieldHeader required>Information Source</FieldHeader>
                      <FieldHelp>
                        Where you got the date of birth from, e.g. Driving
                        License.
                      </FieldHelp>
                    </Row>
                    <TextField
                      id="date-source-input"
                      value={dateSource}
                      onChange={e => handleChange(e.target.value, 'dateSource')}
                      error={!!sourceError}
                      helperText={sourceError}
                      disabled={disabled}
                      fullWidth
                    />
                  </Field>
                </div>
              }
              rangeSection={
                <Field>
                  <Row row>
                    <FieldHeader>Age Range</FieldHeader>
                    <FieldHelp>
                      An estimated age range of the offender.
                    </FieldHelp>
                  </Row>
                  <Select
                    value={age}
                    name="age"
                    onChange={e => handleChange(e.target.value, 'age')}
                    disabled={disabled}
                    menuItems={ageValues}
                  />
                </Field>
              }
            />
          </Field>
          <Field row left>
            <Row row>
              <FieldHeader>Build</FieldHeader>
              <FieldHelp>The build of the offender if known.</FieldHelp>
            </Row>
            <Select
              name="build"
              value={build}
              onChange={e => handleChange(e.target.value, 'build')}
              disabled={disabled}
              menuItems={buildValues}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <Row row>
              <FieldHeader>Hair</FieldHeader>
              <FieldHelp>
                The stylea and colour of the offenders hair if known.
              </FieldHelp>
            </Row>
            <TextField
              id="hair-input"
              value={hair}
              onChange={e => handleChange(e.target.value, 'hair')}
              disabled={disabled}
              fullWidth
            />
          </Field>
        </Row>
        <HalfWidth>
          <Field>
            <Row row>
              <FieldHeader>Peculiarities</FieldHeader>
              <FieldHelp>
                Anything distinctive features of the offender.
              </FieldHelp>
            </Row>
            <TextField
              id="peculiarities-input"
              value={peculiarities}
              onChange={e => handleChange(e.target.value, 'peculiarities')}
              fullWidth
              multiline
              disabled={disabled}
              rows="3"
            />
          </Field>
        </HalfWidth>
      </Form>
    );
  }
}

export default OffenderForm;
