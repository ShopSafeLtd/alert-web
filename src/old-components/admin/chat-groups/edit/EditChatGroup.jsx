import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Field, FieldHeader } from '../../../global/forms';
import { FullWidthButton } from '../../../global/actions';
import query from '../../../../graphql/admin/queries/EditChatGroup';
import EditMutation from '../../../../graphql/admin/mutations/UpdateChatGroup';
import { useStoreActions } from '../../../../state';

const Page = styled.div`
  width: 100%;
  height: calc(100vh - 116px);
  overflow: scroll;
  padding: 10px 20px;
  background-color: #fff;
`;

const EditChatGroup = ({ match, history }) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);

  // state
  const [chat, setChat] = useState({
    name: '',
    nameError: null,
    description: ''
  });

  // effects
  useEffect(() => {
    setTitle('Edit Chat Group');
    setNavbarAction('backLink');
    setBackLinkTo(`/admin/chat-groups/view/${match.params.id}`);
    setBottomNav(false);
    return () => {
      setTitle('');
      setNavbarAction('default');
      setBackLinkTo('');
      setBottomNav(true);
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { loading } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data =>
      setChat({
        name: data.chat.name,
        description: data.chat.description
      })
  });

  // mutations
  const [updateChat] = useMutation(EditMutation);

  // functions
  const handleChange = name => event => {
    setChat({
      ...chat,
      [name]: event.target.value
    });
  };

  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const nameValid = chat.name !== '';
      !nameValid
        ? setChat({ ...chat, nameError: 'This field is required' })
        : setChat({ ...chat, nameError: '' });
      nameValid ? resolve() : reject();
    });

  const handleSave = () => {
    validateDetails()
      .then(() => {
        updateChat({
          variables: {
            id: match.params.id,
            name: { set: chat.name },
            description: { set: chat.description }
          },
          optimisticResponse: {
            updateChat: {
              id: match.params.id,
              name: chat.name,
              description: chat.description,
              __typename: 'Chat'
            }
          }
        });
        history.push(`/admin/chat-groups/view/${match.params.id}`);
      })
      .catch(() => {});
  };

  return (
    <Page>
      <Field>
        <FieldHeader required>Chat Group Name</FieldHeader>
        <TextField
          value={chat.name}
          onChange={handleChange('name')}
          error={!!chat.nameError}
          helperText={chat.nameError}
          fullWidth
          disabled={loading}
        />
      </Field>
      <Field>
        <FieldHeader>Description</FieldHeader>
        <TextField
          value={chat.description}
          onChange={handleChange('description')}
          fullWidth
          multiline
          rows="6"
          disabled={loading}
        />
      </Field>
      <FullWidthButton text="Save" onClick={handleSave} disabled={loading} />
    </Page>
  );
};

export default EditChatGroup;
