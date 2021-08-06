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
      data: {
        name,
        gender,
        race,
        dateOfBirth,
        dateSource,
        age,
        build,
        hair,
        peculiarities
      },
      loading,
      ageSection: parentAgeSection,
      setAgeSection: parentSetAgeSection
    } = this.props;
    const { ageSection } = this.state;

    return (
      <Form>
        <Row>
          <Field row>
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
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <Row row>
              <FieldHeader>Gender</FieldHeader>
              <FieldHelp>The gender of the offender if known.</FieldHelp>
            </Row>
            <Select
              value={gender}
              name="gender"
              onChange={e => handleChange(e.target.value, 'gender')}
              menuItems={genderValues}
              disabled={loading}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <Row row>
              <FieldHeader>Ethnicity</FieldHeader>
              <FieldHelp>The ethnicity of the offender if known.</FieldHelp>
            </Row>
            <Select
              name="race"
              value={race}
              onChange={e => handleChange(e.target.value, 'race')}
              menuItems={raceValues}
              disabled={loading}
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
              menuItems={buildValues}
              disabled={loading}
            />
          </Field>
        </Row>
        <Row>
          <Field row>
            <Row row>
              <FieldHeader>Hair</FieldHeader>
              <FieldHelp>
                The style and colour of the offenders hair if known.
              </FieldHelp>
            </Row>
            <TextField
              id="name-input"
              value={hair}
              onChange={e => handleChange(e.target.value, 'hair')}
              fullWidth
              disabled={loading}
            />
          </Field>
          <Field row left>
            <ControlledAgeField
              section={!!parentAgeSection ? parentAgeSection : ageSection}
              setSection={section =>
                !!parentSetAgeSection
                  ? parentSetAgeSection(section)
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
                      onChange={value => handleChange(value, 'dateOfBirth')}
                      disabled={loading}
                    />
                  </Field>
                  <Field>
                    <Row row>
                      <FieldHeader>Information Source</FieldHeader>
                      <FieldHelp>
                        Where you got the date of birth from, e.g. Driving
                        License.
                      </FieldHelp>
                    </Row>
                    <TextField
                      id="date-source-input"
                      value={dateSource}
                      onChange={e => handleChange(e.target.value, 'dateSource')}
                      fullWidth
                      disabled={loading}
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
                    menuItems={ageValues}
                    disabled={loading}
                  />
                </Field>
              }
            />
          </Field>
        </Row>
        <Row>
          <Field>
            <Row row>
              <FieldHeader>Peculiarities</FieldHeader>
              <FieldHelp>
                Anything distinctive features of the offender.
              </FieldHelp>
            </Row>
            <TextField
              id="name-input"
              value={peculiarities}
              onChange={e => handleChange(e.target.value, 'peculiarities')}
              fullWidth
              multiline
              rows="3"
              disabled={loading}
            />
          </Field>
        </Row>
      </Form>
    );
  }
}

export default OffenderForm;
