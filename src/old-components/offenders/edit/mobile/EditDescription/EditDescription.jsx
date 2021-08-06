import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash-es';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { NewOffenderForm } from '../../../../forms';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;

const initialState = {
  ageSection: 0,
  name: '',
  gender: '',
  race: '',
  build: '',
  age: '',
  dateOfBirth: '',
  dateSource: '',
  sourceError: null,
  hair: '',
  peculiarities: ''
};

class Description extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
    if (!isEqual(this.props.offender, {})) {
      const {
        offender: {
          name,
          gender,
          race,
          build,
          age,
          dateOfBirth,
          dateSource,
          hair,
          peculiarities
        }
      } = this.props;
      this.setState({
        name,
        gender,
        race,
        build,
        age,
        dateOfBirth:
          dateOfBirth === null || dateOfBirth === undefined
            ? null
            : new Date(dateOfBirth),
        dateSource:
          dateSource === null || dateSource === undefined ? '' : dateSource,
        hair,
        peculiarities,
        ageSection: !!dateOfBirth ? 1 : !!age ? 2 : 0
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.offender, {}) && isEqual(prevState, initialState)) {
      const {
        offender: {
          name,
          gender,
          race,
          build,
          age,
          dateOfBirth,
          dateSource,
          hair,
          peculiarities
        }
      } = this.props;
      this.setState({
        name,
        gender,
        race,
        build,
        age,
        dateOfBirth:
          dateOfBirth === null || dateOfBirth === undefined
            ? null
            : new Date(dateOfBirth),
        dateSource:
          dateSource === null || dateSource === undefined ? '' : dateSource,
        hair,
        peculiarities,
        ageSection: !!dateOfBirth ? 1 : !!age ? 2 : 0
      });
    }
  }

  handleNext = () => {
    this.props.history.push('/offenders/add/images');
  };

  handleChange = (value, field) => {
    if (field === 'age') {
      this.setState({
        [field]: value,
        dateOfBirth: null,
        dateSource: ''
      });
    } else if (field === 'dateOfBirth') {
      this.setState({
        [field]: value,
        age: null
      });
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  validate = () =>
    new Promise((resolve, reject) => {
      const { dateOfBirth, dateSource, age } = this.state;
      this.setState({
        sourceError: !!age
          ? ''
          : !!dateOfBirth && !!dateSource
            ? ''
            : 'This field is required.'
      });
      !!age ? resolve() : !!dateOfBirth && !!dateSource ? resolve() : reject();
    });

  save = () => {
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
    const { offender, offenderId } = this.props;
    this.props.editOffender({
      variables: {
        id: offenderId,
        name: { set: name === '' ? 'Unidentified Offender' : name },
        gender: gender === '' ? 'UNKNOWN' : gender,
        race: race === '' ? 'UNKNOWN' : race,
        build: build === '' ? 'UNKNOWN' : build,
        age: age === '' ? 'UNKNOWN' : age,
        dateOfBirth: { set: dateOfBirth === '' ? undefined : dateOfBirth },
        dateSource: { set: dateSource },
        hair: { set: hair },
        peculiarities: { set: peculiarities }
      },
      optimisticResponse: {
        updateOffender: {
          ...offender,
          age: age === '' ? 'UNKNOWN' : age,
          build: build === '' ? 'UNKNOWN' : build,
          dateOfBirth: dateOfBirth === '' ? undefined : dateOfBirth,
          dateSource,
          gender: gender === '' ? 'UNKNOWN' : gender,
          hair,
          id: offenderId,
          name: name === '' ? 'Unidentified Offender' : name,
          offenderLabels: this.props.offender.offenderLabels,
          peculiarities,
          race: race === '' ? 'UNKNOWN' : race,
          __typename: 'Offender'
        }
      }
    });
  };

  handleSave = () => {
    this.validate()
      .then(() => {
        this.save();
        this.props.history.push(this.props.basePath);
      })
      .catch(() => {});
  };

  setAgeSection = section =>
    this.setState({
      ageSection: section
    });

  render() {
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      sourceError,
      hair,
      peculiarities,
      ageSection
    } = this.state;
    const { loading } = this.props;

    return (
      <Page>
        <Header>
          <HeaderText>Description</HeaderText>
          <HeaderSubText>
            Complete as many description fields as you can about the offender.
          </HeaderSubText>
        </Header>
        <Form>
          <NewOffenderForm
            handleChange={this.handleChange}
            disabled={loading}
            data={{
              name,
              gender,
              race,
              build,
              age,
              dateOfBirth,
              dateSource,
              sourceError,
              hair,
              peculiarities
            }}
            ageSection={ageSection}
            setAgeSection={this.setAgeSection}
          />
        </Form>
        <FullWidthButton
          disabled={loading}
          text="Save Details"
          onClick={this.handleSave}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo('');
  }
}

export default Description;
