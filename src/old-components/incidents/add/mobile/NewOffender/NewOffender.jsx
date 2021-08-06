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
  background-color: #fff;
`;

class NewOffender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: 'UNKNOWN',
      race: 'UNKNOWN',
      build: 'UNKNOWN',
      age: 'UNKNOWN',
      dateOfBirth: null,
      dobPristine: true,
      dateSource: '',
      dateSourceError: null,
      hair: '',
      peculiarities: ''
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/incidents/add/offenders');
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
        age: '',
        dobPristine: false
      });
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  handleNext = () => {
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dobPristine,
      dateSource,
      hair,
      peculiarities
    } = this.state;

    if (!dobPristine && dateSource === '') {
      this.setState({
        dateSourceError: 'Please provide a source for the date of birth'
      });
    } else {
      this.props.addNewOffender({
        name,
        gender,
        race,
        build,
        age,
        dateOfBirth,
        dateSource,
        hair,
        peculiarities
      });
      this.props.history.push('/incidents/add/offenders');
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
          <HeaderText>New Offender</HeaderText>
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
        <FullWidthButton text="Add Offender" onClick={this.handleNext} />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default NewOffender;
