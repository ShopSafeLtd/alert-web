import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IconButton, Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Hide from '@material-ui/icons/RemoveCircleOutline';
import Show from '@material-ui/icons/CheckCircleOutline';

import { EditExclusionForm } from '../../../../forms';
import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import ExclusionQuery from '../../../../../graphql/exclusions/queries/Exclusion';
import EditMutation from '../../../../../graphql/exclusions/mutations/EditExclusion';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import Edit from '../../../../../graphql/exclusions/mutations/EditExclusion';
import { useNavigate, useParams } from 'react-router-dom';

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
const HideIcon = styled(Hide)``;
const ShowIcon = styled(Show)``;
const DeleteIcon = styled(Delete)`
  color: #ef5350;
`;

const EditBan = ({
  basePath,
  setBackLinkTo,
  setActions,
  editOffender
}) => {
  const navigate = useNavigate()
  const params = useParams()
  // state
  const [ban, setBan] = useState({
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    description: '',
    locationError: null,
    active: true
  });
  const [confirmActive, setActive] = useState(false);
  const [confirmDelete, setDelete] = useState(false);

  // effects
  useEffect(
    () => {
      setBackLinkTo(`${basePath}/bans`);
      !!setActions &&
        setActions([
          <IconButton
            key={0}
            onClick={() => setActive(true)}
            disabled={loading}
          >
            {ban.active ? <HideIcon /> : <ShowIcon />}
          </IconButton>,
          <IconButton key={1} onClick={() => setDelete(true)}>
            <DeleteIcon />
          </IconButton>
        ]);
      return () => {
        setBackLinkTo('');
        !!setActions && setActions([]);
      };
    },
    // eslint-disable-next-line
    [ban]
  );

  // queries
  const { loading } = useQuery(ExclusionQuery, {
    variables: {
      id: params.banId
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ ban }) =>
      setBan({
        ...ban,
        startDate: ban.startDate,
        endDate: ban.endDate,
        location: ban.location,
        description: ban.description,
        active: ban.active
      })
  });

  // mutations
  const [updateBan] = useMutation(EditMutation);
  const [markAsInactive] = useMutation(Edit, {
    onCompleted: ({ updateBan }) =>
      setBan({
        ...ban,
        active: updateBan.active
      })
  });

  // functions
  const handleChange = (value, field) => {
    setBan({
      ...ban,
      [field]: value
    });
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      const locationValid = !!ban.location;
      setBan({
        locationError: locationValid ? null : 'This field is required.'
      });
      locationValid ? resolve() : reject();
    });

  const handleSubmit = () => {
    validate()
      .then(() => {
        updateBan({
          variables: {
            id: params.banId,
            startDate: { set: ban.startDate },
            endDate: { set: ban.endDate },
            location: { set: ban.location },
            description: { set: ban.description }
          }
        });
        navigate(`${basePath}/bans`);
      })
      .catch(() => {});
  };

  return (
    <Page>
      <Header>
        <HeaderText>Edit Exclusion</HeaderText>
        <HeaderSubText>
          Update the details for of the exclusion, if you want to change the end date
          you will need to extend or reduce the exclusion.
        </HeaderSubText>
      </Header>
      <Form>
        <EditExclusionForm
          data={{
            startDate: ban.startDate,
            endDate: ban.endDate,
            location: ban.location,
            description: ban.description,
            locationError: ban.locationError
          }}
          loading={loading}
          handleChange={handleChange}
        />
      </Form>
      <FullWidthButton text="Submit Ban" onClick={handleSubmit} />

      <ConfirmDialog
        open={confirmActive}
        handleClose={() => setActive(false)}
        title="Are You Sure?"
        description={
          ban.active
            ? 'Deactivating this ban will hide it from all users. If this is th only ban for this offender it will no longer be shown as banned.'
            : 'Activating this ban will show it to all users and the offender will be shown as banned.'
        }
        actions={[
          <Button key={0} onClick={() => setActive(false)}>
            close
          </Button>,
          <Button
            key={1}
            color="primary"
            onClick={() => {
              setActive(false);
              markAsInactive({
                variables: {
                  id: params.banId,
                  active: { set: !ban.active }
                },
                optimisticResponse: {
                  updateBan: {
                    ...ban,
                    active: !ban.active
                  }
                }
              });
            }}
          >
            Confirm
          </Button>
        ]}
      />
      <ConfirmDialog
        open={confirmDelete}
        handleClose={() => setDelete(false)}
        title="Are You Sure?"
        description="Deleting this ban will be permanent and cannot be undone."
        actions={[
          <Button key={0} onClick={() => setDelete(false)}>
            close
          </Button>,
          <Button
            key={1}
            color="primary"
            onClick={() => {
              setActive(false);
              editOffender({
                variables: {
                  id: params.id,
                  removeBans: [{ id: { equals: params.banId } }]
                }
              });
              navigate(`/offenders/edit/${params.id}/bans`);
            }}
          >
            Confirm
          </Button>
        ]}
      />
    </Page>
  );
};

export default EditBan;
