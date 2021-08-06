import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { ExclusionForm } from '../../../../forms';

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

class AddBan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      locationError: null,
      description: ''
    };
  }

  componentDidMount() {
    this.props.setBackLinkTo(`${this.props.basePath}/bans`);
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  validate = () =>
    new Promise((resolve, reject) => {
      let errors = [];
      if (this.state.location !== null && this.state.location === '') {
        this.setState({
          locationError: 'Location is required'
        });
        errors.push('Location is required');
      } else {
        this.state.locationError !== null &&
          this.setState({
            locationError: null
          });
      }

      return errors.length ? reject(errors) : resolve();
    });

  save = () => {
    const { startDate, endDate, location, description } = this.state;
    const { offenderId } = this.props;
    this.props.editOffender({
      variables: {
        id: offenderId,
        newBans: [
          {
            startDate,
            endDate,
            location,
            description,
            scheme: {
              connect: {
                id: window.localStorage.getItem('currentScheme')
              }
            },
            createdBy: {
              connect: {
                id: this.props.userId
              }
            }
          }
        ]
      }
    });
  };

  handleSave = () => {
    this.validate()
      .then(() => {
        this.save();
        this.props.history.push(`${this.props.basePath}/bans`);
      })
      .catch(error => {});
  };

  render() {
    const {
      startDate,
      endDate,
      location,
      locationError,
      description
    } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Add Ban</HeaderText>
          <HeaderSubText>
            Set a start and end date for the new ban, also give it a location
            and a description of the ban.
          </HeaderSubText>
        </Header>
        <Form>
          <ExclusionForm
            data={{
              startDate,
              endDate,
              location,
              description,
              locationError
            }}
            handleChange={this.handleChange}
          />
        </Form>
        <FullWidthButton text="Add Ban" onClick={this.handleSave} />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo('');
  }
}

export default AddBan;
