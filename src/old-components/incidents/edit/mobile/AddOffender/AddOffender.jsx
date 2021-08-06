import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { NewOffenderForm } from '../../../../forms';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;

class AddOffender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      race: '',
      build: '',
      age: '',
      dateOfBirth: null,
      dateSource: '',
      dateSourceError: null,
      hair: '',
      peculiarities: ''
    };
  }

  componentDidMount() {
    this.props.setBackLinkTo(`${this.props.basePath}/offenders`);
  }

  handleChange = (value, field) => {
    if (field === 'age') {
      this.setState({
        [field]: value,
        dateOfBirth: '',
        dateSource: ''
      });
    } else if (field === 'dateOfBirth') {
      this.setState({
        [field]: value,
        age: ''
      });
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  handleSave = () => {
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities
    } = this.state;

    if (!!dateOfBirth && dateSource === '') {
      this.setState({
        dateSourceError: 'Please provide a source for the date of birth'
      });
    } else {
      this.props.addNewOffender({
        name: name === '' ? 'Unidentified Offender' : name,
        gender: gender === '' ? 'UNKNOWN' : gender,
        race: race === '' ? 'UNKNOWN' : race,
        build: build === '' ? 'UNKNOWN' : build,
        age: age === '' ? 'UNKNOWN' : age,
        dateOfBirth: dateOfBirth === '' ? undefined : dateOfBirth,
        dateSource,
        hair,
        peculiarities
      });
      this.props.history.push(`${this.props.basePath}/offenders`);
    }
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
      dateSourceError,
      hair,
      peculiarities
    } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Add Offender</HeaderText>
          <HeaderSubText>
            Complete as much information as much information about the offender
            as you can.
          </HeaderSubText>
        </Header>
        <Form>
          <NewOffenderForm
            handleChange={this.handleChange}
            data={{
              name,
              gender,
              race,
              build,
              age,
              dateOfBirth,
              dateSource,
              sourceError: dateSourceError,
              hair,
              peculiarities
            }}
          />
        </Form>
        <FullWidthButton text="Add Offender" onClick={this.handleSave} />
      </Page>
    );
  }
}

export default AddOffender;
