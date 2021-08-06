import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import {
  Field,
  FieldHeader,
  Header,
  HeaderText,
  HeaderSubText
} from '../../../../global/forms';
import { FullWidthButton } from '../../../../global/actions';
import AllOffenderLabels from '../../../../../graphql/offenderLabels/queries/AllOffenderLabels';
import mutation from '../../../../../graphql/admin/mutations/AddOffenderWarning';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 20px;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;

const AddWarning = ({
  setNavbarAction,
  setBackLinkTo,
  history,
  createdById
}) => {
  // state
  const [warning, setWarning] = useState({
    name: '',
    nameError: '',
    description: '',
    descriptionError: ''
  });

  // effects
  useEffect(() => {
    setNavbarAction('backLink');
    setBackLinkTo(`/offenders/add/warning-labels`);
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  // mutations
  const [addWarning] = useMutation(mutation, {
    update: (store, { data: { createTag } }) => {
      let data = store.readQuery({
        query: AllOffenderLabels,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
      data.tags = [...data.tags, createTag];
      store.writeQuery({
        query: AllOffenderLabels,
        data,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
    }
  });

  // functions
  const handleChange = (value, field) => {
    setWarning({
      ...warning,
      [field]: value
    });
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!warning.name;
      const descriptionValid = !!warning.description;

      setWarning({
        ...warning,
        nameError: nameValid ? '' : 'This field is required',
        descriptionError: descriptionValid ? '' : 'This field is required'
      });

      nameValid && descriptionValid ? resolve() : reject();
    });

  const submit = () => {
    validate()
      .then(() => {
        addWarning({
          variables: {
            name: warning.name,
            description: warning.description,
            schemeId: window.localStorage.getItem('currentScheme'),
            createdById: createdById
          },
          optimisticResponse: {
            createTag: {
              id: 0,
              name: warning.name,
              description: warning.description,
              uploaded: false,
              __typename: 'Tag'
            }
          }
        });
        history.push('/offenders/add/warning-labels');
      })
      .catch(() => {});
  };

  return (
    <div>
      <Page>
        <Header>
          <HeaderText>Add Warning Label</HeaderText>
          <HeaderSubText>
            Please complete the below fields to add new warning label.
          </HeaderSubText>
        </Header>
        <Form>
          <Field>
            <FieldHeader required>Name</FieldHeader>
            <TextField
              value={warning.name}
              error={!!warning.nameError}
              helperText={warning.nameError}
              onChange={e => handleChange(e.target.value, 'name')}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            <TextField
              value={warning.description}
              error={!!warning.descriptionError}
              helperText={warning.descriptionError}
              onChange={e => handleChange(e.target.value, 'description')}
              fullWidth
              multiline
              rows="5"
            />
          </Field>
        </Form>
        <FullWidthButton text="Add Warning" onClick={submit} />
      </Page>
    </div>
  );
};

export default AddWarning;
