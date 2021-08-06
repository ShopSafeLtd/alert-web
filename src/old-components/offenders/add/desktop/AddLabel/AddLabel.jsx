import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/react-hooks';

import { PopOver, PopOverContainer } from '../../../../global/layout';
import { FieldHeader, Field } from '../../../../global/forms';
import { BackButton } from '../../../../global/actions';
import mutation from '../../../../../graphql/admin/mutations/AddOffenderWarning';
import AllOffenderLabels from '../../../../../graphql/offenderLabels/queries/AllOffenderLabels';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const AddLabel = ({ open, close, createdById }) => {
  // state
  const [warning, setWarning] = useState({
    name: '',
    nameError: '',
    description: '',
    descriptionError: ''
  });

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

  const handleClose = () => {
    setWarning({
      name: '',
      nameError: '',
      description: '',
      descriptionError: ''
    });
    close();
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
        handleClose();
      })
      .catch(() => {});
  };

  return (
    <PopOver
      noPadding
      open={open}
      width={600}
      handleClose={handleClose}
      title="Add New Label"
      actions={[
        <BackButton onClick={handleClose}>Cancel</BackButton>,
        <Button variant="contained" color="primary" onClick={submit}>
          Add Label
        </Button>
      ]}
    >
      <Grow>
        <PopOverContainer>
          <Field>
            <FieldHeader required>Name</FieldHeader>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              value={warning.name}
              onChange={e => handleChange(e.target.value, 'name')}
              error={!!warning.nameError}
              helperText={warning.nameError}
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            {open && (
              <TextField
                autoFocus
                margin="dense"
                id="helpText"
                fullWidth
                multiline
                rows="6"
                value={warning.description}
                onChange={e => handleChange(e.target.value, 'description')}
                error={!!warning.descriptionError}
                helperText={warning.descriptionError}
              />
            )}
          </Field>
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default AddLabel;
