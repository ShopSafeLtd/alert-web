import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { FieldHeader, Field } from '../../../../global/forms';

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

class AddWarning extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      description: '',
      descriptionError: ''
    };
  }

  componentDidMount() {
    this.props.setBackLinkTo(`${this.props.basePath}/warnings`);
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  validate = () =>
    new Promise((resolve, reject) => {
      let errors = [];
      if (this.state.name === '') {
        this.setState({
          nameError: 'Name is required'
        });
        errors.push('Name is required');
      } else {
        this.state.nameError !== null &&
          this.setState({
            nameError: null
          });
      }
      if (this.state.description === '') {
        this.setState({
          descriptionError: 'Description is required'
        });
        errors.push('Description is required');
      } else {
        this.state.descriptionError !== null &&
          this.setState({
            descriptionError: null
          });
      }

      return errors.length ? reject(errors) : resolve();
    });

  save = () => {
    const { name, description } = this.state;
    const { offenderId } = this.props;
    this.props.editOffender({
      variables: {
        id: offenderId,
        newOffenderWarnings: {
          name,
          description,
          offenderWarningScheme: {
            connect: {
              id: window.localStorage.getItem('currentScheme')
            }
          }
        }
      }
    });
  };

  handleSave = () => {
    this.validate()
      .then(() => {
        this.save();
        this.props.history.push(`${this.props.basePath}/warnings`);
      })
      .catch(error => {});
  };

  render() {
    const { name, nameError, description, descriptionError } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Add Warning Label</HeaderText>
          <HeaderSubText>
            Add a new warning label and assign it to this offender, this will be
            available for use on other offenders as well.
          </HeaderSubText>
        </Header>
        <Form>
          <Field>
            <FieldHeader required>Name</FieldHeader>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              value={name}
              onChange={e => this.handleChange(e.target.value, 'name')}
              error={nameError !== ''}
              helperText={nameError}
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            <TextField
              margin="dense"
              id="description"
              fullWidth
              multiline
              rows="6"
              value={description}
              onChange={e => this.handleChange(e.target.value, 'description')}
              error={descriptionError !== ''}
              helperText={descriptionError}
            />
          </Field>
        </Form>
        <FullWidthButton text="Add Warning Label" onClick={this.handleSave} />
      </Page>
    );
  }
}

export default AddWarning;
