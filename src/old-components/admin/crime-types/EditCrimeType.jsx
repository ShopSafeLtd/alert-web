import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import IconButton from '@material-ui/core/IconButton';

import {
  Field,
  FieldHeader,
  Header,
  HeaderText,
  HeaderSubText
} from '../../global/forms';
import { PageHeader } from '../../global/typography';
import ConfirmDialog from '../../global/ConfirmDialog/ConfirmDialog';
import { FullWidthButton, BackButton } from '../../global/actions';
import { Row, Section } from '../../global/layout';
import mutation from '../../../graphql/admin/mutations/EditCrimeType';
import DeleteCrimeType from '../../../graphql/admin/mutations/DeleteCrimeType';
import CrimeType from '../../../graphql/admin/queries/CrimeType';
import AllCrimeTypes from '../../../graphql/admin/queries/AllCrimeTypes';
import { useStoreActions } from '../../../state';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  @media (min-width: 1024px) {
    background-color: none;
    padding: 0px 10px 20px;
  }
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 20px;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

const EditCrimeType = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setActions = useStoreActions(actions => actions.theme.setActions);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);

  // state
  const [fields, setFields] = useState({
    id: '',
    name: '',
    nameError: '',
    description: '',
    descriptionError: ''
  });
  const [deleteDialog, setDeleteDialog] = useState(false);

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle('Add Crime Type');
    setNavbarAction('backLink');
    setBackLinkTo(`/admin/crime-types`);
    setActions([
      <IconButton onClick={() => setDeleteDialog(true)} key="0">
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
          />
        </Svg>
      </IconButton>
    ]);
    return () => {
      setBottomNav(true);
      setTitle('');
      setNavbarAction('default');
      setBackLinkTo('');
      setActions([]);
    };
  });

  // queries
  const { loading } = useQuery(CrimeType, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ tag: { id, name, description } }) => {
      if (fields.id === '') {
        setFields({
          ...fields,
          id,
          name,
          description
        });
      }
    }
  });

  // mutations
  const [editCrimeType] = useMutation(mutation);
  const [deleteCrimeType] = useMutation(DeleteCrimeType, {
    update: (store, { data: { deleteTag } }) => {
      let data = store.readQuery({
        query: AllCrimeTypes,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
      data.tags = data.tags.filter(type => type.id !== deleteTag.id);
      store.writeQuery({
        query: AllCrimeTypes,
        data,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
    }
  });

  // functions
  const handleChange = (value, field) => {
    setFields({
      ...fields,
      [field]: value
    });
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!fields.name;
      const descriptionValid = !!fields.description;
      setFields({
        nameError: nameValid ? '' : 'This field is required',
        descriptionError: descriptionValid ? '' : 'This field is required'
      });
      nameValid && descriptionValid ? resolve() : reject();
    });

  const submit = () => {
    validate()
      .then(() => {
        editCrimeType({
          variables: {
            id,
            name: { set: fields.name },
            description: { set: fields.description }
          },
          optimisticResponse: {
            updateTag: {
              description: fields.description,
              id,
              name: fields.name,
              __typename: 'CrimeType'
            }
          }
        });
        history.push('/admin/crime-types');
      })
      .catch(() => {});
  };

  const handleDelete = async () => {
    await deleteCrimeType({
      variables: {
        id
      },
      optimisticResponse: {
        deleteTag: {
          id,
          __typename: 'CrimeType'
        }
      }
    });
    history.push('/admin/crime-types');
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {matches => (
        <Page>
          {matches ? (
            <Section width="100%" elevation={1}>
              <PageHeader>Edit Crime Type</PageHeader>
              <HeaderSubText>
                Crime types are used to catagorise incidents that are submitted
                by memebers.
              </HeaderSubText>
            </Section>
          ) : (
            <Header>
              <HeaderText>Edit Crime Type</HeaderText>
              <HeaderSubText>
                Crime types are used to catagorise incidents that are submitted
                by memebers.
              </HeaderSubText>
            </Header>
          )}
          <Section noPadding width="100%" elevation={1} grow>
            <Form>
              <Field>
                <FieldHeader required>Name</FieldHeader>
                <TextField
                  value={fields.name}
                  onChange={e => handleChange(e.target.value, 'name')}
                  fullWidth
                  disabled={loading}
                  error={!!fields.nameError}
                  helperText={fields.nameError}
                />
              </Field>
              <Field>
                <FieldHeader required>Description</FieldHeader>
                <TextField
                  value={fields.description}
                  onChange={e => handleChange(e.target.value, 'description')}
                  fullWidth
                  multiline
                  rows="5"
                  disabled={loading}
                  error={!!fields.descriptionError}
                  helperText={fields.descriptionError}
                />
              </Field>
            </Form>
          </Section>
          {matches ? (
            <Section width="100%" elevation={1}>
              <Row row right>
                <BackButton
                  component={Link}
                  to={`/admin/crime-types`}
                  disabled={loading}
                >
                  Cancel
                </BackButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submit}
                  disabled={loading}
                >
                  Submit
                </Button>
              </Row>
            </Section>
          ) : (
            <FullWidthButton
              text="Submit"
              onClick={submit}
              disabled={loading}
            />
          )}
          <ConfirmDialog
            open={deleteDialog}
            handleClose={() => setDeleteDialog(false)}
            title="Are you sure?"
            description="Deleting this crime type will remove it permanently and will also remove it from any incident it's assigned to."
            actions={[
              <Button
                key={Math.random()}
                onClick={() => setDeleteDialog(false)}
              >
                Cancel
              </Button>,
              <Button
                key={Math.random()}
                onClick={handleDelete}
                color="primary"
              >
                Delete
              </Button>
            ]}
          />
        </Page>
      )}
    </MediaQuery>
  );
};

export default EditCrimeType;
