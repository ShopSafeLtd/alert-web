import React, { PureComponent } from 'react';
import styled from 'styled-components';

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

class Description extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ageSection: 0,
      sourceError: ''
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/offenders');
    !!this.props.dateOfBirth && this.setState({ ageSection: 1 });
    !!this.props.age && this.setState({ ageSection: 2 });
  }

  handleNext = () => {
    this.validateDescription()
      .then(() => this.props.history.push('/offenders/add/images'))
      .catch(() => this.setState({ ageSection: 1 }));
  };

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  validateDescription = () =>
    new Promise((resolve, reject) => {
      const { dateOfBirth, dateSource } = this.props;
      !!dateOfBirth && !!dateSource
        ? this.setState({ sourceError: '', ageSection: 1 })
        : this.setState({
            sourceError: 'This is a required field.',
            ageSection: 1
          });
      !!this.props.dateOfBirth
        ? !!dateSource
          ? resolve()
          : reject()
        : resolve();
    });

  setAgeSection = value => {
    this.setState({
      ageSection: value
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
    const { sourceError, ageSection } = this.state;

    return (
      <Page>
        <Header>
          <HeaderText>Description</HeaderText>
          <HeaderSubText>
            Update the descriptive information about this offender.
          </HeaderSubText>
        </Header>
        <Form>
          <NewOffenderForm
            handleChange={handleChange}
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
        <FullWidthButton text="Next" onClick={this.handleNext} />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default Description;
