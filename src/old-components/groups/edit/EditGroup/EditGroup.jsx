import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Field, FieldHeader } from '../../../global/forms';
import { FullWidthButton } from '../../../global/actions';
import GroupQuery from '../../../../graphql/groups/queries/EditGroup';
import UpdateGroup from '../../../../graphql/groups/mutations/UpdateGroup';
import { useStoreActions } from '../../../../state';
import { useNavigate, useParams } from 'react-router-dom';

const Page = styled.div`
  width: 100%;
  height: calc(100vh - 116px);
  overflow: scroll;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditGroup = () => {
  const navigate = useNavigate()
  const params = useParams()
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);

  // state
  const [group, setGroup] = useState({
    id: '',
    name: '',
    nameError: '',
    description: ''
  });

  // effects
  useEffect(() => {
    setTitle('Edit Group Details');
    setBottomNav(false);
    setNavbarAction('backLink');
    setBackLinkTo(`/admin/groups/view/${params.id}`);
    return () => {
      setTitle('');
      setBottomNav(true);
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { loading } = useQuery(GroupQuery, {
    variables: {
      id: params.id
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setGroup(data.group)
  });

  // mutations
  const [updateGroup] = useMutation(UpdateGroup);

  // functions
  const handleChange = name => event => {
    setGroup({
      ...group,
      [name]: event.target.value
    });
  };

  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!group.name;
      !nameValid
        ? setGroup({ ...group, nameError: 'This field is required' })
        : setGroup({ ...group, nameError: '' });
      nameValid ? resolve() : reject();
    });

  const handleSave = () => {
    validateDetails()
      .then(() => {
        updateGroup({
          variables: {
            id: params.id,
            name: { set: group.name },
            description: { set: group.description }
          },
          optimisticResponse: {
            updateGroup: {
              id: params.id,
              name: group.name,
              description: group.description,
              __typename: 'Group'
            }
          }
        });
        navigate(`/admin/groups/view/${params.id}`);
      })
      .catch(() => {});
  };

  return (
    <Page>
      {loading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <div>
          <Field>
            <FieldHeader required>Group Name</FieldHeader>
            <TextField
              value={group.name}
              onChange={handleChange('name')}
              error={!!group.nameError}
              helperText={group.nameError}
              disabled={loading}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader>Description</FieldHeader>
            <TextField
              value={group.description}
              onChange={handleChange('description')}
              disabled={loading}
              fullWidth
              multiline
              rows="6"
            />
          </Field>
          <FullWidthButton
            text="Save"
            onClick={handleSave}
            disabled={loading}
          />
        </div>
      )}
    </Page>
  );
};

export default EditGroup;
