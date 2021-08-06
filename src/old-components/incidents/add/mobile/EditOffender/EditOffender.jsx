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

class EditOffender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      race: '',
      build: '',
      age: '',
      dateOfBirth: '',
      dateSource: '',
      dateSourceError: null,
      hair: '',
      peculiarities: ''
    };
  }

  componentDidMount = () => {
    const { offender } = this.props;
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo(`/incidents/add/offenders/view`);
    this.setState({
      name: offender.name,
      gender: offender.gender,
      race: offender.race,
      build: offender.build,
      age: offender.age,
      dateOfBirth: offender.dateOfBirth,
      dateSource: offender.dateSource,
      ageSection:
        offender.age === '' && offender.dateOfBirth !== ''
          ? 1
          : offender.age === '' && offender.dateOfBirth === ''
            ? 0
            : 2,
      hair: offender.hair,
      peculiarities: offender.peculiarities
    });
  };

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

  handleNext = () => {
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
      this.props.editNewOffender({
        ...this.props.offender,
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
      this.props.history.push('/incidents/add/offenders/view');
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
          <HeaderText>Edit Offender</HeaderText>
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
        <FullWidthButton text="Update Offender" onClick={this.handleNext} />
      </Page>
    );
  }
}

export default EditOffender;
